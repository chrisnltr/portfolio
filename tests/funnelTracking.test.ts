import { afterEach, describe, expect, it, vi } from "vitest";
import type { AnalyticsEventName, AnalyticsEventProps } from "../types/analytics";
import {
  budgetBandFromId,
  classifyContactSubmitError,
  createAnalyticsOnceTracker,
  funnelStepName,
  trackWebsiteCta,
  websiteFunnelProps,
} from "../utils/funnelTracking";
import {
  dispatchPlatformEvent,
  resetOptionalTrackingState,
  trackLeadConversion,
} from "../utils/optionalTracking";
import {
  readTrackingIds,
  sanitizeAnalyticsProps,
} from "../utils/analyticsConfig";

describe("funnel tracking helpers", () => {
  it("maps step numbers to technical step_name values", () => {
    expect(funnelStepName(1)).toBe("needs");
    expect(funnelStepName(2)).toBe("budget");
    expect(funnelStepName(3)).toBe("details");
    expect(funnelStepName(99)).toBeNull();
  });

  it("maps budget ids to closed budget_band enums", () => {
    expect(budgetBandFromId("under15")).toBe("under_1500");
    expect(budgetBandFromId("15to3")).toBe("1500_3000");
    expect(budgetBandFromId("3to6")).toBe("3000_6000");
    expect(budgetBandFromId("over6")).toBe("over_6000");
    expect(budgetBandFromId("unsure")).toBe("open");
  });

  it("builds website funnel props without free text", () => {
    expect(websiteFunnelProps(1)).toEqual({
      project_type: "website",
      step_number: 1,
      step_name: "needs",
    });
  });

  it("classifies submit errors without using server messages", () => {
    expect(
      classifyContactSubmitError({ phase: "validation" }),
    ).toBe("validation");
    expect(
      classifyContactSubmitError({ phase: "api", statusCode: 403 }),
    ).toBe("captcha");
    expect(
      classifyContactSubmitError({ phase: "api", statusCode: 500 }),
    ).toBe("server");
    expect(
      classifyContactSubmitError({ phase: "api", isNetworkError: true }),
    ).toBe("network");
    expect(classifyContactSubmitError({ phase: "api" })).toBe("unknown");
  });

  it("tracks website CTA with placement + destination only", () => {
    const track = vi.fn();
    trackWebsiteCta(track, "hero");
    expect(track).toHaveBeenCalledWith("website_cta_click", {
      cta_placement: "hero",
      destination: "contact_funnel",
    });
  });

  it("dedupes once-tracker until remount (new tracker instance)", () => {
    const track = vi.fn();
    const once = createAnalyticsOnceTracker(track, () => true);
    once("start", "contact_funnel_start", { project_type: "website" });
    once("start", "contact_funnel_start", { project_type: "website" });
    once("step_1", "contact_funnel_step_view", websiteFunnelProps(1));
    once("step_1", "contact_funnel_step_view", websiteFunnelProps(1));
    expect(track).toHaveBeenCalledTimes(2);

    const again = createAnalyticsOnceTracker(track, () => true);
    again("start", "contact_funnel_start", { project_type: "website" });
    expect(track).toHaveBeenCalledTimes(3);
  });

  it("does not mark once-keys when consent/canSend is false", () => {
    const track = vi.fn();
    let allowed = false;
    const once = createAnalyticsOnceTracker(track, () => allowed);
    expect(
      once("landing", "website_landing_view", { page_type: "website_landing" }),
    ).toBe(false);
    expect(track).not.toHaveBeenCalled();
    allowed = true;
    expect(
      once("landing", "website_landing_view", { page_type: "website_landing" }),
    ).toBe(true);
    expect(track).toHaveBeenCalledTimes(1);
  });
});

describe("website funnel analytics payloads", () => {
  it("keeps step_name and strips PII-like keys", () => {
    expect(
      sanitizeAnalyticsProps({
        page_type: "website_landing",
        cta_placement: "hero",
        destination: "contact_funnel",
        project_type: "website",
        step_number: 2,
        step_name: "budget",
        budget_band: "1500_3000",
        error_type: "validation",
        email: "a@b.c",
        name: "Max",
        phone: "123",
        message: "hi",
      }),
    ).toEqual({
      page_type: "website_landing",
      cta_placement: "hero",
      destination: "contact_funnel",
      project_type: "website",
      step_number: 2,
      step_name: "budget",
      budget_band: "1500_3000",
      error_type: "validation",
    });
  });
});

describe("submit success / error conversion rules", () => {
  afterEach(() => {
    resetOptionalTrackingState();
    vi.unstubAllGlobals();
  });

  it("fires one Ads conversion on success and none on error/validation", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });

    const ids = readTrackingIds({
      googleAdsId: "AW-18143702036",
      googleAdsConversionLabel: "DRh7CMf3tpMdEJTYy8tD",
    });

    expect(
      `${ids.googleAdsId}/${ids.googleAdsConversionLabel}`,
    ).toBe("AW-18143702036/DRh7CMf3tpMdEJTYy8tD");

    const successProps: AnalyticsEventProps = { project_type: "website" };
    dispatchPlatformEvent(
      "contact_form_submit_attempt",
      successProps,
      ids,
      { statistics: true, marketing: true },
    );
    expect(
      gtag.mock.calls.filter(
        (call) => call[0] === "event" && call[1] === "conversion",
      ),
    ).toHaveLength(0);

    dispatchPlatformEvent(
      "contact_form_submit_success",
      successProps,
      ids,
      { statistics: true, marketing: true },
    );
    expect(
      gtag.mock.calls.filter(
        (call) => call[0] === "event" && call[1] === "conversion",
      ),
    ).toHaveLength(1);

    // Repeated success callbacks / double-clicks share the same send_to and
    // must not emit a second conversion without a new server transaction_id.
    gtag.mockClear();
    expect(trackLeadConversion(ids)).toBe(false);
    expect(gtag).not.toHaveBeenCalled();

    gtag.mockClear();
    dispatchPlatformEvent(
      "contact_form_submit_error",
      { project_type: "website", error_type: "server" },
      ids,
      { statistics: true, marketing: true },
    );
    expect(
      gtag.mock.calls.filter(
        (call) => call[0] === "event" && call[1] === "conversion",
      ),
    ).toHaveLength(0);

    vi.unstubAllGlobals();
  });

  it("does not convert when Ads ID or label is missing", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, dataLayer: [] });
    expect(
      trackLeadConversion(
        readTrackingIds({
          googleAdsId: "AW-18143702036",
          googleAdsConversionLabel: "",
        }),
      ),
    ).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("simulates the funnel event sequence without Ads conversion until success", () => {
    const events: Array<{ name: AnalyticsEventName; props?: AnalyticsEventProps }> =
      [];
    const track = (name: AnalyticsEventName, props?: AnalyticsEventProps) => {
      events.push({ name, props });
    };
    const once = createAnalyticsOnceTracker(track, () => true);

    once("landing", "website_landing_view", { page_type: "website_landing" });
    trackWebsiteCta(track, "hero");
    once("start", "contact_funnel_start", { project_type: "website" });
    once("v1", "contact_funnel_step_view", websiteFunnelProps(1));
    once("c1", "contact_funnel_step_complete", websiteFunnelProps(1));
    once("v2", "contact_funnel_step_view", websiteFunnelProps(2));
    once("c2", "contact_funnel_step_complete", {
      ...websiteFunnelProps(2),
      budget_band: "1500_3000",
    });
    once("v3", "contact_funnel_step_view", websiteFunnelProps(3));
    track("contact_form_submit_attempt", { project_type: "website" });
    track("contact_form_submit_success", { project_type: "website" });

    expect(events.map((e) => e.name)).toEqual([
      "website_landing_view",
      "website_cta_click",
      "contact_funnel_start",
      "contact_funnel_step_view",
      "contact_funnel_step_complete",
      "contact_funnel_step_view",
      "contact_funnel_step_complete",
      "contact_funnel_step_view",
      "contact_form_submit_attempt",
      "contact_form_submit_success",
    ]);
  });
});
