<template>
  <section class="project-facts" :style="accentStyle" aria-label="Project facts">
    <div
      v-for="fact in facts"
      :key="fact.label"
      class="project-facts__item"
    >
      <p class="project-facts__label">{{ fact.label }}</p>
      <p class="project-facts__value">{{ fact.value }}</p>
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

const facts = computed(() => {
  const tech = props.project.technologies.slice(0, 3).join(" · ");
  return [
    {
      label: messages.value.projects.statusLabel,
      value: content.value.statusLabel,
    },
    {
      label: messages.value.projects.roleFactLabel,
      value: content.value.roleLabel,
    },
    {
      label: messages.value.projects.platformFactLabel,
      value: content.value.platformLabel,
    },
    {
      label: messages.value.projects.techLabel,
      value: tech,
    },
  ];
});
</script>

<style scoped>
.project-facts {
  --case-accent: var(--color-accent);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  padding-block: 1.15rem;
  border-block: 1px solid var(--color-border);
}

@media (min-width: 480px) {
  .project-facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 1.25rem;
  }
}

@media (min-width: 900px) {
  .project-facts {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
  }

  .project-facts__item {
    padding-inline: 1.25rem;
    border-left: 1px solid var(--color-border);
  }

  .project-facts__item:first-child {
    padding-left: 0;
    border-left: 0;
  }
}

.project-facts__label {
  margin: 0 0 0.35rem;
  font-size: 0.7rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.project-facts__value {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--color-text);
  overflow-wrap: anywhere;
}
</style>
