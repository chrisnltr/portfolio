<template>
  <div
    ref="rootEl"
    class="consult-visual"
    :class="{
      'consult-visual--revealed': hasRevealed,
      'consult-visual--active': isActive,
      'consult-visual--reduced': prefersReducedMotion,
    }"
  >
    <div class="consult-visual__glow" aria-hidden="true" />

    <svg
      ref="backSvgEl"
      class="consult-visual__lines consult-visual__lines--back"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        class="consult-visual__line consult-visual__line--soft"
        d="M42 400 C 108 338, 146 278, 206 226 S 292 142, 356 108"
        fill="none"
        stroke="#0B1D35"
        stroke-width="0.8"
        stroke-linecap="round"
      />
      <path
        class="consult-visual__line consult-visual__line--quiet"
        d="M28 248 C 102 228, 164 188, 234 156 S 322 118, 384 88"
        fill="none"
        stroke="#3867FF"
        stroke-width="0.75"
        stroke-linecap="round"
      />
    </svg>

    <div class="consult-visual__artwork">
      <div class="consult-visual__reveal">
        <div class="consult-visual__float">
          <img
            class="consult-visual__image"
            src="/images/erstgespraech-visual-transparent.png"
            alt="Abstrakte Darstellung eines Erstgesprächs, das in einen klaren Projektplan übergeht"
            width="864"
            height="1152"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 959px) min(88vw, 20rem), min(38vw, 28rem)"
          >
        </div>
      </div>
    </div>

    <svg
      ref="frontSvgEl"
      class="consult-visual__lines consult-visual__lines--front"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        class="consult-visual__line consult-visual__line--link"
        d="M78 392 C 128 332, 168 278, 218 232 S 300 156, 348 128"
        fill="none"
        stroke="#3867FF"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <path
        class="consult-visual__line consult-visual__line--pulse"
        d="M78 392 C 128 332, 168 278, 218 232 S 300 156, 348 128"
        fill="none"
        stroke="#3867FF"
        stroke-width="1.45"
        stroke-linecap="round"
      />

      <circle
        class="consult-visual__node"
        cx="348"
        cy="128"
        r="3.2"
        fill="#3867FF"
      />

      <circle class="consult-visual__dot consult-visual__dot--1" r="2.1" fill="#3867FF">
        <animateMotion
          path="M78 392 C 128 332, 168 278, 218 232 S 300 156, 348 128"
          dur="7.5s"
          begin="0s"
          repeatCount="indefinite"
          keyPoints="0;0.88;1;1"
          keyTimes="0;0.62;0.72;1"
          calcMode="linear"
        />
      </circle>
      <circle class="consult-visual__dot consult-visual__dot--2" r="1.45" fill="#3867FF">
        <animateMotion
          path="M78 392 C 128 332, 168 278, 218 232 S 300 156, 348 128"
          dur="7.5s"
          begin="2.4s"
          repeatCount="indefinite"
          keyPoints="0;0.88;1;1"
          keyTimes="0;0.62;0.72;1"
          calcMode="linear"
        />
      </circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const rootEl = ref<HTMLElement | null>(null);
const backSvgEl = ref<SVGSVGElement | null>(null);
const frontSvgEl = ref<SVGSVGElement | null>(null);
const hasRevealed = ref(false);
const isActive = ref(false);
const prefersReducedMotion = ref(false);

let visibilityObserver: IntersectionObserver | null = null;
let motionQuery: MediaQueryList | null = null;

function setSvgMotion(running: boolean) {
  for (const svg of [backSvgEl.value, frontSvgEl.value]) {
    if (!svg) continue;
    if (running) {
      svg.unpauseAnimations?.();
    } else {
      svg.pauseAnimations?.();
    }
  }
}

function syncMotionPreference() {
  prefersReducedMotion.value = Boolean(motionQuery?.matches);
  if (prefersReducedMotion.value) {
    hasRevealed.value = true;
    isActive.value = false;
    setSvgMotion(false);
  }
}

watch([isActive, prefersReducedMotion], ([active, reduced]) => {
  setSvgMotion(Boolean(active) && !reduced);
});

onMounted(() => {
  const node = rootEl.value;
  if (!node || typeof window === "undefined") return;

  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  syncMotionPreference();
  motionQuery.addEventListener("change", syncMotionPreference);

  if (prefersReducedMotion.value) {
    setSvgMotion(false);
    return;
  }

  visibilityObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isActive.value = entry.isIntersecting;
        if (entry.isIntersecting) {
          hasRevealed.value = true;
        }
      }
    },
    { threshold: 0.12, rootMargin: "12% 0px" },
  );

  visibilityObserver.observe(node);
});

onBeforeUnmount(() => {
  visibilityObserver?.disconnect();
  motionQuery?.removeEventListener("change", syncMotionPreference);
});
</script>

<style scoped>
.consult-visual {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 28rem;
  margin-inline: auto;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.consult-visual__glow {
  position: absolute;
  inset: 14% 10% 20% 12%;
  z-index: 0;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at 52% 44%,
    rgba(56, 103, 255, 0.12) 0%,
    rgba(243, 247, 252, 0.28) 46%,
    transparent 74%
  );
  pointer-events: none;
  transform-origin: 52% 44%;
  animation: consult-glow-breathe 13s ease-in-out infinite alternate;
  animation-play-state: paused;
}

.consult-visual__lines {
  position: absolute;
  inset: -4% -6%;
  width: 112%;
  height: 112%;
  pointer-events: none;
  overflow: visible;
}

.consult-visual__lines--back {
  z-index: 1;
}

.consult-visual__lines--front {
  z-index: 3;
}

.consult-visual__line {
  opacity: 0.14;
  stroke-dasharray: 9 18;
  animation: consult-line-drift 16s linear infinite;
  animation-play-state: paused;
}

.consult-visual__line--soft {
  opacity: 0.1;
  stroke-dasharray: 5 16;
  animation-duration: 20s;
}

.consult-visual__line--quiet {
  opacity: 0.12;
  stroke-dasharray: 7 20;
  animation-duration: 18s;
  animation-direction: reverse;
}

.consult-visual__line--link {
  opacity: 0.18;
  stroke-dasharray: 11 15;
  animation-duration: 14s;
}

.consult-visual__line--pulse {
  opacity: 0.22;
  stroke-dasharray: 12 240;
  animation-name: consult-line-pulse;
  animation-duration: 7.5s;
}

.consult-visual__node {
  opacity: 0.14;
  pointer-events: none;
  animation: consult-node-glow 7.5s ease-in-out infinite;
  animation-play-state: paused;
}

.consult-visual__dot {
  opacity: 0;
  pointer-events: none;
  animation: consult-dot-fade 7.5s linear infinite;
  animation-play-state: paused;
}

.consult-visual__dot--1 {
  animation-duration: 7.5s;
}

.consult-visual__dot--2 {
  opacity: 0;
  animation-duration: 7.5s;
  animation-delay: 2.4s;
}

.consult-visual--active:not(.consult-visual--reduced) .consult-visual__glow,
.consult-visual--active:not(.consult-visual--reduced) .consult-visual__line,
.consult-visual--active:not(.consult-visual--reduced) .consult-visual__dot,
.consult-visual--active:not(.consult-visual--reduced) .consult-visual__node {
  animation-play-state: running;
}

.consult-visual__artwork {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.consult-visual__reveal {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: translateY(10px) scale(0.99);
  transition:
    opacity 0.6s var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    transform 0.6s var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  will-change: opacity, transform;
}

.consult-visual--revealed .consult-visual__reveal {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.consult-visual__float {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  transform-origin: 50% 48%;
  animation: consult-float 11s ease-in-out 0.6s infinite alternate;
  animation-play-state: paused;
  will-change: transform;
}

.consult-visual--revealed.consult-visual--active:not(.consult-visual--reduced)
  .consult-visual__float {
  animation-play-state: running;
}

.consult-visual__image {
  display: block;
  width: 102%;
  max-width: none;
  height: auto;
  max-height: 102%;
  object-fit: contain;
  object-position: center 50%;
  user-select: none;
  pointer-events: none;
}

@keyframes consult-line-drift {
  to {
    stroke-dashoffset: -160;
  }
}

@keyframes consult-line-pulse {
  to {
    stroke-dashoffset: -280;
  }
}

@keyframes consult-float {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(2px, -5px, 0) scale(1.004);
  }
}

@keyframes consult-glow-breathe {
  from {
    opacity: 0.7;
    transform: scale(0.99);
  }
  to {
    opacity: 1;
    transform: scale(1.02);
  }
}

@keyframes consult-dot-fade {
  0%,
  4% {
    opacity: 0;
  }
  10%,
  58% {
    opacity: 0.9;
  }
  70%,
  100% {
    opacity: 0;
  }
}

@keyframes consult-node-glow {
  0%,
  58% {
    opacity: 0.12;
  }
  68% {
    opacity: 0.58;
  }
  78%,
  100% {
    opacity: 0.12;
  }
}

@media (min-width: 960px) {
  .consult-visual {
    max-width: min(100%, 30rem);
    margin-inline: 0;
  }
}

@media (max-width: 959px) {
  .consult-visual {
    max-width: 20rem;
    aspect-ratio: 5 / 4;
  }

  .consult-visual__image {
    width: 98%;
    max-height: 98%;
  }

  .consult-visual__glow {
    inset: 20% 16% 24% 18%;
    animation: none;
    opacity: 0.5;
  }

  .consult-visual__line--quiet,
  .consult-visual__dot--2 {
    display: none;
  }

  .consult-visual--revealed.consult-visual--active:not(.consult-visual--reduced)
    .consult-visual__float {
    animation-name: consult-float-mobile;
    animation-duration: 12s;
  }
}

@keyframes consult-float-mobile {
  from {
    transform: translate3d(0, 1px, 0) scale(1);
  }
  to {
    transform: translate3d(1px, -3px, 0) scale(1.002);
  }
}

@media (prefers-reduced-motion: reduce) {
  .consult-visual__glow,
  .consult-visual__line,
  .consult-visual__dot,
  .consult-visual__node,
  .consult-visual__float,
  .consult-visual__reveal {
    animation: none !important;
    transition: none !important;
  }

  .consult-visual__reveal {
    opacity: 1;
    transform: none;
  }

  .consult-visual__float {
    transform: none;
  }

  .consult-visual__dot {
    display: none;
  }

  .consult-visual__line {
    opacity: 0.12;
  }

  .consult-visual__node {
    opacity: 0.2;
  }
}
</style>
