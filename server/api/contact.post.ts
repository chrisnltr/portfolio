import type { H3Event } from "h3";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_TOPIC = 200;
const MAX_MESSAGE = 5000;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 5;

// In-memory rate limit (per-instance; TODO: use Redis or similar for multi-instance).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(event: H3Event): string {
  const xff = getHeader(event, "x-forwarded-for");
  if (typeof xff === "string") {
    return xff.split(",")[0].trim();
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

interface ContactBody {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  honeypot?: string;
  locale?: string;
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
      statusMessage: "Bad Request",
    });
  }

  // Honeypot: if filled, treat as spam and return success to not leak behavior.
  if (body.honeypot && String(body.honeypot).trim() !== "") {
    return { ok: true };
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX_NAME) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid name",
    });
  }
  if (!email || email.length > MAX_EMAIL || !EMAIL_REGEX.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email",
    });
  }
  if (topic.length > MAX_TOPIC) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid topic",
    });
  }
  if (!message || message.length > MAX_MESSAGE) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid message",
    });
  }

  const config = useRuntimeConfig();
  const toEmail = config.contactToEmail;
  const fromEmail = config.contactFromEmail;
  const resendApiKey = config.resendApiKey;
  const formspreeEndpoint = config.formspreeEndpoint;

  const locale = typeof body.locale === "string" ? body.locale : "en";
  const subject = `[Portfolio Contact] ${name} – ${topic || "No topic"}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${topic || "(none)"}`,
    `Locale: ${locale}`,
    "",
    "Message:",
    message,
  ].join("\n");

  // Option A: Resend
  if (resendApiKey && toEmail && fromEmail) {
    try {
      const res = await $fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: {
          from: fromEmail,
          to: toEmail,
          subject,
          text,
        },
      });
      recordRateLimit(ip);
      return { ok: true, id: (res as { id?: string })?.id };
    } catch (err) {
      console.error("Resend error:", err);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to send email",
      });
    }
  }

  // Option B: Formspree fallback
  if (formspreeEndpoint) {
    try {
      await $fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          name,
          email,
          subject,
          message: text,
          _locale: locale,
        },
      });
      recordRateLimit(ip);
      return { ok: true };
    } catch (err) {
      console.error("Formspree error:", err);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to send email",
      });
    }
  }

  // No provider configured: return 503 so frontend can show a clear message.
  throw createError({
    statusCode: 503,
    statusMessage: "Contact form not configured",
  });
});
