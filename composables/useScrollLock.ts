/**
 * Nested-safe body scroll lock that preserves and restores scroll position
 * (including iOS, where overflow:hidden alone is unreliable).
 */
let lockCount = 0;
let savedScrollY = 0;
let previousHtmlOverflow = "";
let previousBodyOverflow = "";
let previousBodyPosition = "";
let previousBodyTop = "";
let previousBodyLeft = "";
let previousBodyRight = "";
let previousBodyWidth = "";
let previousBodyPaddingRight = "";

function getScrollbarGap(): number {
  if (!import.meta.client) return 0;
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}

export function lockBodyScroll(): void {
  if (!import.meta.client) return;

  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    const gap = getScrollbarGap();

    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    previousBodyPosition = document.body.style.position;
    previousBodyTop = document.body.style.top;
    previousBodyLeft = document.body.style.left;
    previousBodyRight = document.body.style.right;
    previousBodyWidth = document.body.style.width;
    previousBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    if (gap > 0) {
      document.body.style.paddingRight = `${gap}px`;
    }
  }

  lockCount += 1;
}

export function unlockBodyScroll(): void {
  if (!import.meta.client) return;
  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount > 0) return;

  const y = savedScrollY;

  document.documentElement.style.overflow = previousHtmlOverflow;
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.position = previousBodyPosition;
  document.body.style.top = previousBodyTop;
  document.body.style.left = previousBodyLeft;
  document.body.style.right = previousBodyRight;
  document.body.style.width = previousBodyWidth;
  document.body.style.paddingRight = previousBodyPaddingRight;

  window.scrollTo({ top: y, left: 0, behavior: "auto" });
}

export function focusWithoutScroll(el: HTMLElement | null | undefined): void {
  if (!el) return;
  try {
    el.focus({ preventScroll: true });
  } catch {
    el.focus();
  }
}
