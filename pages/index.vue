<template>
  <div class="page-shell">
    <MainHeader />
    <main id="main-content">
      <HeroSection />
      <TrustStripSection />
      <ProjectReferencesSection />
      <ProjectsSection />
      <ServicesSection />
      <AboutSection />
      <ClosingCtaSection />
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/components/layout/MainHeader.vue";
import HeroSection from "~/components/sections/HeroSection.vue";
import TrustStripSection from "~/components/sections/TrustStripSection.vue";
import ServicesSection from "~/components/sections/ServicesSection.vue";
import ProjectsSection from "~/components/sections/ProjectsSection.vue";
import ProjectReferencesSection from "~/components/sections/ProjectReferencesSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import ClosingCtaSection from "~/components/sections/ClosingCtaSection.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import { usePageSeo } from "~/composables/usePageSeo";
import {
  DEFAULT_OG_IMAGE,
  homeSeo,
  portfolioJsonLd,
} from "~/data/seo";
import { resolveSiteOrigin } from "~/utils/siteOrigin";

const requestURL = useRequestURL();
const config = useRuntimeConfig();

const siteOrigin = computed(() => {
  const configured = String(config.public.siteUrl || "").trim();
  return resolveSiteOrigin(configured || requestURL.origin);
});

usePageSeo(() => ({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: portfolioJsonLd(siteOrigin.value, "/", homeSeo.title),
}));
</script>
