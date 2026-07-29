/**
 * Manual / browser verification checklist for consent UX.
 * Automated unit coverage lives in consentStorage.test.ts.
 *
 * [ ] Erstbesuch: Network tab shows no `/_vercel/insights/` and no `va.vercel-scripts.com` before consent
 * [ ] Alle ablehnen: still no analytics script; cookie portfolio_consent has statistics:false
 * [ ] Alle akzeptieren: analytics script loads; statistics:true in cookie
 * [ ] Individuelle Auswahl: only Statistics toggle controls analytics
 * [ ] Neuladen: selection persists; banner stays hidden
 * [ ] Widerruf via Datenschutzeinstellungen: analytics removed / page reload; no further optional requests
 * [ ] Consent-Version bump: banner appears again
 * [ ] Tastatur: Tab/Shift+Tab trap in settings modal; Escape closes; focus returns
 * [ ] Mobile: banner buttons usable; modal scrollable; privacy/imprint links reachable
 * [ ] Kontaktformular: submit still works without optional consent
 * [ ] Locale switch: still works without optional consent
 * [ ] Impressum & Datenschutz links usable while banner is open
 */
export {};
