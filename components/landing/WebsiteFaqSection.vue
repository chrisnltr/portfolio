<template>
  <section
    id="faq"
    class="wl-faq"
    aria-labelledby="website-faq-title"
  >
    <div class="container-page wl-faq__inner">
      <header class="wl-faq__intro">
        <p class="wl-faq__eyebrow">Häufige Fragen</p>
        <h2 id="website-faq-title" class="wl-faq__title">
          Was Sie vor dem Start wissen möchten.
        </h2>
        <p class="wl-faq__lead">
          Hier finden Sie Antworten auf die häufigsten Fragen rund um die
          Planung und Umsetzung Ihrer neuen Website.
        </p>
      </header>

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
              <span class="wl-faq__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { websiteLandingFaqItems } from "~/data/websiteLanding";

const items = websiteLandingFaqItems;
const openId = ref(items[0]?.id ?? "");

function triggerId(id: string) {
  return `website-faq-trigger-${id}`;
}

function panelId(id: string) {
  return `website-faq-panel-${id}`;
}

function toggle(id: string) {
  openId.value = openId.value === id ? "" : id;
}
</script>

<style scoped>
.wl-faq {
  padding-block: clamp(3rem, 6vw, 5rem);
  background:
    linear-gradient(
      180deg,
      rgba(243, 245, 248, 0) 0%,
      rgba(232, 238, 246, 0.45) 48%,
      rgba(243, 245, 248, 0) 100%
    );
}

.wl-faq__inner {
  display: grid;
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: start;
}

.wl-faq__intro {
  display: grid;
  gap: 0.85rem;
  max-width: 28rem;
}

.wl-faq__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wl-faq__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.5vw, 2.45rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  text-wrap: balance;
}

.wl-faq__lead {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-faq__list {
  display: grid;
  gap: 0.7rem;
  min-width: 0;
}

.wl-faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: 0 6px 18px rgba(18, 26, 38, 0.04);
  overflow: clip;
}

.wl-faq__question-heading {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

.wl-faq__trigger {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.85rem;
  align-items: start;
  width: 100%;
  margin: 0;
  padding: 1rem 1.05rem;
  border: 0;
  background: transparent;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  font: inherit;
  transition: background var(--duration-fast) var(--ease-out);
}

.wl-faq__trigger:hover {
  background: rgba(47, 102, 255, 0.035);
}

.wl-faq__trigger:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: -2px;
  border-radius: inherit;
}

.wl-faq__question-text {
  font-family: var(--font-display);
  font-size: 1.02rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.35;
  text-wrap: balance;
}

.wl-faq__icon {
  display: inline-grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  flex-shrink: 0;
  margin-top: 0.05rem;
  border-radius: 8px;
  border: 1px solid rgba(47, 102, 255, 0.2);
  background: var(--color-accent-surface);
  color: var(--color-accent);
  transition:
    transform 0.22s var(--ease-out),
    background 0.22s var(--ease-out),
    border-color 0.22s var(--ease-out);
}

.wl-faq__icon svg {
  width: 0.95rem;
  height: 0.95rem;
}

.wl-faq__item[data-open="true"] .wl-faq__icon {
  transform: rotate(45deg);
  background: rgba(47, 102, 255, 0.14);
  border-color: rgba(47, 102, 255, 0.32);
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
}

.wl-faq__answer {
  margin: 0;
  padding: 0 1.05rem 1.1rem;
  max-width: 42rem;
  font-size: 0.96rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

@media (min-width: 960px) {
  .wl-faq__inner {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr);
    gap: clamp(2rem, 4vw, 3.5rem);
  }

  .wl-faq__intro {
    position: sticky;
    top: calc(var(--header-height) + 1.25rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .wl-faq__icon,
  .wl-faq__panel,
  .wl-faq__trigger {
    transition: none;
  }
}
</style>
