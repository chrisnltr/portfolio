<template>
  <div class="page-shell">
    <LandingHeader />
    <main id="main-content">
      <WebsiteLandingHero />

      <section
        class="website-landing-plan"
        aria-label="Geplante weitere Landingpage-Abschnitte"
      >
        <div class="container-page">
          <UiVisualPlaceholder
            type="section"
            badge="TEMPORÄRER SEITENABSCHNITT-PLATZHALTER"
            description="Die weiteren Bereiche der Landingpage werden in den nächsten Arbeitsschritten einzeln umgesetzt: Problemverständnis, Leistungsumfang, passende Website-Referenzen, Kundenstimmen, Zusammenarbeit, Ablauf, FAQ und Abschluss-CTA."
          />
        </div>
      </section>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import LandingHeader from "~/components/layout/LandingHeader.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import WebsiteLandingHero from "~/components/landing/WebsiteLandingHero.vue";
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
  padding-block: clamp(1.5rem, 4vw, 2.75rem) clamp(2.5rem, 6vw, 4rem);
}
</style>
