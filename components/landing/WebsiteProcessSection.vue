<template>
  <section
    id="ablauf"
    class="wl-process"
    aria-labelledby="website-process-title"
  >
    <div class="wl-process__glow" aria-hidden="true" />
    <div class="wl-process__grid" aria-hidden="true" />

    <div class="container-page">
      <header class="wl-process__header">
        <div class="wl-process__intro">
          <p class="wl-process__eyebrow">Ablauf</p>
          <h2 id="website-process-title" class="wl-process__title">
            Von der ersten Anfrage bis zur fertigen Website.
          </h2>
          <p class="wl-process__lead">
            Sie wissen jederzeit, was als Nächstes passiert, und stimmen sich
            während des gesamten Projekts direkt mit mir ab.
          </p>
        </div>
        <p class="wl-process__badge">4 klare Schritte · direkte Zusammenarbeit</p>
      </header>

      <ol ref="timelineEl" class="wl-process__timeline">
        <li
          v-for="(step, index) in steps"
          :key="step.id"
          class="wl-process__step"
          :class="{ 'wl-process__step--final': index === steps.length - 1 }"
          :style="{ '--step-index': String(index) }"
        >
          <div class="wl-process__marker" aria-hidden="true">
            <span class="wl-process__num">{{ String(index + 1).padStart(2, "0") }}</span>
          </div>

          <article class="wl-process__card">
            <span class="wl-process__watermark" aria-hidden="true">
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <div class="wl-process__card-top">
              <span class="wl-process__label">Schritt {{ index + 1 }}</span>
              <span class="wl-process__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    :d="iconPaths[step.icon]"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>

            <h3 class="wl-process__step-title">{{ step.title }}</h3>
            <p class="wl-process__step-body">{{ step.description }}</p>
            <p class="wl-process__step-note">{{ step.note }}</p>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  websiteLandingProcessSteps,
  type WebsiteLandingProcessIcon,
} from "~/data/websiteLanding";

const steps = websiteLandingProcessSteps;
const timelineEl = ref<HTMLOListElement | null>(null);
let observer: IntersectionObserver | null = null;

const iconPaths: Record<WebsiteLandingProcessIcon, string> = {
  form: "M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 5h4M8 13h8M8 17h5M15.5 7.5l1 1 2-2",
  chat: "M5 7.5A2.5 2.5 0 0 1 7.5 5h5A2.5 2.5 0 0 1 15 7.5V11a2.5 2.5 0 0 1-2.5 2.5H10l-3 2.5V13.5A2.5 2.5 0 0 1 5 11V7.5Zm7 4.5h4.5A2.5 2.5 0 0 0 19 9.5V6A2.5 2.5 0 0 0 16.5 3.5H12",
  offer: "M7 4h10a2 2 0 0 1 2 2v13l-3-1.5L14 19l-2-1.5L10 19l-2-1.5L5 19V6a2 2 0 0 1 2-2Zm3 5h4M8 12h8M8 15h5",
  launch:
    "M5 7.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 18.5H5A1.5 1.5 0 0 1 3.5 17V9A1.5 1.5 0 0 1 5 7.5ZM3.5 10.5h17M9 15.5l2 2 4-4",
};

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
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding-block: clamp(3rem, 6vw, 5rem);
  background:
    radial-gradient(ellipse 42% 48% at 92% 12%, rgba(47, 102, 255, 0.08), transparent 68%),
    radial-gradient(ellipse 38% 42% at 6% 88%, rgba(47, 102, 255, 0.05), transparent 70%),
    linear-gradient(180deg, rgba(232, 238, 246, 0.55) 0%, rgba(243, 245, 248, 0.2) 100%);
}

.wl-process__glow,
.wl-process__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.wl-process__glow {
  background:
    radial-gradient(circle at 78% 24%, rgba(147, 176, 255, 0.14), transparent 34%),
    radial-gradient(circle at 18% 70%, rgba(47, 102, 255, 0.07), transparent 38%);
}

.wl-process__grid {
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(47, 102, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 102, 255, 0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 70% 65% at 50% 40%, #000 15%, transparent 78%);
}

.wl-process > .container-page {
  position: relative;
  z-index: 1;
}

.wl-process__header {
  display: grid;
  gap: 1rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.wl-process__intro {
  max-width: 40rem;
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

.wl-process__badge {
  margin: 0;
  width: fit-content;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(47, 102, 255, 0.18);
  background: rgba(255, 255, 255, 0.78);
  color: var(--color-accent);
  font-size: 0.88rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  box-shadow: 0 6px 16px rgba(47, 102, 255, 0.06);
}

.wl-process__timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  display: grid;
  gap: 1.2rem;
}

.wl-process__timeline::before {
  content: "";
  position: absolute;
  left: 1.35rem;
  top: 0.55rem;
  bottom: calc(100% - (100% / 4) + 1.6rem);
  width: 2px;
  background: linear-gradient(
    180deg,
    rgba(147, 176, 255, 0.35) 0%,
    rgba(47, 102, 255, 0.55) 55%,
    rgba(31, 79, 212, 0.85) 100%
  );
  transform-origin: top;
  transform: scaleY(0.16);
  transition: transform 0.95s var(--ease-out);
  z-index: 0;
}

.wl-process__timeline.is-visible::before {
  transform: scaleY(1);
}

.wl-process__step {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.95rem;
  opacity: 0;
  transform: translateY(0.9rem);
  transition:
    opacity 0.45s var(--ease-out),
    transform 0.45s var(--ease-out);
  transition-delay: calc(var(--step-index) * 95ms);
}

.wl-process__timeline.is-visible .wl-process__step {
  opacity: 1;
  transform: none;
}

.wl-process__marker {
  position: relative;
  z-index: 2;
  width: 2.75rem;
  display: flex;
  justify-content: center;
  padding-top: 0.2rem;
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
  box-shadow: 0 4px 14px rgba(47, 102, 255, 0.12);
}

.wl-process__step--final .wl-process__num {
  background: linear-gradient(180deg, #3b72ff 0%, #2f66ff 100%);
  border-color: rgba(255, 255, 255, 0.35);
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(47, 102, 255, 0.28);
}

.wl-process__card {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 0.55rem;
  align-content: start;
  padding: 1.05rem 1.1rem 1.15rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 8px 22px rgba(18, 26, 38, 0.045);
}

.wl-process__step:nth-child(1) .wl-process__card {
  background: linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%);
}

.wl-process__step:nth-child(2) .wl-process__card {
  background: linear-gradient(180deg, #ffffff 0%, #f7f9fd 100%);
}

.wl-process__step:nth-child(3) .wl-process__card {
  background: linear-gradient(180deg, #ffffff 0%, #f3f7ff 100%);
}

.wl-process__step--final .wl-process__card {
  border-color: rgba(255, 255, 255, 0.18);
  background:
    radial-gradient(ellipse 70% 80% at 88% 0%, rgba(255, 255, 255, 0.18), transparent 55%),
    linear-gradient(145deg, #3b72ff 0%, #2f66ff 48%, #1f4fd4 100%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.18) inset,
    0 16px 34px rgba(31, 79, 212, 0.24);
  color: #f8fafc;
}

.wl-process__watermark {
  position: absolute;
  right: 0.55rem;
  top: 0.2rem;
  font-family: var(--font-display);
  font-size: 3.4rem;
  font-weight: 750;
  letter-spacing: -0.06em;
  line-height: 1;
  color: rgba(47, 102, 255, 0.06);
  pointer-events: none;
}

.wl-process__step--final .wl-process__watermark {
  color: rgba(255, 255, 255, 0.1);
}

.wl-process__card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.wl-process__label {
  display: inline-flex;
  align-items: center;
  min-height: 1.55rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--color-accent-surface);
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.wl-process__step--final .wl-process__label {
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.wl-process__icon {
  display: inline-grid;
  place-items: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 10px;
  border: 1px solid rgba(47, 102, 255, 0.18);
  background: var(--color-accent-surface);
  color: var(--color-accent);
}

.wl-process__step--final .wl-process__icon {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
}

.wl-process__icon svg {
  width: 1.1rem;
  height: 1.1rem;
}

.wl-process__step-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 730;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.wl-process__step--final .wl-process__step-title {
  color: #ffffff;
}

.wl-process__step-body {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wl-process__step--final .wl-process__step-body {
  color: rgba(248, 250, 252, 0.86);
}

.wl-process__step-note {
  margin: 0.15rem 0 0;
  width: fit-content;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(47, 102, 255, 0.08);
  font-size: 0.84rem;
  font-weight: 650;
  color: var(--color-accent);
}

.wl-process__step--final .wl-process__step-note {
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

@media (min-width: 960px) {
  .wl-process__header {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 1.5rem 2rem;
  }

  .wl-process__badge {
    margin-bottom: 0.2rem;
  }

  .wl-process__timeline {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    padding-top: 1.15rem;
  }

  .wl-process__timeline::before {
    left: calc((100% / 8) - 0.1rem);
    right: calc((100% / 8) - 0.1rem);
    top: 2.5rem;
    bottom: auto;
    width: auto;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(147, 176, 255, 0.35) 0%,
      rgba(47, 102, 255, 0.55) 55%,
      rgba(31, 79, 212, 0.9) 100%
    );
    transform: scaleX(0.16);
    transform-origin: left;
  }

  .wl-process__timeline.is-visible::before {
    transform: scaleX(1);
  }

  .wl-process__timeline::after {
    content: "";
    position: absolute;
    top: 2.2rem;
    right: calc((100% / 8) - 0.55rem);
    width: 0.55rem;
    height: 0.55rem;
    border-top: 2px solid rgba(31, 79, 212, 0.75);
    border-right: 2px solid rgba(31, 79, 212, 0.75);
    transform: rotate(45deg) scale(0);
    transform-origin: center;
    transition: transform 0.35s var(--ease-out) 0.65s;
    z-index: 0;
  }

  .wl-process__timeline.is-visible::after {
    transform: rotate(45deg) scale(1);
  }

  .wl-process__step {
    grid-template-columns: 1fr;
    gap: 0.95rem;
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
  .wl-process__timeline::after,
  .wl-process__step {
    transition: none;
  }

  .wl-process__timeline::before,
  .wl-process__timeline.is-visible::before {
    transform: none;
  }

  .wl-process__timeline::after,
  .wl-process__timeline.is-visible::after {
    transform: rotate(45deg) scale(1);
  }

  .wl-process__step {
    opacity: 1;
    transform: none;
  }
}
</style>
