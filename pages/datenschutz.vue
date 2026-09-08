<template>
  <div>
    <LegalHeader />
    <main class="pt-24 pb-14 md:pt-28 md:pb-20 min-h-screen">
      <div class="container mx-auto px-4 md:px-6">
        <article class="max-w-3xl mx-auto modern-section rounded-xl p-6 md:p-10 card-elevated">
          <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Datenschutzerklärung
          </h1>
          <p class="text-text-secondary text-sm mb-8">
            Website von Chris Leon Noltemeier · Stand: August 2026
          </p>

          <div class="space-y-6 text-text-primary">
            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">1. Verantwortliche Stelle</h2>
              <p class="text-text-secondary leading-relaxed">
                Verantwortlich für die Datenverarbeitung im Zusammenhang mit dieser Website ist:
              </p>
              <p class="text-text-secondary leading-relaxed font-medium text-text-primary mt-2">
                Chris Leon Noltemeier<br>
                Bad Essen, Deutschland<br>
                E-Mail: chris.noltemeier@gmail.com
              </p>
              <p class="text-text-secondary leading-relaxed mt-2 text-sm">
                Die vollständige Anschrift (Straße, Hausnummer, PLZ) wird hier ergänzt.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">2. Geltungsbereich</h2>
              <p class="text-text-secondary leading-relaxed">
                Diese Datenschutzerklärung gilt für die unter dieser Domain erreichbare Portfolio-Website
                (Präsentation beruflicher Profile und Projekte sowie das Kontaktformular). Sie gilt nicht
                automatisch für eigenständige Produkte Dritter oder andere Domains (z.&nbsp;B. verlinkte
                Projektwebsites), sofern dort eigene Hinweise gelten.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">3. Hosting</h2>
              <p class="text-text-secondary leading-relaxed mb-2">
                Die Website wird bei folgendem Anbieter gehostet:
              </p>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
                <li><strong class="text-text-primary">Zweck:</strong> Bereitstellung und Auslieferung der Website</li>
                <li><strong class="text-text-primary">Verarbeitete Daten:</strong> u.&nbsp;a. IP-Adresse, Zeitpunkt des Abrufs, angeforderte Datei/URL, User-Agent und vergleichbare Server-Log-Daten (soweit vom Hosting-Anbieter verarbeitet)</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an sicherem und effizientem Betrieb), Rechtsgrundlage und AVV/SCC durch Betreiber bestätigen</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> Angabe zur Log-Aufbewahrung bei Vercel folgt</li>
                <li><strong class="text-text-primary">Empfänger / Drittland:</strong> Vercel; mögliche Übermittlung in die USA, Angabe zum Transfermechanismus folgt</li>
              </ul>
              <p class="text-text-secondary leading-relaxed mt-2">
                Datenschutzhinweis des Anbieters:
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link"
                >https://vercel.com/legal/privacy-policy</a>
              </p>
            </section>

            <!-- CONSENT-DOCUMENTED TECHNOLOGIES -->
            <section class="rounded-lg border border-accent-400/30 bg-background-tertiary/30 p-4 md:p-5">
              <h2 class="text-xl font-semibold text-text-primary mb-2">
                4. Eingesetzte Technologien (Übersicht für Einwilligung und notwendige Funktionen)
              </h2>
              <p class="text-text-secondary leading-relaxed mb-4">
                Nachfolgend sind die tatsächlich in diesem Projekt eingesetzten Technologien dokumentiert.
                Optionale Dienste werden erst nach Ihrer Einwilligung geladen. Ihre Auswahl können Sie jederzeit
                über den Button „Datenschutzeinstellungen“ auf dieser Seite ändern.
              </p>

              <p class="mb-4">
                <button
                  type="button"
                  class="btn-secondary text-sm"
                  @click="onOpenConsentSettings"
                >
                  {{ messages.footer.consentSettings }}
                </button>
              </p>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.1 Spracheinstellung (notwendig)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> First-Party (diese Website)</li>
                <li><strong class="text-text-primary">Zweck:</strong> Speicherung der gewählten Sprache (Deutsch/Englisch)</li>
                <li><strong class="text-text-primary">Daten / Mechanismus:</strong> localStorage-Schlüssel <code class="text-accent-400">preferred_locale</code></li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO und §&nbsp;25 Abs.&nbsp;2 TDDDG (technisch erforderlich für die vom Nutzer gewünschte Darstellung), rechtlich bestätigen</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> bis zur Löschung durch den Nutzer oder Leeren des Browser-Speichers</li>
                <li><strong class="text-text-primary">Empfänger:</strong> keine Übermittlung an Dritte über diesen Speicher</li>
              </ul>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.2 Einwilligungsspeicher (notwendig)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> First-Party (diese Website)</li>
                <li><strong class="text-text-primary">Zweck:</strong> Speicherung Ihrer Consent-Entscheidung (Version, Zeitpunkt, Kategorien)</li>
                <li><strong class="text-text-primary">Daten / Mechanismus:</strong> First-Party-Cookie <code class="text-accent-400">portfolio_consent</code> (keine IP-Adresse, kein vollständiger User-Agent)</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;c / lit.&nbsp;f DSGVO und §&nbsp;25 Abs.&nbsp;2 TDDDG, rechtlich bestätigen</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> 12 Monate</li>
                <li><strong class="text-text-primary">Widerruf:</strong> über „Datenschutzeinstellungen“; danach erscheint der Hinweis erneut, sofern erforderlich</li>
              </ul>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.3 Vercel Web Analytics (optional, Statistik)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> Vercel Inc. (Kontaktdaten siehe Abschnitt 3)</li>
                <li><strong class="text-text-primary">Zweck:</strong> Reichweiten- und Nutzungsstatistik (z.&nbsp;B. Seitenaufrufe, benannte Events)</li>
                <li><strong class="text-text-primary">Verarbeitete Daten:</strong> technische Nutzungsinformationen (z.&nbsp;B. aufgerufene Pfade); Details siehe Vercel-Datenschutzhinweise, konkrete Datenkategorien anhand aktueller Vercel-Doku bestätigen</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Einwilligung nach Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO und §&nbsp;25 Abs.&nbsp;1 TDDDG</li>
                <li><strong class="text-text-primary">Speichermechanismus:</strong> Skript wird erst nach Zustimmung geladen (<code class="text-accent-400">/_vercel/insights/script.js</code> in Produktion)</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> Angabe zur Aufbewahrung bei Vercel folgt</li>
                <li><strong class="text-text-primary">Empfänger / Drittland:</strong> Vercel; mögliche USA-Übermittlung; Angabe folgt</li>
                <li><strong class="text-text-primary">Widerruf:</strong> jederzeit über „Datenschutzeinstellungen“ (Kategorie Statistik deaktivieren)</li>
              </ul>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.4 Google Analytics (optional, Statistik, nur bei konfigurierter ID)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> Google Ireland Limited (ggf. Google LLC, USA), genaue Vertragspartnerangabe folgt bei Aktivierung</li>
                <li><strong class="text-text-primary">Zweck:</strong> Webanalyse und Ereignismessung, sofern eine Measurement-ID gesetzt ist</li>
                <li><strong class="text-text-primary">Aktivierung:</strong> Nur nach Statistik-Einwilligung und nur, wenn eine ID in der Umgebung konfiguriert ist. Ohne ID wird kein Google-Skript geladen.</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Einwilligung (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO / §&nbsp;25 Abs.&nbsp;1 TDDDG), rechtliche Prüfung folgt bei Bedarf</li>
                <li><strong class="text-text-primary">Consent Mode:</strong> Technisch können Standard-Zustände „denied“ gesetzt werden; dies ersetzt keine Einwilligung über den Banner.</li>
                <li><strong class="text-text-primary">Speicher / Cookies / Speicherdauer:</strong> Angabe folgt bei Aktivierung laut aktueller Google-Dokumentation</li>
                <li><strong class="text-text-primary">Widerruf:</strong> über „Datenschutzeinstellungen“ (Statistik)</li>
              </ul>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.5 Google Ads / Meta Pixel (optional, Marketing, nur bei konfigurierten IDs)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> Google bzw. Meta, vollständige Anbieterangaben folgen bei produktiver Nutzung</li>
                <li><strong class="text-text-primary">Zweck:</strong> Conversion-Messung und ggf. Remarketing für bezahlte Werbung</li>
                <li><strong class="text-text-primary">Aktivierung:</strong> Nur nach Marketing-Einwilligung und nur bei gesetzten IDs. Ohne IDs werden keine Ads-/Pixel-Skripte geladen.</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Einwilligung, rechtliche Prüfung folgt bei Bedarf</li>
                <li><strong class="text-text-primary">Datenminimierung:</strong> Es werden keine Nachrichteninhalte, E-Mail-Adressen oder Telefonnummern aus Formularen an Werbeplattformen übermittelt.</li>
                <li><strong class="text-text-primary">Speicher / Cookies / Speicherdauer:</strong> nach Aktivierung dokumentieren</li>
                <li><strong class="text-text-primary">Widerruf:</strong> über „Datenschutzeinstellungen“ (Marketing)</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">5. Kontaktformular</h2>
              <p class="text-text-secondary leading-relaxed mb-2">
                Wenn Sie das Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten
                (Name, E-Mail-Adresse, optional Telefonnummer, Nachricht sowie technische Angaben zur
                Spam-Abwehr/Rate-Limiting auf dem Server) verarbeitet, um Ihre Anfrage zu beantworten.
              </p>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter (E-Mail-Versand):</strong> Resend (sofern konfiguriert) und/oder Formspree als Fallback</li>
                <li><strong class="text-text-primary">Zweck:</strong> Bearbeitung Ihrer Kontaktanfrage</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (vorvertragliche/anfragebezogene Kommunikation) bzw. lit.&nbsp;f, passende Rechtsgrundlage und Auftragsverarbeitung werden bei Bedarf ergänzt</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> Aufbewahrungsdauer der E-Mails/Anfragen wird festgelegt (z.&nbsp;B. bis Abschluss der Korrespondenz, gesetzliche Fristen)</li>
                <li><strong class="text-text-primary">Hinweis:</strong> Formulardaten werden nicht im Consent-Cookie und nicht dauerhaft im Browser gespeichert</li>
              </ul>
              <p class="text-text-secondary leading-relaxed mt-2 text-sm">
                Konkrete Anbieter-Links (Resend/Formspree Datenschutz) und AV-Verträge werden dokumentiert, sobald produktiv genutzt.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">6. Externe Links</h2>
              <p class="text-text-secondary leading-relaxed">
                Die Website enthält Links zu externen Angeboten (z.&nbsp;B. GitHub, LinkedIn). Beim Anklicken
                verlassen Sie diese Website; es gelten die Datenschutzhinweise der jeweiligen Anbieter.
                Optionale Marketing-Pixel (z.&nbsp;B. Meta) werden nur nach Marketing-Einwilligung und nur bei
                konfigurierter ID geladen (siehe Abschnitt 4.5).
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">7. Schriftarten</h2>
              <p class="text-text-secondary leading-relaxed">
                Es werden keine Schriftarten von Google Fonts oder anderen fremden Font-CDNs nachgeladen.
                Schriftarten werden lokal über gebündelte Dateien (Fontsource) bereitgestellt.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">8. Ihre Rechte</h2>
              <p class="text-text-secondary leading-relaxed mb-2">
                Sie haben unter den gesetzlichen Voraussetzungen u.&nbsp;a. das Recht auf:
              </p>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li>Auskunft (Art.&nbsp;15 DSGVO)</li>
                <li>Berichtigung (Art.&nbsp;16 DSGVO)</li>
                <li>Löschung (Art.&nbsp;17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art.&nbsp;18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art.&nbsp;20 DSGVO)</li>
                <li>Widerspruch (Art.&nbsp;21 DSGVO)</li>
                <li>Widerruf einer Einwilligung (Art.&nbsp;7 Abs.&nbsp;3 DSGVO)</li>
                <li>Beschwerde bei einer Aufsichtsbehörde (Art.&nbsp;77 DSGVO)</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">9. Änderungen</h2>
              <p class="text-text-secondary leading-relaxed">
                Diese Datenschutzerklärung kann angepasst werden, wenn sich Funktionen, eingesetzte Dienste
                oder die Rechtslage ändern. Die aktuelle Fassung finden Sie auf dieser Seite.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">10. Kontakt</h2>
              <p class="text-text-secondary leading-relaxed font-medium text-text-primary">
                Chris Leon Noltemeier<br>
                Bad Essen, Deutschland<br>
                E-Mail: chris.noltemeier@gmail.com
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import LegalHeader from "~/components/layout/LegalHeader.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import { usePageSeo } from "~/composables/usePageSeo";
import { useI18n } from "~/composables/useI18n";
import { useConsent } from "~/composables/useConsent";
import { privacySeo } from "~/data/seo";

const { messages } = useI18n();
const { openSettings } = useConsent();

function onOpenConsentSettings(event: MouseEvent) {
  openSettings(event.currentTarget as HTMLElement);
}

usePageSeo(() => ({
  title: privacySeo.title,
  description: privacySeo.description,
  path: "/datenschutz",
}));
</script>
