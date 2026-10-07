import type { TrackingIds } from "~/types/analytics";

export function normalizeTrackingId(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function readTrackingIds(publicConfig: {
  gaMeasurementId?: string;
  googleAdsId?: string;
  googleAdsConversionLabel?: string;
  metaPixelId?: string;
}): TrackingIds {
  return {
    gaMeasurementId: normalizeTrackingId(publicConfig.gaMeasurementId),
    googleAdsId: normalizeTrackingId(publicConfig.googleAdsId),
    googleAdsConversionLabel: normalizeTrackingId(
      publicConfig.googleAdsConversionLabel,
    ),
    metaPixelId: normalizeTrackingId(publicConfig.metaPixelId),
  };
}

export function hasGaConfigured(ids: TrackingIds): boolean {
  return Boolean(ids.gaMeasurementId);
}

export function hasGoogleAdsConfigured(ids: TrackingIds): boolean {
  return Boolean(ids.googleAdsId && ids.googleAdsConversionLabel);
}

export function hasMetaConfigured(ids: TrackingIds): boolean {
  return Boolean(ids.metaPixelId);
}

export function hasAnyOptionalTrackingConfigured(ids: TrackingIds): boolean {
  return (
    hasGaConfigured(ids) ||
    hasGoogleAdsConfigured(ids) ||
    hasMetaConfigured(ids)
  );
}

/** Exact PII / free-text keys that must never reach analytics platforms. */
const PII_EXACT_KEYS = new Set([
  "email",
  "e-mail",
  "phone",
  "telephone",
  "mobile",
  "tel",
  "message",
  "name",
  "firstname",
  "lastname",
  "first_name",
  "last_name",
  "full_name",
  "username",
  "user_name",
  "address",
  "street",
  "city",
  "zip",
  "postal",
  "honeypot",
  "turnstile",
  "turnstiletoken",
  "turnstile_token",
]);

/**
 * Strip keys with empty values; never pass PII fields.
 * Note: `step_name` is an allowlisted technical enum and must not be blocked
 * by a naive substring match on "name".
 */
export function sanitizeAnalyticsProps(
  props?: Record<string, string | number | boolean | null | undefined>,
): Record<string, string | number | boolean> {
  if (!props) return {};
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === "") continue;
    const lower = key.toLowerCase();
    if (PII_EXACT_KEYS.has(lower)) continue;
    if (
      lower.includes("email") ||
      lower.includes("phone") ||
      lower.includes("message") ||
      lower.includes("tel")
    ) {
      continue;
    }
    // Block accidental `*_name` form fields, but allow technical `step_name`.
    if (lower !== "step_name" && (lower === "name" || lower.endsWith("_name"))) {
      continue;
    }
    out[key] = value;
  }
  return out;
}
