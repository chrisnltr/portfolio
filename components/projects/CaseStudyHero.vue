<template>
  <header class="case-hero" :style="accentStyle">
    <div class="case-hero__copy">
      <NuxtLink :to="`${homePath}#projects`" class="case-hero__back">
        {{ messages.projects.backToProjects }}
      </NuxtLink>

      <p class="case-hero__eyebrow">
        {{ content.statusLabel }}
        <span aria-hidden="true"> · </span>
        {{ content.industryLabel }}
      </p>

      <h1
        class="case-hero__title"
        :class="{ 'case-hero__title--crispy': isCrispy }"
      >
        <template v-if="isCrispy">
          <span class="case-hero__title-crispy">Crispy</span>
          <span class="case-hero__title-billiards"> Billiards</span>
        </template>
        <template v-else>
          {{ content.title }}
        </template>
      </h1>
      <p class="case-hero__subtitle">{{ content.subtitle }}</p>
      <p class="case-hero__lead">{{ content.shortDescription }}</p>

      <a
        v-if="project.externalUrl"
        :href="project.externalUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-link case-hero__external"
        @click="emit('external-click')"
      >
        {{ content.externalLinkLabel || messages.projects.visitLive }} →
      </a>
    </div>

    <div class="case-hero__media">
      <div
        v-if="heroImage"
        class="case-hero__frame"
        :class="{
          'case-hero__frame--showcase': heroImage.presentation === 'phone-showcase',
        }"
      >
        <img
          :src="heroImage.src"
          :alt="heroImage.alt"
          :width="heroImage.width"
          :height="heroImage.height"
          class="case-hero__image"
          :style="imageStyle"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <ProjectVisual
        v-else
        :title="content.title"
        :label="messages.projects.previewLabel"
        :meta="content.industryLabel"
        tone="accent"
      />
      <p v-if="!heroImage" class="case-hero__hint">
        {{ messages.projects.noImagesHint }}
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ProjectVisual from "~/components/projects/ProjectVisual.vue";
import { useI18n } from "~/composables/useI18n";
import type { ProjectCaseStudy } from "~/types/content";

const props = defineProps<{
  project: ProjectCaseStudy;
}>();

const emit = defineEmits<{
  "external-click": [];
}>();

const { messages } = useI18n();

const content = computed(() => props.project.content);
const homePath = "/";
const isCrispy = computed(() => props.project.slug === "crispy-billiards");

const heroImage = computed(
  () =>
    props.project.images.find((img) => img.priority) ||
    props.project.images[0] ||
    props.project.previewImage,
);

const accentStyle = computed(() =>
  props.project.accent
    ? ({ "--case-accent": props.project.accent } as Record<string, string>)
    : undefined,
);

const imageStyle = computed(() => {
  const img = heroImage.value;
  if (!img) return undefined;
  return {
    objectFit: img.fit || "cover",
    objectPosition: img.objectPosition || "center",
  } as Record<string, string>;
});
</script>

<style scoped>
.case-hero {
  --case-accent: var(--color-accent);
  display: grid;
  gap: 1.5rem;
  padding-top: calc(var(--header-height) + 1.15rem);
  padding-bottom: clamp(1.5rem, 3vw, 2.25rem);
}

@media (min-width: 960px) {
  .case-hero {
    grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
    gap: clamp(1.75rem, 4vw, 3rem);
    align-items: center;
  }
}

.case-hero__back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-bottom: 0.85rem;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
}

.case-hero__back:hover {
  color: var(--case-accent);
}

.case-hero__eyebrow {
  margin: 0 0 0.7rem;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--case-accent);
}

.case-hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 7vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #fff;
  max-width: 14ch;
  overflow-wrap: anywhere;
}

.case-hero__title-crispy,
.case-hero__title-billiards {
  transition:
    color var(--duration-fast) var(--ease-out),
    font-weight var(--duration-fast) var(--ease-out),
    font-style var(--duration-fast) var(--ease-out);
}

.case-hero__title--crispy:hover .case-hero__title-crispy {
  color: #c8d0dc;
  font-weight: 800;
  font-style: italic;
}

.case-hero__title--crispy:hover .case-hero__title-billiards {
  color: #e0b24a;
  font-weight: 800;
  font-style: italic;
}

.case-hero__subtitle {
  margin: 0.85rem 0 0;
  font-size: clamp(1.02rem, 1.8vw, 1.2rem);
  line-height: 1.45;
  color: var(--color-text);
  max-width: 32rem;
  overflow-wrap: anywhere;
}

.case-hero__lead {
  margin: 0.85rem 0 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 34rem;
  overflow-wrap: anywhere;
}

@media (min-width: 960px) {
  .case-hero__lead {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.case-hero__external {
  margin-top: 1rem;
  min-height: 44px;
}

.case-hero__media {
  min-width: 0;
  width: 100%;
}

.case-hero__frame {
  aspect-ratio: 16 / 10;
  max-height: min(52vh, 28rem);
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  overflow: hidden;
  background: var(--color-surface);
}

@media (min-width: 960px) {
  .case-hero__frame {
    max-height: min(65vh, 28rem);
  }
}

.case-hero__frame--showcase {
  background: var(--color-accent-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.75rem, 2vw, 1.25rem);
}

.case-hero__image {
  width: 100%;
  height: 100%;
  display: block;
}

.case-hero__frame--showcase .case-hero__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.case-hero__hint {
  margin: 0.65rem 0 0;
  font-size: 0.88rem;
  color: var(--color-text-subtle);
}
</style>
