<template>
  <section id="referenzen" class="section-pad references">
    <div class="container-page">
      <div ref="introEl" class="references__intro reveal">
        <h2 class="section-heading">{{ copy.title }}</h2>
        <p class="section-lead">{{ copy.subtitle }}</p>
      </div>

      <div ref="listEl" class="references__list">
        <article
          v-for="(ref, index) in cards"
          :key="ref.id"
          class="reference-row reveal"
          :class="{
            'reference-row--reverse': index % 2 === 1,
            'reveal--delay-1': index === 1,
            'reveal--delay-2': index === 2,
          }"
          :style="rowAccentStyle(ref.project)"
        >
          <div
            class="reference-row__visual"
            :class="{
              'reference-row__visual--compact':
                !ref.project.images.length && !ref.project.previewImage,
            }"
          >
            <ProjectBrowserShowcase
              :title="ref.copy.title"
              :label="copy.statusLabel"
              :meta="ref.copy.status"
              :images="ref.project.images"
              :scroll-image="ref.project.previewImage || null"
              :preview-id="`ref-scroll-${ref.project.slug}`"
              compact
              :show-asset-note="
                !ref.project.images.length && !ref.project.previewImage
              "
              :pending-badge="copy.inDevelopmentBadge"
            />
          </div>
          <div class="reference-row__copy">
            <span class="status-label">{{ ref.copy.status }}</span>
            <h3 class="reference-row__title">{{ ref.copy.title }}</h3>
            <div>
              <p class="reference-row__label">{{ copy.situationLabel }}</p>
              <p class="reference-row__text">{{ ref.copy.situation }}</p>
            </div>
            <div>
              <p class="reference-row__label">{{ copy.areasLabel }}</p>
              <ul class="reference-row__tags">
                <li
                  v-for="area in ref.copy.areas.slice(0, 5)"
                  :key="area"
                >
                  {{ area }}
                </li>
              </ul>
            </div>
            <NuxtLink
              :to="projectDetailPath(ref.project.routeSlug)"
              class="reference-row__link"
            >
              {{ copy.viewCaseStudy }}
              <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ProjectBrowserShowcase from "~/components/projects/ProjectBrowserShowcase.vue";
import { useI18n } from "~/composables/useI18n";
import { useReveal } from "~/composables/useReveal";
import { projectDetailPath } from "~/data/navigation";
import { getProjectBySlug } from "~/data/projects";
import type { ProjectReferenceId } from "~/types/i18n";
import type { ProjectCaseStudy } from "~/types/content";

const { messages } = useI18n();

const copy = computed(() => messages.value.projectReferences);

const referenceOrder: ProjectReferenceId[] = [
  "stallzentrale",
  "ls-aktivstall",
  "cantus-halle",
];

const cards = computed(() =>
  referenceOrder
    .map((id) => {
      const project = getProjectBySlug(id);
      if (!project) return null;
      return {
        id,
        project: project as ProjectCaseStudy,
        copy: copy.value.items[id],
      };
    })
    .filter(Boolean) as Array<{
    id: ProjectReferenceId;
    project: ProjectCaseStudy;
    copy: (typeof copy.value.items)[ProjectReferenceId];
  }>,
);

function rowAccentStyle(project: ProjectCaseStudy) {
  if (!project.accent) return undefined;
  return { "--ref-accent": project.accent } as Record<string, string>;
}

const { el: introEl } = useReveal();
const listEl = ref<HTMLElement | null>(null);

onMounted(() => {
  const root = listEl.value;
  if (!root) return;
  const rows = root.querySelectorAll<HTMLElement>(".reference-row");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  rows.forEach((row) => {
    if (reduced) {
      row.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          row.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(row);
  });
});
</script>

<style scoped>
.references {
  position: relative;
  background: transparent;
}

.references::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 52% 38% at 24% 32%,
    rgba(47, 102, 255, 0.05),
    transparent 72%
  );
}

.references > .container-page {
  position: relative;
  z-index: 1;
}

.references__intro {
  max-width: 40rem;
  margin-bottom: clamp(1.25rem, 2.5vw, 1.75rem);
}

.reference-row {
  display: grid;
  gap: clamp(1.25rem, 2.5vw, 1.75rem);
  align-items: center;
  padding-block: clamp(1.1rem, 2.2vw, 1.55rem);
  border-top: 1px solid var(--color-border);
}

.reference-row:first-child {
  border-top: none;
  padding-top: 0;
}

@media (min-width: 1024px) {
  .reference-row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(1.75rem, 3.5vw, 2.75rem);
  }

  .reference-row--reverse .reference-row__visual {
    order: 2;
  }

  .reference-row--reverse .reference-row__copy {
    order: 1;
  }
}

.reference-row__copy {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
}

.reference-row__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 4.5vw, 1.7rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-text);
  overflow-wrap: anywhere;
}

.reference-row__label {
  margin: 0;
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.reference-row__text {
  margin: 0.35rem 0 0;
  font-size: clamp(0.92rem, 1.05vw, 0.98rem);
  line-height: 1.62;
  color: var(--color-text-muted);
  max-width: 36rem;
}

.reference-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
}

.reference-row__tags li {
  padding: 0.28rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--ref-accent, var(--color-accent)) 40%, transparent);
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background: color-mix(in srgb, var(--ref-accent, var(--color-accent)) 10%, transparent);
}

.reference-row__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  gap: 0.35rem;
  font-size: 0.95rem;
  font-weight: 550;
  color: var(--ref-accent, var(--color-accent));
  text-decoration: none;
  transition: color 180ms var(--ease-out), gap 180ms var(--ease-out);
}

.reference-row__link:hover {
  color: color-mix(in srgb, var(--ref-accent, var(--color-accent)) 82%, white);
  gap: 0.55rem;
}

.reference-row__visual :deep(.showcase__frame) {
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
}

.reference-row__visual :deep(.showcase__media),
.reference-row__visual :deep(.showcase__editorial) {
  aspect-ratio: 16 / 10;
}

.reference-row__visual--compact :deep(.showcase__media),
.reference-row__visual--compact :deep(.showcase__editorial) {
  aspect-ratio: 16 / 11;
  max-height: 320px;
}

.reveal {
  opacity: 0;
  transform: translateY(1.1rem);
  transition:
    opacity 620ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal--delay-1 {
  transition-delay: 80ms;
}

.reveal--delay-2 {
  transition-delay: 140ms;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
