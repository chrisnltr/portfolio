export const funnelNeedOptions = [
  "website",
  "shop",
  "software",
  "other",
] as const;

export const funnelBudgetOptions = [
  "under15",
  "15to3",
  "3to6",
  "over6",
  "unsure",
] as const;

export type FunnelNeedId = (typeof funnelNeedOptions)[number];
export type FunnelBudgetId = (typeof funnelBudgetOptions)[number];

/** Need → Budget → Contact */
export const FUNNEL_TOTAL_STEPS = 3;
