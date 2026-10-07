# Google Ads Conversion Tracking (Lead / Projektanfrage)

Kurzreferenz für die Conversion nach erfolgreicher Erstgespräch-Anfrage.

## 1. Google-Ads-ID eintragen

Umgebungsvariable (öffentlich, Nuxt Runtime Config):

```text
NUXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
```

- Lokal: `.env` / `.env.local` (nicht committen)
- Produktion: Vercel → Project → Settings → Environment Variables
- Format: `AW-` gefolgt von der Conversion-ID aus Google Ads

Alias (ebenfalls unterstützt): `VITE_GOOGLE_ADS_ID`

## 2. Conversion-Label eintragen

```text
NUXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=<label-aus-google-ads>
```

Alias: `VITE_GOOGLE_ADS_CONVERSION_LABEL`

Beide Werte müssen gesetzt sein. Fehlt einer, wird **kein** Conversion-Event gesendet (Website bleibt stabil; in Development erscheint ggf. eine Warnung).

> Hinweis: Im Projekt heißt die Variable bewusst `NUXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` (nicht `*_LEAD_CONVERSION_LABEL`), weil diese Bezeichnung bereits in Config, Tests und Privacy-Audit verwendet wird.

## 3. Conversion-Aktion in Google Ads anlegen

1. Google Ads → **Ziele** → **Conversions** → neue Conversion-Aktion
2. Kategorie: **Lead** bzw. **Kontakt** / Anfrage
3. Quelle: Website
4. Event-Snippet / Tag: Google-Tag (`gtag`) – Conversion-ID und Label notieren
5. Die Werte in die beiden Env-Variablen oben übernehmen

## 4. Wann wird die Conversion ausgelöst?

Nur wenn **alle** Bedingungen gelten:

1. `POST /api/contact` hat die Anfrage erfolgreich angenommen
2. `ContactFunnel` feuert danach `contact_form_submit_success` und navigiert zu `/danke`
3. Besucher hat **Marketing**-Cookies akzeptiert
4. Ads-ID und Conversion-Label sind konfiguriert

Technischer Aufruf (clientseitig):

```js
gtag("event", "conversion", {
  send_to: "AW-<CONVERSION_ID>/<CONVERSION_LABEL>",
});
```

- **Kein** Auslösen beim Klick auf „Anfrage senden“
- **Kein** Auslösen bei API-Fehler
- **Kein** erneutes Auslösen nur durch Rendern von `/danke`
- **Kein** Mitsenden von Name, E-Mail, Telefon oder Nachricht
- Eine bewusst **neue** erfolgreiche Anfrage in derselben Sitzung zählt erneut

Codepfad:

- Formular: `components/contact/ContactFunnel.vue` (nach erfolgreichem `$fetch`)
- Analytics: `composables/useAnalytics.ts` → `dispatchPlatformEvent`
- Ads: `utils/optionalTracking.ts` → `trackLeadConversion()`

## 5. Tag-Laden und Consent

- Google-Tag lädt **nur clientseitig** und nur nach **Marketing**-Einwilligung (bzw. GA nach Statistik, gleiches `gtag.js` wenn konfiguriert).
- Consent Mode v2 Defaults: Storage-Flags zunächst `denied`.
- Einwilligung während der Sitzung → Tag wird ohne Reload initialisiert (`useConsent` → `syncOptionalTracking`).
- Script-ID `optional-gtag-js`: höchstens ein Script-Tag; Config nur einmal pro Sitzung (bis Widerruf/Reload).

## 6. Testen

1. Marketing-Cookies im Consent-Banner akzeptieren (sonst kein Tag / keine Conversion).
2. Env mit Test-ID und Label setzen, Dev-Server neu starten.
3. **Google Tag Assistant** (Chrome) bzw. Google Ads → Tools → **Conversions** → Diagnosestatus prüfen.
4. Erfolgreiche Anfrage nur mit **echten/sicheren** Testdaten oder Mock prüfen; keine erfundenen Kontaktdaten an die Produktions-API senden, wenn dadurch echte E-Mails entstehen.
5. Erwartetes Event: `conversion` mit `send_to = AW-…/…`
6. Ohne Marketing-Consent: kein `googletagmanager.com`-Tag, kein Conversion-Event.

Unit-Tests (ohne Netzwerk / ohne echte Anfrage): `tests/analyticsConfig.test.ts` (Conversion-Dispatch, kein PII im Ads-Payload).

## 7. Internes Analytics-Event

Zusätzlich (Vercel Analytics / GA bei Statistik-Consent): Eventname `contact_form_submit_success` mit höchstens nicht personenbezogenen Props, z. B. `project_type: "website"`, `location`, `service`. Das Google-Ads-Conversion-Payload bleibt auf `send_to` beschränkt.

Vollständiger Funnel (Landing → CTA → Steps → Submit): siehe [`website-landing-funnel-tracking.md`](./website-landing-funnel-tracking.md).

## 8. Enhanced Conversions

- Im Google-Ads-Konto kann „Enhanced Conversions“ aktiviert sein.
- Diese Codebasis sendet **bewusst keine** E-Mail-Adressen (auch nicht gehasht) und schreibt keine Formulardaten in `dataLayer` / `gtag`.
- Normale Website-Conversions mit `send_to` funktionieren auch **ohne** Enhanced Conversions.
- Empfehlung: Enhanced Conversions im Ads-Konto vorerst deaktivieren, bis eine bewusste rechtliche und technische Entscheidung getroffen wurde.

## 9. Verzögerte Verifizierung

Google Ads kann den Tag-Status („Inaktiv“ / „nicht verifiziert“) erst nach Stunden bis Tagen aktualisieren. Ein Klick auf eine eigene Live-Anzeige ist für den technischen Tag-Test nicht erforderlich; Test-UTMs auf der Landing-URL reichen für den Funnel-Check (siehe Funnel-Doku).
