<template>
  <section
    :id="sectionId"
    class="hero"
  >
    <div class="container-page hero__inner">
      <div class="hero__copy">
        <p class="section-label hero__eyebrow">
          <span class="hero__eyebrow-name">{{ eyebrowParts.name }}</span>
          <span
            v-if="eyebrowParts.role"
            class="hero__eyebrow-sep"
            aria-hidden="true"
          > · </span>
          <span
            v-if="eyebrowParts.role"
            class="hero__eyebrow-role"
          >{{ eyebrowParts.role }}</span>
        </p>
        <h1 class="hero__title">
          <span
            v-for="(line, index) in headlineLines"
            :key="index"
            class="hero__title-line"
          >{{ line }}</span>
        </h1>
        <p class="hero__body">{{ resolvedDescription }}</p>

        <div class="hero__actions">
          <a
            :href="primaryHref"
            class="btn-primary hero__cta"
            @click="onCta('hero-primary')"
          >
            {{ resolvedPrimaryCta }}
          </a>
          <a
            :href="secondaryHref"
            class="text-link hero__secondary"
            @click="onCta('hero-secondary')"
          >
            {{ resolvedSecondaryCta }} →
          </a>
        </div>

        <ul class="hero__trust" aria-label="Vertrauensaussagen">
          <li
            v-for="item in trustItems"
            :key="item"
            class="hero__trust-item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useI18n } from "~/composables/useI18n";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    eyebrow?: string;
    headline?: string;
    description?: string;
    primaryCta?: string;
    secondaryCta?: string;
    primaryHref?: string;
    secondaryHref?: string;
    trustLine?: string;
    analyticsService?: string;
  }>(),
  {
    sectionId: "home",
    primaryHref: "#contact",
    secondaryHref: "#projects",
    analyticsService: "contact",
  },
);

const { messages } = useI18n();
const { track } = useAnalytics();

const resolvedEyebrow = computed(
  () => props.eyebrow ?? messages.value.hero.eyebrow,
);
const resolvedDescription = computed(
  () => props.description ?? messages.value.hero.description,
);
const resolvedPrimaryCta = computed(
  () => props.primaryCta ?? messages.value.hero.primaryCta,
);
const resolvedSecondaryCta = computed(
  () => props.secondaryCta ?? messages.value.hero.secondaryCta,
);

const eyebrowParts = computed(() => {
  const raw = resolvedEyebrow.value;
  const parts = raw.split(" · ").map((s) => s.trim()).filter(Boolean);
  if (parts.length < 2) {
    return { name: raw, role: "" };
  }
  return {
    name: parts[0],
    role: parts.slice(1).join(" · "),
  };
});

const headlineLines = computed(() => {
  if (props.headline) return [props.headline];
  return [
    messages.value.hero.headlineLine1,
    messages.value.hero.headlineLine2,
  ];
});

const trustItems = computed(() => {
  const line = props.trustLine ?? messages.value.hero.trustLine;
  return line.split(" · ").map((s) => s.trim()).filter(Boolean);
});

function onCta(location: string) {
  track("cta_click", {
    location,
    service: location === "hero-primary" ? props.analyticsService : "projects",
  });
}
</script>

<style scoped>
.hero {
  position: relative;
  padding-top: calc(var(--header-height) + clamp(1.75rem, 4vw, 3rem));
  padding-bottom: clamp(3rem, 6vw, 5rem);
  background: transparent;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  right: -10%;
  top: 10%;
  width: min(55vw, 640px);
  height: min(55vw, 520px);
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    closest-side,
    rgba(47, 102, 255, 0.12) 0%,
    rgba(47, 102, 255, 0.04) 42%,
    rgba(5, 7, 11, 0) 78%
  );
}

.hero__inner {
  position: relative;
  z-index: 1;
}

.hero__copy {
  max-width: 40rem;
}

.hero__eyebrow {
  max-width: 36rem;
}

.hero__eyebrow-name,
.hero__eyebrow-role {
  display: inline;
}

.hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 8vw, 4.25rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: #fff;
  max-width: 11.5em;
  text-wrap: balance;
  overflow-wrap: break-word;
}

.hero__title-line {
  display: block;
}

.hero__body {
  margin: clamp(1.5rem, 3vw, 2rem) 0 0;
  max-width: 34rem;
  font-size: clamp(0.98rem, 2.8vw, 1.05rem);
  line-height: 1.65;
  color: var(--color-text-muted);
  overflow-wrap: break-word;
}

.hero__actions {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.85rem;
}

.hero__actions .btn-primary,
.hero__actions .text-link {
  width: 100%;
  justify-content: center;
}

.hero__trust {
  list-style: none;
  margin: 1.35rem 0 0;
  padding: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-text-subtle);
  max-width: 36rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0;
}

.hero__trust-item {
  display: inline;
}

.hero__trust-item:not(:last-child)::after {
  content: " · ";
  color: var(--color-text-subtle);
}

@media (min-width: 480px) {
  .hero__actions {
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
  }

  .hero__actions .btn-primary,
  .hero__actions .text-link {
    width: auto;
    justify-content: flex-start;
  }
}

@media (max-width: 767px) {
  .hero {
    padding-top: calc(var(--header-height) + 1.25rem);
    padding-bottom: 2.75rem;
  }

  .hero::before {
    opacity: 0.55;
    width: min(78vw, 420px);
    height: min(58vw, 320px);
    right: -18%;
    top: 6%;
  }

  .hero__eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    line-height: 1.45;
    font-weight: 600;
  }

  .hero__eyebrow-name {
    display: block;
  }

  .hero__eyebrow-sep {
    display: none;
  }

  .hero__eyebrow-role {
    display: block;
    margin-top: 0.2rem;
    letter-spacing: 0.04em;
    text-transform: none;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-text-subtle);
  }

  .hero__title {
    margin-top: 0.55rem;
    font-size: clamp(1.875rem, 8.2vw, 2.25rem);
    line-height: 1.12;
    letter-spacing: -0.028em;
    max-width: none;
  }

  .hero__title-line {
    display: inline;
  }

  .hero__title-line + .hero__title-line::before {
    content: " ";
  }

  .hero__body {
    margin-top: 1.1rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .hero__actions {
    margin-top: 1.5rem;
    gap: 0.65rem;
  }

  .hero__cta {
    width: 100%;
    min-height: 3.125rem;
    max-height: none;
    padding-inline: 1rem;
    font-size: 0.95rem;
    text-align: center;
    white-space: normal;
    line-height: 1.3;
  }

  .hero__secondary {
    width: 100%;
    min-height: 2.75rem;
    justify-content: center;
    font-size: 0.95rem;
  }

  .hero__trust {
    margin-top: 1.25rem;
    display: grid;
    gap: 0.35rem;
    font-size: 0.8125rem;
    line-height: 1.45;
  }

  .hero__trust-item {
    display: block;
  }

  .hero__trust-item:not(:last-child)::after {
    content: none;
  }
}
</style>
