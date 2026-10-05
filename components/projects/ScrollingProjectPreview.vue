<template>
  <div
    ref="viewportRef"
    class="preview"
    :class="{
      'can-scroll': canScroll,
      'is-preview-active': isPreviewActive,
      'preview--fill': fill,
      'preview--interactive': isTouchInteractive,
    }"
    :role="isTouchInteractive ? 'button' : undefined"
    :tabindex="isTouchInteractive ? 0 : undefined"
    :aria-pressed="isTouchInteractive ? isPreviewActive : undefined"
    :aria-label="isTouchInteractive ? previewLabel : undefined"
    style="touch-action: pan-y"
    @pointerdown="gesture.onPointerDown"
    @pointermove="gesture.onPointerMove"
    @pointerup="gesture.onPointerUp"
    @pointercancel="gesture.onPointerCancel"
    @click="gesture.onClick"
    @keydown="onKeydown"
  >
    <img
      v-if="image"
      ref="imageRef"
      :src="image.src"
      :alt="altText"
      :width="image.width"
      :height="image.height"
      class="preview__image"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      decoding="async"
      draggable="false"
      @load="measure"
    />
    <div v-else class="preview__empty" aria-hidden="true">
      <span>{{ title }}</span>
    </div>

    <div
      v-if="canScroll"
      class="preview__hint"
      aria-hidden="true"
    >
      <span class="preview__hint-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="8"
            y="3.5"
            width="8"
            height="13"
            rx="4"
            stroke="currentColor"
            stroke-width="1.6"
          />
          <path
            class="preview__hint-wheel"
            d="M12 6.5v3"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
          <path
            d="M10.2 19.2 12 21l1.8-1.8"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="preview__hint-label">{{ hintLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  createTapGesture,
  isFinePointerHover,
  prefersReducedMotion,
  useExclusivePreview,
} from "~/composables/usePreviewInteraction";
import type { ProjectImage } from "~/types/content";

const props = withDefaults(
  defineProps<{
    image?: ProjectImage | null;
    title: string;
    alt?: string;
    priority?: boolean;
    /** Fill parent bounds instead of the default card aspect ratio. */
    fill?: boolean;
    /** Stable id so only one preview stays active at a time. */
    previewId?: string;
  }>(),
  {
    image: null,
    alt: "",
    priority: false,
    fill: false,
    previewId: undefined,
  },
);

const viewportRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const canScroll = ref(false);
const isPreviewActive = ref(false);
const isTouchInteractive = ref(false);
const scrollDistance = ref(0);

let resizeObserver: ResizeObserver | null = null;
let hoverQuery: MediaQueryList | null = null;
let motionQuery: MediaQueryList | null = null;

const { activePreviewId, claim, release } = useExclusivePreview(
  computed(() => props.previewId),
);

const altText = computed(() => props.alt || props.title);

const previewLabel = computed(() =>
  isPreviewActive.value
    ? `Vorschau von ${props.title} zurücksetzen`
    : `Vorschau von ${props.title} anzeigen`,
);

const hintLabel = computed(() =>
  isTouchInteractive.value ? "Antippen zum Scrollen" : "Hover zum Scrollen",
);

function updateCapability() {
  if (!import.meta.client) {
    canScroll.value = false;
    isTouchInteractive.value = false;
    return;
  }
  const reduceMotion = prefersReducedMotion();
  const scrollOk = scrollDistance.value > 1;
  canScroll.value = scrollOk;
  isTouchInteractive.value = scrollOk && !isFinePointerHover();

  if (reduceMotion && isPreviewActive.value) {
    // Keep end-state without long transition (handled via CSS duration vars).
    applyDurations(true);
  }
}

function applyDurations(instant = false) {
  const viewport = viewportRef.value;
  if (!viewport) return;
  const distance = scrollDistance.value;
  const pxPerSecond = 310;
  const duration =
    instant || prefersReducedMotion()
      ? 0
      : distance > 0
        ? Math.min(9, Math.max(4, distance / pxPerSecond))
        : 0;
  const returnDuration = instant || prefersReducedMotion() ? 0 : 1.25;

  viewport.style.setProperty("--preview-scroll-distance", `${distance}px`);
  viewport.style.setProperty("--preview-scroll-duration", `${duration}s`);
  viewport.style.setProperty("--preview-return-duration", `${returnDuration}s`);
}

function measure() {
  const viewport = viewportRef.value;
  const image = imageRef.value;
  if (!viewport || !image) return;

  const viewportHeight = viewport.clientHeight;
  const imageHeight = image.getBoundingClientRect().height;
  const distance = Math.max(0, Math.round(imageHeight - viewportHeight));
  scrollDistance.value = distance;

  applyDurations(false);
  updateCapability();
}

function setPreviewActive(active: boolean) {
  if (!canScroll.value) return;
  if (active) {
    claim();
    applyDurations(prefersReducedMotion());
    isPreviewActive.value = true;
  } else {
    isPreviewActive.value = false;
    release();
  }
}

function togglePreview() {
  setPreviewActive(!isPreviewActive.value);
}

const gesture = createTapGesture({
  shouldIgnore: () => !isTouchInteractive.value,
  onTap: () => {
    togglePreview();
  },
});

function onKeydown(event: KeyboardEvent) {
  if (!isTouchInteractive.value) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  event.stopPropagation();
  togglePreview();
}

function onQueryChange() {
  updateCapability();
  if (isFinePointerHover() && isPreviewActive.value) {
    setPreviewActive(false);
  }
}

watch(activePreviewId, (current) => {
  if (!props.previewId) return;
  if (current !== props.previewId && isPreviewActive.value) {
    isPreviewActive.value = false;
  }
});

onMounted(async () => {
  await nextTick();
  measure();

  if (typeof ResizeObserver !== "undefined" && viewportRef.value) {
    resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(viewportRef.value);
    if (imageRef.value) resizeObserver.observe(imageRef.value);
  }

  hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  hoverQuery.addEventListener("change", onQueryChange);
  motionQuery.addEventListener("change", onQueryChange);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  hoverQuery?.removeEventListener("change", onQueryChange);
  motionQuery?.removeEventListener("change", onQueryChange);
  gesture.reset();
  release();
});

watch(
  () => props.image?.src,
  async () => {
    setPreviewActive(false);
    await nextTick();
    measure();
  },
);
</script>

<style scoped>
.preview {
  --preview-scroll-distance: 0px;
  --preview-scroll-duration: 5s;
  --preview-return-duration: 1.25s;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  max-height: min(52vh, 22rem);
  border-radius: 10px;
  background: #e8eef6;
  border: 1px solid var(--color-border);
}

.preview--fill {
  aspect-ratio: unset;
  max-height: none;
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: none;
}

.preview--interactive {
  cursor: pointer;
}

.preview--interactive:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.preview__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transform: translate3d(0, 0, 0);
  transform-origin: top center;
  transition: transform var(--preview-return-duration) cubic-bezier(0.22, 1, 0.36, 1);
  will-change: auto;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.preview--fill .preview__image {
  height: auto;
  object-fit: unset;
  object-position: unset;
}

.preview.is-preview-active .preview__image {
  transform: translate3d(0, calc(-1 * var(--preview-scroll-distance)), 0);
  transition: transform var(--preview-scroll-duration) linear;
  will-change: transform;
}

@media (hover: hover) and (pointer: fine) {
  .preview.can-scroll:hover .preview__image {
    transform: translate3d(0, calc(-1 * var(--preview-scroll-distance)), 0);
    transition: transform var(--preview-scroll-duration) linear;
    will-change: transform;
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview__image {
    transition: none !important;
  }

  .preview.is-preview-active .preview__image {
    transform: translate3d(0, calc(-1 * var(--preview-scroll-distance)), 0);
  }

  @media (hover: hover) and (pointer: fine) {
    .preview.can-scroll:hover .preview__image {
      transform: translate3d(0, calc(-1 * var(--preview-scroll-distance)), 0);
    }
  }
}

.preview__empty {
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

.preview__hint {
  position: absolute;
  right: 0.7rem;
  bottom: 0.7rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.38rem 0.65rem 0.38rem 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(18, 26, 38, 0.1);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 8px 20px rgba(18, 26, 38, 0.12);
  color: var(--color-text);
  pointer-events: none;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.22s var(--ease-out),
    transform 0.22s var(--ease-out);
}

.preview__hint-icon {
  display: grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 999px;
  background: rgba(47, 102, 255, 0.1);
  color: var(--color-accent);
}

.preview__hint-icon svg {
  width: 0.95rem;
  height: 0.95rem;
}

.preview__hint-label {
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.preview__hint-wheel {
  animation: preview-wheel 1.2s var(--ease-out) infinite;
}

@keyframes preview-wheel {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(2px);
    opacity: 0.45;
  }
}

@media (hover: hover) and (pointer: fine) {
  .preview.can-scroll {
    cursor: ns-resize;
  }

  .preview.can-scroll:hover .preview__hint,
  .preview.is-preview-active .preview__hint {
    opacity: 0;
    transform: translateY(4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview__hint-wheel {
    animation: none;
  }

  .preview__hint {
    transition: none;
  }
}
</style>
