<template>
  <section v-if="highlights.length" class="project-highlights" :style="accentStyle">
    <h2 class="project-highlights__heading">
      {{ messages.projects.highlightsTitle }}
    </h2>
    <ol class="project-highlights__grid">
      <li
        v-for="(item, index) in highlights"
        :key="item.title"
        class="project-highlights__item"
      >
        <span class="project-highlights__num" aria-hidden="true">
          0{{ index + 1 }}
        </span>
        <h3 class="project-highlights__title">{{ item.title }}</h3>
        <p class="project-highlights__text">{{ item.description }}</p>
      </li>
    </ol>
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
const highlights = computed(() => content.value.highlights.slice(0, 4));

const accentStyle = computed(() =>
  props.project.accent
    ? ({ "--case-accent": props.project.accent } as Record<string, string>)
    : undefined,
);
</script>

<style scoped>
.project-highlights {
  --case-accent: var(--color-accent);
  padding-block: clamp(1.75rem, 3.5vw, 2.5rem);
}

.project-highlights__heading {
  margin: 0 0 1.25rem;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
}

.project-highlights__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

@media (min-width: 760px) {
  .project-highlights__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.project-highlights__item {
  padding: 1.15rem 0 1.25rem;
  border-top: 1px solid var(--color-border);
}

@media (min-width: 760px) {
  .project-highlights__item:nth-child(odd) {
    padding-right: 1.5rem;
  }

  .project-highlights__item:nth-child(even) {
    padding-left: 1.5rem;
  }
}

.project-highlights__num {
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  color: var(--case-accent);
}

.project-highlights__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--color-text);
  overflow-wrap: anywhere;
}

.project-highlights__text {
  margin: 0.45rem 0 0;
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  max-width: 34rem;
  overflow-wrap: anywhere;
}
</style>
