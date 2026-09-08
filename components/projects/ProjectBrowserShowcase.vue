<template>
  <div
    class="showcase"
    :class="{
      'showcase--compact': compact,
      'showcase--scroll': Boolean(scrollImage),
      'showcase--pending': isPending,
    }"
  >
    <div class="showcase__glow" aria-hidden="true" />
    <div class="showcase__frame">
      <div
        v-if="scrollImage"
        class="showcase__media showcase__media--scroll"
      >
        <ScrollingProjectPreview
          :image="scrollImage"
          :title="title"
          :alt="scrollImage.alt"
          :priority="priority || scrollImage.priority"
          :preview-id="previewId || undefined"
          fill
        />
      </div>
      <div
        v-else-if="primaryImage"
        class="showcase__media"
      >
        <img
          :src="primaryImage.src"
          :alt="primaryImage.alt"
          :width="primaryImage.width"
          :height="primaryImage.height"
          sizes="(max-width: 1023px) 92vw, 46vw"
          :loading="primaryImage.priority ? 'eager' : 'lazy'"
          :fetchpriority="primaryImage.priority ? 'high' : undefined"
          decoding="async"
        />
      </div>
      <div
        v-else
        class="showcase__editorial"
      >
        <p class="showcase__badge">{{ pendingBadge }}</p>
        <h3 class="showcase__title">{{ title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ScrollingProjectPreview from "~/components/projects/ScrollingProjectPreview.vue";
import type { ProjectImage } from "~/types/content";

const props = withDefaults(
  defineProps<{
    title: string;
    label?: string;
    meta?: string;
    images?: ProjectImage[];
    /** Full-page preview: hover scrolls instead of scaling the frame. */
    scrollImage?: ProjectImage | null;
    compact?: boolean;
    showAssetNote?: boolean;
    pendingBadge?: string;
    priority?: boolean;
    /** Stable id for exclusive touch scroll preview. */
    previewId?: string;
  }>(),
  {
    label: "",
    meta: "",
    images: () => [],
    scrollImage: null,
    compact: false,
    showAssetNote: false,
    pendingBadge: "In Entwicklung",
    priority: false,
    previewId: "",
  },
);

const primaryImage = computed(() => {
  const img =
    props.images.find((item) => item.kind === "desktop") ||
    props.images.find((item) => item.kind !== "mobile") ||
    props.images[0];
  if (!img) return null;
  return { ...img, priority: props.priority || img.priority };
});

const isPending = computed(
  () => !props.scrollImage && !primaryImage.value,
);
</script>

<style scoped>
.showcase {
  position: relative;
}

.showcase__glow {
  position: absolute;
  inset: -2% -1%;
  z-index: 0;
  background: radial-gradient(
    circle at 50% 42%,
    rgba(47, 102, 255, 0.1),
    rgba(47, 102, 255, 0.04) 46%,
    transparent 70%
  );
  pointer-events: none;
}

.showcase__frame {
  position: relative;
  z-index: 1;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
  overflow: hidden;
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (hover: hover) and (pointer: fine) {
  .showcase:not(.showcase--scroll):hover .showcase__frame {
    transform: scale(1.01);
  }
}

.showcase--pending .showcase__frame {
  border-style: dashed;
  border-color: rgba(47, 102, 255, 0.35);
}

.showcase__media {
  aspect-ratio: 16 / 10;
  position: relative;
  overflow: hidden;
  background: var(--color-surface-raised);
}

.showcase__media--scroll :deep(.preview) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.showcase__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.showcase__editorial {
  aspect-ratio: 16 / 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: clamp(1.25rem, 3vw, 2rem);
  text-align: center;
  background: linear-gradient(180deg, #101722 0%, #0b0f16 100%);
}

.showcase__badge {
  margin: 0;
  padding: 0.32rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(47, 102, 255, 0.45);
  background: rgba(47, 102, 255, 0.12);
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8eb0ff;
}

.showcase__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--color-text-muted);
}

@media (prefers-reduced-motion: reduce) {
  .showcase__frame {
    transition: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .showcase:not(.showcase--scroll):hover .showcase__frame {
      transform: none;
    }
  }
}
</style>
