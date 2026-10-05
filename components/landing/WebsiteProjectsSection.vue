<template>
  <section
    id="website-projekte"
    class="wl-projects"
    aria-labelledby="website-projects-title"
  >
    <div class="container-page">
      <header class="wl-projects__intro">
        <p class="wl-projects__eyebrow">Ausgewählte Projekte</p>
        <h2 id="website-projects-title" class="wl-projects__title">
          Websites, die Unternehmen professionell nach außen tragen.
        </h2>
        <p class="wl-projects__lead">
          Ein Einblick in Projekte, bei denen Design, klare Nutzerführung und
          eine saubere technische Umsetzung zusammenkommen.
        </p>
      </header>

      <div class="wl-projects__list">
        <article
          v-for="project in projects"
          :key="project.id"
          class="wl-project"
          :class="`wl-project--media-${project.mediaSide}`"
        >
          <div class="wl-project__media">
            <div
              v-if="project.media.kind === 'image'"
              class="wl-project__browser"
            >
              <div class="wl-project__chrome" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div class="wl-project__screen">
                <img
                  :src="project.media.src"
                  :alt="project.media.alt"
                  :width="project.media.width"
                  :height="project.media.height"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <UiVisualPlaceholder
              v-else
              type="media"
              :badge="project.media.badge"
              :title="project.media.title"
              :description="project.media.description"
              :format-label="project.media.formatLabel"
              :animation-hint="project.media.animationHint"
              :mobile-description="project.media.mobileDescription"
              aspect-ratio="16 / 10"
              replace-hint="Später durch finales Projekt-Asset ersetzen."
            />
          </div>

          <div class="wl-project__copy">
            <p class="wl-project__type">{{ project.positioning }}</p>
            <h3 class="wl-project__name">{{ project.title }}</h3>
            <p class="wl-project__situation">{{ project.situation }}</p>
            <p class="wl-project__description">{{ project.description }}</p>
            <ul class="wl-project__features">
              <li v-for="feature in project.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
            <NuxtLink :to="project.caseStudyPath" class="wl-project__link">
              <span>Case Study ansehen</span>
              <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiVisualPlaceholder from "~/components/ui/VisualPlaceholder.vue";
import { websiteLandingProjects } from "~/data/websiteLanding";

const projects = websiteLandingProjects;
</script>

<style scoped>
.wl-projects {
  padding-block: clamp(3rem, 6vw, 5rem);
  background: transparent;
}

.wl-projects__intro {
  max-width: 40rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.wl-projects__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wl-projects__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.6vw, 2.55rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  text-wrap: balance;
}

.wl-projects__lead {
  margin: 0.85rem 0 0;
  max-width: 36rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-projects__list {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
}

.wl-project {
  display: grid;
  gap: clamp(1.35rem, 3vw, 2.25rem);
  align-items: center;
}

.wl-project__media {
  min-width: 0;
}

.wl-project__browser {
  border: 1px solid var(--color-border-strong);
  border-radius: 14px;
  overflow: hidden;
  background: var(--color-surface);
  box-shadow:
    0 1px 2px rgba(18, 26, 38, 0.05),
    0 16px 40px rgba(18, 26, 38, 0.08);
}

.wl-project__chrome {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid var(--color-border);
  background: #f7f9fc;
}

.wl-project__chrome span {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: rgba(18, 26, 38, 0.14);
}

.wl-project__screen {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-bg-soft);
}

.wl-project__screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.wl-project__copy {
  display: grid;
  gap: 0.7rem;
  min-width: 0;
}

.wl-project__type {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wl-project__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.8vw, 1.9rem);
  font-weight: 750;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--color-text);
}

.wl-project__situation,
.wl-project__description {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wl-project__features {
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

.wl-project__features li {
  position: relative;
  padding-left: 1.15rem;
  font-size: 0.95rem;
  font-weight: 550;
  color: var(--color-text);
  line-height: 1.4;
}

.wl-project__features li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: var(--color-accent);
}

.wl-project__link {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.35rem;
  color: var(--color-accent);
  font-weight: 650;
  text-decoration: none;
  border-radius: 4px;
}

.wl-project__link:hover {
  color: var(--color-accent-hover);
}

.wl-project__link:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: 2px;
}

@media (min-width: 960px) {
  .wl-project {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(2rem, 4vw, 3.25rem);
  }

  .wl-project--media-right .wl-project__media {
    order: 2;
  }

  .wl-project--media-right .wl-project__copy {
    order: 1;
  }
}
</style>
