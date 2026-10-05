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
          <div class="services__visual" aria-hidden="true">
            <svg
              class="services__icon"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                :d="iconPath(item.id)"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
import type { ServiceId } from "~/types/content";

const ICON_PATHS: Record<ServiceId, string> = {
  consulting:
    "M20 22h24v6H20zM20 34h16v6H20zM46 20l6 6-16 16H30v-6L46 20z",
  concept:
    "M16 18h32v28H16zM24 26h16M24 34h12M24 42h8",
  design:
    "M18 40l8-20h4l4 10 4-8h4l8 18H18zM22 46h20",
  websitesShops:
    "M14 20h36v26H14zM14 28h36M22 20v8M42 20v8M24 36h10v6H24z",
  webapps:
    "M16 16h20v32H16zM42 22h8v24h-8zM22 24h8M22 30h6",
  automation:
    "M32 18v6M32 40v6M18 32h6M40 32h6M32 26a6 6 0 1 1 0 12 6 6 0 0 1 0-12zM22 22l4 4M38 38l4 4M42 22l-4 4M26 38l-4 4",
};

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
  })),
);

function iconPath(id: ServiceId) {
  return ICON_PATHS[id];
}
</script>

<style scoped>
.services {
  background: transparent;
}

.services__header {
  text-align: center;
  max-width: 40rem;
  margin-inline: auto;
  margin-bottom: clamp(2rem, 4.5vw, 3rem);
}

.services__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4.5vw, 2.75rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
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

.services__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr);
}

@media (min-width: 700px) {
  .services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.1rem;
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
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 12px 32px rgba(18, 26, 38, 0.04);
  transition:
    transform 0.22s var(--ease-out),
    border-color 0.22s var(--ease-out),
    box-shadow 0.22s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .services__card:hover {
    transform: translateY(-3px);
    border-color: rgba(47, 102, 255, 0.28);
    box-shadow: 0 18px 40px rgba(47, 102, 255, 0.08);
  }
}

.services__visual {
  display: grid;
  place-items: center;
  min-height: 8.5rem;
  padding: 1.5rem;
  background:
    radial-gradient(ellipse 70% 80% at 50% 40%, rgba(47, 102, 255, 0.1), transparent 70%),
    color-mix(in srgb, var(--color-bg) 70%, var(--color-surface));
  border-bottom: 1px solid var(--color-border);
}

.services__icon {
  width: 3.25rem;
  height: 3.25rem;
  color: var(--color-accent);
}

.services__body {
  display: grid;
  gap: 0.55rem;
  padding: 1.35rem 1.3rem 1.5rem;
}

.services__card-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-accent);
}

.services__desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

@media (max-width: 699px) {
  .services__visual {
    min-height: 7.25rem;
  }

  .services__card-title {
    font-size: clamp(1.1rem, 4.5vw, 1.25rem);
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
