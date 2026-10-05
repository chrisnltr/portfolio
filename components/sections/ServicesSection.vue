<template>
  <section
    :id="sectionId"
    class="section-pad services"
  >
    <div class="container-page">
      <header class="services__header">
        <p class="section-label">{{ resolvedEyebrow }}</p>
        <h2 class="services__title">
          <span class="services__title-lead">{{ resolvedTitle }}</span>
          <span class="services__title-accent">{{ resolvedTitleAccent }}</span>
          <span class="services__title-tail">{{ resolvedTitleAfter }}</span>
        </h2>
        <p class="services__lead">{{ resolvedSubtitle }}</p>
      </header>

      <div class="services__offerings">
        <article
          v-for="item in offerings"
          :key="item.id"
          class="services__offering"
          :class="`services__offering--${item.id}`"
        >
          <div class="services__visual">
            <img
              class="services__image"
              :src="item.imageSrc"
              :alt="item.imageAlt"
              width="2172"
              height="724"
              loading="lazy"
              decoding="async"
            >
          </div>
          <h3 class="services__offering-title">{{ item.title }}</h3>
          <p class="services__offering-desc">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import { serviceOfferingIds, services } from "~/data/navigation";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    titleAfter?: string;
    subtitle?: string;
  }>(),
  {
    sectionId: "services",
  },
);

const { messages } = useI18n();

const resolvedEyebrow = computed(
  () => props.eyebrow ?? messages.value.services.eyebrow,
);
const resolvedTitle = computed(
  () => props.title ?? messages.value.services.title,
);
const resolvedTitleAccent = computed(
  () => props.titleAccent ?? messages.value.services.titleAccent,
);
const resolvedTitleAfter = computed(
  () => props.titleAfter ?? messages.value.services.titleAfter,
);
const resolvedSubtitle = computed(
  () => props.subtitle ?? messages.value.services.subtitle,
);

const serviceById = computed(() => {
  const map = new Map(services.map((service) => [service.id, service]));
  return map;
});

const offerings = computed(() =>
  serviceOfferingIds.flatMap((id) => {
    const service = serviceById.value.get(id);
    const copy = messages.value.services.items[id];
    if (!service || !copy) return [];
    return [
      {
        id,
        title: copy.title,
        description: copy.description,
        imageSrc: service.imageSrc,
        imageAlt: service.imageAlt,
      },
    ];
  }),
);
</script>

<style scoped>
.services.section-pad {
  background: transparent;
  padding-block: var(--section-space) clamp(1.5rem, 3vw, 2.25rem);
}

.services__header {
  text-align: center;
  max-width: min(48rem, 100%);
  margin-inline: auto;
  margin-bottom: clamp(2rem, 4vw, 2.75rem);
}

.services__title {
  margin: 0 auto;
  max-width: min(48rem, 100%);
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3.4vw, 2.65rem);
  font-weight: 750;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--color-text);
}

.services__title-accent {
  color: var(--color-accent);
}

@media (min-width: 640px) {
  .services__title-accent {
    white-space: nowrap;
  }
}

@media (min-width: 900px) {
  .services__title-lead {
    display: block;
  }
}

.services__lead {
  margin: 0.85rem auto 0;
  max-width: var(--measure);
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--color-text-muted);
  text-wrap: pretty;
}

/* —— Offerings —— */
.services__offerings {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 2.75rem);
  align-items: start;
}

@media (min-width: 720px) {
  .services__offerings {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1.5rem, 2.8vw, 2.25rem);
  }
}

.services__offering {
  display: grid;
  grid-template-rows: auto auto auto;
  align-content: start;
  min-width: 0;
}

.services__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 2.35 / 1;
  height: auto;
  min-height: clamp(8.5rem, 16vw, 12.5rem);
  padding: 0;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, #a8c0e0 45%, #dce6f3);
  background: #f5f8fc;
  transition:
    transform var(--duration) var(--ease-out),
    border-color var(--duration) var(--ease-out);
}

.services__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transform-origin: center;
}

/* Per-illustration framing — keep motifs full and readable */
.services__offering--websitesShops .services__image {
  transform: scale(1.28);
  object-position: 46% center;
}

.services__offering--webapps .services__image {
  transform: scale(1.26);
  object-position: center;
}

.services__offering--automation .services__visual {
  padding-inline: 0.2rem;
}

.services__offering--automation .services__image {
  transform: scale(1.2);
  object-position: center;
}

@media (hover: hover) and (pointer: fine) {
  .services__offering:hover .services__visual {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--color-accent) 26%, #c5d4e8);
  }
}

@media (prefers-reduced-motion: reduce) {
  .services__visual {
    transition: none;
  }

  .services__offering:hover .services__visual {
    transform: none;
  }
}

.services__offering-title {
  margin: 1.1rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 1.7vw, 1.4rem);
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--color-text);
}

.services__offering-desc {
  margin: 0.4rem 0 0;
  font-size: 1.02rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  text-wrap: pretty;
}

@media (max-width: 767px) {
  .services__title {
    font-size: clamp(1.625rem, 7vw, 1.875rem);
    line-height: 1.2;
  }

  .services__lead {
    margin-top: 0.7rem;
    font-size: 1rem;
  }
}
</style>
