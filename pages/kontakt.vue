<template>
  <div class="page-shell page-shell--viewport">
    <MainHeader />
    <main class="kontakt" id="main-content">
      <div class="container-page kontakt__inner">
        <header class="kontakt__intro">
          <h1 class="kontakt__title">{{ messages.funnel.pageTitle }}</h1>
          <p class="kontakt__body">{{ messages.funnel.pageIntro }}</p>
        </header>

        <ContactFunnel />
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import ContactFunnel from "~/components/contact/ContactFunnel.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import MainHeader from "~/components/layout/MainHeader.vue";
import { useI18n } from "~/composables/useI18n";
import { usePageSeo } from "~/composables/usePageSeo";
import { contactSeo, DEFAULT_OG_IMAGE, portfolioJsonLd } from "~/data/seo";
import { resolveSiteOrigin } from "~/utils/siteOrigin";

const { messages } = useI18n();
const requestURL = useRequestURL();
const config = useRuntimeConfig();

const siteOrigin = computed(() => {
  const configured = String(config.public.siteUrl || "").trim();
  return resolveSiteOrigin(configured || requestURL.origin);
});

usePageSeo(() => ({
  title: contactSeo.title,
  description: contactSeo.description,
  path: "/kontakt",
  ogImage: DEFAULT_OG_IMAGE,
  jsonLd: portfolioJsonLd(siteOrigin.value, "/kontakt", contactSeo.title),
}));
</script>

<style scoped>
.kontakt {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--header-height) + 1rem);
  padding-bottom: 0.85rem;
  overflow: auto;
  background:
    radial-gradient(ellipse 55% 40% at 80% 0%, rgba(47, 102, 255, 0.09), transparent 58%),
    var(--color-bg);
}

.kontakt__inner {
  display: grid;
  gap: 1rem;
  max-width: 34rem;
  width: 100%;
  margin-block: auto;
}

.kontakt__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 3.5vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.1;
  color: var(--color-text);
}

.kontakt__body {
  margin: 0.4rem 0 0;
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

@media (max-height: 820px) {
  .kontakt {
    padding-top: calc(var(--header-height) + 0.65rem);
    padding-bottom: 0.55rem;
  }

  .kontakt__inner {
    gap: 0.75rem;
    margin-block: 0;
  }

  .kontakt__title {
    font-size: clamp(1.4rem, 3vw, 1.7rem);
  }

  .kontakt__body {
    margin-top: 0.3rem;
    font-size: 0.9rem;
  }
}
</style>
