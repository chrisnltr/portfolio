<template>
  <div class="app-root min-h-screen">
    <div class="site-shell bg-background-primary text-text-primary min-h-screen">
      <a href="#main-content" class="skip-link">
        Zum Hauptinhalt springen
      </a>
      <div class="site-content">
        <NuxtPage />
      </div>
    </div>
    <ConsentRoot />
    <ClientOnly>
      <CursorFollower />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import ConsentRoot from "~/components/consent/ConsentRoot.vue";
import CursorFollower from "~/components/effects/CursorFollower.vue";
import { useHashScroll } from "~/composables/useHashScroll";

useHead({
  link: [
    {
      rel: "alternate",
      type: "text/markdown",
      href: "/llms.txt",
      title: "LLM-readable site summary",
    },
  ],
});

useHashScroll();
</script>
