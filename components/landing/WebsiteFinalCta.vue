<template>
  <section
    id="abschluss"
    class="wl-final"
    aria-labelledby="website-final-cta-title"
  >
    <div class="container-page">
      <div
        ref="panelRef"
        class="wl-final__panel"
        :class="{ 'is-revealed': revealed }"
      >
        <div class="wl-final__glow" aria-hidden="true" />
        <div class="wl-final__grid" aria-hidden="true" />

        <div class="wl-final__content">
          <p class="wl-final__eyebrow">Bereit für Ihre neue Website?</p>
          <h2 id="website-final-cta-title" class="wl-final__title">
            Lassen Sie uns gemeinsam klären, was Ihre Website wirklich braucht.
          </h2>
          <p class="wl-final__lead">
            In einem kostenlosen und unverbindlichen Erstgespräch sprechen wir
            über Ihre Ziele, die benötigten Inhalte und den passenden Umfang.
            Danach wissen Sie, wie der nächste sinnvolle Schritt für Ihr
            Projekt aussieht.
          </p>

          <div class="wl-final__actions">
            <div class="wl-final__primary-group">
              <NuxtLink
                :to="contactTo"
                class="wl-final__cta"
                @click="onPrimary"
              >
                <span>Kostenloses Website-Erstgespräch starten</span>
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <p class="wl-final__micro">
                Kostenlos · unverbindlich · dauert nur wenige Minuten
              </p>
            </div>

            <NuxtLink
              :to="projectsHref"
              class="wl-final__secondary"
              @click="onSecondary"
            >
              Website-Projekte ansehen
            </NuxtLink>
          </div>

          <ul class="wl-final__trust" aria-label="Hinweise zum Einstieg">
            <li v-for="point in trustPoints" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useWebsiteContactLink } from "~/composables/useWebsiteContactLink";
import { websiteLandingFinalCtaTrustPoints } from "~/data/websiteLanding";
import { trackWebsiteCta } from "~/utils/funnelTracking";

const { track } = useAnalytics();
const { contactTo } = useWebsiteContactLink();
const trustPoints = websiteLandingFinalCtaTrustPoints;
const projectsHref = "#website-projekte";
const panelRef = ref<HTMLElement | null>(null);
const revealed = ref(true);
let observer: IntersectionObserver | null = null;

function onPrimary() {
  trackWebsiteCta(track, "final");
}

function onSecondary() {
  track("cta_click", {
    location: "website-landing-final-cta-secondary",
    service: "projects",
  });
}

onMounted(() => {
  const node = panelRef.value;
  if (!node || typeof window === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof IntersectionObserver === "undefined") {
    revealed.value = true;
    return;
  }

  // Progressive enhancement: briefly prepare a one-shot reveal if offscreen.
  const rect = node.getBoundingClientRect();
  const alreadyInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  if (alreadyInView) {
    revealed.value = true;
    return;
  }

  revealed.value = false;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealed.value = true;
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -4% 0px" },
  );
  observer.observe(node);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.wl-final {
  padding-block: clamp(2.5rem, 5vw, 4.5rem) clamp(3rem, 6vw, 5.5rem);
}

.wl-final__panel {
  position: relative;
  isolation: isolate;
  overflow: clip;
  border-radius: clamp(1.1rem, 2.2vw, 1.6rem);
  padding: clamp(1.75rem, 4vw, 3.25rem);
  color: #f8fafc;
  background:
    radial-gradient(ellipse 55% 70% at 88% 12%, rgba(255, 255, 255, 0.16), transparent 58%),
    radial-gradient(ellipse 45% 55% at 8% 88%, rgba(20, 60, 180, 0.35), transparent 62%),
    linear-gradient(145deg, #3b72ff 0%, #2f66ff 42%, #1f4fd4 100%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.18) inset,
    0 24px 48px rgba(31, 79, 212, 0.28);
}

.wl-final__panel.is-revealed {
  animation: wl-final-rise 0.5s var(--ease-out) both;
}

.wl-final__glow,
.wl-final__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.wl-final__glow {
  background:
    radial-gradient(circle at 72% 28%, rgba(255, 255, 255, 0.18), transparent 34%),
    radial-gradient(circle at 18% 72%, rgba(147, 176, 255, 0.22), transparent 40%);
}

.wl-final__grid {
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 75% 70% at 50% 40%, #000 20%, transparent 78%);
}

.wl-final__content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1rem;
  max-width: 40rem;
  margin-inline: auto;
  justify-items: center;
  text-align: center;
}

.wl-final__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(248, 250, 252, 0.78);
}

.wl-final__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.6vw, 2.55rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: #ffffff;
  text-wrap: balance;
}

.wl-final__lead {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(248, 250, 252, 0.86);
}

.wl-final__actions {
  display: grid;
  gap: 0.85rem;
  margin-top: 0.35rem;
  justify-items: center;
}

.wl-final__primary-group {
  display: grid;
  gap: 0.5rem;
  justify-items: center;
}

.wl-final__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  min-height: 48px;
  padding: 0.85rem 1.35rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: #ffffff;
  color: #1f4fd4;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(12, 32, 96, 0.18);
  transition:
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.wl-final__cta:hover {
  background: #f3f6ff;
  color: #1843b8;
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(12, 32, 96, 0.24);
}

.wl-final__cta:active {
  transform: translateY(0);
}

.wl-final__cta:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
}

.wl-final__micro {
  margin: 0;
  font-size: 0.88rem;
  color: rgba(248, 250, 252, 0.78);
}

.wl-final__secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 44px;
  padding: 0.35rem 0.15rem;
  color: rgba(248, 250, 252, 0.92);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
  text-decoration-color: rgba(248, 250, 252, 0.45);
  transition:
    color var(--duration-fast) var(--ease-out),
    text-decoration-color var(--duration-fast) var(--ease-out);
}

.wl-final__secondary:hover {
  color: #ffffff;
  text-decoration-color: rgba(255, 255, 255, 0.85);
}

.wl-final__secondary:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
  border-radius: 6px;
}

.wl-final__trust {
  list-style: none;
  margin: 0.45rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
  width: 100%;
  justify-items: center;
}

.wl-final__trust li {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding-left: 0;
  font-size: 0.92rem;
  font-weight: 550;
  color: rgba(248, 250, 252, 0.9);
  text-align: left;
}

.wl-final__trust li::before {
  content: "";
  flex-shrink: 0;
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.45em;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
}

@media (min-width: 640px) {
  .wl-final__cta {
    width: auto;
    justify-content: center;
  }

  .wl-final__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.85rem 1.35rem;
  }

  .wl-final__trust {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.65rem 1.1rem;
    justify-items: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wl-final__panel.is-revealed,
  .wl-final__cta,
  .wl-final__secondary {
    animation: none;
    transition: none;
  }
}

@keyframes wl-final-rise {
  from {
    opacity: 0.72;
    transform: translateY(0.7rem);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
