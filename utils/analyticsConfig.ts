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

/** Strip keys with empty values; never pass PII fields. */
export function sanitizeAnalyticsProps(
  props?: Record<string, string | number | boolean | null | undefined>,
): Record<string, string | number | boolean> {
  if (!props) return {};
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === "") continue;
    // Hard deny common PII keys even if passed by mistake.
    const lower = key.toLowerCase();
    if (
      lower.includes("email") ||
      lower.includes("phone") ||
      lower.includes("message") ||
      lower.includes("name") ||
      lower.includes("tel")
    ) {
      continue;
    }
    out[key] = value;
  }
  return out;
}
