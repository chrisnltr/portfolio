<template>
  <section
    :id="sectionId"
    ref="root"
    class="closing-cta"
    :style="glowStyle"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div
      class="closing-cta__glow"
      aria-hidden="true"
    />

    <div class="closing-cta__content reveal">
      <h2 class="closing-cta__title">
        {{ resolvedTitle }}
      </h2>

      <NuxtLink
        :to="contactPath"
        class="btn-cta"
        @click="onPrimary"
      >
        <span>{{ resolvedPrimaryCta }}</span>
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useBottomGlow } from "~/composables/useBottomGlow";
import { useI18n } from "~/composables/useI18n";
import { useRevealGroup } from "~/composables/useReveal";
import { paths } from "~/data/navigation";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    title?: string;
    primaryCta?: string;
  }>(),
  {
    sectionId: "cta",
  },
);

const { messages } = useI18n();
const { track } = useAnalytics();
const { glowStyle, onPointerMove, onPointerLeave } = useBottomGlow();
const { root } = useRevealGroup();
const contactPath = paths.contact;

const resolvedTitle = computed(
  () => props.title ?? messages.value.closingCta.title,
);
const resolvedPrimaryCta = computed(
  () => props.primaryCta ?? messages.value.closingCta.primaryCta,
);

function onPrimary() {
  track("cta_click", {
    location: "home-closing-cta",
    service: "erstgespraech",
  });
}
</script>

<style scoped>
.closing-cta {
  --glow-boost: 0;
  position: relative;
  isolation: isolate;
  overflow: clip;
  display: grid;
  place-items: center;
  min-height: clamp(17.5rem, 28vw, 21.25rem);
  padding-block: clamp(2rem, 4vw, 3rem) clamp(3.25rem, 6vw, 4.5rem);
  padding-inline: 1.5rem;
  background: transparent;
}

.closing-cta__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    ellipse 55% 70% at 50% 100%,
    rgba(56, 103, 255, 0.16) 0%,
    rgba(56, 103, 255, 0.05) 38%,
    transparent 72%
  );
}

.closing-cta__glow::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 62% 85% at 50% 100%,
    rgba(56, 103, 255, 0.42) 0%,
    rgba(47, 102, 255, 0.18) 36%,
    transparent 74%
  );
  opacity: var(--glow-boost);
  transition: opacity 0.2s var(--ease-out);
}

.closing-cta__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.35rem;
  max-width: 36rem;
  text-align: center;
}

.closing-cta__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 3.8vw, 2.35rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.15;
  color: #0b1d35;
  text-wrap: balance;
}

@media (max-width: 639px) {
  .closing-cta {
    min-height: 0;
    padding-block: 2rem 3rem;
  }

  .closing-cta__content {
    gap: 1.15rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .closing-cta__glow::after {
    transition: none;
    opacity: 0;
  }
}
</style>
