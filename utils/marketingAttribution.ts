/** First-touch marketing attribution (sessionStorage). No PII. */

export const MARKETING_ATTRIBUTION_STORAGE_KEY =
  "portfolio_marketing_attribution_v1";

export const MARKETING_ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "initial_landing_path",
  "initial_referrer_host",
] as const;

export type MarketingAttributionKey =
  (typeof MARKETING_ATTRIBUTION_KEYS)[number];

export type MarketingAttribution = Partial<
  Record<MarketingAttributionKey, string>
>;

const MAX_VALUE_LENGTH = 200;
const MAX_PATH_LENGTH = 180;

const QUERY_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function sanitizeValue(raw: string, max = MAX_VALUE_LENGTH): string {
  const trimmed = raw.trim().slice(0, max);
  // Strip control chars; keep URL-safe printable text only.
  return trimmed.replace(/[\u0000-\u001F\u007F]/g, "");
}

function sanitizePath(pathname: string): string {
  if (!pathname.startsWith("/")) return "/";
  return sanitizeValue(pathname.split("?")[0] || "/", MAX_PATH_LENGTH);
}

function sanitizeReferrerHost(referrer: string): string {
  if (!referrer) return "";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return sanitizeValue(host, 120);
  } catch {
    return "";
  }
}

export function isAllowedAttributionKey(
  key: string,
): key is MarketingAttributionKey {
  return (MARKETING_ATTRIBUTION_KEYS as readonly string[]).includes(key);
}

/** Parse only allowlisted query keys from a URLSearchParams-like source. */
export function extractAttributionFromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined | null>,
): MarketingAttribution {
  const out: MarketingAttribution = {};
  const get = (key: string): string => {
    if (params instanceof URLSearchParams) {
      return params.get(key) || "";
    }
    const value = params[key];
    if (Array.isArray(value)) return value[0] || "";
    return value || "";
  };

  for (const key of QUERY_KEYS) {
    const value = sanitizeValue(get(key));
    if (value) out[key] = value;
  }
  return out;
}

export function buildFirstTouchAttribution(input: {
  search?: string | URLSearchParams | Record<string, string | undefined>;
  pathname?: string;
  referrer?: string;
}): MarketingAttribution {
  let fromQuery: MarketingAttribution = {};
  if (typeof input.search === "string") {
    const q = input.search.startsWith("?")
      ? input.search.slice(1)
      : input.search;
    fromQuery = extractAttributionFromSearchParams(new URLSearchParams(q));
  } else if (input.search instanceof URLSearchParams) {
    fromQuery = extractAttributionFromSearchParams(input.search);
  } else if (input.search && typeof input.search === "object") {
    fromQuery = extractAttributionFromSearchParams(input.search);
  }

  const out: MarketingAttribution = { ...fromQuery };
  if (input.pathname) {
    const path = sanitizePath(input.pathname);
    if (path) out.initial_landing_path = path;
  }
  if (input.referrer) {
    const host = sanitizeReferrerHost(input.referrer);
    if (host) out.initial_referrer_host = host;
  }
  return out;
}

export function readMarketingAttribution(
  storage?: Storage | null,
): MarketingAttribution {
  const store = storage ?? (typeof sessionStorage !== "undefined" ? sessionStorage : null);
  if (!store) return {};
  try {
    const raw = store.getItem(MARKETING_ATTRIBUTION_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: MarketingAttribution = {};
    for (const key of MARKETING_ATTRIBUTION_KEYS) {
      const value = parsed[key];
      if (typeof value === "string" && value) {
        out[key] = sanitizeValue(value);
      }
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * First-touch merge: existing session values win; only fill missing keys.
 * Call only after marketing consent.
 */
export function captureMarketingAttribution(
  incoming: MarketingAttribution,
  storage?: Storage | null,
): MarketingAttribution {
  const store = storage ?? (typeof sessionStorage !== "undefined" ? sessionStorage : null);
  if (!store) return {};

  const existing = readMarketingAttribution(store);
  const merged: MarketingAttribution = { ...existing };

  for (const key of MARKETING_ATTRIBUTION_KEYS) {
    if (merged[key]) continue;
    const next = incoming[key];
    if (next) merged[key] = sanitizeValue(next);
  }

  try {
    if (Object.keys(merged).length > 0) {
      store.setItem(MARKETING_ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
    }
  } catch {
    // Quota / private mode — ignore.
  }
  return merged;
}

export function clearMarketingAttribution(storage?: Storage | null): void {
  const store = storage ?? (typeof sessionStorage !== "undefined" ? sessionStorage : null);
  if (!store) return;
  try {
    store.removeItem(MARKETING_ATTRIBUTION_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Capture from the current browser location after marketing consent. */
export function captureMarketingAttributionFromWindow(
  win: Window = typeof window !== "undefined" ? window : (undefined as unknown as Window),
): MarketingAttribution {
  if (!win?.location) return {};
  return captureMarketingAttribution(
    buildFirstTouchAttribution({
      search: win.location.search,
      pathname: win.location.pathname,
      referrer: win.document?.referrer || "",
    }),
  );
}

/**
 * Merge allowlisted click/UTM params into an internal navigation query so SPA
 * transitions (landing → /kontakt) do not drop Ads attribution before consent
 * can persist first-touch values into sessionStorage.
 */
export function mergeAttributionIntoQuery(
  base: Record<string, string>,
  source:
    | URLSearchParams
    | Record<string, string | string[] | undefined | null>
    | undefined,
): Record<string, string> {
  if (!source) return { ...base };
  const extracted = extractAttributionFromSearchParams(source);
  const out: Record<string, string> = { ...base };
  for (const key of QUERY_KEYS) {
    const value = extracted[key];
    if (value && out[key] == null) out[key] = value;
  }
  return out;
}

/** Contact funnel link that keeps website preselect + Ads/UTM params. */
export function websiteContactQuery(
  source?:
    | URLSearchParams
    | Record<string, string | string[] | undefined | null>,
): Record<string, string> {
  return mergeAttributionIntoQuery({ projekt: "website" }, source);
}
