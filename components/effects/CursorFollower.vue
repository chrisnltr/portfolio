<template>
  <div
    v-if="enabled"
    class="cursor-follower"
    :class="{ 'is-active': isHoveringTarget }"
    :style="followerStyle"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

type Rgb = { r: number; g: number; b: number };

const TARGET_SELECTOR =
  "a, button, nav, summary, [role='button'], .card-elevated, .text-link, .link-quiet, .btn-primary, .btn-secondary, h1, h2, h3, .reference-row__tags, .reference-row__tags li";

const DEFAULT_TINT: Rgb = { r: 47, g: 102, b: 255 };
const CRISPY_SILVER: Rgb = { r: 200, g: 208, b: 220 };
const CRISPY_GOLD: Rgb = { r: 224, g: 178, b: 74 };

const enabled = ref(false);
const isHoveringTarget = ref(false);
const tint = ref<Rgb | null>(null);
const mousePosition = ref({ x: -100, y: -100 });

let frame = 0;
let latestX = -100;
let latestY = -100;

const activeTint = computed(() => tint.value ?? DEFAULT_TINT);

const followerStyle = computed(() => {
  const { r, g, b } = activeTint.value;
  const active = isHoveringTarget.value;
  return {
    left: `${mousePosition.value.x}px`,
    top: `${mousePosition.value.y}px`,
    background: `rgba(${r}, ${g}, ${b}, ${active ? 0.38 : 0.22})`,
    boxShadow: active
      ? `0 0 40px 20px rgba(${r}, ${g}, ${b}, 0.45)`
      : `0 0 20px 10px rgba(${r}, ${g}, ${b}, 0.3)`,
  };
});

function canEnable() {
  if (typeof window === "undefined") return false;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth <= 768 || "ontouchstart" in window;
  return finePointer && !reduceMotion && !narrow;
}

function parseColor(input: string): Rgb | null {
  const value = input.trim();
  if (!value || value === "transparent" || value.startsWith("var(")) return null;

  if (value[0] === "#") {
    const hex = value.slice(1);
    if (hex.length === 3) {
      return {
        r: Number.parseInt(hex[0] + hex[0], 16),
        g: Number.parseInt(hex[1] + hex[1], 16),
        b: Number.parseInt(hex[2] + hex[2], 16),
      };
    }
    if (hex.length === 6 || hex.length === 8) {
      return {
        r: Number.parseInt(hex.slice(0, 2), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        b: Number.parseInt(hex.slice(4, 6), 16),
      };
    }
    return null;
  }

  const match = value.match(
    /rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/i,
  );
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

function isColorful(rgb: Rgb) {
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const chroma = max - min;
  const lightness = (max + min) / 2;

  // Reject grays and muted body copy (e.g. #9aa7b8, #748197).
  if (chroma < 50) return false;
  if (max < 45) return false;
  if (min > 225) return false;
  if (lightness > 110 && chroma < 80) return false;
  return true;
}

function hasVisibleFill(backgroundColor: string) {
  if (!backgroundColor || backgroundColor === "transparent") return false;
  const alphaMatch = backgroundColor.match(
    /rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)/i,
  );
  if (alphaMatch && Number(alphaMatch[1]) < 0.15) return false;
  return true;
}

function readAccentVar(el: HTMLElement, prop: string): Rgb | null {
  const raw = getComputedStyle(el).getPropertyValue(prop).trim();
  const parsed = parseColor(raw);
  if (parsed && isColorful(parsed)) return parsed;
  return null;
}

function resolveTint(rawTarget: HTMLElement): Rgb | null {
  if (rawTarget.closest(".project-card__title-crispy, .case-hero__title-crispy")) {
    return CRISPY_SILVER;
  }
  if (rawTarget.closest(".project-card__title-billiards, .case-hero__title-billiards")) {
    return CRISPY_GOLD;
  }

  const card = rawTarget.closest(".project-card") as HTMLElement | null;
  if (card) {
    const cardAccent = readAccentVar(card, "--card-accent");
    if (cardAccent) return cardAccent;
  }

  const refRow = rawTarget.closest(".reference-row") as HTMLElement | null;
  if (
    refRow &&
    rawTarget.closest(".reference-row__link, .reference-row__tags, .status-label")
  ) {
    const refAccent = readAccentVar(refRow, "--ref-accent");
    if (refAccent) return refAccent;
  }

  const styles = getComputedStyle(rawTarget);

  const background = parseColor(styles.backgroundColor);
  if (
    background &&
    isColorful(background) &&
    hasVisibleFill(styles.backgroundColor)
  ) {
    return background;
  }

  const foreground = parseColor(styles.color);
  if (foreground && isColorful(foreground)) {
    return foreground;
  }

  // Gray / white / muted text keeps the default blue glow.
  return null;
}

function schedulePosition() {
  if (frame) return;
  frame = window.requestAnimationFrame(() => {
    frame = 0;
    mousePosition.value = { x: latestX, y: latestY };
  });
}

function onMouseMove(event: MouseEvent) {
  latestX = event.clientX;
  latestY = event.clientY;
  schedulePosition();
}

function onMouseOver(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target?.closest) return;

  const hit = target.closest(TARGET_SELECTOR) as HTMLElement | null;
  const textColor = hit ? null : parseColor(getComputedStyle(target).color);
  const colorfulHit =
    !hit && textColor && isColorful(textColor) ? target : null;

  const isTarget = Boolean(hit || colorfulHit);
  if (isHoveringTarget.value !== isTarget) {
    isHoveringTarget.value = isTarget;
  }

  if (!isTarget) {
    tint.value = null;
    return;
  }

  // Prefer the precise hovered node so Crispy spans / tags resolve correctly.
  tint.value = resolveTint(target);
}

function syncEnabled() {
  const next = canEnable();
  if (next === enabled.value) return;

  enabled.value = next;
  if (next) {
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
  } else {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseover", onMouseOver);
    isHoveringTarget.value = false;
    tint.value = null;
  }
}

onMounted(() => {
  syncEnabled();
  window.addEventListener("resize", syncEnabled);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", syncEnabled);
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseover", onMouseOver);
  if (frame) {
    window.cancelAnimationFrame(frame);
    frame = 0;
  }
});
</script>

<style scoped>
.cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 999px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    width 280ms var(--ease-out),
    height 280ms var(--ease-out),
    background 280ms var(--ease-out),
    box-shadow 280ms var(--ease-out);
  filter: blur(14px);
  will-change: left, top, width, height;
}

.cursor-follower.is-active {
  width: 5rem;
  height: 5rem;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-follower {
    display: none;
  }
}
</style>
