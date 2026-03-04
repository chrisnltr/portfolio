<template>
  <section
    id="automation-ai"
    class="modern-section flex items-center py-14 md:py-20"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-10 md:mb-12">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            {{ messages.automationAi.title }}
          </h2>
          <p class="text-text-secondary text-sm md:text-base max-w-3xl mx-auto">
            {{ messages.automationAi.subtitle }}
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <article
            v-for="useCase in messages.automationAi.useCases"
            :key="useCase.title"
            class="card-elevated p-5 md:p-6 flex flex-col gap-3"
          >
            <h3 class="text-lg md:text-xl font-semibold text-text-primary">
              {{ useCase.title }}
            </h3>
            <p class="text-sm md:text-base text-text-secondary">
              {{ useCase.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";

const { messages: rawMessages } = useI18n();
const messages = computed(() => rawMessages.value);
</script>

