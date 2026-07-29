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
            Website-Portfolio von Chris Leon Noltemeier · Stand: Juli 2026
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
                TODO: Anschrift (Straße, Hausnummer, PLZ) vollständig ergänzen und rechtlich prüfen lassen.
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
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO (berechtigtes Interesse an sicherem und effizientem Betrieb) – TODO: Rechtsgrundlage und AVV/SCC durch Betreiber bestätigen</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> TODO: aktuelle Log-Aufbewahrung bei Vercel prüfen</li>
                <li><strong class="text-text-primary">Empfänger / Drittland:</strong> Vercel; mögliche Übermittlung in die USA – TODO: Transfermechanismus prüfen</li>
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
                über „Datenschutzeinstellungen“ im Footer ändern.
              </p>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.1 Spracheinstellung (notwendig)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> First-Party (diese Website)</li>
                <li><strong class="text-text-primary">Zweck:</strong> Speicherung der gewählten Sprache (Deutsch/Englisch)</li>
                <li><strong class="text-text-primary">Daten / Mechanismus:</strong> localStorage-Schlüssel <code class="text-accent-400">preferred_locale</code></li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO und §&nbsp;25 Abs.&nbsp;2 TDDDG (technisch erforderlich für die vom Nutzer gewünschte Darstellung) – TODO: rechtlich bestätigen</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> bis zur Löschung durch den Nutzer oder Leeren des Browser-Speichers</li>
                <li><strong class="text-text-primary">Empfänger:</strong> keine Übermittlung an Dritte über diesen Speicher</li>
              </ul>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.2 Einwilligungsspeicher (notwendig)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> First-Party (diese Website)</li>
                <li><strong class="text-text-primary">Zweck:</strong> Speicherung Ihrer Consent-Entscheidung (Version, Zeitpunkt, Kategorien)</li>
                <li><strong class="text-text-primary">Daten / Mechanismus:</strong> First-Party-Cookie <code class="text-accent-400">portfolio_consent</code> (keine IP-Adresse, kein vollständiger User-Agent)</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;c / lit.&nbsp;f DSGVO und §&nbsp;25 Abs.&nbsp;2 TDDDG – TODO: rechtlich bestätigen</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> 12 Monate</li>
                <li><strong class="text-text-primary">Widerruf:</strong> über „Datenschutzeinstellungen“; danach erscheint der Hinweis erneut, sofern erforderlich</li>
              </ul>

              <h3 class="text-lg font-semibold text-text-primary mt-4 mb-2">4.3 Vercel Web Analytics (optional – Statistik)</h3>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter:</strong> Vercel Inc. (Kontaktdaten siehe Abschnitt 3)</li>
                <li><strong class="text-text-primary">Zweck:</strong> Reichweiten- und Nutzungsstatistik (z.&nbsp;B. Seitenaufrufe)</li>
                <li><strong class="text-text-primary">Verarbeitete Daten:</strong> technische Nutzungsinformationen (z.&nbsp;B. aufgerufene Pfade); Details siehe Vercel-Datenschutzhinweise – TODO: konkrete Datenkategorien anhand aktueller Vercel-Doku bestätigen</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Einwilligung nach Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO und §&nbsp;25 Abs.&nbsp;1 TDDDG</li>
                <li><strong class="text-text-primary">Speichermechanismus:</strong> Skript wird erst nach Zustimmung geladen (<code class="text-accent-400">/_vercel/insights/script.js</code> in Produktion)</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> TODO: Aufbewahrung bei Vercel ergänzen</li>
                <li><strong class="text-text-primary">Empfänger / Drittland:</strong> Vercel; mögliche USA-Übermittlung – TODO: prüfen</li>
                <li><strong class="text-text-primary">Widerruf:</strong> jederzeit über „Datenschutzeinstellungen“ (Kategorie Statistik deaktivieren)</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">5. Kontaktformular</h2>
              <p class="text-text-secondary leading-relaxed mb-2">
                Wenn Sie das Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten
                (Name, E-Mail-Adresse, optional Betreff, Nachricht sowie technische Angaben zur
                Spam-Abwehr/Rate-Limiting auf dem Server) verarbeitet, um Ihre Anfrage zu beantworten.
              </p>
              <ul class="list-disc list-inside text-text-secondary space-y-1 ml-2">
                <li><strong class="text-text-primary">Anbieter (E-Mail-Versand):</strong> Resend (sofern konfiguriert) und/oder Formspree als Fallback</li>
                <li><strong class="text-text-primary">Zweck:</strong> Bearbeitung Ihrer Kontaktanfrage</li>
                <li><strong class="text-text-primary">Rechtsgrundlage:</strong> Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO (vorvertragliche/anfragebezogene Kommunikation) bzw. lit.&nbsp;f – TODO: passende Rechtsgrundlage und Auftragsverarbeitung prüfen</li>
                <li><strong class="text-text-primary">Speicherdauer:</strong> TODO: Aufbewahrung der E-Mails/Anfragen festlegen (z.&nbsp;B. bis Abschluss der Korrespondenz, gesetzliche Fristen)</li>
                <li><strong class="text-text-primary">Hinweis:</strong> Formulardaten werden nicht im Consent-Cookie und nicht dauerhaft im Browser gespeichert</li>
              </ul>
              <p class="text-text-secondary leading-relaxed mt-2 text-sm">
                TODO: Konkrete Anbieter-Links (Resend/Formspree Datenschutz) und AV-Verträge dokumentieren, sobald produktiv genutzt.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">6. Externe Links</h2>
              <p class="text-text-secondary leading-relaxed">
                Die Website enthält Links zu externen Angeboten (z.&nbsp;B. GitHub, LinkedIn). Beim Anklicken
                verlassen Sie diese Website; es gelten die Datenschutzhinweise der jeweiligen Anbieter.
                Es werden keine Social-Media-Plugins oder Tracking-Pixel dieser Anbieter auf dieser Website eingebunden.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">7. Schriftarten</h2>
              <p class="text-text-secondary leading-relaxed">
                Es werden keine Schriftarten von Google Fonts oder anderen fremden Font-CDNs nachgeladen.
                Die Darstellung erfolgt über lokal verfügbare bzw. System-Schriftarten (CSS-Font-Stack).
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
useHead({
  htmlAttrs: { lang: "de" },
  title: "Datenschutzerklärung – Chris Leon Noltemeier",
  meta: [
    {
      name: "description",
      content:
        "Datenschutzerklärung der Portfolio-Website: Hosting, notwendige Technologien, optionale Statistik (Vercel Analytics) und Kontaktformular.",
    },
  ],
});
</script>
