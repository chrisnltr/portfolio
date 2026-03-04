<template>
  <section
    id="impact"
    class="modern-section flex items-center py-14 md:py-20"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 gradient-text animate-slide-up"
        >
          {{ messages.impact.title }}
        </h2>
        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <article
            v-for="item in messages.impact.items"
            :key="item.title"
            class="card-elevated p-5 md:p-6 flex flex-col gap-3"
          >
            <h3 class="text-lg md:text-xl font-semibold text-text-primary">
              {{ item.title }}
            </h3>
            <p class="text-sm md:text-base text-text-secondary">
              {{ item.description }}
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

