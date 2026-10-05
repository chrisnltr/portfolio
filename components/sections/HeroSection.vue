<template>
  <section
    :id="sectionId"
    class="hero"
  >
    <div class="hero__glow" aria-hidden="true" />
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
          <span class="hero__title-line">{{ headlineLines[0] }}</span>
          <span
            v-if="headlineLines[1]"
            class="hero__title-line hero__title-line--accent"
          >{{ headlineLines[1] }}</span>
        </h1>
        <p class="hero__body">{{ resolvedDescription }}</p>

        <div class="hero__actions">
          <div class="hero__primary-group">
            <NuxtLink
              :to="primaryHref"
              class="btn-cta hero__cta"
              @click="onCta('hero-primary')"
            >
              <span>{{ resolvedPrimaryCta }}</span>
              <span class="hero__cta-arrow" aria-hidden="true">→</span>
            </NuxtLink>
            <span class="hero__cta-hint">{{ messages.hero.primaryCtaHint }}</span>
          </div>
        </div>

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
    primaryHref?: string;
    analyticsService?: string;
  }>(),
  {
    sectionId: "home",
    primaryHref: "/kontakt",
    analyticsService: "erstgespraech",
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
  min-height: min(92dvh, 52rem);
  display: flex;
  align-items: center;
  padding-top: calc(var(--header-height) + clamp(3.5rem, 5vw, 5rem));
  padding-bottom: clamp(4.5rem, 8vw, 6.5rem);
  background:
    linear-gradient(
      105deg,
      rgb(243, 245, 248) 0%,
      rgb(243, 245, 248) 42%,
      rgba(243, 245, 248, 0.82) 64%,
      rgba(243, 245, 248, 0.28) 100%
    ),
    url("/images/hintergrund.png") right center / cover no-repeat;
  overflow: hidden;
}

.hero__glow {
  position: absolute;
  right: -6%;
  top: 12%;
  width: min(48vw, 560px);
  height: min(48vw, 460px);
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    closest-side,
    rgba(47, 102, 255, 0.14) 0%,
    rgba(47, 102, 255, 0.05) 48%,
    transparent 78%
  );
  filter: blur(2px);
}

.hero::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: clamp(5rem, 12vw, 9rem);
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(
    to bottom,
    rgba(243, 245, 248, 0) 0%,
    rgba(243, 245, 248, 0.65) 48%,
    rgb(243, 245, 248) 100%
  );
}

.hero__inner {
  position: relative;
  z-index: 1;
}

.hero__copy {
  max-width: 46rem;
}

.hero__eyebrow,
.hero__title,
.hero__body,
.hero__actions {
  animation: hero-rise 0.75s var(--ease-out) both;
}

.hero__eyebrow { animation-delay: 0.04s; }
.hero__title { animation-delay: 0.12s; }
.hero__body { animation-delay: 0.2s; }
.hero__actions { animation-delay: 0.28s; }

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__eyebrow {
  max-width: 36rem;
  margin-bottom: 0;
}

.hero__eyebrow-name,
.hero__eyebrow-role {
  display: inline;
}

.hero__title {
  margin: 0.7rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 3.8vw, 3.25rem);
  font-weight: 750;
  line-height: 1.15;
  letter-spacing: -0.035em;
  color: var(--color-text);
  max-width: min(100%, 42rem);
  text-wrap: pretty;
  overflow-wrap: break-word;
}

.hero__title-line {
  display: inline;
}

.hero__title-line + .hero__title-line::before {
  content: " ";
}

.hero__title-line--accent {
  color: var(--color-accent);
}

.hero__body {
  margin: 0.95rem 0 0;
  max-width: 34rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  overflow-wrap: break-word;
}

.hero__actions {
  margin-top: 1.4rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
}

.hero__primary-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.75rem;
}

.hero__actions .btn-cta {
  width: auto;
  justify-content: center;
  min-height: 2.9rem;
  padding-inline: 1.3rem;
  font-size: 0.98rem;
}

.hero__cta-arrow {
  font-size: 1.05em;
  line-height: 1;
  transition: transform var(--duration-fast) var(--ease-out);
}

.hero__cta:hover .hero__cta-arrow {
  transform: translateX(3px);
}

.hero__cta-hint {
  font-size: 0.78rem;
  line-height: 1.2;
  color: var(--color-text-subtle);
}

@media (prefers-reduced-motion: reduce) {
  .hero__eyebrow,
  .hero__title,
  .hero__body,
  .hero__actions {
    animation: none;
  }
}

@media (max-width: 767px) {
  .hero {
    min-height: 0;
    align-items: flex-start;
    padding-top: calc(var(--header-height) + 3.5rem);
    padding-bottom: 4rem;
    background-position: 72% center;
    background-size: auto 100%;
    background-color: var(--color-bg);
    background-image:
      linear-gradient(
        180deg,
        rgba(243, 245, 248, 0.96) 0%,
        rgba(243, 245, 248, 0.92) 55%,
        rgba(243, 245, 248, 0.88) 100%
      ),
      url("/images/hintergrund.png");
  }

  .hero__glow {
    opacity: 0.55;
    width: min(78vw, 420px);
    height: min(58vw, 320px);
    right: -18%;
    top: 6%;
  }

  .hero__eyebrow {
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
    margin-top: 0.35rem;
    letter-spacing: 0.04em;
    text-transform: none;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-text-subtle);
  }

  .hero__title {
    margin-top: 0.75rem;
    font-size: clamp(2.1rem, 8.5vw, 2.45rem);
    line-height: 1.1;
    letter-spacing: -0.032em;
    max-width: none;
  }

  .hero__title-line {
    display: inline;
  }

  .hero__title-line + .hero__title-line::before {
    content: " ";
  }

  .hero__body {
    margin-top: 0.85rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .hero__actions {
    margin-top: 1.25rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
  }

  .hero__primary-group {
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
  }

  .hero__cta-hint {
    text-align: center;
  }

  .hero__cta {
    width: 100%;
    min-height: 3.1rem;
    max-height: none;
    padding-inline: 1rem;
    font-size: 0.95rem;
    text-align: center;
    white-space: normal;
    line-height: 1.3;
  }
}

@media (max-width: 374px) {
  .hero {
    padding-top: calc(var(--header-height) + 3.25rem);
  }
}
</style>
