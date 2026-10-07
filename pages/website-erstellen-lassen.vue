<template>
  <div class="page-shell">
    <MainHeader />
    <main id="main-content">
      <WebsiteLandingHero />
      <WebsiteProblemScopeSection />
      <WebsiteProjectsSection />
      <!-- TODO: Kundenstimmen wieder aktivieren, sobald echte Freigaben vorliegen
      <TestimonialsSection />
      -->
      <WebsiteProcessSection />
      <FirstConsultationSection />
      <WebsiteFaqSection />
      <WebsiteFinalCta />
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import FirstConsultationSection from "~/components/landing/FirstConsultationSection.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import MainHeader from "~/components/layout/MainHeader.vue";
// import TestimonialsSection from "~/components/landing/TestimonialsSection.vue";
import WebsiteFaqSection from "~/components/landing/WebsiteFaqSection.vue";
import WebsiteFinalCta from "~/components/landing/WebsiteFinalCta.vue";
import WebsiteLandingHero from "~/components/landing/WebsiteLandingHero.vue";
import WebsiteProblemScopeSection from "~/components/landing/WebsiteProblemScopeSection.vue";
import WebsiteProcessSection from "~/components/landing/WebsiteProcessSection.vue";
import WebsiteProjectsSection from "~/components/landing/WebsiteProjectsSection.vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useConsent } from "~/composables/useConsent";
import { usePageSeo } from "~/composables/usePageSeo";
import {
  DEFAULT_OG_IMAGE,
  portfolioJsonLd,
  websiteLandingSeo,
} from "~/data/seo";
import { createAnalyticsOnceTracker } from "~/utils/funnelTracking";
import { captureMarketingAttributionFromWindow } from "~/utils/marketingAttribution";
import { resolveSiteOrigin } from "~/utils/siteOrigin";

const requestURL = useRequestURL();
const config = useRuntimeConfig();
const { track } = useAnalytics();
const { hasStatisticsConsent, hasMarketingConsent } = useConsent();
const trackOnce = createAnalyticsOnceTracker(
  track,
  () => hasStatisticsConsent.value || hasMarketingConsent.value,
);

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

function tryTrackLandingView() {
  if (!import.meta.client) return;
  if (hasMarketingConsent.value) {
    captureMarketingAttributionFromWindow();
  }
  trackOnce("website_landing_view", "website_landing_view", {
    page_type: "website_landing",
  });
}

watch(
  [hasStatisticsConsent, hasMarketingConsent],
  () => {
    tryTrackLandingView();
  },
  { immediate: true },
);
</script>
