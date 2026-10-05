<template>
  <div
    ref="rootEl"
    class="hero-visual"
    :class="{
      'hero-visual--revealed': hasRevealed,
      'hero-visual--active': isActive,
      'hero-visual--reduced': prefersReducedMotion,
    }"
  >
    <div class="hero-visual__glow" aria-hidden="true" />

    <svg
      ref="backSvgEl"
      class="hero-visual__lines hero-visual__lines--back"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        class="hero-visual__line hero-visual__line--a"
        d="M24 430 C 88 350, 68 255, 138 188 S 248 88, 368 62"
        fill="none"
        stroke="#3867FF"
        stroke-width="1.35"
        stroke-linecap="round"
      />
      <path
        class="hero-visual__line hero-visual__line--b"
        d="M8 305 C 78 272, 118 208, 188 168 S 298 118, 392 148"
        fill="none"
        stroke="#3867FF"
        stroke-width="1.05"
        stroke-linecap="round"
      />
      <path
        class="hero-visual__line hero-visual__line--c"
        d="M54 468 C 128 404, 158 308, 222 246 S 312 158, 378 208"
        fill="none"
        stroke="#0B1D35"
        stroke-width="0.85"
        stroke-linecap="round"
      />
      <path
        class="hero-visual__line hero-visual__line--d"
        d="M36 176 C 108 148, 168 118, 238 98 S 328 88, 396 36"
        fill="none"
        stroke="#3867FF"
        stroke-width="0.75"
        stroke-linecap="round"
      />
      <path
        class="hero-visual__line hero-visual__line--e"
        d="M18 360 C 96 318, 148 268, 210 228 S 300 168, 372 188"
        fill="none"
        stroke="#3867FF"
        stroke-width="1.15"
        stroke-linecap="round"
      />
    </svg>

    <div class="hero-visual__artwork">
      <div class="hero-visual__reveal">
        <div class="hero-visual__float">
          <img
            class="hero-visual__image"
            src="/images/website-hero-visual-transparent.png"
            alt="Abstrakte Darstellung einer individuell geplanten responsiven Website"
            width="864"
            height="1152"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            sizes="(max-width: 959px) min(88vw, 22rem), min(42vw, 32rem)"
          >
        </div>
      </div>
    </div>

    <svg
      ref="frontSvgEl"
      class="hero-visual__lines hero-visual__lines--front"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path
        class="hero-visual__line hero-visual__line--front-a"
        d="M42 448 C 102 372, 132 298, 188 238 S 292 148, 356 118"
        fill="none"
        stroke="#3867FF"
        stroke-width="0.9"
        stroke-linecap="round"
      />
      <path
        class="hero-visual__line hero-visual__line--front-b"
        d="M64 120 C 140 148, 196 198, 248 248 S 330 340, 360 410"
        fill="none"
        stroke="#3867FF"
        stroke-width="0.7"
        stroke-linecap="round"
      />

      <circle class="hero-visual__dot hero-visual__dot--1" r="2.2" fill="#3867FF">
        <animateMotion
          path="M24 430 C 88 350, 68 255, 138 188 S 248 88, 368 62"
          dur="11s"
          begin="0s"
          repeatCount="indefinite"
          keyPoints="0;0.78;1;1"
          keyTimes="0;0.72;0.86;1"
          calcMode="linear"
        />
      </circle>
      <circle class="hero-visual__dot hero-visual__dot--2" r="1.7" fill="#3867FF">
        <animateMotion
          path="M8 305 C 78 272, 118 208, 188 168 S 298 118, 392 148"
          dur="13.5s"
          begin="3.2s"
          repeatCount="indefinite"
          keyPoints="0;0.8;1;1"
          keyTimes="0;0.74;0.88;1"
          calcMode="linear"
        />
      </circle>
      <circle class="hero-visual__dot hero-visual__dot--3" r="1.9" fill="#3867FF">
        <animateMotion
          path="M42 448 C 102 372, 132 298, 188 238 S 292 148, 356 118"
          dur="9.5s"
          begin="5.8s"
          repeatCount="indefinite"
          keyPoints="0;0.82;1;1"
          keyTimes="0;0.7;0.85;1"
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

  requestAnimationFrame(() => {
    hasRevealed.value = true;
  });

  visibilityObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isActive.value = entry.isIntersecting;
        if (entry.isIntersecting) {
          hasRevealed.value = true;
        }
      }
    },
    { threshold: 0.08, rootMargin: "10% 0px" },
  );

  visibilityObserver.observe(node);
  isActive.value = true;
  setSvgMotion(true);
});

onBeforeUnmount(() => {
  visibilityObserver?.disconnect();
  motionQuery?.removeEventListener("change", syncMotionPreference);
});
</script>

<style scoped>
.hero-visual {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 32rem;
  margin-inline: auto;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.hero-visual__glow {
  position: absolute;
  inset: 10% 6% 16% 8%;
  z-index: 0;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at 48% 42%,
    rgba(56, 103, 255, 0.16) 0%,
    rgba(243, 247, 252, 0.32) 44%,
    transparent 74%
  );
  pointer-events: none;
  transform-origin: 48% 44%;
  animation: hero-glow-breathe 12s ease-in-out infinite alternate;
  animation-play-state: paused;
}

.hero-visual__lines {
  position: absolute;
  inset: -6% -8%;
  width: 116%;
  height: 116%;
  pointer-events: none;
  overflow: visible;
}

.hero-visual__lines--back {
  z-index: 1;
}

.hero-visual__lines--front {
  z-index: 3;
}

.hero-visual__line {
  fill: none;
  stroke-dasharray: 11 17;
  opacity: 0.18;
  animation: hero-line-drift 14s linear infinite;
  animation-play-state: paused;
}

.hero-visual__line--a {
  opacity: 0.26;
  stroke-dasharray: 14 16;
  animation-duration: 11s;
}

.hero-visual__line--b {
  opacity: 0.2;
  stroke-dasharray: 7 19;
  animation-duration: 15s;
  animation-direction: reverse;
}

.hero-visual__line--c {
  opacity: 0.14;
  stroke-dasharray: 4 15;
  animation-duration: 18s;
}

.hero-visual__line--d {
  opacity: 0.16;
  stroke-dasharray: 9 21;
  animation-duration: 13s;
  animation-direction: reverse;
}

.hero-visual__line--e {
  opacity: 0.22;
  stroke-dasharray: 16 210;
  animation-name: hero-line-pulse;
  animation-duration: 9s;
}

.hero-visual__line--front-a {
  opacity: 0.16;
  stroke-dasharray: 10 24;
  animation-duration: 12s;
}

.hero-visual__line--front-b {
  opacity: 0.12;
  stroke-dasharray: 6 28;
  animation-duration: 16s;
  animation-direction: reverse;
}

.hero-visual__dot {
  opacity: 0;
  pointer-events: none;
  animation: hero-dot-fade 11s linear infinite;
  animation-play-state: paused;
}

.hero-visual__dot--1 {
  animation-duration: 11s;
}

.hero-visual__dot--2 {
  animation-duration: 13.5s;
  animation-delay: 3.2s;
}

.hero-visual__dot--3 {
  animation-duration: 9.5s;
  animation-delay: 5.8s;
}

.hero-visual--active:not(.hero-visual--reduced) .hero-visual__glow,
.hero-visual--active:not(.hero-visual--reduced) .hero-visual__line,
.hero-visual--active:not(.hero-visual--reduced) .hero-visual__dot {
  animation-play-state: running;
}

.hero-visual__artwork {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.hero-visual__reveal {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: translateY(10px) scale(0.99);
  transition:
    opacity 0.65s var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    transform 0.65s var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  will-change: opacity, transform;
}

.hero-visual--revealed .hero-visual__reveal {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.hero-visual__float {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  transform-origin: 50% 48%;
  animation: hero-float 9.5s ease-in-out 0.65s infinite alternate;
  animation-play-state: paused;
  will-change: transform;
}

.hero-visual--revealed.hero-visual--active:not(.hero-visual--reduced)
  .hero-visual__float {
  animation-play-state: running;
}

.hero-visual__image {
  display: block;
  width: 104%;
  max-width: none;
  height: auto;
  max-height: 104%;
  object-fit: contain;
  object-position: 48% 50%;
  user-select: none;
  pointer-events: none;
}

@keyframes hero-line-drift {
  to {
    stroke-dashoffset: -220;
  }
}

@keyframes hero-line-pulse {
  to {
    stroke-dashoffset: -340;
  }
}

@keyframes hero-float {
  from {
    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
  }
  to {
    transform: translate3d(3px, -9px, 0) scale(1.008) rotate(0.18deg);
  }
}

@keyframes hero-glow-breathe {
  from {
    opacity: 0.72;
    transform: scale(0.985);
  }
  to {
    opacity: 1;
    transform: scale(1.025);
  }
}

@keyframes hero-dot-fade {
  0%,
  6% {
    opacity: 0;
  }
  12%,
  68% {
    opacity: 0.85;
  }
  82%,
  100% {
    opacity: 0;
  }
}

@media (min-width: 960px) {
  .hero-visual {
    max-width: none;
    margin-inline: 0;
  }
}

@media (max-width: 959px) {
  .hero-visual {
    max-width: 22rem;
    aspect-ratio: 5 / 4;
  }

  .hero-visual__image {
    width: 98%;
    max-height: 98%;
  }

  .hero-visual__glow {
    inset: 18% 14% 22% 16%;
    animation: none;
    opacity: 0.55;
  }

  .hero-visual__line--c,
  .hero-visual__line--d,
  .hero-visual__line--front-b,
  .hero-visual__dot--2,
  .hero-visual__dot--3 {
    display: none;
  }

  .hero-visual--revealed.hero-visual--active:not(.hero-visual--reduced)
    .hero-visual__float {
    animation-name: hero-float-mobile;
    animation-duration: 11s;
  }
}

@keyframes hero-float-mobile {
  from {
    transform: translate3d(0, 2px, 0) scale(1);
  }
  to {
    transform: translate3d(1px, -3px, 0) scale(1.004);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-visual__glow,
  .hero-visual__line,
  .hero-visual__dot,
  .hero-visual__float,
  .hero-visual__reveal {
    animation: none !important;
    transition: none !important;
  }

  .hero-visual__reveal {
    opacity: 1;
    transform: none;
  }

  .hero-visual__float {
    transform: none;
  }

  .hero-visual__dot {
    display: none;
  }

  .hero-visual__line {
    opacity: 0.14;
  }
}
</style>
