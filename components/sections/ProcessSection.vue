<template>
  <section
    :id="sectionId"
    class="process"
  >
    <div class="container-page process__grid">
      <div class="process__intro">
        <p class="process__label">{{ resolvedLabel }}</p>
        <h2 class="process__title">{{ resolvedTitle }}</h2>
        <p v-if="resolvedBody" class="process__body">{{ resolvedBody }}</p>
      </div>

      <ol class="process__steps">
        <li
          v-for="(step, index) in resolvedSteps"
          :key="step.id ?? index"
          class="process__step"
        >
          <span class="process__num" aria-hidden="true">0{{ index + 1 }}</span>
          <div>
            <h3 class="process__step-title">{{ step.title }}</h3>
            <p class="process__step-desc">{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import { processSteps } from "~/data/navigation";

export type ProcessStepContent = {
  id?: string;
  title: string;
  description: string;
};

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    label?: string;
    title?: string;
    body?: string;
    steps?: ProcessStepContent[];
  }>(),
  {
    sectionId: "process",
  },
);

const { messages } = useI18n();

const resolvedLabel = computed(
  () => props.label ?? messages.value.process.label,
);
const resolvedTitle = computed(
  () => props.title ?? messages.value.process.title,
);
const resolvedBody = computed(() => {
  if (props.body !== undefined) return props.body;
  if (props.steps?.length) return "";
  return messages.value.process.body;
});

const resolvedSteps = computed<ProcessStepContent[]>(() => {
  if (props.steps?.length) return props.steps;
  return processSteps.map((step) => ({
    id: step.id,
    title: messages.value.process.steps[step.id].title,
    description: messages.value.process.steps[step.id].description,
  }));
});
</script>

<style scoped>
.process {
  background: var(--color-surface);
  color: var(--color-text);
  padding-block: clamp(3.5rem, 7vw, 6rem);
  border-block: 1px solid var(--color-border);
}

.process__grid {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
}

@media (min-width: 900px) {
  .process__grid {
    grid-template-columns: minmax(0, 0.38fr) minmax(0, 0.62fr);
    gap: clamp(2.5rem, 6vw, 5rem);
    align-items: center;
  }
}

.process__intro {
  text-align: left;
}

@media (min-width: 900px) {
  .process__intro {
    justify-self: stretch;
    width: 100%;
  }
}

.process__label {
  margin: 0 0 0.85rem;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

.process__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3.2vw, 2.55rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.12;
  max-width: 12ch;
  color: #fff;
}

.process__body {
  margin: 1rem 0 0;
  max-width: 28rem;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.process__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-border);
}

.process__step {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: 0.85rem 1.1rem;
  padding-block: 1.25rem;
  border-bottom: 1px solid var(--color-border);
  transition: transform var(--duration-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .process__step:hover {
    transform: translateX(2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .process__step {
    transition: none;
  }

  .process__step:hover {
    transform: none;
  }
}

.process__num {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 650;
  letter-spacing: 0.04em;
  padding-top: 0.15rem;
  color: var(--color-accent);
}

.process__step-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
}

.process__step-desc {
  margin: 0.4rem 0 0;
  max-width: 34rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

@media (max-width: 767px) {
  .process {
    padding-block: 3.25rem;
  }

  .process__grid {
    gap: 1.5rem;
  }

  .process__label {
    margin-bottom: 0.55rem;
  }

  .process__title {
    font-size: clamp(1.625rem, 7vw, 1.875rem);
    max-width: none;
    line-height: 1.2;
  }

  .process__body {
    margin-top: 0.7rem;
    font-size: 1rem;
  }

  .process__step {
    grid-template-columns: 2.35rem minmax(0, 1fr);
    gap: 0.55rem 0.75rem;
    padding-block: 1.15rem;
  }

  .process__num {
    font-size: 0.85rem;
    padding-top: 0.2rem;
  }

  .process__step-title {
    font-size: clamp(1.2rem, 4.8vw, 1.35rem);
    line-height: 1.25;
  }

  .process__step-desc {
    margin-top: 0.45rem;
    font-size: 1rem;
  }
}
</style>
