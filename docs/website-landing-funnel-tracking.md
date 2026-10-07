# Website-Landing & Kontakt-Funnel Tracking

Operative Dokumentation für die Google-Ads-Landingpage `/website-erstellen-lassen` und den Funnel `/kontakt?projekt=website`.

Ergänzt: [`google-ads-conversion-tracking.md`](./google-ads-conversion-tracking.md), [`privacy-tracking-audit.md`](./privacy-tracking-audit.md).

---

## 1. Events

| Event | Wann | Erlaubte Parameter |
|---|---|---|
| `website_landing_view` | Landingpage sichtbar **und** Statistik- oder Marketing-Consent | `page_type: "website_landing"` (+ optional First-Touch-Attribution bei Marketing-Consent) |
| `website_cta_click` | Klick auf Kontakt-CTA der Landingpage | `cta_placement`, `destination: "contact_funnel"` |
| `contact_funnel_start` | Funnel `/kontakt?projekt=website` gestartet (einmal pro Mount) | `project_type: "website"` |
| `contact_funnel_step_view` | Schritt wird angezeigt (einmal pro Schritt / Mount) | `project_type`, `step_number`, `step_name` |
| `contact_funnel_step_complete` | Schritt erfolgreich abgeschlossen („Weiter“ bzw. Submit-Validierung ok) | wie Step-View; bei Budget optional `budget_band` |
| `contact_form_submit_attempt` | Client-Validierung ok, API-Request startet | `project_type: "website"` |
| `contact_form_submit_success` | `POST /api/contact` erfolgreich | `project_type: "website"` (+ Attribution bei Marketing-Consent) |
| `contact_form_submit_error` | Validierungs- oder API-Fehler | `project_type`, `error_type` |

### `cta_placement`

`hero` | `projects` | `process` | `pricing` | `final` | `unknown`

- Hero-CTA → `hero`
- Erstgespräch-/Preisblock → `pricing`
- Final-CTA → `final`
- FAQ / Header-Nav → `unknown`
- Projekte-/Ablauf-Sektionen haben derzeit keinen Kontakt-CTA

Keine Button-Labels oder Freitexte als Parameter.

### `step_name` (technisch, fest)

| `step_number` | `step_name` |
|---|---|
| 1 | `needs` |
| 2 | `budget` |
| 3 | `details` |

### `budget_band` (nur nach Budget-Schritt)

`under_1500` | `1500_3000` | `3000_6000` | `over_6000` | `open`

### `error_type`

`validation` | `network` | `server` | `captcha` | `unknown`

Keine Fehlermeldungen, Server-Bodies oder Formularfelder.

---

## 2. Abbruchraten (ohne `funnel_abandon`)

Es gibt **kein** `beforeunload`-Abbruch-Event. Abbrüche ergeben sich aus Funnel-Exploration in GA4:

Empfohlene Schritte (Exploration → Funnel):

1. `website_landing_view`
2. `website_cta_click`
3. `contact_funnel_start`
4. `contact_funnel_step_view` (step_number = 1) / optional Complete
5. Step 2 View / Complete
6. Step 3 View
7. `contact_form_submit_attempt`
8. `contact_form_submit_success`

Drop-off zwischen aufeinanderfolgenden Schritten = Abbruchrate.

---

## 3. Doppelte Events vermeiden

- `createAnalyticsOnceTracker` markiert Keys einmal pro Komponenten-Mount.
- Ohne Consent wird der Key **nicht** gesetzt → nach Opt-in kann das Event noch einmal feuern.
- Echter erneuter Seitenbesuch remountet die Komponente → zählt erneut.
- Zurück-Navigation im Funnel feuert Step-View/Complete nicht erneut (gleiche Mount-Session).
- Ads-Conversion: nur nach API-Erfolg; `loading` + `conversionFired` verhindern Doppelklick-Doppel-Conversion.
- `/danke` löst **keine** Conversion aus (kein Tracking auf der Danke-Seite).

---

## 4. Attribution (Marketing-Consent)

Nach Marketing-Consent (First-Touch, `sessionStorage`):

- `gclid`, `gbraid`, `wbraid`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `initial_landing_path`, `initial_referrer_host` (nur Host, keine volle Referrer-URL)

Regeln:

- Nur allowlisted Keys, bereinigt/längenbegrenzt
- First-Touch wird in derselben Sitzung nicht überschrieben
- Landing → `/kontakt` behält Ads/UTM-Query-Parameter in den Kontakt-Links
- Widerruf von Marketing löscht den Attribution-Speicher
- Google Tag mit Auto-Tagging übernimmt `gclid` zusätzlich selbst (Cookies), sobald das Tag nach Consent geladen ist — **keine** parallele zweite Conversion-Logik

---

## 5. Google Ads Conversion

- `send_to`: `AW-18143702036/DRh7CMf3tpMdEJTYy8tD` (aus Env)
- Payload: **nur** `{ send_to }` — keine Enhanced Conversions / keine E-Mail
- Nur nach erfolgreichem API-Response + Marketing-Consent + konfigurierten IDs
- Status „Inaktiv / nicht verifiziert“ in Google Ads kann Stunden bis Tage brauchen
- Kein Klick auf eine echte Anzeige nötig zum Tag-Test

### Enhanced Conversions

Im Ads-Konto ggf. aktiv, im Code **nicht** implementiert (bewusst keine gehashten PII).  
Empfehlung: Enhanced Conversions im Konto vorerst deaktivieren, bis rechtlich/technisch entschieden.

### Consent Mode v2

Bereits implementiert (`initGoogleConsentDefaults` / `updateGoogleConsent`):

Default vor Opt-in:

```ts
{
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied"
}
```

---

## 6. GA4

- Runtime: `NUXT_PUBLIC_GA_MEASUREMENT_ID` (Format `G-XXXXXXXXXX`)
- Alias: `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- **Derzeit keine GA4-ID im Repo gesetzt** — Funnel-Events laufen über dieselbe `gtag`-Integration, sobald eine ID + Statistik-Consent vorhanden sind
- Ohne ID: App bleibt fehlerfrei; Vercel Analytics weiter nach Statistik-Consent
- Kein zweites Google-Script

---

## 7. Manuelles Testen (ohne Produktions-Anfrage)

### Test-URL

```text
https://chrisnoltemeier.de/website-erstellen-lassen?utm_source=google&utm_medium=cpc&utm_campaign=tracking_test&utm_content=manual_test
```

### Tag Assistant

1. Marketing (+ ggf. Statistik) im Banner akzeptieren
2. Chrome-Extension **Google Tag Assistant** / Tag Assistant Companion
3. Landing öffnen → `gtag/js` einmal laden prüfen
4. Funnel durchlaufen — für Conversion **keine** echte Prod-Mail auslösen; lokal mit Mock/Dev oder Conversion nur bis vor Submit prüfen

### GA4 DebugView

1. Statistik-Consent + gesetzte `G-…` ID
2. [GA4 DebugView](https://support.google.com/analytics/answer/7201382)
3. Events `website_landing_view`, Funnel-Steps, Submit prüfen

### Netzwerk-Tab

Filter z. B. `google` / `collect` / `g/collect` / `pagead`:

- Consent verweigert → keine `googletagmanager.com/gtag/js`-Requests
- Nach Opt-in → Script + ggf. collect
- Conversion → Request mit `send_to` / Conversion-Hit nach erfolgreichem Submit

### Google Ads

Conversions → „Lead-Formular senden“ → Diagnosestatus. Verifizierung kann verzögert sein.
