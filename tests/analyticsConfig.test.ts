import { afterEach, describe, expect, it, vi } from "vitest";
import type { AnalyticsEventProps } from "../types/analytics";
import {
  hasAnyOptionalTrackingConfigured,
  hasGaConfigured,
  hasGoogleAdsConfigured,
  hasMetaConfigured,
  readTrackingIds,
  sanitizeAnalyticsProps,
} from "../utils/analyticsConfig";
import {
  buildGoogleAdsSendTo,
  dispatchPlatformEvent,
  loadGoogleTag,
  removeOptionalMarketingScripts,
  resetOptionalTrackingState,
  trackLeadConversion,
} from "../utils/optionalTracking";

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

  it("strips empty values and PII-like keys but keeps step_name", () => {
    expect(
      sanitizeAnalyticsProps({
        page: "/",
        email: "a@b.c",
        message: "hello",
        phone: "123",
        name: "Max",
        location: "hero",
        project_type: "website",
        step_name: "needs",
        transaction_id: "re_123",
        empty: "",
      }),
    ).toEqual({
      page: "/",
      location: "hero",
      project_type: "website",
      step_name: "needs",
      transaction_id: "re_123",
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

describe("Google Ads lead conversion", () => {
  afterEach(() => {
    resetOptionalTrackingState();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("builds send_to as AW-ID/LABEL", () => {
    const ids = readTrackingIds({
      googleAdsId: "AW-123456789",
      googleAdsConversionLabel: "AbCdEfGhIjKlMnOp",
    });
    expect(buildGoogleAdsSendTo(ids)).toBe(
      "AW-123456789/AbCdEfGhIjKlMnOp",
    );
  });

  it("fires conversion exactly once with send_to, value, and currency (no form PII)", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", {
      gtag,
      dataLayer: [],
    });

    const ids = readTrackingIds({
      googleAdsId: "AW-999",
      googleAdsConversionLabel: "leadLabel",
    });

    expect(trackLeadConversion(ids)).toBe(true);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-999/leadLabel",
      value: 1.0,
      currency: "EUR",
    });

    const payload = gtag.mock.calls[0][2] as Record<string, unknown>;
    expect(payload).not.toHaveProperty("email");
    expect(payload).not.toHaveProperty("name");
    expect(payload).not.toHaveProperty("phone");
    expect(payload).not.toHaveProperty("message");
    expect(Object.keys(payload)).toEqual(["send_to", "value", "currency"]);
  });

  it("does not fire when IDs are incomplete", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    expect(
      trackLeadConversion(
        readTrackingIds({
          googleAdsId: "AW-999",
          googleAdsConversionLabel: "",
        }),
      ),
    ).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("does not fire conversion on failed-submit analytics event", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    const ids = readTrackingIds({
      googleAdsId: "AW-999",
      googleAdsConversionLabel: "leadLabel",
      gaMeasurementId: "G-TEST",
    });

    dispatchPlatformEvent(
      "contact_form_submit_error",
      {
        location: "contact-funnel",
        email: "should-not-leak@example.com",
        name: "Max",
      } as AnalyticsEventProps & Record<string, string>,
      ids,
      { statistics: true, marketing: true },
    );

    const conversionCalls = gtag.mock.calls.filter(
      (call) => call[0] === "event" && call[1] === "conversion",
    );
    expect(conversionCalls).toHaveLength(0);
  });

  it("fires conversion once for a simulated successful submit event", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    const ids = readTrackingIds({
      googleAdsId: "AW-999",
      googleAdsConversionLabel: "leadLabel",
    });

    dispatchPlatformEvent(
      "contact_form_submit_success",
      {
        location: "contact-funnel",
        service: "erstgespraech",
        project_type: "website",
        email: "leak@example.com",
        phone: "0123",
        message: "secret",
      } as AnalyticsEventProps & Record<string, string>,
      ids,
      { statistics: false, marketing: true },
    );

    const conversionCalls = gtag.mock.calls.filter(
      (call) => call[0] === "event" && call[1] === "conversion",
    );
    expect(conversionCalls).toHaveLength(1);
    expect(conversionCalls[0][2]).toEqual({
      send_to: "AW-999/leadLabel",
      value: 1.0,
      currency: "EUR",
    });
  });

  it("does not fire conversion without marketing consent", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    dispatchPlatformEvent(
      "contact_form_submit_success",
      { location: "contact-funnel" },
      readTrackingIds({
        googleAdsId: "AW-999",
        googleAdsConversionLabel: "leadLabel",
      }),
      { statistics: true, marketing: false },
    );

    expect(
      gtag.mock.calls.filter(
        (call) => call[0] === "event" && call[1] === "conversion",
      ),
    ).toHaveLength(0);
  });

  it("injects the Google tag script at most once", () => {
    const created: Array<{ id?: string; remove: () => void }> = [];
    const head = {
      appendChild(node: { id?: string; remove: () => void }) {
        created.push(node);
        return node;
      },
    };
    const doc = {
      getElementById(id: string) {
        return created.find((node) => node.id === id) ?? null;
      },
      createElement(tag: string) {
        if (tag !== "script") throw new Error(`unexpected tag ${tag}`);
        const node = {
          id: "",
          async: false,
          src: "",
          remove() {
            const index = created.indexOf(node);
            if (index >= 0) created.splice(index, 1);
          },
        };
        return node;
      },
      head,
    };

    vi.stubGlobal("document", doc);
    vi.stubGlobal("window", {
      dataLayer: [] as unknown[],
      gtag: vi.fn(),
    });

    const ids = readTrackingIds({
      googleAdsId: "AW-111",
      googleAdsConversionLabel: "lbl",
    });

    loadGoogleTag(ids, { statistics: false, marketing: true });
    loadGoogleTag(ids, { statistics: false, marketing: true });

    expect(created).toHaveLength(1);
    expect(created[0]?.id).toBe("optional-gtag-js");
    removeOptionalMarketingScripts();
  });
});
