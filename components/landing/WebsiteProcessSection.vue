<template>
  <section
    id="ablauf"
    class="wl-process"
    aria-labelledby="website-process-title"
  >
    <div class="container-page">
      <header class="wl-process__intro">
        <p class="wl-process__eyebrow">Ablauf</p>
        <h2 id="website-process-title" class="wl-process__title">
          Von der ersten Anfrage bis zur fertigen Website.
        </h2>
        <p class="wl-process__lead">
          Sie wissen jederzeit, was als Nächstes passiert und sprechen während
          des gesamten Projekts direkt mit mir.
        </p>
      </header>

      <ol ref="timelineEl" class="wl-process__timeline">
        <li
          v-for="(step, index) in steps"
          :key="step.id"
          class="wl-process__step"
          :style="{ '--step-index': String(index) }"
        >
          <div class="wl-process__marker" aria-hidden="true">
            <span class="wl-process__num">{{ String(index + 1).padStart(2, "0") }}</span>
          </div>
          <div class="wl-process__card">
            <h3 class="wl-process__step-title">{{ step.title }}</h3>
            <p class="wl-process__step-body">{{ step.description }}</p>
            <p class="wl-process__step-note">{{ step.note }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { websiteLandingProcessSteps } from "~/data/websiteLanding";

const steps = websiteLandingProcessSteps;
const timelineEl = ref<HTMLOListElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const node = timelineEl.value;
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
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  observer.observe(node);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.wl-process {
  padding-block: clamp(3rem, 6vw, 5rem);
  background: transparent;
}

.wl-process__intro {
  max-width: 38rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.wl-process__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wl-process__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.6vw, 2.55rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  text-wrap: balance;
}

.wl-process__lead {
  margin: 0.85rem 0 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-process__timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  display: grid;
  gap: 1.25rem;
}

.wl-process__timeline::before {
  content: "";
  position: absolute;
  left: 1.35rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  background: rgba(47, 102, 255, 0.16);
  transform-origin: top;
  transform: scaleY(0.18);
  transition: transform 0.9s var(--ease-out);
}

.wl-process__timeline.is-visible::before {
  transform: scaleY(1);
}

.wl-process__step {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.95rem;
  opacity: 0;
  transform: translateY(0.85rem);
  transition:
    opacity 0.45s var(--ease-out),
    transform 0.45s var(--ease-out);
  transition-delay: calc(var(--step-index) * 90ms);
}

.wl-process__timeline.is-visible .wl-process__step {
  opacity: 1;
  transform: none;
}

.wl-process__marker {
  position: relative;
  z-index: 1;
  width: 2.75rem;
  display: flex;
  justify-content: center;
  padding-top: 0.15rem;
}

.wl-process__num {
  display: inline-grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1px solid rgba(47, 102, 255, 0.28);
  background: var(--color-surface);
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 750;
  letter-spacing: -0.02em;
  box-shadow: 0 4px 14px rgba(47, 102, 255, 0.1);
}

.wl-process__card {
  display: grid;
  gap: 0.45rem;
  padding: 1rem 1.1rem 1.1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 6px 18px rgba(18, 26, 38, 0.04);
}

.wl-process__step-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 730;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.wl-process__step-body {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wl-process__step-note {
  margin: 0.2rem 0 0;
  font-size: 0.86rem;
  font-weight: 650;
  color: var(--color-accent);
}

@media (min-width: 960px) {
  .wl-process__timeline {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    padding-top: 1.1rem;
  }

  .wl-process__timeline::before {
    left: 8%;
    right: 8%;
    top: 2.45rem;
    bottom: auto;
    width: auto;
    height: 2px;
    transform: scaleX(0.18);
    transform-origin: left;
  }

  .wl-process__timeline.is-visible::before {
    transform: scaleX(1);
  }

  .wl-process__step {
    grid-template-columns: 1fr;
    gap: 0.95rem;
    text-align: left;
  }

  .wl-process__marker {
    width: 100%;
    justify-content: flex-start;
    padding-top: 0;
    padding-left: 0.15rem;
  }

  .wl-process__card {
    min-height: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wl-process__timeline::before,
  .wl-process__step {
    transition: none;
  }

  .wl-process__timeline::before,
  .wl-process__timeline.is-visible::before {
    transform: none;
  }

  .wl-process__step {
    opacity: 1;
    transform: none;
  }
}
</style>
