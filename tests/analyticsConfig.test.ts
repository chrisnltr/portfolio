import { describe, expect, it } from "vitest";
import {
  hasAnyOptionalTrackingConfigured,
  hasGaConfigured,
  hasGoogleAdsConfigured,
  hasMetaConfigured,
  readTrackingIds,
  sanitizeAnalyticsProps,
} from "../utils/analyticsConfig";
import { dispatchPlatformEvent } from "../utils/optionalTracking";

describe("analytics config", () => {
  it("treats empty / whitespace IDs as unset", () => {
    const ids = readTrackingIds({
      gaMeasurementId: "  ",
      googleAdsId: "",
      googleAdsConversionLabel: "label",
      metaPixelId: undefined,
    });
    expect(hasGaConfigured(ids)).toBe(false);
    expect(hasGoogleAdsConfigured(ids)).toBe(false);
    expect(hasMetaConfigured(ids)).toBe(false);
    expect(hasAnyOptionalTrackingConfigured(ids)).toBe(false);
  });

  it("requires both Ads ID and conversion label", () => {
    expect(
      hasGoogleAdsConfigured(
        readTrackingIds({
          googleAdsId: "AW-123",
          googleAdsConversionLabel: "",
        }),
      ),
    ).toBe(false);
    expect(
      hasGoogleAdsConfigured(
        readTrackingIds({
          googleAdsId: "AW-123",
          googleAdsConversionLabel: "abc",
        }),
      ),
    ).toBe(true);
  });

  it("strips empty values and PII-like keys", () => {
    expect(
      sanitizeAnalyticsProps({
        page: "/",
        email: "a@b.c",
        message: "hello",
        phone: "123",
        location: "hero",
        empty: "",
      }),
    ).toEqual({
      page: "/",
      location: "hero",
    });
  });
});

describe("optional tracking dispatch without IDs", () => {
  it("does not throw and does not require window APIs when IDs are empty", () => {
    expect(() =>
      dispatchPlatformEvent(
        "cta_click",
        { page: "/", location: "hero" },
        readTrackingIds({}),
        { statistics: true, marketing: true },
      ),
    ).not.toThrow();
  });
});
