<template>
  <section
    id="leistungsumfang"
    class="wl-scope"
    aria-labelledby="website-scope-title"
  >
    <div class="container-page wl-scope__inner">
      <div class="wl-scope__copy">
        <p class="wl-scope__eyebrow">Klarheit statt Komplexität</p>
        <h2 id="website-scope-title" class="wl-scope__title">
          Ihr Angebot. Auf den ersten Blick klar.
        </h2>
        <p class="wl-scope__lead">
          Besucher verstehen sofort, was Sie anbieten - und finden ohne Umwege
          zur Anfrage.
        </p>

        <ul class="wl-scope__benefits" aria-label="Vorteile einer klaren Website">
          <li v-for="benefit in benefits" :key="benefit.id">
            <span class="wl-scope__dot" aria-hidden="true" />
            <span>{{ benefit.label }}</span>
          </li>
        </ul>

        <p class="wl-scope__note">
          Welche Inhalte und Funktionen dafür sinnvoll sind, klären wir
          gemeinsam.
        </p>
      </div>

      <div ref="visualEl" class="wl-scope__visual">
        <div class="wl-scope__visual-glow" aria-hidden="true" />
        <img
          class="wl-scope__image"
          :src="illustration.src"
          :alt="illustration.alt"
          :width="illustration.width"
          :height="illustration.height"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  websiteLandingClarityBenefits,
  websiteLandingClarityIllustration,
} from "~/data/websiteLanding";

const benefits = websiteLandingClarityBenefits;
const illustration = websiteLandingClarityIllustration;
const visualEl = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const node = visualEl.value;
  if (!node || typeof window === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    node.classList.add("is-visible");
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
  );

  observer.observe(node);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.wl-scope {
  padding-block: clamp(3rem, 6vw, 5rem);
  background: transparent;
}

.wl-scope__inner {
  display: grid;
  gap: clamp(1.75rem, 4vw, 3.25rem);
  align-items: center;
}

.wl-scope__copy {
  display: grid;
  gap: 0.85rem;
  min-width: 0;
  max-width: 28rem;
}

.wl-scope__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wl-scope__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.5vw, 2.45rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  text-wrap: balance;
}

.wl-scope__lead {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-scope__benefits {
  display: grid;
  gap: 0.7rem;
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
}

.wl-scope__benefits li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  line-height: 1.35;
  color: var(--color-text);
}

.wl-scope__dot {
  width: 0.4rem;
  height: 0.4rem;
  flex-shrink: 0;
  border-radius: 999px;
  background: var(--color-accent);
}

.wl-scope__note {
  margin: 0.35rem 0 0;
  padding-top: 0.95rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wl-scope__visual {
  position: relative;
  min-width: 0;
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity 0.5s var(--ease-out),
    transform 0.5s var(--ease-out);
}

.wl-scope__visual.is-visible {
  opacity: 1;
  transform: none;
}

.wl-scope__visual-glow {
  position: absolute;
  inset: 12% 8% 8%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(47, 102, 255, 0.08) 0%,
    rgba(232, 238, 246, 0.35) 42%,
    transparent 72%
  );
  pointer-events: none;
  z-index: 0;
}

.wl-scope__image {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
}

@media (min-width: 960px) {
  .wl-scope__inner {
    grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
    gap: clamp(2rem, 4vw, 3.5rem);
  }

  .wl-scope__copy {
    max-width: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wl-scope__visual {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
