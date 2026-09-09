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
          <div class="hero__primary-group">
            <a
              :href="primaryHref"
              class="btn-primary hero__cta"
              @click="onCta('hero-primary')"
            >
              {{ resolvedPrimaryCta }}
            </a>
            <span class="hero__cta-hint">{{ messages.hero.primaryCtaHint }}</span>
          </div>
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
  padding-top: calc(var(--header-height) + clamp(5rem, 6vw, 6rem));
  padding-bottom: clamp(5rem, 7vw, 6rem);
  background:
    linear-gradient(90deg, rgba(5, 7, 11, 0.92) 0%, rgba(5, 7, 11, 0.68) 48%, rgba(5, 7, 11, 0.28) 100%),
    url("/images/hintergrund.png") center / cover no-repeat;
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

.hero::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: clamp(5rem, 10vw, 7.5rem);
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(
    to bottom,
    rgba(5, 7, 11, 0) 0%,
    var(--color-bg) 100%
  );
}

.hero__inner {
  position: relative;
  z-index: 1;
}

.hero__copy {
  max-width: 50rem;
}

.hero__eyebrow {
  max-width: 36rem;
}

.hero__eyebrow-name,
.hero__eyebrow-role {
  display: inline;
}

.hero__title {
  margin: 1.5rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 5vw, 4.25rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: #fff;
  max-width: 780px;
  text-wrap: balance;
  overflow-wrap: break-word;
}

.hero__title-line {
  display: block;
}

.hero__body {
  margin: 1.5rem 0 0;
  max-width: 37rem;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--color-text-muted);
  overflow-wrap: break-word;
}

.hero__actions {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.hero__primary-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.hero__actions .btn-primary {
  width: auto;
  justify-content: center;
}

.hero__cta-hint {
  font-size: 0.75rem;
  line-height: 1.2;
  color: var(--color-text-subtle);
}

.hero__secondary {
  align-self: center;
}

.hero__trust {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  font-size: 0.875rem;
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

@media (max-width: 767px) {
  .hero {
    padding-top: calc(var(--header-height) + 3.75rem);
    padding-bottom: 4.5rem;
    background-position: 72% center;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-color: var(--color-bg);
    background-image:
      linear-gradient(90deg, rgba(5, 7, 11, 0.96) 0%, rgba(5, 7, 11, 0.86) 58%, rgba(5, 7, 11, 0.48) 100%),
      url("/images/hintergrund.png");
  }

  .hero::before {
    opacity: 0.55;
    width: min(78vw, 420px);
    height: min(58vw, 320px);
    right: -18%;
    top: 6%;
  }

  .hero__eyebrow {
    margin-bottom: 0;
    font-size: 0.8125rem;
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
    margin-top: 0.5rem;
    letter-spacing: 0.04em;
    text-transform: none;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-text-subtle);
  }

  .hero__title {
    margin-top: 1.5rem;
    font-size: clamp(2rem, 8.8vw, 2.375rem);
    line-height: 1.15;
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
    margin-top: 1.5rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .hero__actions {
    margin-top: 2rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .hero__primary-group {
    gap: 0.4rem;
  }

  .hero__cta {
    width: 100%;
    min-height: 3.25rem;
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
    margin-top: 2rem;
    display: grid;
    gap: 0.55rem;
    font-size: 0.875rem;
    line-height: 1.45;
  }

  .hero__trust-item {
    display: block;
  }

  .hero__trust-item:not(:last-child)::after {
    content: none;
  }
}

@media (max-width: 374px) {
  .hero {
    padding-top: calc(var(--header-height) + 3.5rem);
  }
}
</style>
