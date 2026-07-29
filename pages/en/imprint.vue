<template>
  <div>
    <LegalHeader />
    <main class="pt-24 pb-14 md:pt-28 md:pb-20 min-h-screen">
      <div class="container mx-auto px-4 md:px-6">
        <article class="max-w-3xl mx-auto modern-section rounded-xl p-6 md:p-10 card-elevated">
          <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Legal notice
          </h1>
          <p class="text-text-secondary text-sm mb-8">
            Information according to § 5 TMG (Germany) · Last updated: July 2026
          </p>

          <div class="space-y-6 text-text-primary">
            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Service provider</h2>
              <p class="text-text-secondary leading-relaxed font-medium text-text-primary">
                Chris Leon Noltemeier<br>
                Bad Essen<br>
                Germany
              </p>
              <p class="text-text-secondary leading-relaxed mt-2 text-sm">
                TODO: Complete the serviceable postal address (street, number, ZIP, city) and have the
                imprint reviewed legally.
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Contact</h2>
              <p class="text-text-secondary leading-relaxed">
                Email:
                <a
                  href="mailto:chris.noltemeier@gmail.com"
                  class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
                >chris.noltemeier@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Responsible for content</h2>
              <p class="text-text-secondary leading-relaxed">
                Chris Leon Noltemeier (address as above)
              </p>
            </section>

            <section>
              <h2 class="text-xl font-semibold text-text-primary mb-2">Liability for content and links</h2>
              <p class="text-text-secondary leading-relaxed">
                TODO: Add standard liability notices for content and external links after legal review.
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
  htmlAttrs: { lang: "en" },
  title: "Legal notice – Chris Leon Noltemeier",
  meta: [
    {
      name: "description",
      content: "Legal notice (Impressum) for the portfolio website of Chris Leon Noltemeier.",
    },
  ],
});
</script>
