<template>
  <div class="min-h-screen site-shell bg-background-primary text-text-primary">
    <MainHeader />
    <main class="pt-28 pb-16 min-h-full" id="main-content">
      <div class="container-page max-w-lg text-center">
        <p class="text-sm uppercase tracking-wide text-text-secondary mb-3">
          {{ statusCode }}
        </p>
        <h1 class="font-display text-3xl md:text-4xl font-semibold text-text-primary mb-4">
          {{ title }}
        </h1>
        <p class="text-text-secondary leading-relaxed mb-8">
          {{ description }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink to="/" class="btn-primary" @click="clearError()">
            Zur Startseite
          </NuxtLink>
          <button type="button" class="btn-secondary" @click="handleError">
            Erneut versuchen
          </button>
        </div>
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import MainHeader from "~/components/layout/MainHeader.vue";
import MainFooter from "~/components/layout/MainFooter.vue";

const props = defineProps<{
  error: NuxtError;
}>();

const statusCode = computed(() => props.error?.statusCode || 404);
const isNotFound = computed(() => statusCode.value === 404);

const title = computed(() =>
  isNotFound.value ? "Seite nicht gefunden" : "Etwas ist schiefgelaufen",
);

const description = computed(() =>
  isNotFound.value
    ? "Diese Seite existiert nicht oder ist nicht mehr verfügbar."
    : "Bitte versuchen Sie es erneut oder kehren Sie zur Startseite zurück.",
);

useHead(() => ({
  htmlAttrs: { lang: "de" },
  title: title.value,
}));

useSeoMeta({
  robots: "noindex, follow",
});

const handleError = () => clearError({ redirect: "/" });
</script>
