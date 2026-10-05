<template>
  <section
    :id="sectionId"
    class="section-pad services"
  >
    <div class="container-page">
      <header class="services__header">
        <h2 class="services__title">
          <span class="services__title-line">{{ resolvedTitle }}</span>
          <span
            v-if="resolvedTitleAccent"
            class="services__title-line services__title-line--accent"
          >{{ resolvedTitleAccent }}</span>
        </h2>
      </header>

      <div class="services__grid">
        <article
          v-for="item in resolvedItems"
          :key="item.id"
          class="services__card"
        >
          <div
            class="services__visual"
            :class="`services__visual--${item.id}`"
          >
            <img
              class="services__image"
              :src="item.imageSrc"
              :alt="item.imageAlt"
              width="640"
              height="240"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="services__body">
            <h3 class="services__card-title">{{ item.title }}</h3>
            <p class="services__desc">{{ item.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import { services } from "~/data/navigation";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    title?: string;
    titleAccent?: string;
  }>(),
  {
    sectionId: "services",
  },
);

const { messages } = useI18n();

const resolvedTitle = computed(
  () => props.title ?? messages.value.services.title,
);
const resolvedTitleAccent = computed(
  () => props.titleAccent ?? messages.value.services.titleAccent,
);

const resolvedItems = computed(() =>
  services.map((service) => ({
    id: service.id,
    title: messages.value.services.items[service.id].title,
    description: messages.value.services.items[service.id].description,
    imageSrc: service.imageSrc,
    imageAlt: service.imageAlt,
  })),
);
</script>

<style scoped>
/* Override global section-pad only for this section */
.services.section-pad {
  padding-block: clamp(3.5rem, 5.5vw, 4.5rem);
  background: transparent;
}

.services__header {
  text-align: center;
  max-width: min(52rem, 100%);
  margin-inline: auto;
  margin-bottom: clamp(1.75rem, 3vw, 2.35rem);
}

.services__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.8vw, 2.45rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.14;
  color: var(--color-text);
  text-wrap: balance;
}

.services__title-line {
  display: inline;
}

.services__title-line + .services__title-line::before {
  content: " ";
}

.services__title-line--accent {
  color: var(--color-accent);
}

@media (min-width: 900px) {
  .services__header {
    max-width: min(56rem, 100%);
  }

  .services__title-line {
    display: block;
  }

  .services__title-line + .services__title-line::before {
    content: none;
  }
}

.services__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr);
  align-items: stretch;
}

@media (min-width: 700px) {
  .services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.15rem;
  }
}

@media (min-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.2rem;
  }
}

.services__card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 10px 26px rgba(18, 26, 38, 0.04);
  transition:
    transform 0.22s var(--ease-out),
    border-color 0.22s var(--ease-out),
    box-shadow 0.22s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .services__card:hover {
    transform: translateY(-3px);
    border-color: rgba(47, 102, 255, 0.28);
    box-shadow: 0 16px 34px rgba(47, 102, 255, 0.08);
  }
}

.services__visual {
  position: relative;
  flex: 0 0 auto;
  width: 100%;
  height: 9.25rem;
  overflow: hidden;
  background:
    radial-gradient(ellipse 70% 80% at 50% 40%, rgba(47, 102, 255, 0.06), transparent 70%),
    color-mix(in srgb, var(--color-bg) 70%, var(--color-surface));
  border-bottom: 1px solid var(--color-border);
}

.services__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.services__visual--consulting .services__image {
  object-position: 50% 52%;
}

.services__visual--concept .services__image {
  object-position: 50% 38%;
}

.services__visual--design .services__image {
  object-position: 58% 50%;
}

.services__visual--websitesShops .services__image {
  object-position: 54% 48%;
}

.services__visual--webapps .services__image {
  object-position: 50% 48%;
}

.services__visual--automation .services__image {
  object-position: 56% 46%;
}

.services__body {
  display: grid;
  gap: 0.55rem;
  flex: 1 1 auto;
  padding: 1.15rem 1.15rem 1.2rem;
  text-align: left;
}

.services__card-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--color-accent);
}

.services__desc {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

@media (min-width: 1024px) {
  .services__visual {
    height: 8.5rem;
  }

  .services__body {
    gap: 0.55rem;
    padding: 1.15rem 1.2rem 1.2rem;
  }

  .services__card-title {
    font-size: 1.125rem;
  }

  .services__desc {
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

@media (max-width: 699px) {
  .services__visual {
    height: 9.5rem;
  }

  .services__card-title {
    font-size: clamp(1.05rem, 4.2vw, 1.125rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .services__card {
    transition: none;
  }

  .services__card:hover {
    transform: none;
  }
}
</style>
