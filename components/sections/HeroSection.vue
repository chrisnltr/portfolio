<template>
  <section
    :id="sectionId"
    class="hero"
  >
    <div class="container-page hero__inner">
      <div class="hero__copy">
        <p class="section-label">{{ resolvedEyebrow }}</p>
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
            class="btn-primary"
            @click="onCta('hero-primary')"
          >
            {{ resolvedPrimaryCta }}
          </a>
          <a
            :href="secondaryHref"
            class="text-link"
            @click="onCta('hero-secondary')"
          >
            {{ resolvedSecondaryCta }} →
          </a>
        </div>

        <p class="hero__trust">
          <span
            v-for="(item, index) in trustItems"
            :key="item"
          >
            {{ item }}<template v-if="index < trustItems.length - 1"><span class="hero__trust-sep" aria-hidden="true"> · </span></template>
          </span>
        </p>
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
  overflow-wrap: anywhere;
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
  overflow-wrap: anywhere;
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

.hero__trust {
  margin: 1.35rem 0 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-text-subtle);
  max-width: 36rem;
}

.hero__trust-sep {
  color: var(--color-text-subtle);
}
</style>
