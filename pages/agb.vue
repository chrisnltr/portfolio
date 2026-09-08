<template>
  <div>
    <LegalHeader />
    <main class="pt-24 pb-14 md:pt-28 md:pb-20 min-h-screen">
      <div class="container mx-auto px-4 md:px-6">
        <article class="max-w-3xl mx-auto modern-section rounded-xl p-6 md:p-10 card-elevated">
          <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-2">
            AGB
          </h1>
          <p class="text-text-secondary text-sm mb-8">
            Allgemeine Geschäftsbedingungen · Stand: August 2026
          </p>

          <div class="space-y-6 text-text-primary">
            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Geltungsbereich</h2>
              <p class="text-text-secondary leading-relaxed">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen
                Chris Leon Noltemeier (Bad Essen, Deutschland) und Auftraggebern über die
                Erstellung von Websites, Software und verwandte digitale Dienstleistungen,
                sofern nichts Abweichendes schriftlich vereinbart wurde.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Leistungen</h2>
              <p class="text-text-secondary leading-relaxed">
                Art, Umfang und Vergütung der Leistungen ergeben sich aus dem jeweiligen
                Angebot bzw. der Auftragsbestätigung. Änderungen und Erweiterungen bedürfen
                der gegenseitigen Abstimmung.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Vergütung und Zahlung</h2>
              <p class="text-text-secondary leading-relaxed">
                Rechnungen sind innerhalb der vereinbarten Frist ohne Abzug zahlbar.
                Bei Zahlungsverzug bleiben gesetzliche Verzugsrechte vorbehalten.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Mitwirkungspflichten</h2>
              <p class="text-text-secondary leading-relaxed">
                Der Auftraggeber stellt rechtzeitig alle für die Leistung erforderlichen
                Informationen, Inhalte und Freigaben bereit. Verzögerungen aus fehlender
                Mitwirkung können Termine und Kosten beeinflussen.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Nutzungsrechte</h2>
              <p class="text-text-secondary leading-relaxed">
                Nach vollständiger Zahlung erhält der Auftraggeber die vereinbarten
                Nutzungsrechte an den erstellten Arbeitsergebnissen. Vorbestehende Tools,
                Bibliotheken und Eigenentwicklungen bleiben beim Anbieter, soweit nicht
                anders geregelt.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Haftung</h2>
              <p class="text-text-secondary leading-relaxed">
                Die Haftung richtet sich nach den gesetzlichen Vorschriften. Für leichte
                Fahrlässigkeit wird die Haftung auf den vorhersehbaren, vertragstypischen
                Schaden begrenzt, soweit gesetzlich zulässig. Unberührt bleiben Ansprüche
                bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper
                oder Gesundheit.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Schlussbestimmungen</h2>
              <p class="text-text-secondary leading-relaxed">
                Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne
                Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen
                Bestimmungen unberührt. Gerichtsstand ist, soweit gesetzlich zulässig,
                der Sitz des Anbieters.
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
import { termsSeo } from "~/data/seo";

usePageSeo(() => ({
  title: termsSeo.title,
  description: termsSeo.description,
  path: "/agb",
}));
</script>
