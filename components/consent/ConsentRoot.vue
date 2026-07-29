<template>
  <ConsentBanner />
  <ConsentSettingsModal />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ConsentBanner from "~/components/consent/ConsentBanner.vue";
import ConsentSettingsModal from "~/components/consent/ConsentSettingsModal.vue";
import { useConsent } from "~/composables/useConsent";

const { hydrateFromCookie } = useConsent();

onMounted(() => {
  hydrateFromCookie();
});
</script>
