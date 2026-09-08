<template>
  <section
    :id="sectionId"
    class="section-pad projects-section"
  >
    <div class="container-page">
      <div class="projects-intro">
        <h2 class="section-heading">{{ resolvedTitle }}</h2>
        <p v-if="resolvedSubtitle" class="section-lead">
          {{ resolvedSubtitle }}
        </p>
      </div>

      <div
        class="project-grid"
        :class="{ 'project-grid--two': maxColumns === 2 }"
      >
        <article
          v-for="(project, index) in displayProjects"
          :key="project.slug"
          class="project-card"
          :class="{ 'project-card--static': !cardLink }"
          :style="cardAccentStyle(project)"
        >
          <div
            class="project-card__media"
            @click="onMediaClick($event, project)"
          >
            <CyclingProjectPreview
              v-if="cycleImagesFor(project)"
              :images="cycleImagesFor(project) || []"
              :title="project.content.title"
              :alt="previewAlt(project)"
              :priority="index < 2"
              :preview-id="`card-cycle-${project.slug}`"
            />
            <ScrollingProjectPreview
              v-else
              :image="previewFor(project)"
              :title="project.content.title"
              :alt="previewAlt(project)"
              :priority="index < 2"
              :preview-id="`card-scroll-${project.slug}`"
            />
          </div>

          <component
            :is="cardLink ? cardComponent(project) : 'div'"
            class="project-card__body"
            :to="cardTo(project)"
            :href="cardHref(project)"
            :target="cardTarget(project)"
            :rel="cardRel(project)"
          >
            <h3
              class="project-card__title"
              :class="{ 'project-card__title--crispy': isCrispy(project) }"
            >
              <template v-if="isCrispy(project)">
                <span class="project-card__title-crispy">Crispy</span>
                <span class="project-card__title-billiards"> Billiards</span>
              </template>
              <template v-else>
                {{ project.content.title }}
              </template>
            </h3>
            <p class="project-card__type">
              {{ project.content.platformLabel }}
            </p>
            <ul v-if="tagsFor(project).length" class="project-card__tags">
              <li v-for="tag in tagsFor(project)" :key="tag">{{ tag }}</li>
            </ul>
          </component>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NuxtLink } from "#components";
import CyclingProjectPreview from "~/components/projects/CyclingProjectPreview.vue";
import ScrollingProjectPreview from "~/components/projects/ScrollingProjectPreview.vue";
import { isFinePointerHover } from "~/composables/usePreviewInteraction";
import { useI18n } from "~/composables/useI18n";
import { projectDetailPath } from "~/data/navigation";
import { getPreviewProjects, getProjectBySlug } from "~/data/projects";
import type { ProjectCaseStudy, ProjectImage } from "~/types/content";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    title?: string;
    subtitle?: string;
    projectSlugs?: string[];
    maxColumns?: 2 | 3;
    cardLink?: boolean;
  }>(),
  {
    sectionId: "projects",
    maxColumns: 3,
    cardLink: true,
  },
);

const { messages } = useI18n();

const resolvedTitle = computed(
  () => props.title ?? messages.value.projects.title,
);
const resolvedSubtitle = computed(
  () => props.subtitle ?? messages.value.projects.subtitle,
);

const displayProjects = computed(() => {
  if (props.projectSlugs?.length) {
    return props.projectSlugs
      .map((slug) => getProjectBySlug(slug))
      .filter(Boolean) as ProjectCaseStudy[];
  }
  return getPreviewProjects();
});

function previewFor(project: ProjectCaseStudy): ProjectImage | null {
  return project.previewImage || project.images[0] || null;
}

function cycleImagesFor(project: ProjectCaseStudy): ProjectImage[] | null {
  const images = project.cardCycleImages;
  if (!images || images.length < 2) return null;
  return images;
}

function previewAlt(project: ProjectCaseStudy) {
  const cycle = cycleImagesFor(project);
  if (cycle?.[0]) return cycle[0].alt;
  const image = previewFor(project);
  if (image) return image.alt;
  return project.content.title;
}

function tagsFor(project: ProjectCaseStudy) {
  if (project.cardTags?.length) return project.cardTags.slice(0, 3);
  return project.technologies.slice(0, 3);
}

function cardAccentStyle(project: ProjectCaseStudy) {
  if (!project.accent) return undefined;
  return { "--card-accent": project.accent } as Record<string, string>;
}

function isCrispy(project: ProjectCaseStudy) {
  return project.slug === "crispy-billiards";
}

function cardComponent(project: ProjectCaseStudy) {
  if (!props.cardLink) return "div";
  if (project.homepageExternalUrl) return "a";
  return NuxtLink;
}

function cardTo(project: ProjectCaseStudy) {
  if (!props.cardLink || project.homepageExternalUrl) return undefined;
  return projectDetailPath(project.routeSlug);
}

function cardHref(project: ProjectCaseStudy) {
  if (!props.cardLink || !project.homepageExternalUrl) return undefined;
  return project.homepageExternalUrl;
}

function cardTarget(project: ProjectCaseStudy) {
  if (!props.cardLink || !project.homepageExternalUrl) return undefined;
  return "_blank";
}

function cardRel(project: ProjectCaseStudy) {
  if (!props.cardLink || !project.homepageExternalUrl) return undefined;
  return "noopener noreferrer";
}

function onMediaClick(event: MouseEvent, project: ProjectCaseStudy) {
  if (!props.cardLink) return;
  // Touch devices use the preview controls; body/CTA remains the nav target.
  if (!isFinePointerHover()) return;
  if (event.defaultPrevented) return;

  if (project.homepageExternalUrl) {
    window.open(project.homepageExternalUrl, "_blank", "noopener,noreferrer");
    return;
  }

  navigateTo(projectDetailPath(project.routeSlug));
}
</script>

<style scoped>
.projects-section {
  position: relative;
  background: var(--color-surface);
  border-block: 1px solid var(--color-border);
}

.projects-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 70% 45% at 80% 20%,
    rgba(47, 102, 255, 0.07) 0%,
    transparent 70%
  );
}

.projects-intro {
  position: relative;
  z-index: 1;
  max-width: 40rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  min-width: 0;
}

.project-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(1.5rem, 3vw, 2rem);
  grid-template-columns: minmax(0, 1fr);
}

@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-grid--two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .project-grid:not(.project-grid--two) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.project-card {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.project-card__media {
  position: relative;
  min-width: 0;
}

@media (hover: hover) and (pointer: fine) {
  .project-card:not(.project-card--static) .project-card__media {
    cursor: pointer;
  }
}

.project-card :deep(.preview),
.project-card :deep(.cycle) {
  position: relative;
  z-index: 1;
  aspect-ratio: 16 / 10;
  max-height: none;
  width: 100%;
}

.project-card--static {
  cursor: default;
}

.project-card__body {
  display: block;
  padding-top: 1rem;
  min-width: 0;
  text-decoration: none;
  color: inherit;
  border-radius: 4px;
}

.project-card__body:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.project-card__title {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.8vw, 1.25rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 0.35rem;
  overflow-wrap: anywhere;
  transition: color var(--duration-fast) var(--ease-out);
}

.project-card__title-crispy,
.project-card__title-billiards {
  transition:
    color var(--duration-fast) var(--ease-out),
    font-weight var(--duration-fast) var(--ease-out),
    font-style var(--duration-fast) var(--ease-out);
}

.project-card__type {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.75rem;
  list-style: none;
  margin: 0.85rem 0 0;
  padding: 0;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.project-card:hover .project-card__title:not(.project-card__title--crispy) {
  color: var(--card-accent, var(--accent-hover));
}

.project-card:hover .project-card__title--crispy .project-card__title-crispy {
  color: #c8d0dc;
  font-weight: 700;
  font-style: italic;
}

.project-card:hover .project-card__title--crispy .project-card__title-billiards {
  color: #e0b24a;
  font-weight: 700;
  font-style: italic;
}
</style>
