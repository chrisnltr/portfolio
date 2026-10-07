import type { FunnelBudgetId } from "~/data/funnel";
import type {
  AnalyticsEventName,
  AnalyticsEventProps,
  ContactFormErrorType,
  FunnelBudgetBand,
  FunnelStepName,
  WebsiteCtaPlacement,
} from "~/types/analytics";

export const FUNNEL_STEP_NAMES: Readonly<Record<number, FunnelStepName>> = {
  1: "needs",
  2: "budget",
  3: "details",
};

export const BUDGET_BAND_BY_ID: Readonly<
  Record<FunnelBudgetId, FunnelBudgetBand>
> = {
  under15: "under_1500",
  "15to3": "1500_3000",
  "3to6": "3000_6000",
  over6: "over_6000",
  unsure: "open",
};

export function funnelStepName(stepNumber: number): FunnelStepName | null {
  return FUNNEL_STEP_NAMES[stepNumber] ?? null;
}

export function budgetBandFromId(
  budgetId: FunnelBudgetId | "" | null | undefined,
): FunnelBudgetBand | undefined {
  if (!budgetId) return undefined;
  return BUDGET_BAND_BY_ID[budgetId];
}

export function websiteFunnelProps(
  stepNumber: number,
  extras?: AnalyticsEventProps,
): AnalyticsEventProps {
  const step_name = funnelStepName(stepNumber);
  return {
    project_type: "website",
    step_number: stepNumber,
    ...(step_name ? { step_name } : {}),
    ...extras,
  };
}

/** Map HTTP / client failures to a closed error_type enum (never free text). */
export function classifyContactSubmitError(input: {
  phase: "validation" | "api";
  statusCode?: number;
  isNetworkError?: boolean;
}): ContactFormErrorType {
  if (input.phase === "validation") return "validation";
  if (input.isNetworkError) return "network";
  const code = input.statusCode;
  if (code === 403) return "captcha";
  if (typeof code === "number" && code >= 400) return "server";
  return "unknown";
}

/**
 * Once-per-mount dedupe for funnel / landing analytics.
 * A new page visit remounts the component → Set is fresh → recounts correctly.
 * When `canSend` is false (no consent yet), the key is not marked — so a later
 * consent grant can still emit the event once.
 */
export function createAnalyticsOnceTracker(
  track: (name: AnalyticsEventName, props?: AnalyticsEventProps) => void,
  canSend?: () => boolean,
) {
  const fired = new Set<string>();

  return function trackOnce(
    key: string,
    name: AnalyticsEventName,
    props?: AnalyticsEventProps,
  ): boolean {
    if (fired.has(key)) return false;
    if (canSend && !canSend()) return false;
    fired.add(key);
    track(name, props);
    return true;
  };
}

export function trackWebsiteCta(
  track: (name: AnalyticsEventName, props?: AnalyticsEventProps) => void,
  cta_placement: WebsiteCtaPlacement,
): void {
  track("website_cta_click", {
    cta_placement,
    destination: "contact_funnel",
  });
}
