import { afterEach, describe, expect, it, vi } from "vitest";
import type { AnalyticsEventName, AnalyticsEventProps } from "../types/analytics";
import { readTrackingIds } from "../utils/analyticsConfig";
import { classifyContactSubmitError } from "../utils/funnelTracking";
import {
  dispatchPlatformEvent,
  initGoogleConsentDefaults,
  loadGoogleTag,
  readContactSuccessTransactionId,
  removeOptionalMarketingScripts,
  resetOptionalTrackingState,
  trackLeadConversion,
  updateGoogleConsent,
} from "../utils/optionalTracking";

const PRODUCTION_IDS = readTrackingIds({
  gaMeasurementId: "G-ZRJ9KFWH7T",
  googleAdsId: "AW-18143702036",
  googleAdsConversionLabel: "DRh7CMf3tpMdEJTYy8tD",
});

const EXPECTED_SEND_TO = "AW-18143702036/DRh7CMf3tpMdEJTYy8tD";

type ScriptNode = {
  id: string;
  async: boolean;
  src: string;
  remove: () => void;
};

function stubDocument() {
  const created: ScriptNode[] = [];
  const head = {
    appendChild(node: ScriptNode) {
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
      const node: ScriptNode = {
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
  return { created, doc };
}

function conversionCalls(gtag: ReturnType<typeof vi.fn>) {
  return gtag.mock.calls.filter(
    (call) => call[0] === "event" && call[1] === "conversion",
  );
}

function configCalls(gtag: ReturnType<typeof vi.fn>, id: string) {
  return gtag.mock.calls.filter((call) => call[0] === "config" && call[1] === id);
}

describe("Google Ads tag configuration and conversions", () => {
  afterEach(() => {
    removeOptionalMarketingScripts();
    resetOptionalTrackingState();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("sets Consent Mode v2 defaults to denied before any opt-in", () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", { dataLayer });

    initGoogleConsentDefaults();

    expect(typeof window.gtag).toBe("function");
    expect(dataLayer).toHaveLength(1);
    expect(Array.isArray(dataLayer[0])).toBe(false);
    expect(dataLayer[0]).toHaveProperty("0", "consent");
    expect(dataLayer[0]).toHaveProperty("1", "default");
    expect((dataLayer[0] as { 2: Record<string, unknown> })[2]).toMatchObject({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });

  it("configures the Ads tag after marketing consent", () => {
    const { created } = stubDocument();
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    loadGoogleTag(PRODUCTION_IDS, { statistics: true, marketing: true });

    expect(created).toHaveLength(1);
    expect(created[0]?.id).toBe("optional-gtag-js");
    expect(created[0]?.src).toContain("AW-18143702036");
    expect(configCalls(gtag, "G-ZRJ9KFWH7T")).toHaveLength(1);
    expect(configCalls(gtag, "AW-18143702036")).toHaveLength(1);
    expect(gtag).toHaveBeenCalledWith("config", "AW-18143702036");
  });

  it("configures Ads when marketing is accepted and statistics is denied", () => {
    const { created } = stubDocument();
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    updateGoogleConsent({ statistics: false, marketing: true });
    loadGoogleTag(PRODUCTION_IDS, { statistics: false, marketing: true });

    expect(created).toHaveLength(1);
    expect(created[0]?.src).toContain("id=AW-18143702036");
    expect(configCalls(gtag, "AW-18143702036")).toHaveLength(1);
    expect(configCalls(gtag, "G-ZRJ9KFWH7T")).toHaveLength(0);
    expect(gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  });

  it("does not configure Ads from statistics-only consent, then inits Ads on later marketing grant", () => {
    const { created } = stubDocument();
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    loadGoogleTag(PRODUCTION_IDS, { statistics: true, marketing: false });

    expect(created).toHaveLength(1);
    expect(created[0]?.src).toContain("id=G-ZRJ9KFWH7T");
    expect(configCalls(gtag, "G-ZRJ9KFWH7T")).toHaveLength(1);
    expect(configCalls(gtag, "AW-18143702036")).toHaveLength(0);

    loadGoogleTag(PRODUCTION_IDS, { statistics: true, marketing: true });

    expect(created).toHaveLength(1);
    expect(configCalls(gtag, "AW-18143702036")).toHaveLength(1);
    expect(configCalls(gtag, "G-ZRJ9KFWH7T")).toHaveLength(1);
  });

  it("does not inject a second gtag script on repeated loads or remounts", () => {
    const { created } = stubDocument();
    vi.stubGlobal("window", { gtag: vi.fn(), dataLayer: [] });

    loadGoogleTag(PRODUCTION_IDS, { statistics: true, marketing: false });
    loadGoogleTag(PRODUCTION_IDS, { statistics: true, marketing: true });
    loadGoogleTag(PRODUCTION_IDS, { statistics: true, marketing: true });

    expect(created).toHaveLength(1);
    expect(created.filter((node) => node.id === "optional-gtag-js")).toHaveLength(1);
  });

  it("does not fire a conversion on Turnstile, validation, or API errors", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    const errorEvents: Array<{
      name: AnalyticsEventName;
      props: AnalyticsEventProps;
    }> = [
      {
        name: "contact_form_submit_error",
        props: {
          project_type: "website",
          error_type: classifyContactSubmitError({ phase: "validation" }),
        },
      },
      {
        name: "contact_form_submit_error",
        props: {
          project_type: "website",
          error_type: classifyContactSubmitError({
            phase: "api",
            statusCode: 403,
          }),
        },
      },
      {
        name: "contact_form_submit_error",
        props: {
          project_type: "website",
          error_type: classifyContactSubmitError({
            phase: "api",
            statusCode: 500,
          }),
        },
      },
      {
        name: "contact_form_submit_attempt",
        props: { project_type: "website" },
      },
    ];

    expect(errorEvents[0]?.props.error_type).toBe("validation");
    expect(errorEvents[1]?.props.error_type).toBe("captcha");
    expect(errorEvents[2]?.props.error_type).toBe("server");

    for (const event of errorEvents) {
      dispatchPlatformEvent(event.name, event.props, PRODUCTION_IDS, {
        statistics: true,
        marketing: true,
      });
    }

    expect(conversionCalls(gtag)).toHaveLength(0);
  });

  it("fires exactly one conversion after a successful submit", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    dispatchPlatformEvent(
      "contact_form_submit_success",
      { project_type: "website", location: "contact-funnel" },
      PRODUCTION_IDS,
      { statistics: true, marketing: true },
    );

    expect(conversionCalls(gtag)).toHaveLength(1);
    expect(conversionCalls(gtag)[0]?.[2]).toEqual({
      send_to: EXPECTED_SEND_TO,
      value: 1.0,
      currency: "EUR",
    });
  });

  it("includes a server request id as transaction_id and never invents one", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    expect(readContactSuccessTransactionId({ ok: true })).toBeUndefined();
    expect(readContactSuccessTransactionId({ ok: true, requestId: "  " })).toBeUndefined();
    expect(
      readContactSuccessTransactionId({ ok: true, requestId: "re_123" }),
    ).toBe("re_123");

    dispatchPlatformEvent(
      "contact_form_submit_success",
      { project_type: "website", transaction_id: "re_123" },
      PRODUCTION_IDS,
      { statistics: false, marketing: true },
    );

    expect(conversionCalls(gtag)[0]?.[2]).toEqual({
      send_to: EXPECTED_SEND_TO,
      value: 1.0,
      currency: "EUR",
      transaction_id: "re_123",
    });
  });

  it("does not emit a duplicate conversion on repeated success callbacks", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    const successProps: AnalyticsEventProps = {
      project_type: "website",
      transaction_id: "re_same",
    };

    dispatchPlatformEvent(
      "contact_form_submit_success",
      successProps,
      PRODUCTION_IDS,
      { statistics: true, marketing: true },
    );
    dispatchPlatformEvent(
      "contact_form_submit_success",
      successProps,
      PRODUCTION_IDS,
      { statistics: true, marketing: true },
    );
    expect(trackLeadConversion(PRODUCTION_IDS, { transactionId: "re_same" })).toBe(
      false,
    );

    expect(conversionCalls(gtag)).toHaveLength(1);
  });

  it("keeps form PII out of the Ads conversion payload", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    dispatchPlatformEvent(
      "contact_form_submit_success",
      {
        project_type: "website",
        email: "leak@example.com",
        name: "Max",
        phone: "0123",
        message: "secret",
      } as AnalyticsEventProps & Record<string, string>,
      PRODUCTION_IDS,
      { statistics: true, marketing: true },
    );

    const payload = conversionCalls(gtag)[0]?.[2] as Record<string, unknown>;
    expect(payload).toEqual({
      send_to: EXPECTED_SEND_TO,
      value: 1.0,
      currency: "EUR",
    });
    expect(payload).not.toHaveProperty("email");
    expect(payload).not.toHaveProperty("name");
    expect(payload).not.toHaveProperty("phone");
    expect(payload).not.toHaveProperty("message");
  });
});
