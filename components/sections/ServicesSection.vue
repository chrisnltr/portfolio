<template>
  <section
    :id="sectionId"
    class="section-pad--compact services"
    :class="{ 'services--alt': variant === 'alt' }"
  >
    <div class="container-page">
      <header class="services__header">
        <p v-if="showEyebrow && resolvedEyebrow" class="section-label">{{ resolvedEyebrow }}</p>
        <h2 class="section-heading">{{ resolvedTitle }}</h2>
        <p v-if="resolvedSubtitle" class="section-lead">{{ resolvedSubtitle }}</p>
      </header>

      <div class="services__grid">
        <article
          v-for="(item, index) in resolvedItems"
          :key="item.id ?? index"
          class="services__col"
        >
          <span class="services__num" aria-hidden="true">0{{ index + 1 }}</span>
          <h3 class="services__title">{{ item.title }}</h3>
          <p class="services__desc">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import { services } from "~/data/navigation";

export type NumberedColumnItem = {
  id?: string;
  title: string;
  description: string;
};

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    items?: NumberedColumnItem[];
    showEyebrow?: boolean;
    variant?: "default" | "alt";
  }>(),
  {
    sectionId: "services",
    showEyebrow: true,
    variant: "default",
  },
);

const { messages } = useI18n();

const resolvedEyebrow = computed(
  () => props.eyebrow ?? messages.value.services.eyebrow,
);
const resolvedTitle = computed(
  () => props.title ?? messages.value.services.title,
);
const resolvedSubtitle = computed(() => {
  if (props.subtitle !== undefined) return props.subtitle;
  if (props.items?.length) return "";
  return messages.value.services.subtitle;
});

const resolvedItems = computed<NumberedColumnItem[]>(() => {
  if (props.items?.length) return props.items;
  return services.map((service) => ({
    id: service.id,
    title: messages.value.services.items[service.id].title,
    description: messages.value.services.items[service.id].description,
  }));
});
</script>

<style scoped>
.services {
  background: transparent;
  border-block: 1px solid var(--color-border);
}

.services__header {
  margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
  max-width: 40rem;
}

.services__grid {
  display: grid;
  gap: 0;
}

@media (min-width: 900px) {
  .services__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.services__col {
  padding-block: 1.35rem;
  border-top: 1px solid var(--color-border);
}

@media (min-width: 900px) {
  .services__col {
    padding: 0 1.5rem;
    border-top: 0;
    border-left: 1px solid var(--color-border);
  }

  .services__col:first-child {
    padding-left: 0;
    border-left: 0;
  }

  .services__col:last-child {
    padding-right: 0;
  }
}

.services__num {
  display: block;
  margin-bottom: 0.7rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 650;
  letter-spacing: 0.06em;
  color: var(--color-accent);
}

.services__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.services__desc {
  margin: 0.55rem 0 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 28rem;
}

.services--alt {
  border-block: 0;
}
</style>
