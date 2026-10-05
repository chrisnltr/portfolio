<template>
  <div
    class="visual-placeholder"
    :class="[
      `visual-placeholder--${type}`,
      { 'visual-placeholder--has-ratio': Boolean(aspectRatio) },
    ]"
    :style="rootStyle"
    data-visual-placeholder="true"
  >
    <p class="visual-placeholder__badge">{{ resolvedBadge }}</p>
    <h3 v-if="title" class="visual-placeholder__title">{{ title }}</h3>
    <p v-if="description" class="visual-placeholder__description">
      {{ description }}
    </p>
    <p
      v-if="mobileDescription"
      class="visual-placeholder__mobile-note"
    >
      {{ mobileDescription }}
    </p>
    <p v-if="formatLabel" class="visual-placeholder__meta">
      Format: {{ formatLabel }}
    </p>
    <p v-if="replaceHint" class="visual-placeholder__hint">
      {{ replaceHint }}
    </p>
    <div
      v-if="animationHint"
      class="visual-placeholder__animation"
      data-visual-placeholder="animation"
    >
      <p class="visual-placeholder__animation-label">ANIMATION SPÄTER</p>
      <p class="visual-placeholder__animation-text">{{ animationHint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "media" | "animation" | "section";
    title?: string;
    description?: string;
    aspectRatio?: string;
    mobileDescription?: string;
    animationHint?: string;
    badge?: string;
    formatLabel?: string;
    replaceHint?: string;
  }>(),
  {
    type: "media",
  },
);

const defaultBadges: Record<NonNullable<typeof props.type>, string> = {
  media: "TEMPORÄRER MEDIEN-PLATZHALTER",
  animation: "TEMPORÄRER ANIMATIONS-PLATZHALTER",
  section: "TEMPORÄRER SEITENABSCHNITT-PLATZHALTER",
};

const resolvedBadge = computed(
  () => props.badge || defaultBadges[props.type],
);

const rootStyle = computed(() => {
  if (!props.aspectRatio) return undefined;
  return { aspectRatio: props.aspectRatio };
});
</script>

<style scoped>
.visual-placeholder {
  --vp-pink: #ff2db8;
  --vp-pink-deep: #d1008a;
  --vp-ink: #3b0030;
  --vp-ink-soft: rgba(59, 0, 48, 0.78);

  display: grid;
  align-content: start;
  gap: 0.65rem;
  width: 100%;
  padding: clamp(1rem, 2.5vw, 1.45rem);
  border: 2px dashed var(--vp-pink-deep);
  border-radius: var(--radius-md);
  background:
    repeating-linear-gradient(
      -45deg,
      rgba(255, 45, 184, 0.18) 0 10px,
      rgba(255, 45, 184, 0.28) 10px 20px
    ),
    linear-gradient(160deg, #ff6ad5 0%, var(--vp-pink) 55%, #ff1493 100%);
  color: var(--vp-ink);
  box-shadow: 0 10px 28px rgba(209, 0, 138, 0.18);
}

.visual-placeholder--has-ratio {
  min-height: 0;
}

.visual-placeholder--section {
  aspect-ratio: auto;
  min-height: auto;
}

.visual-placeholder__badge {
  margin: 0;
  display: inline-flex;
  align-self: start;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(59, 0, 48, 0.18);
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-pink-deep);
}

.visual-placeholder__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--vp-ink);
}

.visual-placeholder__description,
.visual-placeholder__mobile-note,
.visual-placeholder__meta,
.visual-placeholder__hint,
.visual-placeholder__animation-text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--vp-ink-soft);
}

.visual-placeholder__mobile-note {
  display: none;
}

.visual-placeholder__meta,
.visual-placeholder__hint {
  font-size: 0.82rem;
  font-weight: 650;
}

.visual-placeholder__animation {
  margin-top: 0.35rem;
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  border: 1.5px dashed rgba(59, 0, 48, 0.35);
  background: rgba(255, 255, 255, 0.55);
}

.visual-placeholder__animation-label {
  margin: 0 0 0.3rem;
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-pink-deep);
}

@media (max-width: 767px) {
  .visual-placeholder__mobile-note {
    display: block;
  }
}
</style>
