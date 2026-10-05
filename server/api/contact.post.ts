import type { H3Event } from "h3";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_MESSAGE = 5000;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(event: H3Event): string {
  const xff = getHeader(event, "x-forwarded-for");
  if (typeof xff === "string") {
    return xff.split(",")[0]?.trim() || "unknown";
  }
  return getRequestIP(event) || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) return false;
  if (now >= entry.resetAt) {
    rateLimitMap.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX;
}

function recordRateLimit(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ContactBody {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  needs?: string[];
  timeline?: string;
  budget?: string;
  turnstileToken?: string;
  honeypot?: string;
  locale?: string;
  formType?: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  remoteIp: string,
): Promise<boolean> {
  const body = new URLSearchParams();
  body.set("secret", secretKey);
  body.set("response", token);
  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  const result = await $fetch<TurnstileVerifyResponse>(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return result?.success === true;
}

function buildEmailContent(input: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  needs: string[];
  timeline: string;
  budget: string;
  locale: string;
  formType: string;
}): { subject: string; text: string; html: string } {
  const isFunnel = input.formType === "erstgespraech-funnel";
  const subject = isFunnel
    ? `Erstgespräch-Anfrage von ${input.name}`
    : `Portfolio-Anfrage von ${input.name}`;

  const text = [
    `Form: ${input.formType}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "(none)"}`,
    ...(input.company ? [`Company: ${input.company}`] : []),
    `Needs: ${input.needs.length ? input.needs.join(", ") : "(none)"}`,
    ...(input.timeline ? [`Timeline: ${input.timeline}`] : []),
    `Budget: ${input.budget || "(none)"}`,
    `Locale: ${input.locale}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.5; color: #111;">
    <h2 style="margin: 0 0 16px;">${isFunnel ? "Erstgespräch-Anfrage" : "Portfolio-Kontakt"}</h2>
    <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(input.phone || "(none)")}</p>
    ${input.company ? `<p style="margin: 0 0 8px;"><strong>Company:</strong> ${escapeHtml(input.company)}</p>` : ""}
    <p style="margin: 0 0 8px;"><strong>Needs:</strong> ${escapeHtml(input.needs.length ? input.needs.join(", ") : "(none)")}</p>
    ${input.timeline ? `<p style="margin: 0 0 8px;"><strong>Timeline:</strong> ${escapeHtml(input.timeline)}</p>` : ""}
    <p style="margin: 0 0 8px;"><strong>Budget:</strong> ${escapeHtml(input.budget || "(none)")}</p>
    <p style="margin: 0 0 8px;"><strong>Locale:</strong> ${escapeHtml(input.locale)}</p>
    <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
    <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
  </body>
</html>`.trim();

  return { subject, text, html };
}

export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }

  const ip = getClientIp(event);
  if (isRateLimited(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests",
    });
  }

  let body: ContactBody;
  try {
    body = await readBody(event);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  if (body.honeypot && String(body.honeypot).trim() !== "") {
    return { ok: true };
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const timeline = typeof body.timeline === "string" ? body.timeline.trim() : "";
  const budget = typeof body.budget === "string" ? body.budget.trim() : "";
  const needs = Array.isArray(body.needs)
    ? body.needs
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 12)
    : [];
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";
  const locale =
    typeof body.locale === "string" && body.locale.trim()
      ? body.locale.trim()
      : "de";
  const formType =
    typeof body.formType === "string" && body.formType.trim()
      ? body.formType.trim()
      : "general";

  if (!name || name.length > MAX_NAME) {
    throw createError({ statusCode: 400, statusMessage: "Invalid name" });
  }
  if (!email || email.length > MAX_EMAIL || !EMAIL_REGEX.test(email)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid email" });
  }
  if (phone.length > MAX_PHONE) {
    throw createError({ statusCode: 400, statusMessage: "Invalid phone" });
  }
  if (company.length > MAX_NAME) {
    throw createError({ statusCode: 400, statusMessage: "Invalid company" });
  }
  if (!message || message.length > MAX_MESSAGE) {
    throw createError({ statusCode: 400, statusMessage: "Invalid message" });
  }
  if (timeline.length > 80 || budget.length > 80) {
    throw createError({ statusCode: 400, statusMessage: "Invalid funnel fields" });
  }

  const config = useRuntimeConfig(event);
  const turnstileSecretKey = String(config.turnstileSecretKey || "");
  const toEmail = String(config.contactToEmail || "");
  const fromEmail = String(config.contactFromEmail || "");
  const resendApiKey = String(config.resendApiKey || "");

  if (!turnstileSecretKey) {
    console.error("Contact form misconfigured: TURNSTILE_SECRET_KEY is missing");
    throw createError({
      statusCode: 503,
      statusMessage: "Contact form not configured",
    });
  }

  if (!turnstileToken) {
    throw createError({
      statusCode: 400,
      statusMessage: "Turnstile verification required",
    });
  }

  let turnstileOk = false;
  try {
    turnstileOk = await verifyTurnstileToken(
      turnstileToken,
      turnstileSecretKey,
      ip,
    );
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    throw createError({
      statusCode: 502,
      statusMessage: "Turnstile verification failed",
    });
  }

  if (!turnstileOk) {
    throw createError({
      statusCode: 403,
      statusMessage: "Turnstile verification failed",
    });
  }

  if (!resendApiKey || !toEmail || !fromEmail) {
    console.error(
      "Contact form misconfigured: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL missing",
    );
    throw createError({
      statusCode: 503,
      statusMessage: "Contact form not configured",
    });
  }

  const { subject, text, html } = buildEmailContent({
    name,
    email,
    phone,
    company,
    message,
    needs,
    timeline,
    budget,
    locale,
    formType,
  });

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to send email",
      });
    }

    recordRateLimit(ip);
    return { ok: true };
  } catch (err) {
    if (err && typeof err === "object" && "statusCode" in err) {
      throw err;
    }
    console.error("Resend send failed:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email",
    });
  }
});
