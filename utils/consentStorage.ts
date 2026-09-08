import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_SECONDS,
  CONSENT_VERSION,
  DEFAULT_CATEGORIES,
  type ConsentDecisionInput,
  type ConsentState,
} from "~/types/consent";
import { removeOptionalMarketingScripts } from "~/utils/optionalTracking";

export function createConsentState(input: ConsentDecisionInput): ConsentState {
  return {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    categories: {
      necessary: true,
      statistics: Boolean(input.statistics),
      marketing: Boolean(input.marketing),
    },
  };
}

export function isConsentExpired(state: ConsentState, now = Date.now()): boolean {
  const decidedAt = Date.parse(state.decidedAt);
  if (Number.isNaN(decidedAt)) return true;
  return now - decidedAt > CONSENT_MAX_AGE_SECONDS * 1000;
}

export function isConsentValid(state: ConsentState | null, now = Date.now()): boolean {
  if (!state) return false;
  if (state.version !== CONSENT_VERSION) return false;
  if (typeof state.decidedAt !== "string") return false;
  if (!state.categories || state.categories.necessary !== true) return false;
  if (typeof state.categories.statistics !== "boolean") return false;
  if (typeof state.categories.marketing !== "boolean") return false;
  if (isConsentExpired(state, now)) return false;
  return true;
}

export function parseConsentCookieValue(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (!isConsentValid(parsed)) return null;
    return {
      version: parsed.version,
      decidedAt: parsed.decidedAt,
      categories: {
        necessary: true,
        statistics: Boolean(parsed.categories.statistics),
        marketing: Boolean(parsed.categories.marketing),
      },
    };
  } catch {
    return null;
  }
}

export function serializeConsentState(state: ConsentState): string {
  return JSON.stringify({
    version: state.version,
    decidedAt: state.decidedAt,
    categories: {
      necessary: true,
      statistics: Boolean(state.categories.statistics),
      marketing: Boolean(state.categories.marketing),
    },
  });
}

export function readConsentCookieFromDocument(
  cookieString = typeof document !== "undefined" ? document.cookie : "",
): ConsentState | null {
  if (!cookieString) return null;
  const parts = cookieString.split(";").map((part) => part.trim());
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const name = part.slice(0, eq);
    if (name !== CONSENT_COOKIE_NAME) continue;
    const value = decodeURIComponent(part.slice(eq + 1));
    return parseConsentCookieValue(value);
  }
  return null;
}

export function buildConsentCookie(state: ConsentState, secure = true): string {
  const value = encodeURIComponent(serializeConsentState(state));
  const attributes = [
    `${CONSENT_COOKIE_NAME}=${value}`,
    "Path=/",
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];
  if (secure) attributes.push("Secure");
  return attributes.join("; ");
}

export function writeConsentCookie(state: ConsentState): void {
  if (typeof document === "undefined") return;
  const secure =
    typeof location !== "undefined" ? location.protocol === "https:" : true;
  document.cookie = buildConsentCookie(state, secure);
}

export function clearConsentCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

/** Removes known optional third-party scripts that can be cleared from the page. */
export function removeOptionalThirdPartyArtifacts(): void {
  if (typeof document === "undefined") return;

  const selectors = [
    'script[src*="/_vercel/insights/"]',
    'script[src*="va.vercel-scripts.com"]',
    'script[src*="vercel-scripts.com/v1/script"]',
    'script[src*="googletagmanager.com/gtag"]',
    'script[src*="connect.facebook.net"]',
  ];

  for (const selector of selectors) {
    document.querySelectorAll(selector).forEach((node) => node.remove());
  }

  removeOptionalMarketingScripts();

  if (typeof window !== "undefined") {
    try {
      delete window.va;
      delete window.vaq;
      delete window.vai;
      delete window.vam;
    } catch {
      // ignore non-configurable properties
    }
  }
}

export function getDefaultConsentCategories() {
  return { ...DEFAULT_CATEGORIES };
}
