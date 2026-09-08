<template>
  <section class="case-story" :style="accentStyle">
    <h2 class="case-story__heading">{{ messages.projects.storyTitle }}</h2>
    <div class="case-story__grid">
      <div>
        <h3 class="case-story__label">{{ messages.projects.situationLabel }}</h3>
        <p class="case-story__text">{{ content.situation }}</p>
      </div>
      <div>
        <h3 class="case-story__label">{{ messages.projects.solutionLabel }}</h3>
        <p class="case-story__text">{{ content.solution }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import type { ProjectCaseStudy } from "~/types/content";

const props = defineProps<{
  project: ProjectCaseStudy;
}>();

const { messages } = useI18n();
const content = computed(() => props.project.content);

const accentStyle = computed(() =>
  props.project.accent
    ? ({ "--case-accent": props.project.accent } as Record<string, string>)
    : undefined,
);
</script>

<style scoped>
.case-story {
  --case-accent: var(--color-accent);
  padding-block: clamp(2rem, 4vw, 2.75rem);
}

.case-story__heading {
  margin: 0 0 1.25rem;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
}

.case-story__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 800px) {
  .case-story__grid {
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  .case-story__grid > div {
    padding-right: 1.75rem;
  }

  .case-story__grid > div + div {
    padding-left: 1.75rem;
    padding-right: 0;
    border-left: 1px solid var(--color-border);
  }
}

@media (max-width: 799px) {
  .case-story__grid > div + div {
    padding-top: 1.15rem;
    border-top: 1px solid var(--color-border);
  }
}

.case-story__label {
  margin: 0 0 0.55rem;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--case-accent);
}

.case-story__text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-text-muted);
  max-width: 36rem;
}
</style>
