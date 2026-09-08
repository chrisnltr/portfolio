/**
 * Scroll to hash targets after client navigations and initial load.
 * Retries briefly because SPA hydration can delay section mounts.
 */
export function useHashScroll() {
  const route = useRoute();

  function scrollToHash(behavior: ScrollBehavior = "smooth", attempt = 0) {
    if (!import.meta.client) return;
    const hash = route.hash || window.location.hash;
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (!el) {
      if (attempt < 40) {
        window.setTimeout(() => scrollToHash(behavior, attempt + 1), 50);
      }
      return;
    }

    const header = document.querySelector("header");
    const headerOffset = header instanceof HTMLElement ? header.offsetHeight + 12 : 80;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top =
      el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? "auto" : behavior,
    });
  }

  onMounted(() => {
    scrollToHash("auto");
    window.addEventListener("hashchange", () => scrollToHash());
  });

  watch(
    () => route.fullPath,
    () => {
      if (document.documentElement.classList.contains("equine-transition-active")) {
        return;
      }
      nextTick(() => scrollToHash());
    },
  );

  return { scrollToHash };
}
