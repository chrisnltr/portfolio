<template>
  <div class="app-root min-h-screen">
    <div class="site-shell bg-background-primary text-text-primary min-h-screen">
      <a href="#main-content" class="skip-link">
        Zum Hauptinhalt springen
      </a>
      <NuxtPage />
      <ConsentRoot />
    </div>
    <ClientOnly>
      <CursorFollower />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import ConsentRoot from "~/components/consent/ConsentRoot.vue";
import CursorFollower from "~/components/effects/CursorFollower.vue";
import { useHashScroll } from "~/composables/useHashScroll";

useHashScroll();
</script>
