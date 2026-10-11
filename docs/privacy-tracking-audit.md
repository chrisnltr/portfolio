# Technischer Datenschutz- und Tracking-Audit

**Projekt:** Chris Noltemeier Portfolio  
**Stand:** 5. Oktober 2026  
**Scope:** Lokale Production-Preview (`npm run build` + `npm run preview`)  
**Hinweis:** Keine Rechtsberatung. Unsichere Punkte sind mit `RECHTLICH PRÜFEN` markiert.

---

## Zusammenfassung

| Frage                                                | Ergebnis                                                                                             |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Consent-Banner technisch erforderlich?               | **Ja - bereits implementiert** (optional Statistik/Marketing; ohne Zustimmung keine optionalen Tags) |
| Aktive GA4 / Google Ads / Meta Pixel?                | **Nein** (IDs leer → keine Skripte)                                                                  |
| Aktive Vercel Analytics ohne Einwilligung?           | **Nein** (nur nach Statistik-Einwilligung)                                                           |
| Externe Requests ohne Einwilligung (lokal getestet)? | **Keine** (siehe Runtime-Probe)                                                                      |
| Cloudflare Turnstile                                 | **Nur im Funnel Schritt 3**, wenn `NUXT_PUBLIC_TURNSTILE_SITE_KEY` gesetzt ist                       |

---

## Audit-Tabelle

| Dienst                    | Anbieter             | Fundstelle                                                                                                | Status                                 | Zweck                              | Daten                                                                        | Cookies/Speicher                             | externe Übertragung                | Drittlandbezug                                               | Einwilligung erforderlich                                          | Blockierung vor Zustimmung                               | Datenschutzerklärung                                | Erforderliche Maßnahme                                        |
| ------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ | -------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| Hosting / Auslieferung    | Vercel Inc.          | `nuxt.config.ts`, `pages/datenschutz.vue` §3                                                              | aktiv                                  | Bereitstellung der Website         | Server-Log-Daten (IP, User-Agent, URL, Zeit)                                 | Server-seitig bei Vercel                     | `*.vercel.app` / Produktionsdomain | USA - **RECHTLICH PRÜFEN** (Transfergrundlage dokumentieren) | vermutlich berechtigtes Interesse / Vertrag - **RECHTLICH PRÜFEN** | n/a (Hosting)                                            | enthalten (§3, unvollständig)                       | Konkrete Log-Aufbewahrung und AV-Vertrag dokumentieren        |
| Consent-Speicher          | First-Party          | `utils/consentStorage.ts`, `types/consent.ts`                                                             | aktiv                                  | Merken der Banner-Entscheidung     | JSON: Version, Zeitstempel, Kategorien                                       | Cookie `portfolio_consent`, 12 Monate        | keine                              | nein                                                         | **RECHTLICH PRÜFEN** (technisch notwendig für Consent-Management)  | n/a                                                      | enthalten (§4.1)                                    | Footer-Link „Datenschutzeinstellungen“ ergänzt (Step 3)       |
| Vercel Web Analytics      | Vercel Inc.          | `composables/useConsent.ts`, `@vercel/analytics`                                                          | vorbereitet / nur nach Opt-in          | Nutzungsstatistik, benannte Events | Seitenpfad, Event-Metadaten (keine Formular-PII)                             | Skript `/_vercel/insights/script.js` (Prod.) | `va.vercel-scripts.com`, Vercel    | USA - **RECHTLICH PRÜFEN**                                   | ja (Statistik)                                                     | **blockiert** bis Statistik-Einwilligung                 | enthalten (§4.3)                                    | Auf Vercel-Produktion mit Einwilligung erneut verifizieren    |
| Google Analytics (GA4)    | Google               | `utils/optionalTracking.ts`, `utils/analyticsConfig.ts`, `nuxt.config.ts` `NUXT_PUBLIC_GA_MEASUREMENT_ID` | vorbereitet, **nicht aktiv** (ID leer) | Webanalyse                         | -                                                                            | - bei leerer ID                              | `googletagmanager.com`             | ggf. USA - **RECHTLICH PRÜFEN**                              | ja                                                                 | **blockiert** (Skript wird nicht geladen)                | enthalten (§4.4, bedingt)                           | Measurement-ID setzen + Consent Mode + DPA                    |
| Google Ads Conversion     | Google               | `utils/optionalTracking.ts`, `NUXT_PUBLIC_GOOGLE_ADS_ID`, `NUXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`       | vorbereitet, **nicht aktiv**           | Conversion-Messung                 | -                                                                            | - bei leerer ID                              | `googletagmanager.com`             | ggf. USA - **RECHTLICH PRÜFEN**                              | ja (Marketing)                                                     | **blockiert**                                            | enthalten (§4.5, bedingt)                           | Ads-ID + Label + Consent vor Werbestart                       |
| Meta Pixel                | Meta                 | `utils/optionalTracking.ts`, `NUXT_PUBLIC_META_PIXEL_ID`                                                  | vorbereitet, **nicht aktiv**           | Marketing-Events                   | -                                                                            | - bei leerer ID                              | `connect.facebook.net`             | ggf. USA - **RECHTLICH PRÜFEN**                              | ja (Marketing)                                                     | **blockiert**                                            | enthalten (§4.5, bedingt)                           | Pixel-ID nur bei Bedarf + AV                                  |
| Google Consent Mode v2    | Google (Stub)        | `utils/optionalTracking.ts` `initGoogleConsentDefaults()`                                                 | vorbereitet                            | Default `denied` für Storage-Flags | Keine Übertragung ohne geladene Tags                                         | gtag-Stub lokal                              | nur bei aktivierten IDs            | -                                                            | ergänzt Einwilligung, ersetzt sie nicht                            | Defaults denied                                          | erwähnt (§4.4)                                      | Erst bei gesetzten Google-IDs aktivieren                      |
| Kontaktformular / API     | First-Party + Resend | `server/api/contact.post.ts`, `components/contact/ContactFunnel.vue`                                      | aktiv (wenn Env gesetzt)               | Bearbeitung Anfragen               | Name, E-Mail, Tel. (opt.), Bedarf, Budget, Nachricht (opt.), IP (Rate-Limit) | kein Browser-Persist                         | Resend API; Turnstile verify       | Resend: **RECHTLICH PRÜFEN**; Turnstile: Cloudflare          | **RECHTLICH PRÜFEN** (Vertrag/Anfrage)                             | n/a                                                      | teilweise (§5)                                      | AV-Vertrag Resend, Speicherdauer, tatsächlicher Versanddienst |
| Cloudflare Turnstile      | Cloudflare Inc.      | `utils/turnstile.ts`, `components/contact/TurnstileWidget.vue`, `server/api/contact.post.ts`              | aktiv **nur mit Site Key**             | Spam-Schutz                        | Token, ggf. IP an Cloudflare                                                 | Widget-Skript                                | `challenges.cloudflare.com`        | **RECHTLICH PRÜFEN**                                         | **RECHTLICH PRÜFEN** (notwendig vs. Einwilligung)                  | lädt im Formular Schritt 3 unabhängig vom Consent-Banner | **fehlt explizit** (nur generisch „Spam-Abwehr“ §5) | Turnstile in Datenschutzerklärung ergänzen nach Freigabe      |
| Schriftarten (Fontsource) | Self-hosted          | `nuxt.config.ts` css, `@fontsource-variable/*`                                                            | aktiv                                  | Typografie                         | keine Drittanfrage                                                           | lokal gebündelt                              | keine                              | nein                                                         | nein                                                               | n/a                                                      | enthalten (§7)                                      | -                                                             |
| Externe Profil-Links      | GitHub, LinkedIn     | `data/profile.ts`                                                                                         | Links only                             | Navigation                         | erst beim Klick                                                              | -                                            | github.com, linkedin.com           | ja (Anbieter)                                                | nein (Link)                                                        | n/a                                                      | enthalten (§6)                                      | -                                                             |
| Rate-Limiting (In-Memory) | First-Party          | `server/api/contact.post.ts`                                                                              | aktiv                                  | Missbrauchsschutz                  | IP, Zähler                                                                   | Server-RAM, 5 Min. Fenster                   | keine                              | nein                                                         | vermutlich berechtigtes Interesse - **RECHTLICH PRÜFEN**           | n/a                                                      | nicht explizit                                      | optional in Datenschutz ergänzen                              |

**Nicht gefunden:** Google Tag Manager (Container), TikTok Pixel, LinkedIn Insight Tag, Microsoft Clarity, Hotjar, Matomo, Plausible, Sentry, YouTube/Vimeo-Einbettungen, Google Maps, Calendly, Newsletter-Dienste, Formspree (nur als möglicher Fallback in Datenschutztext erwähnt, **Code nutzt ausschließlich Resend**).

---

## Runtime-Netzwerkprüfung (Production-Preview)

Getestete Zustände (`tmp/mobile-qa.mjs`, Viewport 375×812):

| Zustand                                                               | Externe Requests (nicht First-Party) |
| --------------------------------------------------------------------- | ------------------------------------ |
| Frischer Kontext, Banner sichtbar                                     | **Keine**                            |
| Nach „Nur notwendige“ + Reload                                        | **Keine**                            |
| Nach „Alle akzeptieren“ + Reload (ohne konfigurierte GA/Ads/Meta-IDs) | **Keine**                            |

**Hinweis:** Vercel Analytics-Skript wird nach Statistik-Einwilligung injiziert; in lokaler Preview ohne Vercel-Insights-Endpunkt wurden dennoch keine externen Domains beobachtet. Auf Vercel-Produktion erneut prüfen.

---

## Cookies und Browser-Speicher

| Name / Mechanismus                                    | Typ                | Inhalt                                     | Dauer     | Zweck                                                         |
| ----------------------------------------------------- | ------------------ | ------------------------------------------ | --------- | ------------------------------------------------------------- |
| `portfolio_consent`                                   | First-Party-Cookie | Consent-JSON (Version, Zeit, Kategorien)   | 12 Monate | Einwilligungsspeicher                                         |
| `sessionStorage` `portfolio_marketing_attribution_v1` | First-Party        | Allowlisted Ads/UTM First-Touch (kein PII) | Sitzung   | Nur nach Marketing-Consent geschrieben; bei Widerruf gelöscht |
| `localStorage`                                        | -                  | **nicht verwendet**                        | -         | -                                                             |
| IndexedDB                                             | -                  | **nicht verwendet**                        | -         | -                                                             |

---

## Consent-System (Ist-Zustand)

- **Komponenten:** `ConsentBanner.vue`, `ConsentSettingsModal.vue`, `ConsentRoot.vue`
- **Kategorien:** Notwendig (fix), Statistik, Marketing - standardmäßig **aus**
- **Buttons:** „Alle akzeptieren“, „Nur notwendige“, „Einstellungen“
- **Widerruf:** Datenschutzseite + neu: Footer-Link „Datenschutzeinstellungen“
- **Technik:** Google/Meta-Skripte und Vercel Analytics erst nach Opt-in; Widerruf entfernt Skripte und lädt Seite neu

### Entscheidung Banner-Pflicht

**Fall B-Variante:** Einwilligungspflichtige optionale Dienste sind **vorbereitet** (Vercel Analytics, GA, Ads, Meta). Das Consent-Banner ist **bereits erforderlich und korrekt implementiert**, damit optionale Dienste nicht ohne Entscheidung laden.

---

## Abweichungen Datenschutzerklärung ↔ Technik

| Thema                | Abweichung                                                              | Maßnahme                                                                                    |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Formularanbieter     | Text nennt „Resend und/oder Formspree“ - **Code: nur Resend**           | Formspree aus Text entfernen nach Freigabe; Resend produktiv bestätigen                     |
| Cloudflare Turnstile | Aktiv bei gesetztem Site Key, **nicht eigenständig in §4 dokumentiert** | Abschnitt ergänzen nach Freigabe                                                            |
| Hosting-Details      | Platzhalter „vom Betreiber festzulegen“                                 | Organisatorisch vervollständigen                                                            |
| Formular-Checkbox    | Text: „Einverstanden mit Verarbeitung … zur Bearbeitung der Anfrage“    | **RECHTLICH PRÜFEN:** Einwilligung vs. vorvertragliche Kommunikation (Art. 6 Abs. 1 lit. b) |
| GA/Ads/Meta          | Deklariert als optional - **stimmt** (IDs leer)                         | IDs erst nach Freigabe setzen                                                               |

---

## Formular-Datenschutzcheckbox

- **Technisch:** Pflicht-Checkbox Schritt 3 (`privacyAccepted`), Validierung vor Submit
- **Text (DE):** „Ich habe die Datenschutzerklärung gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage einverstanden.“
- **Status:** **RECHTLICH PRÜFEN** - sprachlich klingt nach Einwilligung; für klassische Kontaktanfragen oft vorvertragliche Kommunikation diskutiert. Keine eigenständige Rechtsänderung in Step 3.

---

## Spam-Schutz (unverändert)

- Honeypot-Feld, serverseitiges Rate-Limiting (IP, 5 Anfragen / 5 Min.)
- Cloudflare Turnstile (client + server verify), nur wenn Keys konfiguriert
- Kein Umbau in Step 3

---

## Vorbereitung Google Ads + GA4 (noch ohne IDs)

Siehe auch die operative Anleitung: [`docs/google-ads-conversion-tracking.md`](./google-ads-conversion-tracking.md).

### Environment-Variablen (öffentlich, leer lassen bis Freigabe)

```
NUXT_PUBLIC_GA_MEASUREMENT_ID=
NUXT_PUBLIC_GOOGLE_ADS_ID=
NUXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
NUXT_PUBLIC_META_PIXEL_ID=
```

Optional Consent-Version bei Policy-Änderung: `CONSENT_VERSION` in `types/consent.ts` (aktuell `"2"`).

### Integrationspunkte (bereits vorhanden)

| Punkt                       | Datei                                                      |
| --------------------------- | ---------------------------------------------------------- |
| ID-Lesen                    | `utils/analyticsConfig.ts`                                 |
| Consent Mode default denied | `utils/optionalTracking.ts`                                |
| Lazy Tag-Load               | `composables/useConsent.ts` → `syncOptionalTracking()`     |
| Event-Dispatch              | `composables/useAnalytics.ts`, `utils/optionalTracking.ts` |
| Lead-Conversion             | `utils/optionalTracking.ts` → `trackLeadConversion()`      |

### Funnel-Events (implementiert)

Siehe [`website-landing-funnel-tracking.md`](./website-landing-funnel-tracking.md).

| Event-Name                                                  | Auslöser                                        |
| ----------------------------------------------------------- | ----------------------------------------------- |
| `website_landing_view`                                      | Landing nach Statistik- oder Marketing-Consent  |
| `website_cta_click`                                         | Kontakt-CTA auf der Website-Landing             |
| `contact_funnel_start`                                      | Funnel mit `projekt=website`                    |
| `contact_funnel_step_view` / `contact_funnel_step_complete` | Schritt ansehen / abschließen                   |
| `contact_form_submit_attempt`                               | Validierung ok, API startet                     |
| `contact_form_submit_success`                               | **Nur nach serverseitigem Erfolg**              |
| `contact_form_submit_error`                                 | Validierung oder API-Fehler (`error_type` Enum) |

Legacy: `contact_form_start` (Fokus Formular Schritt 3), Homepage-`cta_click` unverändert.

Keine Formular-PII in Analytics-Props (`sanitizeAnalyticsProps`; `step_name` ist erlaubt).

---

## VOR DEM WERBESTART NOCH ZU ERLEDIGEN

1. GA4 Measurement-ID, Google Ads Conversion-ID/Label (und ggf. Meta Pixel) in Vercel Env setzen
2. Consent-Flow auf **Produktions-Vercel** mit echten Skripten testen
3. Datenschutzerklärung: Turnstile, Resend-only, Speicherdauern, AV-Verträge
4. **RECHTLICH PRÜFEN:** Rechtsgrundlage Kontaktformular-Checkbox
5. **RECHTLICH PRÜFEN:** Vercel/Resend/Cloudflare Drittland & Auftragsverarbeitung
6. GA4 Measurement-ID `G-XXXXXXXXXX` in Vercel setzen, wenn Funnel-Exploration in GA4 gewünscht ist
7. Enhanced Conversions im Google-Ads-Konto prüfen / ggf. deaktivieren
8. Nach Deploy: Tag Assistant, GA4 DebugView, Ads-Diagnose (siehe Funnel-Doku)
9. Kein Deploy aus dieser Tracking-Aufgabe - Veröffentlichung separat planen

---

## QA-Artefakte (Step 3)

- Screenshots: `tmp/qa-screenshots/` (gitignored)
- Layout-Report: `tmp/qa-mobile-report.json`
- Lighthouse: `tmp/lighthouse-landing-desktop.json`, `tmp/lighthouse-landing-mobile.json`
- QA-Skript: `tmp/mobile-qa.mjs` (Playwright, gegen Preview)
