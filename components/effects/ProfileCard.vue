<template>
  <div class="profile-card-block">
    <div
      ref="wrapRef"
      class="pc-card-wrapper"
      :class="{ 'pc-card-wrapper--static': !enableTilt || prefersReducedMotion }"
      :style="wrapperStyle"
    >
      <div ref="shellRef" class="pc-card-shell">
        <section class="pc-card" aria-hidden="false">
          <div class="pc-inside">
            <div v-if="showIcon" class="pc-shine" aria-hidden="true" />
            <div class="pc-glare" aria-hidden="true" />
            <div class="pc-content pc-avatar-content">
              <img
                class="avatar"
                :src="avatarUrl"
                :alt="avatarAlt"
                width="680"
                height="850"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="profile-card-block__caption">
      <p class="profile-card-block__name">{{ name }}</p>
      <p class="profile-card-block__title">{{ title }}</p>
      <p v-if="location" class="profile-card-block__location">{{ location }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type CSSProperties } from "vue";

const props = withDefaults(
  defineProps<{
    avatarUrl: string;
    avatarAlt?: string;
    name?: string;
    title?: string;
    location?: string;
    showIcon?: boolean;
    showBehindGlow?: boolean;
    enableTilt?: boolean;
    innerGradient?: string;
    className?: string;
  }>(),
  {
    avatarAlt: "",
    name: "Chris Leon Noltemeier",
    title: "Web- und Softwareentwicklung",
    location: "Bad Essen",
    showIcon: false,
    showBehindGlow: false,
    enableTilt: true,
    innerGradient: "linear-gradient(145deg, rgba(13, 21, 36, 0.92) 0%, rgba(26, 58, 122, 0.35) 100%)",
    className: "",
  },
);

const wrapRef = ref<HTMLDivElement | null>(null);
const shellRef = ref<HTMLDivElement | null>(null);
const prefersReducedMotion = ref(false);

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 900,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  ENTER_TRANSITION_MS: 180,
  TILT_X_DIVISOR: 8,
  TILT_Y_DIVISOR: 6,
} as const;

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const wrapperStyle = computed<CSSProperties>(() => ({
  "--inner-gradient": props.innerGradient,
  "--behind-glow-color": "rgba(47, 102, 255, 0.35)",
  "--behind-glow-size": "40%",
  "--sunpillar-1": "hsl(220, 85%, 62%)",
  "--sunpillar-2": "hsl(225, 80%, 58%)",
  "--sunpillar-3": "hsl(215, 75%, 55%)",
  "--sunpillar-4": "hsl(210, 70%, 52%)",
  "--sunpillar-5": "hsl(230, 78%, 60%)",
  "--sunpillar-6": "hsl(235, 82%, 58%)",
}));

let rafId: number | null = null;
let running = false;
let lastTs = 0;
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
let initialUntil = 0;
let enterTimer: number | null = null;
let leaveRaf: number | null = null;

const DEFAULT_TAU = 0.16;
const INITIAL_TAU = 0.55;

function setVarsFromXY(x: number, y: number) {
  const shell = shellRef.value;
  const wrap = wrapRef.value;
  if (!shell || !wrap) return;

  const width = shell.clientWidth || 1;
  const height = shell.clientHeight || 1;
  const percentX = clamp((100 / width) * x);
  const percentY = clamp((100 / height) * y);
  const centerX = percentX - 50;
  const centerY = percentY - 50;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const xDiv = isMobile ? ANIMATION_CONFIG.TILT_X_DIVISOR * 1.8 : ANIMATION_CONFIG.TILT_X_DIVISOR;
  const yDiv = isMobile ? ANIMATION_CONFIG.TILT_Y_DIVISOR * 1.8 : ANIMATION_CONFIG.TILT_Y_DIVISOR;

  wrap.style.setProperty("--pointer-x", `${percentX}%`);
  wrap.style.setProperty("--pointer-y", `${percentY}%`);
  wrap.style.setProperty("--background-x", `${adjust(percentX, 0, 100, 35, 65)}%`);
  wrap.style.setProperty("--background-y", `${adjust(percentY, 0, 100, 35, 65)}%`);
  wrap.style.setProperty(
    "--pointer-from-center",
    `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
  );
  wrap.style.setProperty("--pointer-from-top", `${percentY / 100}`);
  wrap.style.setProperty("--pointer-from-left", `${percentX / 100}`);
  wrap.style.setProperty("--rotate-x", `${round(-(centerX / xDiv))}deg`);
  wrap.style.setProperty("--rotate-y", `${round(centerY / yDiv)}deg`);
}

function step(ts: number) {
  if (!running) return;
  if (lastTs === 0) lastTs = ts;
  const dt = (ts - lastTs) / 1000;
  lastTs = ts;
  const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
  const k = 1 - Math.exp(-dt / tau);
  currentX += (targetX - currentX) * k;
  currentY += (targetY - currentY) * k;
  setVarsFromXY(currentX, currentY);

  const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
  if (stillFar || document.hasFocus()) {
    rafId = requestAnimationFrame(step);
  } else {
    running = false;
    lastTs = 0;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function startLoop() {
  if (running) return;
  running = true;
  lastTs = 0;
  rafId = requestAnimationFrame(step);
}

function setTarget(x: number, y: number) {
  targetX = x;
  targetY = y;
  startLoop();
}

function setImmediate(x: number, y: number) {
  currentX = x;
  currentY = y;
  setVarsFromXY(currentX, currentY);
}

function toCenter() {
  const shell = shellRef.value;
  if (!shell) return;
  setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
}

function beginInitial(durationMs: number) {
  initialUntil = performance.now() + durationMs;
  startLoop();
}

function getOffsets(event: PointerEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function onPointerMove(event: PointerEvent) {
  const shell = shellRef.value;
  if (!shell || !props.enableTilt || prefersReducedMotion.value) return;
  const { x, y } = getOffsets(event, shell);
  setTarget(x, y);
}

function onPointerEnter(event: PointerEvent) {
  const shell = shellRef.value;
  if (!shell || !props.enableTilt || prefersReducedMotion.value) return;
  shell.classList.add("active");
  shell.classList.add("entering");
  if (enterTimer) window.clearTimeout(enterTimer);
  enterTimer = window.setTimeout(() => shell.classList.remove("entering"), ANIMATION_CONFIG.ENTER_TRANSITION_MS);
  const { x, y } = getOffsets(event, shell);
  setTarget(x, y);
}

function onPointerLeave() {
  const shell = shellRef.value;
  if (!shell || !props.enableTilt || prefersReducedMotion.value) return;
  toCenter();
  const checkSettle = () => {
    const settled = Math.hypot(targetX - currentX, targetY - currentY) < 0.6;
    if (settled) {
      shell.classList.remove("active");
      leaveRaf = null;
    } else {
      leaveRaf = requestAnimationFrame(checkSettle);
    }
  };
  if (leaveRaf) cancelAnimationFrame(leaveRaf);
  leaveRaf = requestAnimationFrame(checkSettle);
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!props.enableTilt || prefersReducedMotion.value) return;

  const shell = shellRef.value;
  if (!shell) return;

  shell.addEventListener("pointerenter", onPointerEnter);
  shell.addEventListener("pointermove", onPointerMove);
  shell.addEventListener("pointerleave", onPointerLeave);

  const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
  setImmediate(initialX, ANIMATION_CONFIG.INITIAL_Y_OFFSET);
  toCenter();
  beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);
});

onUnmounted(() => {
  const shell = shellRef.value;
  if (shell) {
    shell.removeEventListener("pointerenter", onPointerEnter);
    shell.removeEventListener("pointermove", onPointerMove);
    shell.removeEventListener("pointerleave", onPointerLeave);
  }
  if (enterTimer) window.clearTimeout(enterTimer);
  if (leaveRaf) cancelAnimationFrame(leaveRaf);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.profile-card-block {
  display: grid;
  gap: 1rem;
  justify-items: start;
  width: min(100%, 340px);
}

.pc-card-wrapper {
  --pointer-x: 50%;
  --pointer-y: 50%;
  --pointer-from-center: 0;
  --pointer-from-top: 0.5;
  --pointer-from-left: 0.5;
  --card-opacity: 0;
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --background-x: 50%;
  --background-y: 50%;
  --card-radius: 14px;
  --sunpillar-clr-1: var(--sunpillar-1, hsl(220, 85%, 62%));
  --sunpillar-clr-2: var(--sunpillar-2, hsl(225, 80%, 58%));
  --sunpillar-clr-3: var(--sunpillar-3, hsl(215, 75%, 55%));
  --sunpillar-clr-4: var(--sunpillar-4, hsl(210, 70%, 52%));
  --sunpillar-clr-5: var(--sunpillar-5, hsl(230, 78%, 60%));
  --sunpillar-clr-6: var(--sunpillar-6, hsl(235, 82%, 58%));

  perspective: 560px;
  transform: translate3d(0, 0, 0.1px);
  position: relative;
  touch-action: manipulation;
  width: min(100%, 340px);
}

.pc-card-wrapper:hover,
.pc-card-wrapper.active,
.pc-card-shell.active {
  --card-opacity: 1;
}

.pc-card {
  width: 100%;
  height: clamp(380px, 36vw, 430px);
  display: grid;
  border-radius: var(--card-radius);
  position: relative;
  box-shadow:
    rgba(0, 0, 0, 0.45) calc((var(--pointer-from-left) * 6px) - 2px)
      calc((var(--pointer-from-top) * 10px) - 4px) 18px -4px;
  transition: transform 0.85s var(--ease-out);
  transform: translateZ(0) rotateX(0deg) rotateY(0deg);
  background: #0b0f16;
  backface-visibility: hidden;
  overflow: hidden;
  border: 1px solid rgba(243, 246, 250, 0.12);
}

.pc-card-shell.active .pc-card,
.pc-card-wrapper:not(.pc-card-wrapper--static) .pc-card-shell.active .pc-card {
  transition: none;
  transform: translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
}

.pc-card-shell.entering .pc-card {
  transition: transform 180ms ease-out;
}

.pc-card-shell {
  position: relative;
  z-index: 1;
}

.pc-card * {
  display: grid;
  grid-area: 1 / -1;
  border-radius: var(--card-radius);
  pointer-events: none;
}

.pc-inside {
  inset: 0;
  position: absolute;
  background-image: var(--inner-gradient);
  background-color: #0b0f16;
}

.pc-glare {
  transform: translate3d(0, 0, 1.1px);
  overflow: hidden;
  background-image: radial-gradient(
    farthest-corner circle at var(--pointer-x) var(--pointer-y),
    rgba(142, 176, 255, 0.18) 12%,
    rgba(13, 21, 36, 0.75) 90%
  );
  mix-blend-mode: overlay;
  filter: brightness(0.85) contrast(1.1);
  z-index: 4;
  opacity: 0.85;
}

.pc-avatar-content {
  mix-blend-mode: normal;
  overflow: hidden;
  transform: translateZ(2px);
  backface-visibility: hidden;
}

.pc-avatar-content .avatar {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center 18%;
  transform-origin: 50% 40%;
  transform: translateZ(0)
    scale(calc(1 + (var(--pointer-from-center) * 0.012)));
  backface-visibility: hidden;
  will-change: transform;
  transition: transform 140ms var(--ease-out);
}

.profile-card-block__caption {
  display: grid;
  gap: 0.15rem;
  max-width: min(100%, 340px);
}

.profile-card-block__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.profile-card-block__title {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.profile-card-block__location {
  margin: 0;
  font-size: 0.88rem;
  color: var(--color-text-subtle);
}

.pc-card-wrapper--static .pc-card {
  transform: none !important;
  transition: none !important;
}

.pc-card-wrapper--static .pc-glare {
  display: none;
}

@media (max-width: 899px) {
  .profile-card-block {
    justify-items: center;
    width: min(100%, 300px);
    margin-inline: auto;
  }

  .pc-card-wrapper {
    width: min(100%, 300px);
    perspective: 420px;
  }

  .pc-card {
    height: clamp(340px, 72vw, 400px);
  }

  .profile-card-block__caption {
    text-align: center;
    justify-items: center;
  }
}

@media (max-width: 768px) {
  .pc-card-wrapper {
    width: min(100%, 280px);
    perspective: 380px;
  }

  .pc-card {
    height: clamp(320px, 78vw, 380px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pc-card-wrapper {
    perspective: none;
  }

  .pc-card {
    transform: none !important;
    transition: none !important;
  }

  .pc-glare {
    display: none;
  }

  .pc-avatar-content .avatar {
    transition: none;
    transform: none;
  }
}
</style>
