<template>
  <div>
    <LegalHeader />
    <main class="pt-24 pb-14 md:pt-28 md:pb-20 min-h-screen">
      <div class="container mx-auto px-4 md:px-6">
        <article class="max-w-3xl mx-auto modern-section rounded-xl p-6 md:p-10 card-elevated">
          <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Impressum
          </h1>
          <p class="text-text-secondary text-sm mb-8">
            Angaben gemäß § 5 TMG · Stand: Juli 2026
          </p>

          <div class="space-y-6 text-text-primary">
            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Diensteanbieter</h2>
              <p class="text-text-secondary leading-relaxed font-medium text-text-primary">
                Chris Leon Noltemeier<br>
                Bad Essen<br>
                Deutschland
              </p>
              <p class="text-text-secondary leading-relaxed mt-2 text-sm">
                Die vollständige ladungsfähige Anschrift (Straße, Hausnummer, PLZ Ort) wird hier ergänzt.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Kontakt</h2>
              <p class="text-text-secondary leading-relaxed">
                E-Mail:
                <a
                  href="mailto:chris.noltemeier@gmail.com"
                  class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
                >chris.noltemeier@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Verantwortlich für den Inhalt</h2>
              <p class="text-text-secondary leading-relaxed">
                Chris Leon Noltemeier (Anschrift wie oben)
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Haftung für Inhalte und Links</h2>
              <p class="text-text-secondary leading-relaxed">
                Hinweise zur Haftung für Inhalte und externe Links werden bei Bedarf rechtlich geprüft und hier ergänzt.
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
import { imprintSeo } from "~/data/seo";

usePageSeo(() => ({
  title: imprintSeo.title,
  description: imprintSeo.description,
  path: "/impressum",
}));
</script>
