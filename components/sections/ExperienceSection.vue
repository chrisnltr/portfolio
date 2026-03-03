<template>
  <section
    id="experience"
    class="min-h-screen modern-section flex items-center py-12"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 gradient-text animate-slide-up"
        >
          {{ messages.experience.title }}
        </h2>
        <div class="space-y-8">
          <div class="card-elevated p-4 md:p-8">
            <h3
              class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-text-primary"
            >
              {{ messages.experience.workHeadline }}
            </h3>
            <div class="space-y-6">
              <article class="border-l-4 border-accent-600 pl-6">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
                >
                  <h4 class="text-xl font-semibold text-text-primary">
                    {{ messages.experience.naueGroup.title }}
                  </h4>
                  <span class="text-sm text-accent-400 font-medium">
                    {{ messages.experience.naueGroup.dateRange }}
                  </span>
                </div>
                <p class="text-text-secondary text-sm md:text-base mb-1">
                  {{ messages.experience.naueGroup.employmentType }}
                </p>
                <ul class="mt-3 space-y-2 text-text-secondary text-sm md:text-base">
                  <li
                    v-for="(bullet, index) in messages.experience.naueGroup
                      .bullets"
                    :key="index"
                    class="flex items-start gap-2"
                  >
                    <span class="mt-1 text-accent-400">•</span>
                    <span>{{ bullet.text }}</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          <div class="card-elevated p-4 md:p-8">
            <h3
              class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-text-primary"
            >
              {{ messages.experience.educationHeadline }}
            </h3>
            <div class="space-y-6">
              <article class="border-l-4 border-accent-600 pl-6">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
                >
                  <h4 class="text-xl font-semibold text-text-primary">
                    {{ messages.experience.apprenticeship.title }}
                  </h4>
                  <span class="text-sm text-accent-400 font-medium">
                    {{ messages.experience.apprenticeship.dateRange }}
                  </span>
                </div>
                <p class="text-text-secondary">
                  {{ messages.experience.apprenticeship.description }}
                </p>
              </article>

              <article class="border-l-4 border-accent-600 pl-6">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
                >
                  <h4 class="text-xl font-semibold text-text-primary">
                    {{ messages.experience.school.title }}
                  </h4>
                  <span class="text-sm text-accent-400 font-medium">
                    {{ messages.experience.school.dateRange }}
                  </span>
                </div>
                <p class="text-text-secondary">
                  {{ messages.experience.school.description }}
                </p>
              </article>
            </div>
          </div>
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

