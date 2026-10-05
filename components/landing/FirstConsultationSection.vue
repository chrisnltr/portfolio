<template>
  <section
    id="erstgespraech"
    class="wl-consult"
    aria-labelledby="website-consult-title"
  >
    <div class="container-page wl-consult__inner">
      <div class="wl-consult__copy">
        <p class="wl-consult__eyebrow">Kostenloses Erstgespräch</p>
        <h2 id="website-consult-title" class="wl-consult__title">
          In etwa 15 Minuten klären wir, was Ihre neue Website wirklich braucht.
        </h2>
        <p class="wl-consult__lead">
          Das Gespräch dient zunächst dazu, Ihr Unternehmen, Ihre aktuelle
          Situation und Ihr Ziel zu verstehen. Sie müssen dafür noch kein
          fertiges Konzept vorbereitet haben.
        </p>

        <ol class="wl-consult__points">
          <li v-for="(point, index) in points" :key="point.id">
            <span class="wl-consult__point-num" aria-hidden="true">
              {{ index + 1 }}
            </span>
            <div>
              <h3 class="wl-consult__point-title">{{ point.title }}</h3>
              <p class="wl-consult__point-body">{{ point.description }}</p>
            </div>
          </li>
        </ol>

        <ul class="wl-consult__trust" aria-label="Wichtige Hinweise zum Erstgespräch">
          <li v-for="note in trustNotes" :key="note">{{ note }}</li>
        </ul>

        <div class="wl-consult__actions">
          <NuxtLink
            :to="contactTo"
            class="btn-cta wl-consult__cta"
            @click="onCta"
          >
            <span>Kostenloses Website-Erstgespräch starten</span>
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <p class="wl-consult__micro">
            Drei kurze Schritte · dauert etwa 60 Sekunden
          </p>
        </div>
      </div>

      <div class="wl-consult__media">
        <UiVisualPlaceholder
          type="media"
          badge="TEMPORÄRER MEDIEN-PLATZHALTER"
          title="Persönliches Begrüßungsvideo oder Gesprächsfoto von Chris"
          description="Hier später entweder ein sympathisches, professionelles Foto von Chris in einer realen Arbeitssituation oder ein kurzes Begrüßungsvideo einsetzen. Inhalt des Videos: kurze persönliche Vorstellung, Erklärung des unverbindlichen Erstgesprächs und Hinweis, dass noch kein fertiges Konzept benötigt wird."
          format-label="Desktop ungefähr 4:5 oder Video im Hochformat; mobil kompakt unter dem Text"
          animation-hint="Bei Verwendung eines Videos nur ein dezenter Play-Button und ein ruhiges Vorschaubild. Kein automatischer Ton und kein ungefragtes Autoplay mit Audio."
          aspect-ratio="4 / 5"
          replace-hint="Später durch finales Foto oder Video ersetzen. Keine Fake-Wiedergabe."
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import UiVisualPlaceholder from "~/components/ui/VisualPlaceholder.vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { contactPath } from "~/data/navigation";
import {
  websiteLandingConsultationPoints,
  websiteLandingTrustNotes,
} from "~/data/websiteLanding";

const { track } = useAnalytics();
const points = websiteLandingConsultationPoints;
const trustNotes = websiteLandingTrustNotes;
const contactTo = { path: contactPath, query: { projekt: "website" } };

function onCta() {
  track("cta_click", {
    location: "website-landing-consultation",
    service: "website-erstgespraech",
  });
}
</script>

<style scoped>
.wl-consult {
  padding-block: clamp(3rem, 6vw, 5rem);
  background:
    radial-gradient(ellipse 45% 40% at 90% 20%, rgba(47, 102, 255, 0.07), transparent 65%),
    transparent;
}

.wl-consult__inner {
  display: grid;
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: center;
}

.wl-consult__copy {
  display: grid;
  gap: 1rem;
  min-width: 0;
}

.wl-consult__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wl-consult__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.5vw, 2.45rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  text-wrap: balance;
}

.wl-consult__lead {
  margin: 0;
  max-width: 36rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-consult__points {
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.95rem;
}

.wl-consult__points li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.85rem;
  align-items: start;
}

.wl-consult__point-num {
  display: inline-grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  background: var(--color-accent-surface);
  border: 1px solid rgba(47, 102, 255, 0.2);
  color: var(--color-accent);
  font-weight: 750;
  font-size: 0.9rem;
}

.wl-consult__point-title {
  margin: 0 0 0.3rem;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--color-text);
}

.wl-consult__point-body {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.wl-consult__trust {
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

.wl-consult__trust li {
  position: relative;
  padding-left: 1.2rem;
  font-size: 0.92rem;
  font-weight: 550;
  color: var(--color-text);
}

.wl-consult__trust li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: var(--color-accent);
}

.wl-consult__actions {
  display: grid;
  gap: 0.55rem;
  margin-top: 0.35rem;
}

.wl-consult__cta {
  width: 100%;
  justify-content: center;
  text-decoration: none;
}

.wl-consult__micro {
  margin: 0;
  font-size: 0.88rem;
  color: var(--color-text-subtle);
}

.wl-consult__media {
  width: 100%;
  max-width: 24rem;
  margin-inline: auto;
}

@media (min-width: 640px) {
  .wl-consult__cta {
    width: auto;
    justify-content: flex-start;
  }

  .wl-consult__trust {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem 1rem;
  }
}

@media (min-width: 960px) {
  .wl-consult__inner {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: clamp(2rem, 4vw, 3.5rem);
  }

  .wl-consult__media {
    max-width: none;
    margin-inline: 0;
  }
}

@media (max-width: 959px) {
  .wl-consult__media :deep(.visual-placeholder) {
    aspect-ratio: 5 / 4;
  }
}
</style>
