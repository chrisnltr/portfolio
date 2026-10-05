<template>
  <section class="wl-hero" aria-labelledby="website-landing-hero-title">
    <div class="wl-hero__glow" aria-hidden="true" />
    <div class="container-page wl-hero__inner">
      <div class="wl-hero__copy">
        <p class="wl-hero__eyebrow">
          Webdesign für Selbstständige und kleine Unternehmen
        </p>

        <h1 id="website-landing-hero-title" class="wl-hero__title">
          Eine
          <span class="wl-hero__accent">professionelle Website</span>, die Ihr
          Unternehmen überzeugend präsentiert.
        </h1>

        <p class="wl-hero__body">
          Individuell geplant und persönlich umgesetzt – von der klaren
          Seitenstruktur und dem passenden Design bis zum mobiloptimierten
          Livegang. Ohne Agenturumwege und mit einem direkten Ansprechpartner.
        </p>

        <div class="wl-hero__actions">
          <div class="wl-hero__primary-group">
            <NuxtLink
              :to="contactTo"
              class="btn-cta wl-hero__cta"
              @click="onPrimary"
            >
              <span>Kostenloses Website-Erstgespräch starten</span>
              <span aria-hidden="true">→</span>
            </NuxtLink>
            <p class="wl-hero__micro">
              Unverbindlich · ca. 15 Minuten · persönliche Rückmeldung
            </p>
          </div>

          <NuxtLink
            :to="projectsHref"
            class="wl-hero__secondary"
            @click="onSecondary"
          >
            Website-Projekte ansehen
          </NuxtLink>
        </div>

        <ul class="wl-hero__trust" aria-label="Warum die Zusammenarbeit unkompliziert ist">
          <li v-for="item in trustItems" :key="item.label" class="wl-hero__trust-item">
            <span class="wl-hero__trust-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  :d="item.path"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>

      <div class="wl-hero__visual" ref="visualRef">
        <UiVisualPlaceholder
          type="media"
          badge="TEMPORÄRER HERO-ASSET-PLATZHALTER"
          title="Persönliches Foto von Chris + Website-Projekt-Mockups"
          description="Hier später ein hochwertiges Halbporträt von Chris einsetzen. Chris wirkt seriös, sympathisch und direkt ansprechbar. Ergänzend zwei kleine schwebende Browser- oder Geräte-Mockups mit echten Kundenwebsites, um persönliche Zusammenarbeit und sichtbare Projekterfahrung gleichzeitig zu vermitteln."
          mobile-description="Desktop: großes Porträt mit überlagerten Projektkarten. Mobil: reduziertes Porträt mit höchstens einem Website-Mockup."
          format-label="Desktop ungefähr 4:5 beziehungsweise hochformatige Komposition"
          aspect-ratio="4 / 5"
          animation-hint="Die beiden Website-Mockups erscheinen beim Laden leicht zeitversetzt und bewegen sich anschließend nur minimal. Keine dauerhafte starke Bewegung."
          replace-hint="Später durch finales Bild ersetzen."
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import UiVisualPlaceholder from "~/components/ui/VisualPlaceholder.vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { contactPath } from "~/data/navigation";

const { track } = useAnalytics();

const contactTo = { path: contactPath, query: { projekt: "website" } };
const projectsHref = "/#projects";

const visualRef = ref<HTMLElement | null>(null);

const trustItems = [
  {
    label: "Direkter Ansprechpartner",
    path: "M16 19v-1.5c0-2.1-2.7-3.5-4-3.5s-4 1.4-4 3.5V19M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    label: "Individuelle Umsetzung",
    path: "M12 3l1.8 4.6L18.5 9l-4 3.2L15.6 17 12 14.6 8.4 17l1.1-4.8-4-3.2 4.7-1.4L12 3Z",
  },
  {
    label: "Für Desktop und Mobil optimiert",
    path: "M8 3.5h8A1.5 1.5 0 0 1 17.5 5v14A1.5 1.5 0 0 1 16 20.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5ZM10 18h4",
  },
] as const;

function onPrimary() {
  track("cta_click", {
    location: "website-landing-hero",
    service: "website-erstgespraech",
  });
}

function onSecondary() {
  track("cta_click", {
    location: "website-landing-hero-secondary",
    service: "projects",
  });
}

onMounted(() => {
  const node = visualRef.value;
  if (!node || typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    node.classList.add("is-visible");
    return;
  }
  requestAnimationFrame(() => {
    node.classList.add("is-visible");
  });
});
</script>

<style scoped>
.wl-hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  min-height: min(100dvh, 54rem);
  padding-top: calc(var(--header-height) + clamp(1.5rem, 3vw, 2.5rem));
  padding-bottom: clamp(2.5rem, 5vw, 4rem);
  background:
    radial-gradient(ellipse 50% 42% at 88% 12%, rgba(47, 102, 255, 0.1), transparent 58%),
    radial-gradient(ellipse 42% 36% at 8% 78%, rgba(47, 102, 255, 0.06), transparent 62%),
    var(--color-bg);
  overflow: clip;
}

.wl-hero__glow {
  position: absolute;
  inset: auto auto 18% -12%;
  width: min(38rem, 70vw);
  height: min(22rem, 40vw);
  background: radial-gradient(circle, rgba(47, 102, 255, 0.08), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.wl-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: center;
  width: 100%;
}

.wl-hero__copy {
  display: grid;
  gap: 1rem;
  max-width: 38rem;
}

.wl-hero__eyebrow {
  margin: 0;
  font-size: 0.84rem;
  font-weight: 650;
  letter-spacing: 0.01em;
  color: var(--color-accent);
  line-height: 1.35;
}

.wl-hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 5.2vw, 3.15rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.08;
  color: var(--color-text);
  text-wrap: balance;
}

.wl-hero__accent {
  color: var(--color-accent);
  font-weight: inherit;
  text-decoration: none;
}

.wl-hero__body {
  margin: 0;
  max-width: 34rem;
  font-size: clamp(1rem, 1.7vw, 1.12rem);
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-hero__actions {
  display: grid;
  gap: 0.85rem;
  margin-top: 0.35rem;
}

.wl-hero__primary-group {
  display: grid;
  gap: 0.55rem;
}

.wl-hero__cta {
  width: 100%;
  justify-content: center;
  text-align: center;
  text-decoration: none;
}

.wl-hero__micro {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.4;
  color: var(--color-text-subtle);
}

.wl-hero__secondary {
  justify-self: start;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  font-weight: 550;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-block: 0.15rem;
  transition:
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.wl-hero__secondary:hover {
  color: var(--color-text);
  border-bottom-color: rgba(18, 26, 38, 0.28);
}

.wl-hero__secondary:focus-visible,
.wl-hero__cta:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: 2px;
}

.wl-hero__trust {
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

.wl-hero__trust-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.92rem;
  font-weight: 550;
  color: var(--color-text);
}

.wl-hero__trust-icon {
  display: inline-grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  color: var(--color-accent);
  box-shadow: 0 1px 2px rgba(18, 26, 38, 0.04);
}

.wl-hero__trust-icon svg {
  width: 1.05rem;
  height: 1.05rem;
}

.wl-hero__visual {
  width: 100%;
  max-width: 28rem;
  margin-inline: auto;
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity 0.55s var(--ease-out),
    transform 0.55s var(--ease-out);
}

.wl-hero__visual.is-visible {
  opacity: 1;
  transform: none;
}

@media (min-width: 640px) {
  .wl-hero__cta {
    width: auto;
    justify-content: flex-start;
  }

  .wl-hero__trust {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .wl-hero__trust-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.45rem;
    font-size: 0.88rem;
    line-height: 1.3;
  }
}

@media (min-width: 960px) {
  .wl-hero {
    min-height: min(100dvh, 52rem);
    padding-bottom: clamp(2rem, 4vw, 3.25rem);
  }

  .wl-hero__inner {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(2rem, 4vw, 3.5rem);
    align-items: center;
  }

  .wl-hero__copy {
    max-width: none;
  }

  .wl-hero__visual {
    max-width: none;
    margin-inline: 0;
  }

  .wl-hero__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem 1.35rem;
  }

  .wl-hero__primary-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1rem;
  }

  .wl-hero__micro {
    max-width: 14rem;
  }
}

@media (max-width: 959px) {
  .wl-hero {
    min-height: auto;
    align-items: flex-start;
  }

  .wl-hero__visual {
    max-width: 22rem;
  }

  .wl-hero__visual :deep(.visual-placeholder) {
    aspect-ratio: 5 / 4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wl-hero__visual {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
