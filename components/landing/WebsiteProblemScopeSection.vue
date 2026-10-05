<template>
  <section
    id="leistungsumfang"
    class="wl-scope"
    aria-labelledby="website-scope-title"
  >
    <div class="container-page">
      <header class="wl-scope__intro">
        <p class="wl-scope__eyebrow">Mehr als nur ein neues Design</p>
        <h2 id="website-scope-title" class="wl-scope__title">
          Eine gute Website löst konkrete Probleme – nicht nur optische.
        </h2>
        <p class="wl-scope__lead">
          Entscheidend ist, dass Besucher Ihr Angebot schnell verstehen,
          Vertrauen gewinnen und ohne Umwege Kontakt aufnehmen können. Genau
          darauf werden Struktur, Design und Technik gemeinsam ausgerichtet.
        </p>
      </header>

      <div ref="transformsEl" class="wl-scope__transforms">
        <article
          v-for="(item, index) in transforms"
          :key="item.id"
          class="wl-scope__module"
          :style="{ '--module-index': String(index) }"
        >
          <div class="wl-scope__side wl-scope__side--problem">
            <div class="wl-scope__side-top">
              <span class="wl-scope__icon wl-scope__icon--problem" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    :d="problemIcons[item.id]"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <p class="wl-scope__tag">Ausgangslage</p>
            </div>
            <p class="wl-scope__copy">{{ item.problem }}</p>
          </div>

          <div class="wl-scope__bridge" aria-hidden="true">
            <span class="wl-scope__arrow">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h12M13 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>

          <div class="wl-scope__side wl-scope__side--result">
            <div class="wl-scope__side-top">
              <span class="wl-scope__icon wl-scope__icon--result" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    :d="resultIcons[item.id]"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <p class="wl-scope__tag wl-scope__tag--result">Das ändert sich</p>
            </div>
            <p class="wl-scope__copy">{{ item.result }}</p>
          </div>
        </article>
      </div>

      <div class="wl-scope__deliverables">
        <header class="wl-scope__deliverables-intro">
          <p class="wl-scope__eyebrow">Konkreter Leistungsumfang</p>
          <h3 class="wl-scope__deliverables-title">
            Was ich für Ihre Website übernehme.
          </h3>
          <p class="wl-scope__deliverables-lead">
            Der genaue Umfang wird vor Projektbeginn transparent festgelegt.
            Typischerweise umfasst die Zusammenarbeit diese Bereiche:
          </p>
        </header>

        <ol class="wl-scope__list">
          <li
            v-for="(item, index) in scopeItems"
            :key="item.id"
            class="wl-scope__item"
          >
            <span class="wl-scope__item-num" aria-hidden="true">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <div>
              <h4 class="wl-scope__item-title">{{ item.title }}</h4>
              <p class="wl-scope__item-body">{{ item.description }}</p>
            </div>
          </li>
        </ol>

        <p class="wl-scope__note">
          Welche Leistungen Ihr Projekt konkret benötigt, wird im Erstgespräch
          geklärt und anschließend verständlich im Angebot festgehalten.
        </p>

        <NuxtLink
          :to="contactTo"
          class="wl-scope__link"
          @click="onLink"
        >
          Projekt unverbindlich einordnen lassen
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { contactPath } from "~/data/navigation";
import {
  websiteLandingProblemTransforms,
  websiteLandingScopeItems,
} from "~/data/websiteLanding";

const { track } = useAnalytics();
const transforms = websiteLandingProblemTransforms;
const scopeItems = websiteLandingScopeItems;
const contactTo = { path: contactPath, query: { projekt: "website" } };
const transformsEl = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const problemIcons = {
  appearance: "M4 7h16v10H4zM8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M9 12h6",
  clarity: "M5 6h14M5 12h8M5 18h11M17 10l2 2-2 2",
  mobile: "M9 4h6a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 15 20H9a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 9 4Zm2.5 13h3",
  contact: "M8 8h8v5H8zM7 18l2.5-3H17a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v9l3 2Z",
} as const;

const resultIcons = {
  appearance: "M4 8h16v9H4zM8 8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V8M8.5 13.5l2 2 4.5-4.5",
  clarity: "M5 6h14M5 12h14M5 18h9M15.5 16.5l2 2 3.5-3.5",
  mobile: "M8 4.5h8A1.5 1.5 0 0 1 17.5 6v12a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 18V6A1.5 1.5 0 0 1 8 4.5Zm2.5 12h3M10 9.5l1.5 1.5L14.5 8",
  contact: "M7 8h10v5H7zM6 18l2.8-3H17a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v9l3 2Zm5-7.5l1.4 1.4L15.5 8",
} as const;

function onLink() {
  track("cta_click", {
    location: "website-landing-problem-scope",
    service: "website-erstgespraech",
  });
}

onMounted(() => {
  const node = transformsEl.value;
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
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
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
  background:
    linear-gradient(
      180deg,
      rgba(243, 245, 248, 0) 0%,
      rgba(232, 238, 246, 0.42) 42%,
      rgba(243, 245, 248, 0) 100%
    );
}

.wl-scope__intro {
  max-width: 42rem;
  margin-bottom: clamp(1.75rem, 3.5vw, 2.5rem);
}

.wl-scope__eyebrow {
  margin: 0 0 0.75rem;
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
  margin: 0.85rem 0 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-scope__transforms {
  display: grid;
  gap: 1rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.wl-scope__module {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 8px 22px rgba(18, 26, 38, 0.04);
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity 0.45s var(--ease-out),
    transform 0.45s var(--ease-out);
  transition-delay: calc(var(--module-index) * 80ms);
}

.wl-scope__transforms.is-visible .wl-scope__module {
  opacity: 1;
  transform: none;
}

.wl-scope__side {
  display: grid;
  gap: 0.65rem;
  min-width: 0;
  padding: 0.9rem 0.95rem;
  border-radius: 10px;
}

.wl-scope__side--problem {
  background: rgba(18, 26, 38, 0.03);
  border: 1px solid rgba(18, 26, 38, 0.06);
}

.wl-scope__side--result {
  background: var(--color-accent-surface);
  border: 1px solid rgba(47, 102, 255, 0.14);
  opacity: 0.72;
  transform: translateY(0.35rem);
  transition:
    opacity 0.4s var(--ease-out),
    transform 0.4s var(--ease-out);
  transition-delay: calc(var(--module-index) * 80ms + 120ms);
}

.wl-scope__transforms.is-visible .wl-scope__side--result {
  opacity: 1;
  transform: none;
}

.wl-scope__side-top {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.wl-scope__icon {
  display: inline-grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 8px;
  flex-shrink: 0;
}

.wl-scope__icon svg {
  width: 1.05rem;
  height: 1.05rem;
}

.wl-scope__icon--problem {
  background: rgba(18, 26, 38, 0.06);
  color: #445065;
  border: 1px solid rgba(18, 26, 38, 0.08);
}

.wl-scope__icon--result {
  background: rgba(47, 102, 255, 0.12);
  color: var(--color-accent);
  border: 1px solid rgba(47, 102, 255, 0.18);
}

.wl-scope__tag {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.wl-scope__tag--result {
  color: var(--color-accent);
}

.wl-scope__copy {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.5;
  color: var(--color-text);
}

.wl-scope__bridge {
  display: grid;
  place-items: center;
  color: var(--color-accent);
}

.wl-scope__arrow {
  display: inline-grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: rgba(47, 102, 255, 0.08);
  border: 1px solid rgba(47, 102, 255, 0.16);
  transform: rotate(90deg) scaleX(0.35);
  opacity: 0.35;
  transition:
    transform 0.4s var(--ease-out),
    opacity 0.4s var(--ease-out);
  transition-delay: calc(var(--module-index) * 80ms + 60ms);
}

.wl-scope__transforms.is-visible .wl-scope__arrow {
  transform: rotate(90deg) scaleX(1);
  opacity: 1;
}

.wl-scope__arrow svg {
  width: 1rem;
  height: 1rem;
}

.wl-scope__deliverables {
  display: grid;
  gap: 1.15rem;
  padding: clamp(1.25rem, 3vw, 1.85rem);
  border-radius: clamp(1rem, 2vw, 1.35rem);
  border: 1px solid rgba(47, 102, 255, 0.12);
  background:
    radial-gradient(ellipse 50% 60% at 100% 0%, rgba(47, 102, 255, 0.08), transparent 60%),
    linear-gradient(180deg, #f7f9fd 0%, #ffffff 100%);
  box-shadow: 0 10px 28px rgba(18, 26, 38, 0.04);
}

.wl-scope__deliverables-intro {
  max-width: 40rem;
}

.wl-scope__deliverables-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.6vw, 1.75rem);
  font-weight: 740;
  letter-spacing: -0.03em;
  color: var(--color-text);
}

.wl-scope__deliverables-lead {
  margin: 0.7rem 0 0;
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wl-scope__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
}

.wl-scope__item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.8rem;
  align-items: start;
  padding: 0.85rem 0;
  border-top: 1px solid rgba(18, 26, 38, 0.07);
}

.wl-scope__item:first-child {
  border-top: 0;
  padding-top: 0.15rem;
}

.wl-scope__item-num {
  display: inline-grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  background: var(--color-accent-surface);
  border: 1px solid rgba(47, 102, 255, 0.18);
  color: var(--color-accent);
  font-weight: 750;
  font-size: 0.82rem;
}

.wl-scope__item-title {
  margin: 0 0 0.3rem;
  font-size: 1.02rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--color-text);
}

.wl-scope__item-body {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.wl-scope__note {
  margin: 0;
  max-width: 44rem;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--color-text-subtle);
}

.wl-scope__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  min-height: 44px;
  color: var(--color-accent);
  font-weight: 650;
  font-size: 0.96rem;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
  text-decoration-color: rgba(47, 102, 255, 0.35);
  transition:
    color var(--duration-fast) var(--ease-out),
    text-decoration-color var(--duration-fast) var(--ease-out);
}

.wl-scope__link:hover {
  color: var(--color-accent-hover);
  text-decoration-color: rgba(47, 102, 255, 0.75);
}

.wl-scope__link:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: 3px;
  border-radius: 6px;
}

@media (min-width: 700px) {
  .wl-scope__transforms {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.1rem;
  }

  .wl-scope__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 1.25rem;
  }

  .wl-scope__item {
    padding: 0.95rem 0;
  }
}

@media (min-width: 960px) {
  .wl-scope__module {
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: stretch;
    gap: 0.85rem;
    padding: 1.05rem;
  }

  .wl-scope__arrow {
    transform: rotate(0deg) scaleX(0.35);
  }

  .wl-scope__transforms.is-visible .wl-scope__arrow {
    transform: rotate(0deg) scaleX(1);
  }

  .wl-scope__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .wl-scope__module,
  .wl-scope__side--result,
  .wl-scope__arrow {
    transition: none;
  }

  .wl-scope__module,
  .wl-scope__transforms.is-visible .wl-scope__module {
    opacity: 1;
    transform: none;
  }

  .wl-scope__side--result,
  .wl-scope__transforms.is-visible .wl-scope__side--result {
    opacity: 1;
    transform: none;
  }

  .wl-scope__arrow,
  .wl-scope__transforms.is-visible .wl-scope__arrow {
    opacity: 1;
    transform: rotate(90deg) scaleX(1);
  }
}

@media (min-width: 960px) and (prefers-reduced-motion: reduce) {
  .wl-scope__arrow,
  .wl-scope__transforms.is-visible .wl-scope__arrow {
    transform: rotate(0deg) scaleX(1);
  }
}
</style>
