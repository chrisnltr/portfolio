<template>
  <div>
    <MainHeader />
    <main class="pt-20 pb-12 min-h-full" id="main-content">
      <div class="container mx-auto px-4 max-w-4xl">
        <NuxtLink
          :to="homePath"
          class="inline-flex text-sm text-accent-400 hover:text-accent-300 mb-6 underline-offset-4 hover:underline"
        >
          ← {{ messages.resume.backHome }}
        </NuxtLink>
        <header class="mb-8 text-center md:text-left">
          <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-3">
            {{ messages.resume.title }}
          </h1>
          <p class="text-text-secondary">
            {{ messages.resume.subtitle }}
          </p>
          <p class="text-text-secondary text-sm mt-3 max-w-2xl">
            {{ messages.experience.intro }}
          </p>
        </header>
        <ExperienceTimeline />
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/components/layout/MainHeader.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import ExperienceTimeline from "~/components/sections/ExperienceTimeline.vue";
import { useI18n } from "~/composables/useI18n";
import { usePageSeo } from "~/composables/usePageSeo";
import { resumeSeo } from "~/data/seo";

const { messages } = useI18n();
const homePath = "/";

usePageSeo(() => ({
  title: resumeSeo.title,
  description: resumeSeo.description,
  path: "/lebenslauf",
}));
</script>
