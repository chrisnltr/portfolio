<template>
  <div>
    <MainHeader />
    <main class="pt-28 pb-16 min-h-full" id="main-content">
      <div class="container-page max-w-xl text-center">
        <h1 class="font-display text-3xl md:text-4xl font-semibold text-text-primary mb-4">
          {{ messages.thankYou.title }}
        </h1>
        <p class="text-text-secondary leading-relaxed mb-10">
          {{ messages.thankYou.body }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
          <NuxtLink :to="projectsPath" class="btn-secondary">
            {{ messages.thankYou.projectsLink }}
          </NuxtLink>
          <NuxtLink :to="homePath" class="btn-primary">
            {{ messages.thankYou.backHome }}
          </NuxtLink>
        </div>
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/components/layout/MainHeader.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import { useI18n } from "~/composables/useI18n";
import { usePageSeo } from "~/composables/usePageSeo";
import { thankYouSeo } from "~/data/seo";

const { messages } = useI18n();
const homePath = "/";
const projectsPath = "/#projects";

usePageSeo(() => ({
  title: thankYouSeo.title,
  description: thankYouSeo.description,
  path: "/danke",
  robots: "noindex, follow",
}));
</script>
