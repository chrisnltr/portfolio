<template>
  <div class="page-shell">
    <MainHeader />
    <main id="main-content">
      <WebsiteLandingHero />

      <section
        class="website-landing-plan website-landing-plan--compact"
        aria-label="Nächster Inhaltsabschnitt in Planung"
      >
        <div class="container-page">
          <UiVisualPlaceholder
            type="section"
            compact
            badge="NÄCHSTER INHALTSSCHRITT"
            title="Problemverständnis und konkreter Leistungsumfang"
            description="Hier folgen später die typischen Probleme veralteter oder fehlender Unternehmenswebsites sowie eine klare Übersicht darüber, was Chris bei Planung, Design, Technik und Livegang übernimmt."
          />
        </div>
      </section>

      <WebsiteProjectsSection />
      <TestimonialsSection />
      <WebsiteProcessSection />
      <FirstConsultationSection />

      <section
        class="website-landing-plan website-landing-plan--compact website-landing-plan--bottom"
        aria-label="Späterer Abschlussabschnitt in Planung"
      >
        <div class="container-page">
          <UiVisualPlaceholder
            type="section"
            compact
            badge="SPÄTERER ABSCHLUSS"
            title="FAQ und finale Abschluss-CTA"
            description="Hier folgen später Antworten zu Kosten, Dauer, Inhalten, Domain, Pflege und Zusammenarbeit sowie der abschließende Weg in den Erstgespräch-Funnel."
          />
        </div>
      </section>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import FirstConsultationSection from "~/components/landing/FirstConsultationSection.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import MainHeader from "~/components/layout/MainHeader.vue";
import TestimonialsSection from "~/components/landing/TestimonialsSection.vue";
import WebsiteLandingHero from "~/components/landing/WebsiteLandingHero.vue";
import WebsiteProcessSection from "~/components/landing/WebsiteProcessSection.vue";
import WebsiteProjectsSection from "~/components/landing/WebsiteProjectsSection.vue";
import UiVisualPlaceholder from "~/components/ui/VisualPlaceholder.vue";
import { usePageSeo } from "~/composables/usePageSeo";
import {
  DEFAULT_OG_IMAGE,
  portfolioJsonLd,
  websiteLandingSeo,
} from "~/data/seo";
import { resolveSiteOrigin } from "~/utils/siteOrigin";

const requestURL = useRequestURL();
const config = useRuntimeConfig();

const siteOrigin = computed(() => {
  const configured = String(config.public.siteUrl || "").trim();
  return resolveSiteOrigin(configured || requestURL.origin);
});

usePageSeo(() => ({
  title: websiteLandingSeo.title,
  description: websiteLandingSeo.description,
  path: "/website-erstellen-lassen",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: portfolioJsonLd(
    siteOrigin.value,
    "/website-erstellen-lassen",
    websiteLandingSeo.title,
  ),
}));
</script>

<style scoped>
.website-landing-plan {
  padding-block: clamp(1.25rem, 3vw, 2rem);
}

.website-landing-plan--bottom {
  padding-bottom: clamp(2.25rem, 5vw, 3.5rem);
}
</style>
