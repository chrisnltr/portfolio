<template>
  <section v-if="displayImages.length" class="project-gallery">
    <h2 class="project-gallery__heading">{{ messages.projects.galleryLabel }}</h2>

    <div
      class="project-gallery__grid"
      :style="{ '--gallery-count': String(displayImages.length) }"
    >
      <figure
        v-for="image in displayImages"
        :key="image.src"
        class="project-gallery__item"
        :class="{
          'project-gallery__item--showcase': image.presentation === 'phone-showcase',
        }"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          class="project-gallery__image"
          :style="styleFor(image)"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import type { ProjectCaseStudy, ProjectImage } from "~/types/content";

const props = withDefaults(
  defineProps<{
    project: ProjectCaseStudy;
    /** Skip hero image when gallery follows hero (default true) */
    skipHero?: boolean;
    /** Max images after the first gallery slot (archive stays short) */
    maxSecondary?: number;
  }>(),
  {
    skipHero: true,
    maxSecondary: 2,
  },
);

const { messages } = useI18n();

const galleryImages = computed(() => {
  const images = props.project.images;
  if (!images.length) return [];
  if (!props.skipHero) return images;
  if (images.length === 1) return images;
  return images.slice(1);
});

const displayImages = computed(() =>
  galleryImages.value.slice(0, 1 + props.maxSecondary),
);

function styleFor(image: ProjectImage) {
  return {
    objectFit: image.fit || "cover",
    objectPosition: image.objectPosition || "center top",
  } as Record<string, string>;
}
</script>

<style scoped>
.project-gallery {
  padding-block: clamp(1.75rem, 3.5vw, 2.5rem);
}

.project-gallery__heading {
  margin: 0 0 1.15rem;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
}

.project-gallery__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .project-gallery__grid {
    grid-template-columns: repeat(var(--gallery-count, 2), minmax(0, 1fr));
  }
}

.project-gallery__item {
  margin: 0;
  aspect-ratio: 16 / 10;
  min-height: 0;
  min-width: 0;
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  overflow: hidden;
  background: var(--color-surface);
}

.project-gallery__item--showcase {
  background: var(--color-accent-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.65rem, 1.8vw, 1.1rem);
}

.project-gallery__image {
  width: 100%;
  height: 100%;
  display: block;
}

.project-gallery__item--showcase .project-gallery__image {
  object-fit: contain;
}
</style>
