import { onBeforeUnmount, onMounted, ref } from "vue";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function revealNow(node: Element) {
  node.classList.add("is-visible");
}

function isNearViewport(node: Element) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -6% 0px",
};

export function useReveal() {
  const el = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const node = el.value;
    if (!node || typeof window === "undefined") return;

    if (prefersReducedMotion()) {
      revealNow(node);
      return;
    }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealNow(entry.target);
        observer?.unobserve(entry.target);
      }
    }, OBSERVER_OPTIONS);

    requestAnimationFrame(() => {
      if (!node.classList.contains("is-visible") && isNearViewport(node)) {
        revealNow(node);
        observer?.unobserve(node);
        return;
      }
      observer?.observe(node);
    });
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return { el };
}

/** Observe every `.reveal` descendant inside a section root. */
export function useRevealGroup(selector = ".reveal") {
  const root = ref<HTMLElement | null>(null);
  const observers: IntersectionObserver[] = [];

  onMounted(() => {
    const node = root.value;
    if (!node || typeof window === "undefined") return;

    const targets = [...node.querySelectorAll<HTMLElement>(selector)];
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      targets.forEach(revealNow);
      return;
    }

    for (const target of targets) {
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          revealNow(entry.target);
          observer.unobserve(entry.target);
        }
      }, OBSERVER_OPTIONS);

      observers.push(observer);

      if (isNearViewport(target)) {
        revealNow(target);
      } else {
        observer.observe(target);
      }
    }
  });

  onBeforeUnmount(() => {
    for (const observer of observers) observer.disconnect();
  });

  return { root };
}
