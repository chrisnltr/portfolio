<template>
  <section
    id="now"
    class="modern-section flex items-center py-12 border-t border-border-primary/60"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2
          class="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text"
        >
          {{ messages.now.title }}
        </h2>
        <ul class="space-y-3 md:space-y-4">
          <li
            v-for="(item, index) in messages.now.items"
            :key="index"
            class="flex items-start gap-3"
          >
            <span class="mt-1 text-accent-400">•</span>
            <p class="text-text-secondary text-sm md:text-base">
              {{ item.text }}
            </p>
          </li>
        </ul>
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

