<template>
  <section class="technical-insight">
    <h2 class="technical-insight__heading">
      {{ messages.projects.technicalTitle }}
    </h2>
    <div class="technical-insight__grid">
      <p class="technical-insight__text">{{ content.implementation }}</p>
      <div class="technical-insight__tech">
        <p class="technical-insight__tech-label">
          {{ messages.projects.techLabel }}
        </p>
        <p class="technical-insight__tech-list">
          {{ visibleTech.join(" · ") }}
        </p>
        <details v-if="hiddenTech.length" class="technical-insight__more">
          <summary>{{ messages.projects.moreTechnologies }}</summary>
          <p>{{ hiddenTech.join(" · ") }}</p>
        </details>
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

const visibleTech = computed(() => props.project.technologies.slice(0, 5));
const hiddenTech = computed(() => props.project.technologies.slice(5));
</script>

<style scoped>
.technical-insight {
  padding-block: clamp(1.5rem, 3vw, 2.25rem);
  border-top: 1px solid var(--color-border);
}

.technical-insight__heading {
  margin: 0 0 1rem;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.2vw, 1.45rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
}

.technical-insight__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 800px) {
  .technical-insight__grid {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.8fr);
    gap: 2rem;
    align-items: start;
  }
}

.technical-insight__text {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--color-text-muted);
  max-width: 40rem;
}

.technical-insight__tech-label {
  margin: 0 0 0.4rem;
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.technical-insight__tech-list {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-text);
}

.technical-insight__more {
  margin-top: 0.75rem;
}

.technical-insight__more summary {
  cursor: pointer;
  color: var(--color-accent);
  font-size: 0.9rem;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

.technical-insight__more p {
  margin: 0.5rem 0 0;
  font-size: 0.92rem;
  color: var(--color-text-muted);
}
</style>
