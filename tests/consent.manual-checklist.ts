/**
 * Manual / browser verification checklist for consent UX.
 * Automated unit coverage lives in consentStorage.test.ts and analyticsConfig.test.ts.
 *
 * [ ] Erstbesuch: Network tab shows no `/_vercel/insights/`, no `googletagmanager.com/gtag`, no `connect.facebook.net`
 * [ ] Without tracking env IDs: even after accept-all, no Google/Meta scripts load
 * [ ] Alle ablehnen: still no optional scripts; cookie has statistics:false, marketing:false
 * [ ] Alle akzeptieren: Vercel analytics may load; Google/Meta only if IDs set + matching category
 * [ ] Individuelle Auswahl: Statistics vs Marketing toggles independently
 * [ ] Neuladen: selection persists; banner stays hidden
 * [ ] Widerruf via Datenschutzeinstellungen: optional scripts removed / reload; no further optional requests
 * [ ] Consent-Version bump: banner appears again
 * [ ] Tastatur: Tab/Shift+Tab trap in settings modal; Escape closes; focus returns
 * [ ] Mobile: banner buttons usable; modal scrollable; privacy/imprint links reachable
 * [ ] Kontaktformular: submit still works without optional consent; thank-you only after success
 * [ ] Locale switch: still works without optional consent
 * [ ] Impressum & Datenschutz links usable while banner is open
 * [ ] Deep links (/projekte/..., legacy /de/... redirects) resolve on Vercel (Nuxt framework preset, no SPA rewrite)
 */
export {};
