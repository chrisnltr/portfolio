<template>
  <div>
    <MainHeader />
    <main class="pt-16 min-h-full" id="main-content">
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <AutomationAiSection />
      <NowSection />
    </main>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/components/layout/MainHeader.vue";
import HeroSection from "~/components/sections/HeroSection.vue";
import ImpactSection from "~/components/sections/ImpactSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import ExperienceSection from "~/components/sections/ExperienceSection.vue";
import ProjectsSection from "~/components/sections/ProjectsSection.vue";
import AutomationAiSection from "~/components/sections/AutomationAiSection.vue";
import NowSection from "~/components/sections/NowSection.vue";
import { useI18n } from "~/composables/useI18n";
import { useSeoMeta, useRequestURL } from "#app";

const { locale, messages } = useI18n();
const requestURL = useRequestURL();

useSeoMeta(() => {
  const seo = messages.value.seo;
  const loc = locale.value;
  const ogLocale = loc === "de" ? "de_DE" : "en_US";
  const path = `/${loc}`;
  const canonicalUrl = `${requestURL.origin}${path}`;

  return {
    title: seo.title,
    description: seo.description,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogLocale,
    ogUrl: canonicalUrl,
    twitterCard: "summary_large_image",
    twitterTitle: seo.ogTitle,
    twitterDescription: seo.ogDescription,
  };
});
</script>

