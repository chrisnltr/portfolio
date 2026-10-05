import { computed, ref } from "vue";
import {
  isFinePointerHover,
  prefersReducedMotion,
} from "~/composables/usePreviewInteraction";

const intensity = ref(0);

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function isInsideGlowZone(node: EventTarget | null) {
  if (!(node instanceof Node) || !import.meta.client) return false;
  const cta = document.getElementById("cta");
  const footer = document.querySelector(".site-footer");
  return Boolean(cta?.contains(node) || footer?.contains(node));
}

function measureZone() {
  if (!import.meta.client) return null;
  const cta = document.getElementById("cta");
  const footer = document.querySelector(".site-footer");
  if (!cta) return null;

  const ctaRect = cta.getBoundingClientRect();
  const footerRect = footer?.getBoundingClientRect();
  return {
    top: ctaRect.top,
    bottom: footerRect ? footerRect.bottom : ctaRect.bottom,
  };
}

export function useBottomGlow() {
  const glowStyle = computed(() => ({
    "--glow-boost": String(intensity.value),
  }));

  function onPointerMove(event: PointerEvent) {
    if (!isFinePointerHover() || prefersReducedMotion()) {
      intensity.value = 0;
      return;
    }

    const zone = measureZone();
    if (!zone) return;

    const range = Math.max(zone.bottom - zone.top, 1);
    const linear = clamp01((event.clientY - zone.top) / range);
    // Slightly stronger toward the bottom / footer
    intensity.value = linear * linear * 0.35 + linear * 0.65;
  }

  function onPointerLeave(event: PointerEvent) {
    if (isInsideGlowZone(event.relatedTarget)) return;
    intensity.value = 0;
  }

  return {
    intensity,
    glowStyle,
    onPointerMove,
    onPointerLeave,
  };
}
