<template>
  <div>
    <MainHeader />
    <main class="min-h-full overflow-x-hidden" id="main-content">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ProjectReferencesSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <MainFooter />
    </main>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/components/layout/MainHeader.vue";
import HeroSection from "~/components/sections/HeroSection.vue";
import ServicesSection from "~/components/sections/ServicesSection.vue";
import ProjectsSection from "~/components/sections/ProjectsSection.vue";
import ProjectReferencesSection from "~/components/sections/ProjectReferencesSection.vue";
import ProcessSection from "~/components/sections/ProcessSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import ContactSection from "~/components/sections/ContactSection.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import { usePageSeo } from "~/composables/usePageSeo";
import {
  DEFAULT_OG_IMAGE,
  homeSeo,
  personJsonLd,
  professionalServiceJsonLd,
} from "~/data/seo";

const requestURL = useRequestURL();
const config = useRuntimeConfig();

const siteOrigin = computed(() => {
  const configured = String(config.public.siteUrl || "").replace(/\/$/, "");
  return configured || requestURL.origin;
});

usePageSeo(() => ({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: [
    personJsonLd(siteOrigin.value),
    professionalServiceJsonLd(siteOrigin.value),
  ],
}));
</script>
