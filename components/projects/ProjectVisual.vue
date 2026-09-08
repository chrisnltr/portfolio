<template>
  <div
    class="project-cover"
    :class="toneClass"
    role="img"
    :aria-label="ariaLabel"
  >
    <img
      v-if="primaryImage"
      :src="primaryImage.src"
      :alt="primaryImage.alt"
      :width="primaryImage.width"
      :height="primaryImage.height"
      class="project-cover__image"
      :loading="primaryImage.priority ? 'eager' : 'lazy'"
      :fetchpriority="primaryImage.priority ? 'high' : undefined"
      decoding="async"
    />
    <div v-else class="project-cover__editorial">
      <p class="project-cover__label">{{ label }}</p>
      <h3 class="project-cover__title">{{ title }}</h3>
      <p v-if="meta" class="project-cover__meta">{{ meta }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ProjectImage } from "~/types/content";

const props = withDefaults(
  defineProps<{
    title: string;
    label?: string;
    meta?: string;
    images?: ProjectImage[];
    tone?: "accent" | "surface" | "strong";
  }>(),
  {
    label: "",
    meta: "",
    images: () => [],
    tone: "accent",
  },
);

const primaryImage = computed(
  () =>
    props.images.find((img) => img.kind === "desktop") ||
    props.images.find((img) => img.kind !== "mobile") ||
    props.images[0],
);

const toneClass = computed(() => {
  if (props.tone === "strong") return "project-cover--strong";
  if (props.tone === "surface") return "project-cover--surface";
  return "project-cover--accent";
});

const ariaLabel = computed(() =>
  primaryImage.value ? props.title : `${props.title}${props.meta ? ` - ${props.meta}` : ""}`,
);
</script>

<style scoped>
.project-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.project-cover--accent {
  background: var(--color-surface-raised);
  color: var(--color-text);
}

.project-cover--surface {
  background: var(--color-surface);
  color: var(--color-text);
}

.project-cover--strong {
  background: var(--color-surface-strong);
  color: var(--color-text);
}

.project-cover__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.project-cover__editorial {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1.1rem, 2.5vw, 1.75rem);
}

.project-cover__label {
  margin: 0 0 0.7rem;
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.project-cover__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.12;
}

.project-cover__meta {
  margin: 0.5rem 0 0;
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--color-text-muted);
  max-width: 18rem;
}
</style>
