<template>
  <footer v-if="showContactCta" class="case-closing">
    <div class="case-closing__cta">
      <p class="case-closing__cta-text">
        {{ messages.projects.closingCtaPrompt }}
      </p>
      <NuxtLink
        :to="`${homePath}#contact`"
        class="btn-primary"
        @click="emit('cta-click')"
      >
        {{ messages.projects.discussProject }}
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import type { ProjectCaseStudy } from "~/types/content";

const props = defineProps<{
  project: ProjectCaseStudy;
}>();

const emit = defineEmits<{
  "cta-click": [];
}>();

const { messages } = useI18n();
const homePath = "/";
const showContactCta = computed(() => props.project.showContactCta !== false);
</script>

<style scoped>
.case-closing {
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  padding-top: clamp(1.5rem, 3vw, 2rem);
  border-top: 1px solid var(--color-border);
}

.case-closing__cta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

@media (min-width: 640px) {
  .case-closing__cta {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
}

.case-closing__cta-text {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-muted);
  max-width: 32rem;
  overflow-wrap: anywhere;
}

.case-closing__cta .btn-primary {
  width: 100%;
  max-width: 22rem;
}

@media (min-width: 640px) {
  .case-closing__cta .btn-primary {
    width: auto;
  }
}
</style>
