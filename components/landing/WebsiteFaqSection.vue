<template>
  <section
    id="faq"
    class="wl-faq"
    aria-labelledby="website-faq-title"
  >
    <div class="container-page">
      <header class="wl-faq__intro">
        <p class="wl-faq__eyebrow">Häufige Fragen</p>
        <h2 id="website-faq-title" class="wl-faq__title">
          Klare Antworten zu Planung, Ablauf und Zusammenarbeit.
        </h2>
        <p class="wl-faq__lead">
          Die wichtigsten Fragen rund um Website-Projekte – verständlich und
          ohne Fachchinesisch.
        </p>
      </header>

      <div class="wl-faq__body">
        <div class="wl-faq__list" role="list">
          <div
            v-for="item in items"
            :key="item.id"
            class="wl-faq__item"
            role="listitem"
            :data-open="openId === item.id ? 'true' : 'false'"
          >
            <h3 class="wl-faq__question-heading">
              <button
                type="button"
                class="wl-faq__trigger"
                :id="triggerId(item.id)"
                :aria-expanded="openId === item.id"
                :aria-controls="panelId(item.id)"
                @click="toggle(item.id)"
              >
                <span class="wl-faq__question-text">{{ item.question }}</span>
                <span class="wl-faq__chevron" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              :id="panelId(item.id)"
              class="wl-faq__panel"
              role="region"
              :aria-labelledby="triggerId(item.id)"
              :hidden="openId !== item.id"
            >
              <div class="wl-faq__panel-inner">
                <p class="wl-faq__answer">{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>

        <aside class="wl-faq__contact" aria-labelledby="website-faq-contact-title">
          <div class="wl-faq__contact-copy">
            <h3 id="website-faq-contact-title" class="wl-faq__contact-title">
              Ihre Frage ist nicht dabei?
            </h3>
          </div>

          <NuxtLink
            :to="contactTo"
            class="btn-cta wl-faq__cta"
            @click="onContactCta"
          >
            <span>Kostenloses Erstgespräch starten</span>
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useWebsiteContactLink } from "~/composables/useWebsiteContactLink";
import { websiteLandingFaqItems } from "~/data/websiteLanding";
import { trackWebsiteCta } from "~/utils/funnelTracking";

const { track } = useAnalytics();
const { contactTo } = useWebsiteContactLink();

const items = websiteLandingFaqItems;
const openId = ref("");

function triggerId(id: string) {
  return `website-faq-trigger-${id}`;
}

function panelId(id: string) {
  return `website-faq-panel-${id}`;
}

function toggle(id: string) {
  openId.value = openId.value === id ? "" : id;
}

function onContactCta() {
  trackWebsiteCta(track, "unknown");
}
</script>

<style scoped>
.wl-faq {
  padding-block: clamp(3rem, 6vw, 5rem);
  background: transparent;
}

.wl-faq__intro {
  max-width: 40rem;
  margin-inline: auto;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  text-align: center;
}

.wl-faq__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wl-faq__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.6vw, 2.55rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  text-wrap: balance;
}

.wl-faq__lead {
  margin: 0.85rem auto 0;
  max-width: 36rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-faq__body {
  max-width: 40rem;
  margin-inline: auto;
}

.wl-faq__list {
  border-top: 1px solid var(--color-border);
  min-width: 0;
}

.wl-faq__item {
  border-bottom: 1px solid var(--color-border);
}

.wl-faq__question-heading {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

.wl-faq__trigger {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 1rem 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  font: inherit;
}

.wl-faq__trigger:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.wl-faq__question-text {
  font-family: var(--font-display);
  font-size: clamp(0.98rem, 1.5vw, 1.05rem);
  font-weight: 650;
  letter-spacing: -0.015em;
  line-height: 1.4;
  text-wrap: pretty;
}

.wl-faq__chevron {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--color-text-muted);
  transition: transform 0.26s var(--ease-out);
}

.wl-faq__chevron svg {
  width: 1.1rem;
  height: 1.1rem;
}

.wl-faq__item[data-open="true"] .wl-faq__chevron {
  transform: rotate(180deg);
  color: var(--color-accent);
}

.wl-faq__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s var(--ease-out);
}

.wl-faq__item[data-open="true"] .wl-faq__panel {
  grid-template-rows: 1fr;
}

.wl-faq__panel[hidden] {
  display: grid;
}

.wl-faq__panel-inner {
  overflow: hidden;
  min-height: 0;
  opacity: 0;
  transition: opacity 0.24s var(--ease-out);
}

.wl-faq__item[data-open="true"] .wl-faq__panel-inner {
  opacity: 1;
}

.wl-faq__answer {
  margin: 0;
  padding: 0 0 1rem;
  max-width: 36rem;
  font-size: 0.96rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.wl-faq__contact {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

.wl-faq__contact-copy {
  display: grid;
  gap: 0.35rem;
  min-width: 0;
}

.wl-faq__contact-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.3;
  color: var(--color-text);
}

.wl-faq__cta {
  justify-self: start;
}

@media (min-width: 640px) {
  .wl-faq__contact {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.25rem 1.5rem;
  }
}

@media (max-width: 767px) {
  .wl-faq__trigger {
    align-items: start;
    padding: 0.9rem 0;
    min-height: 44px;
  }

  .wl-faq__chevron {
    margin-top: 0.15rem;
  }

  .wl-faq__cta {
    justify-self: stretch;
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wl-faq__chevron,
  .wl-faq__panel,
  .wl-faq__panel-inner {
    transition: none;
  }
}
</style>
