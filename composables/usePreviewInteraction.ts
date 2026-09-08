import { onBeforeUnmount, ref, type Ref, unref } from "vue";

const activePreviewId = ref<string | null>(null);
const TAP_MOVE_THRESHOLD_PX = 10;

export function isFinePointerHover(): boolean {
  if (!import.meta.client) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function prefersReducedMotion(): boolean {
  if (!import.meta.client) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useExclusivePreview(previewId: Ref<string | undefined> | string | undefined) {
  function claim() {
    const id = unref(previewId);
    if (!id) return;
    activePreviewId.value = id;
  }

  function release() {
    const id = unref(previewId);
    if (!id) return;
    if (activePreviewId.value === id) {
      activePreviewId.value = null;
    }
  }

  function isOwned() {
    const id = unref(previewId);
    if (!id) return true;
    return activePreviewId.value === id;
  }

  onBeforeUnmount(() => {
    release();
  });

  return {
    activePreviewId,
    claim,
    release,
    isOwned,
  };
}

/**
 * Distinguishes a short tap from a vertical pan so page scroll stays usable.
 * Call handlers from pointer events on the interactive preview root.
 */
export function createTapGesture(options: {
  onTap: (event: PointerEvent) => void;
  /** When true, taps are ignored (e.g. fine-pointer hover devices). */
  shouldIgnore?: () => boolean;
}) {
  let pointerId: number | null = null;
  let startX = 0;
  let startY = 0;
  let moved = false;
  let consumedClick = false;

  function onPointerDown(event: PointerEvent) {
    if (options.shouldIgnore?.()) return;
    if (!event.isPrimary) return;
    // Mouse secondary buttons are > 0; touch often reports 0 or -1.
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.pointerType !== "mouse" && event.button > 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    moved = false;
    consumedClick = false;
  }

  function onPointerMove(event: PointerEvent) {
    if (pointerId === null || event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.hypot(dx, dy) > TAP_MOVE_THRESHOLD_PX) {
      moved = true;
    }
  }

  function finish(event: PointerEvent, cancelled: boolean) {
    if (pointerId === null || event.pointerId !== pointerId) return;
    const wasTap = !cancelled && !moved;
    pointerId = null;
    if (wasTap) {
      consumedClick = true;
      options.onTap(event);
    }
  }

  function onPointerUp(event: PointerEvent) {
    finish(event, false);
  }

  function onPointerCancel(event: PointerEvent) {
    finish(event, true);
  }

  function onClick(event: MouseEvent) {
    if (!consumedClick) return;
    consumedClick = false;
    event.preventDefault();
    event.stopPropagation();
  }

  function reset() {
    pointerId = null;
    moved = false;
    consumedClick = false;
  }

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClick,
    reset,
  };
}
