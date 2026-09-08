<template>
  <div
    ref="rootRef"
    class="cycle"
    :class="{
      'cycle--active': isCycling || activeIndex > 0,
      'cycle--interactive': isTouchInteractive,
    }"
    :role="isTouchInteractive ? 'button' : undefined"
    :tabindex="isTouchInteractive ? 0 : undefined"
    :aria-pressed="isTouchInteractive ? activeIndex > 0 : undefined"
    :aria-label="isTouchInteractive ? previewLabel : undefined"
    style="touch-action: pan-y"
    @pointerenter="onEnter"
    @pointerleave="onLeave"
    @pointerdown="gesture.onPointerDown"
    @pointermove="gesture.onPointerMove"
    @pointerup="gesture.onPointerUp"
    @pointercancel="gesture.onPointerCancel"
    @click="gesture.onClick"
    @keydown="onKeydown"
  >
    <template v-if="slides.length">
      <img
        v-for="(slide, index) in slides"
        :key="slide.src"
        :src="slide.src"
        :alt="index === activeIndex ? altText : ''"
        :width="slide.width"
        :height="slide.height"
        class="cycle__image"
        :class="{ 'is-active': index === activeIndex }"
        :style="imageStyle"
        :loading="priority && index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="priority && index === 0 ? 'high' : undefined"
        decoding="async"
        draggable="false"
        :aria-hidden="index === activeIndex ? undefined : 'true'"
      />
    </template>
    <div v-else class="cycle__empty" aria-hidden="true">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  createTapGesture,
  isFinePointerHover,
  prefersReducedMotion,
  useExclusivePreview,
} from "~/composables/usePreviewInteraction";
import type { ProjectImage } from "~/types/content";

const props = withDefaults(
  defineProps<{
    images?: ProjectImage[];
    title: string;
    alt?: string;
    priority?: boolean;
    /** Delay before jumping from the first to the second slide. */
    firstSwitchMs?: number;
    /** Dwell time for every slide after the first switch. */
    intervalMs?: number;
    /** Stable id so only one preview stays active at a time. */
    previewId?: string;
    fit?: "cover" | "contain";
    objectPosition?: string;
  }>(),
  {
    images: () => [],
    alt: "",
    priority: false,
    firstSwitchMs: 220,
    intervalMs: 2600,
    previewId: undefined,
    fit: "cover",
    objectPosition: "center",
  },
);

const rootRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const isCycling = ref(false);
const isTouchInteractive = ref(false);

let firstTimer: ReturnType<typeof setTimeout> | null = null;
let loopTimer: ReturnType<typeof setInterval> | null = null;
let hoverQuery: MediaQueryList | null = null;

const { activePreviewId, claim, release } = useExclusivePreview(
  computed(() => props.previewId),
);

const slides = computed(() => props.images.filter((image) => Boolean(image?.src)));

const altText = computed(() => {
  if (props.alt) return props.alt;
  return slides.value[activeIndex.value]?.alt || props.title;
});

const previewLabel = computed(() =>
  activeIndex.value > 0
    ? `Weitere Vorschau von ${props.title} anzeigen`
    : `Alternative Vorschau von ${props.title} anzeigen`,
);

const imageStyle = computed(() => ({
  objectFit: props.fit,
  objectPosition: props.objectPosition,
}));

function canHoverCycle() {
  if (!import.meta.client) return false;
  if (slides.value.length < 2) return false;
  return isFinePointerHover() && !prefersReducedMotion();
}

function updateTouchCapability() {
  if (!import.meta.client) {
    isTouchInteractive.value = false;
    return;
  }
  isTouchInteractive.value = slides.value.length >= 2 && !isFinePointerHover();
}

function clearTimers() {
  if (firstTimer) {
    clearTimeout(firstTimer);
    firstTimer = null;
  }
  if (loopTimer) {
    clearInterval(loopTimer);
    loopTimer = null;
  }
}

function stopHoverCycle() {
  clearTimers();
  isCycling.value = false;
}

function resetToFirst() {
  stopHoverCycle();
  activeIndex.value = 0;
  release();
}

function advance() {
  activeIndex.value = (activeIndex.value + 1) % slides.value.length;
}

function startLoop() {
  if (loopTimer) return;
  loopTimer = setInterval(advance, props.intervalMs);
}

function startHoverCycle() {
  stopHoverCycle();
  if (!canHoverCycle()) return;
  claim();
  isCycling.value = true;
  activeIndex.value = 0;

  firstTimer = setTimeout(() => {
    firstTimer = null;
    advance();
    startLoop();
  }, props.firstSwitchMs);
}

function onEnter() {
  if (!canHoverCycle()) return;
  startHoverCycle();
}

function onLeave() {
  if (!isFinePointerHover()) return;
  resetToFirst();
}

function onTouchTap() {
  if (!isTouchInteractive.value) return;
  claim();
  stopHoverCycle();
  if (activeIndex.value >= slides.value.length - 1) {
    activeIndex.value = 0;
    release();
    return;
  }
  activeIndex.value += 1;
}

const gesture = createTapGesture({
  shouldIgnore: () => !isTouchInteractive.value,
  onTap: () => {
    onTouchTap();
  },
});

function onKeydown(event: KeyboardEvent) {
  if (!isTouchInteractive.value) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  event.stopPropagation();
  onTouchTap();
}

function onQueryChange() {
  updateTouchCapability();
  if (isFinePointerHover()) {
    resetToFirst();
  } else {
    stopHoverCycle();
  }
}

watch(activePreviewId, (current) => {
  if (!props.previewId) return;
  if (current !== props.previewId && activeIndex.value !== 0) {
    stopHoverCycle();
    activeIndex.value = 0;
  }
});

onMounted(() => {
  updateTouchCapability();
  hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  hoverQuery.addEventListener("change", onQueryChange);
});

onBeforeUnmount(() => {
  stopHoverCycle();
  gesture.reset();
  release();
  hoverQuery?.removeEventListener("change", onQueryChange);
});
</script>

<style scoped>
.cycle {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  max-height: min(52vh, 22rem);
  border-radius: 10px;
  background: #070a10;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.cycle--interactive {
  cursor: pointer;
}

.cycle--interactive:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.cycle__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity 320ms var(--ease-out);
  will-change: auto;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.cycle__image.is-active {
  opacity: 1;
  z-index: 1;
}

.cycle--active .cycle__image {
  will-change: opacity;
}

.cycle__empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  background: var(--color-surface-raised);
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 650;
}

@media (prefers-reduced-motion: reduce) {
  .cycle__image {
    transition: none;
  }
}
</style>
