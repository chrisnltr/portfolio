<template>
  <section
    id="ablauf"
    ref="sectionEl"
    class="wl-process"
    aria-labelledby="website-process-title"
    @mouseenter="setPaused(true)"
    @mouseleave="setPaused(false)"
    @focusin="setPaused(true)"
    @focusout="onSectionFocusOut"
  >
    <div class="container-page">
      <header class="wl-process__header">
        <div class="wl-process__intro">
          <p class="wl-process__eyebrow">Ablauf</p>
          <h2 id="website-process-title" class="wl-process__title">
            Von der ersten Anfrage bis zur fertigen Website.
          </h2>
        </div>
      </header>

      <!-- Desktop tab navigation -->
      <div
        class="wl-process__desktop"
        role="tablist"
        aria-label="Projektablauf"
      >
        <button
          v-for="(step, index) in steps"
          :key="`tab-${step.id}`"
          :id="tabId(index)"
          ref="tabRefs"
          type="button"
          role="tab"
          class="wl-process__tab"
          :class="{ 'wl-process__tab--active': activeIndex === index }"
          :aria-selected="activeIndex === index"
          :aria-controls="panelId(index)"
          :tabindex="activeIndex === index ? 0 : -1"
          @click="selectStep(index)"
          @keydown="onTabKeydown($event, index)"
        >
          <span class="wl-process__tab-num">{{ stepNumber(index) }}</span>
          <span class="wl-process__tab-label">{{ step.tabTitle }}</span>
          <span class="wl-process__tab-track" aria-hidden="true">
            <span
              class="wl-process__tab-progress"
              :class="{
                'wl-process__tab-progress--active': activeIndex === index,
                'wl-process__tab-progress--paused': isPaused || prefersReducedMotion,
              }"
              :key="activeIndex === index ? progressCycle : `idle-${index}`"
            />
          </span>
        </button>
      </div>

      <!-- Mobile accordion -->
      <ol class="wl-process__mobile" aria-label="Projektablauf">
        <li
          v-for="(step, index) in steps"
          :key="`mobile-${step.id}`"
          class="wl-process__mobile-item"
          :class="{ 'wl-process__mobile-item--active': activeIndex === index }"
        >
          <button
            type="button"
            class="wl-process__mobile-trigger"
            :aria-expanded="activeIndex === index"
            :aria-controls="panelId(index)"
            @click="selectStep(index)"
          >
            <span class="wl-process__mobile-num" aria-hidden="true">
              {{ stepNumber(index) }}
            </span>
            <span class="wl-process__mobile-title">{{ step.tabTitle }}</span>
          </button>

          <div
            v-show="activeIndex === index"
            :id="panelId(index)"
            class="wl-process__mobile-panel"
            role="region"
            :aria-labelledby="tabId(index)"
          >
            <p class="wl-process__mobile-body">{{ step.description }}</p>
            <p class="wl-process__mobile-note">{{ step.note }}</p>
            <div class="wl-process__mobile-visual" aria-hidden="true">
              <img
                class="wl-process__illustration wl-process__illustration--mobile"
                :src="step.image"
                :alt="step.imageAlt"
                width="300"
                height="300"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </li>
      </ol>

      <!-- Desktop spotlight panel -->
      <div
        class="wl-process__spotlight"
        role="tabpanel"
        :id="panelId(activeIndex)"
        :aria-labelledby="tabId(activeIndex)"
      >
        <div class="wl-process__spotlight-grid">
          <div class="wl-process__spotlight-copy">
            <div class="wl-process__spotlight-stages">
              <div
                v-for="(step, index) in steps"
                :key="`copy-${step.id}`"
                class="wl-process__step-layer"
                :class="{ 'wl-process__step-layer--active': activeIndex === index }"
                :aria-hidden="activeIndex !== index"
              >
                <p class="wl-process__step-label">
                  Schritt {{ index + 1 }}
                </p>
                <h3 class="wl-process__step-title">{{ step.title }}</h3>
                <p class="wl-process__step-body">{{ step.description }}</p>
                <p class="wl-process__step-note">{{ step.note }}</p>
              </div>
            </div>

            <div class="wl-process__nav">
              <button
                type="button"
                class="wl-process__nav-btn"
                :disabled="activeIndex === 0"
                :aria-label="prevLabel"
                @click="goPrev"
              >
                Zurück
              </button>
              <button
                type="button"
                class="wl-process__nav-btn wl-process__nav-btn--next"
                :disabled="activeIndex === steps.length - 1"
                :aria-label="nextLabel"
                @click="goNext"
              >
                Weiter
              </button>
            </div>
          </div>

          <div class="wl-process__spotlight-visual" aria-hidden="true">
            <span class="wl-process__watermark">
              {{ stepNumber(activeIndex) }}
            </span>
            <div
              v-for="(step, index) in steps"
              :key="`visual-${step.id}`"
              class="wl-process__visual-layer"
              :class="{ 'wl-process__visual-layer--active': activeIndex === index }"
            >
              <img
                class="wl-process__illustration"
                :src="step.image"
                :alt="step.imageAlt"
                width="420"
                height="420"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { websiteLandingProcessSteps } from "~/data/websiteLanding";

const AUTO_DURATION_MS = 7000;

const steps = websiteLandingProcessSteps;
const sectionEl = ref<HTMLElement | null>(null);
const tabRefs = ref<(HTMLButtonElement | null)[]>([]);
const activeIndex = ref(0);
const isPaused = ref(false);
const prefersReducedMotion = ref(true);
const progressCycle = ref(0);

let timerId: ReturnType<typeof setTimeout> | null = null;

const prevLabel = computed(() => {
  if (activeIndex.value <= 0) return "Zurück - nicht verfügbar";
  return `Zurück zu Schritt ${activeIndex.value}: ${steps[activeIndex.value - 1]?.tabTitle}`;
});

const nextLabel = computed(() => {
  if (activeIndex.value >= steps.length - 1) return "Weiter - nicht verfügbar";
  return `Weiter zu Schritt ${activeIndex.value + 2}: ${steps[activeIndex.value + 1]?.tabTitle}`;
});

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function tabId(index: number) {
  return `website-process-tab-${index}`;
}

function panelId(index: number) {
  return `website-process-panel-${index}`;
}

function clearTimer() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
}

function scheduleAutoAdvance() {
  clearTimer();
  if (prefersReducedMotion.value || isPaused.value) return;
  if (typeof document !== "undefined" && document.hidden) return;

  timerId = setTimeout(() => {
    const next = (activeIndex.value + 1) % steps.length;
    selectStep(next);
  }, AUTO_DURATION_MS);
}

function selectStep(index: number) {
  if (index < 0 || index >= steps.length) return;
  activeIndex.value = index;
  progressCycle.value += 1;
  scheduleAutoAdvance();
}

function goPrev() {
  if (activeIndex.value > 0) selectStep(activeIndex.value - 1);
}

function goNext() {
  if (activeIndex.value < steps.length - 1) selectStep(activeIndex.value + 1);
}

function setPaused(value: boolean) {
  isPaused.value = value;
  if (value) {
    clearTimer();
  } else {
    scheduleAutoAdvance();
  }
}

function onSectionFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null;
  if (next && sectionEl.value?.contains(next)) return;
  setPaused(false);
}

function onTabKeydown(event: KeyboardEvent, index: number) {
  let target = index;

  switch (event.key) {
    case "ArrowRight":
      target = (index + 1) % steps.length;
      break;
    case "ArrowLeft":
      target = (index - 1 + steps.length) % steps.length;
      break;
    case "Home":
      target = 0;
      break;
    case "End":
      target = steps.length - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  selectStep(target);
  tabRefs.value[target]?.focus();
}

function onVisibilityChange() {
  if (document.hidden) {
    clearTimer();
  } else {
    scheduleAutoAdvance();
  }
}

let motionQuery: MediaQueryList | null = null;

const onMotionChange = (event: MediaQueryListEvent) => {
  prefersReducedMotion.value = event.matches;
  if (event.matches) {
    clearTimer();
  } else {
    scheduleAutoAdvance();
  }
};

onMounted(() => {
  if (typeof window === "undefined") return;

  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  prefersReducedMotion.value = motionQuery.matches;

  motionQuery.addEventListener("change", onMotionChange);
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (!prefersReducedMotion.value) {
    scheduleAutoAdvance();
  }
});

onBeforeUnmount(() => {
  clearTimer();
  motionQuery?.removeEventListener("change", onMotionChange);
  document.removeEventListener("visibilitychange", onVisibilityChange);
});

watch(isPaused, (paused) => {
  if (!paused && !prefersReducedMotion.value) {
    scheduleAutoAdvance();
  }
});
</script>

<style scoped>
.wl-process {
  --wl-process-blue: #3867ff;
  --wl-process-navy: #0b1d35;
  --wl-process-ice: #f3f7fc;
  --wl-process-muted: #8a9bb5;
  --wl-process-track: rgba(138, 155, 181, 0.28);
  --wl-process-auto-duration: 7s;
  --wl-process-transition: 280ms var(--ease-out);

  padding-block: clamp(3rem, 6vw, 5rem);
  background: linear-gradient(
    180deg,
    rgba(243, 247, 252, 0.85) 0%,
    rgba(243, 245, 248, 0.35) 100%
  );
}

.wl-process__header {
  display: grid;
  gap: 1rem;
  margin-bottom: clamp(2.25rem, 4.5vw, 3.5rem);
}

.wl-process__intro {
  max-width: 36rem;
}

.wl-process__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--wl-process-blue);
}

.wl-process__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.6vw, 2.55rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  text-wrap: balance;
}

/* Desktop tabs */
.wl-process__desktop {
  display: none;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.35rem;
  margin-bottom: 1.25rem;
}

.wl-process__tab {
  position: relative;
  display: grid;
  gap: 0.35rem;
  align-content: start;
  min-height: 4.75rem;
  padding: 0.65rem 0.5rem 0.85rem;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition:
    color var(--wl-process-transition),
    background-color var(--wl-process-transition);
}

.wl-process__tab:hover {
  background: rgba(255, 255, 255, 0.55);
}

.wl-process__tab-num {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--wl-process-muted);
  transition: color var(--wl-process-transition);
}

.wl-process__tab-label {
  font-size: 0.92rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  line-height: 1.25;
  color: var(--wl-process-muted);
  transition: color var(--wl-process-transition);
}

.wl-process__tab--active .wl-process__tab-num,
.wl-process__tab--active .wl-process__tab-label {
  color: var(--wl-process-blue);
}

.wl-process__tab-track {
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0.35rem;
  height: 2px;
  border-radius: 999px;
  background: var(--wl-process-track);
  overflow: hidden;
}

.wl-process__tab-progress {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--wl-process-blue);
  transform: scaleX(0);
  transform-origin: left center;
}

.wl-process__tab-progress--active {
  animation: wl-process-tab-progress var(--wl-process-auto-duration) linear forwards;
}

.wl-process__tab-progress--paused {
  animation-play-state: paused;
}

@keyframes wl-process-tab-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Mobile accordion */
.wl-process__mobile {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.wl-process__mobile::before {
  content: "";
  position: absolute;
  left: 1.1rem;
  top: 1.75rem;
  bottom: 1.75rem;
  width: 1px;
  background: var(--wl-process-track);
}

.wl-process__mobile-item {
  position: relative;
  padding-left: 0.15rem;
}

.wl-process__mobile-item + .wl-process__mobile-item {
  margin-top: 0.35rem;
}

.wl-process__mobile-trigger {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  min-height: 2.75rem;
  padding: 0.55rem 0.35rem;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background-color var(--wl-process-transition);
}

.wl-process__mobile-trigger:hover {
  background: rgba(255, 255, 255, 0.6);
}

.wl-process__mobile-num {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  border: 1px solid var(--wl-process-track);
  background: var(--color-surface);
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--wl-process-muted);
  transition:
    color var(--wl-process-transition),
    border-color var(--wl-process-transition);
}

.wl-process__mobile-item--active .wl-process__mobile-num {
  border-color: rgba(56, 103, 255, 0.35);
  color: var(--wl-process-blue);
}

.wl-process__mobile-title {
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 680;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--color-text);
}

.wl-process__mobile-panel {
  padding: 0 0 1rem 3.05rem;
}

.wl-process__mobile-body {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wl-process__mobile-note {
  margin: 0.65rem 0 0;
  width: fit-content;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(56, 103, 255, 0.08);
  font-size: 0.82rem;
  font-weight: 650;
  color: var(--wl-process-blue);
}

.wl-process__mobile-visual {
  margin-top: 0.85rem;
}

.wl-process__illustration {
  display: block;
  width: min(100%, 26rem);
  height: auto;
  margin-inline: auto;
  object-fit: contain;
}

.wl-process__illustration--mobile {
  width: min(100%, 16rem);
}

/* Desktop spotlight */
.wl-process__spotlight {
  display: none;
  border-radius: 26px;
  border: 1px solid rgba(138, 155, 181, 0.22);
  background: linear-gradient(145deg, #ffffff 0%, var(--wl-process-ice) 100%);
  box-shadow: 0 14px 40px rgba(11, 29, 53, 0.05);
  overflow: hidden;
}

.wl-process__spotlight-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  align-items: center;
  padding: clamp(1.75rem, 3vw, 2.5rem);
}

.wl-process__spotlight-copy {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.25rem;
}

.wl-process__spotlight-stages {
  display: grid;
}

.wl-process__step-layer {
  grid-area: 1 / 1;
  display: grid;
  gap: 0.65rem;
  align-content: start;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition:
    opacity var(--wl-process-transition),
    transform var(--wl-process-transition),
    visibility var(--wl-process-transition);
}

.wl-process__step-layer--active {
  opacity: 1;
  visibility: visible;
  transform: none;
}

.wl-process__step-label {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--wl-process-muted);
}

.wl-process__step-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.2vw, 1.65rem);
  font-weight: 730;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--wl-process-navy);
}

.wl-process__step-body {
  margin: 0;
  max-width: 34rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-process__step-note {
  margin: 0.15rem 0 0;
  width: fit-content;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  background: rgba(56, 103, 255, 0.08);
  font-size: 0.84rem;
  font-weight: 650;
  color: var(--wl-process-blue);
}

.wl-process__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.wl-process__nav-btn {
  min-height: 2.5rem;
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(138, 155, 181, 0.35);
  background: rgba(255, 255, 255, 0.72);
  color: var(--wl-process-navy);
  font-size: 0.88rem;
  font-weight: 650;
  cursor: pointer;
  transition:
    border-color var(--wl-process-transition),
    color var(--wl-process-transition),
    background-color var(--wl-process-transition),
    opacity var(--wl-process-transition);
}

.wl-process__nav-btn:hover:not(:disabled) {
  border-color: rgba(56, 103, 255, 0.35);
  color: var(--wl-process-blue);
}

.wl-process__nav-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.wl-process__nav-btn--next:not(:disabled) {
  border-color: rgba(56, 103, 255, 0.28);
  background: rgba(56, 103, 255, 0.06);
  color: var(--wl-process-blue);
}

.wl-process__spotlight-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 14rem;
  overflow: hidden;
}

.wl-process__watermark {
  position: absolute;
  inset: auto 0 0 auto;
  font-family: var(--font-display);
  font-size: clamp(5rem, 12vw, 9rem);
  font-weight: 750;
  letter-spacing: -0.06em;
  line-height: 0.85;
  color: var(--wl-process-navy);
  opacity: 0.05;
  pointer-events: none;
  user-select: none;
}

.wl-process__visual-layer {
  grid-area: 1 / 1;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: translateY(8px) scale(0.98);
  transition:
    opacity var(--wl-process-transition),
    transform var(--wl-process-transition);
}

.wl-process__visual-layer--active {
  opacity: 1;
  transform: none;
}

@media (min-width: 960px) {
  .wl-process__desktop,
  .wl-process__spotlight {
    display: grid;
  }

  .wl-process__mobile {
    display: none;
  }
}

@media (max-width: 959px) {
  .wl-process__spotlight {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wl-process__tab-progress--active {
    animation: none;
    transform: scaleX(1);
  }

  .wl-process__step-layer,
  .wl-process__visual-layer {
    transition: none;
  }

  .wl-process__step-layer:not(.wl-process__step-layer--active),
  .wl-process__visual-layer:not(.wl-process__visual-layer--active) {
    opacity: 0;
    visibility: hidden;
    transform: none;
  }
}
</style>
