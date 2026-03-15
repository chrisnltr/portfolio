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
      <ContactSection />
      <MainFooter />
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
import ContactSection from "~/components/sections/ContactSection.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import { useI18n } from "~/composables/useI18n";
import { useSeoMeta, useHead, useRequestURL } from "#app";

const { locale, messages } = useI18n();
const requestURL = useRequestURL();

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === "de" ? "de" : "en",
  },
}));

useSeoMeta(() => {
  const seo = messages.value.seo;
  const loc = locale.value;
  const ogLocale = loc === "de" ? "de_DE" : "en_US";
  const path = `/${loc}`;
  const canonicalUrl = `${requestURL.origin}${path}`;
  const ogImageUrl = seo.ogImage
    ? (seo.ogImage.startsWith("http") ? seo.ogImage : `${requestURL.origin}${seo.ogImage}`)
    : undefined;

  return {
    title: seo.title,
    description: seo.description,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogType: "website",
    ogLocale,
    ogUrl: canonicalUrl,
    ...(ogImageUrl && { ogImage: ogImageUrl }),
    twitterCard: "summary_large_image",
    twitterTitle: seo.ogTitle,
    twitterDescription: seo.ogDescription,
    ...(ogImageUrl && { twitterImage: ogImageUrl }),
  };
});
</script>

