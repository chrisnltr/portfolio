import { onBeforeUnmount, onMounted, ref } from "vue";

export function useReveal() {
  const el = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const node = el.value;
    if (!node || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.classList.add("is-visible");
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    // Above-the-fold content can miss the first intersection in some browsers.
    requestAnimationFrame(() => {
      if (!node.classList.contains("is-visible")) {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          node.classList.add("is-visible");
          observer?.unobserve(node);
        }
      }
    });

    observer.observe(node);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return { el };
}
