<template>
  <section
    :id="sectionId"
    ref="root"
    class="section-pad projects-section"
  >
    <div class="container-page">
      <div class="projects-intro reveal">
        <h2 class="section-heading">{{ resolvedTitle }}</h2>
        <p v-if="resolvedSubtitle" class="section-lead">
          {{ resolvedSubtitle }}
        </p>
      </div>

      <article
        v-if="featuredProject"
        class="project-feature reveal reveal--delay-1"
        :class="{
          'project-feature--static': !cardLink,
          [`project-feature--${featuredProject.slug}`]: true,
        }"
        :style="cardAccentStyle(featuredProject)"
      >
        <div
          class="project-feature__media"
          @click="onMediaClick($event, featuredProject)"
        >
          <CyclingProjectPreview
            v-if="cycleImagesFor(featuredProject)"
            :images="cycleImagesFor(featuredProject) || []"
            :title="featuredProject.content.title"
            :alt="previewAlt(featuredProject)"
            :priority="true"
            :preview-id="`feature-cycle-${featuredProject.slug}`"
            fit="cover"
            :object-position="previewPositionFor(featuredProject)"
          />
          <ScrollingProjectPreview
            v-else
            :image="previewFor(featuredProject)"
            :title="featuredProject.content.title"
            :alt="previewAlt(featuredProject)"
            :priority="true"
            :preview-id="`feature-scroll-${featuredProject.slug}`"
          />
        </div>

        <component
          :is="cardLink ? cardComponent(featuredProject) : 'div'"
          class="project-feature__body"
          :to="cardTo(featuredProject)"
          :href="cardHref(featuredProject)"
          :target="cardTarget(featuredProject)"
          :rel="cardRel(featuredProject)"
        >
          <p class="project-feature__label">{{ featuredLabel }}</p>
          <h3
            class="project-feature__title"
            :class="{ 'project-feature__title--crispy': isCrispy(featuredProject) }"
          >
            <template v-if="isCrispy(featuredProject)">
              <span class="project-card__title-crispy">Crispy</span>
              <span class="project-card__title-billiards"> Billiards</span>
            </template>
            <template v-else>
              {{ featuredProject.content.title }}
            </template>
          </h3>
          <p class="project-feature__type">
            {{ featuredProject.content.platformLabel }}
          </p>
          <ul
            v-if="tagsFor(featuredProject).length"
            class="project-card__tags project-feature__tags"
          >
            <li
              v-for="tag in tagsFor(featuredProject)"
              :key="tag"
            >
              {{ tag }}
            </li>
          </ul>
          <span
            v-if="cardLink"
            class="project-feature__cta"
          >
            Projekt ansehen →
          </span>
        </component>
      </article>

      <div
        v-if="gridProjects.length"
        class="project-grid"
        :class="{ 'project-grid--two': maxColumns === 2 || gridProjects.length < 3 }"
      >
        <article
          v-for="(project, index) in gridProjects"
          :key="project.slug"
          class="project-card reveal"
          :class="{
            'project-card--static': !cardLink,
            [`project-card--${project.slug}`]: true,
            'reveal--delay-1': index === 0,
            'reveal--delay-2': index === 1,
            'reveal--delay-3': index >= 2,
          }"
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
              :fit="previewFitFor(project)"
              :object-position="previewPositionFor(project)"
            />
            <ScrollingProjectPreview
              v-else
              :image="previewFor(project)"
              :title="project.content.title"
              :alt="previewAlt(project)"
              :priority="index < 2"
              :preview-id="`card-scroll-${project.slug}`"
            />
            <p
              v-if="showPreviewHint(project)"
              class="project-card__preview-hint"
              aria-hidden="true"
            >
              Vorschau antippen
            </p>
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
            <span
              v-if="cardLink"
              class="project-card__cta"
            >
              Projekt ansehen →
            </span>
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
import { useRevealGroup } from "~/composables/useReveal";
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
const { root } = useRevealGroup();

const resolvedTitle = computed(
  () => props.title ?? messages.value.projects.title,
);
const resolvedSubtitle = computed(
  () => props.subtitle ?? messages.value.projects.subtitle,
);
const featuredLabel = computed(
  () => messages.value.projects.featuredTitle ?? "Aktuell",
);

const displayProjects = computed(() => {
  if (props.projectSlugs?.length) {
    return props.projectSlugs
      .map((slug) => getProjectBySlug(slug))
      .filter(Boolean) as ProjectCaseStudy[];
  }
  return getPreviewProjects();
});

const featuredProject = computed(() => displayProjects.value[0] ?? null);
const gridProjects = computed(() => displayProjects.value.slice(1));

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

function previewFitFor(project: ProjectCaseStudy): "cover" | "contain" {
  if (project.visualKind === "phone" || project.slug === "accident-report-app") {
    return "contain";
  }
  return "cover";
}

function previewPositionFor(project: ProjectCaseStudy): string {
  if (project.slug === "crispy-billiards") return "center 42%";
  if (project.slug === "hardware-management") return "center 22%";
  if (project.slug === "accident-report-app") return "center center";
  return "center center";
}

function showPreviewHint(project: ProjectCaseStudy) {
  return Boolean(cycleImagesFor(project) || previewFor(project));
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
  padding-block: clamp(1.35rem, 3.2vw, 2.5rem);
  background: transparent;
}

.projects-intro {
  position: relative;
  z-index: 1;
  max-width: 36rem;
  margin-bottom: clamp(1rem, 2.2vw, 1.5rem);
  min-width: 0;
}

.projects-intro .section-lead {
  margin-top: 0.55rem;
  max-width: 32rem;
}

.project-feature {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1.25rem;
  margin-bottom: clamp(1.75rem, 3.5vw, 2.75rem);
  min-width: 0;
}

@media (min-width: 900px) {
  .project-feature {
    grid-template-columns: minmax(0, 1.55fr) minmax(15rem, 0.8fr);
    gap: clamp(1.35rem, 2.5vw, 2.25rem);
    align-items: center;
  }

  .project-feature :deep(.preview),
  .project-feature :deep(.cycle) {
    aspect-ratio: 16 / 9.4;
  }
}

.project-feature__media {
  position: relative;
  min-width: 0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 18px 48px rgba(18, 26, 38, 0.08);
}

@media (hover: hover) and (pointer: fine) {
  .project-feature:not(.project-feature--static) .project-feature__media {
    cursor: pointer;
  }
}

.project-feature :deep(.preview),
.project-feature :deep(.cycle) {
  position: relative;
  z-index: 1;
  aspect-ratio: 16 / 10;
  max-height: none;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 18px;
  background: transparent;
}

.project-feature :deep(.cycle__image),
.project-feature :deep(.preview__image) {
  object-fit: cover;
}

.project-feature__body {
  display: grid;
  align-content: center;
  gap: 0.55rem;
  min-width: 0;
  text-decoration: none;
  color: inherit;
  border-radius: 4px;
}

.project-feature__body:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.project-feature__label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.project-feature__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 3.4vw, 2.15rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  overflow-wrap: break-word;
  transition: color var(--duration-fast) var(--ease-out);
}

.project-feature__type {
  margin: 0;
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.project-feature__tags {
  margin-top: 0.35rem;
}

.project-feature__cta {
  display: inline-flex;
  align-items: center;
  margin-top: 0.35rem;
  min-height: 2.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-accent);
}

.project-feature:hover .project-feature__title:not(.project-feature__title--crispy) {
  color: var(--card-accent, var(--accent-hover));
}

.project-feature:hover .project-feature__title--crispy .project-card__title-crispy {
  color: #c8d0dc;
  font-weight: 700;
  font-style: italic;
}

.project-feature:hover .project-feature__title--crispy .project-card__title-billiards {
  color: #e0b24a;
  font-weight: 700;
  font-style: italic;
}

.project-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(1.5rem, 3vw, 2rem);
  grid-template-columns: minmax(0, 1fr);
}

@media (min-width: 768px) {
  .project-grid,
  .project-grid--two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 36px rgba(18, 26, 38, 0.06);
}

.project-card__preview-hint {
  display: none;
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
  border-radius: 16px;
}

.project-card--accident-report-app :deep(.cycle) {
  background: #e8eef6;
}

.project-card--static {
  cursor: default;
}

.project-card__body {
  display: block;
  padding-top: 0.95rem;
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
  font-size: clamp(1.15rem, 2.8vw, 1.3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 0.35rem;
  overflow-wrap: break-word;
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
  overflow-wrap: break-word;
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

.project-card__cta {
  display: none;
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

@media (max-width: 767px) {
  .projects-intro {
    margin-bottom: 1.15rem;
  }

  .project-feature {
    margin-bottom: 2rem;
  }

  .project-grid {
    gap: 2rem;
  }

  .project-card__body {
    padding-top: 0.9rem;
  }

  .project-card__title {
    margin-bottom: 0.4rem;
    font-size: clamp(1.25rem, 5.2vw, 1.4rem);
    line-height: 1.25;
  }

  .project-card__type {
    font-size: 0.875rem;
  }

  .project-card__tags {
    margin-top: 0.7rem;
    gap: 0.35rem 0.65rem;
    font-size: 0.72rem;
    letter-spacing: 0.03em;
  }

  .project-card__cta {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    margin-top: 0.35rem;
    font-size: 0.9375rem;
    font-weight: 550;
    color: var(--color-accent);
  }

  .project-card__preview-hint {
    display: none;
    position: absolute;
    right: 0.65rem;
    bottom: 0.65rem;
    z-index: 2;
    margin: 0;
    padding: 0.28rem 0.55rem;
    border-radius: 6px;
    background: rgba(243, 245, 248, 0.92);
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    font-size: 0.6875rem;
    letter-spacing: 0.02em;
    pointer-events: none;
  }

  @media (hover: none), (pointer: coarse) {
    .project-card__preview-hint {
      display: inline-flex;
    }
  }
}
</style>
