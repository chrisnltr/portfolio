<template>
  <div class="space-y-8">
    <div class="card-elevated p-4 md:p-8">
      <h2 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-text-primary">
        {{ messages.experience.workHeadline }}
      </h2>
      <div class="space-y-6">
        <article
          v-for="entry in workEntries"
          :key="entry.key"
          class="border-l-4 border-accent-600 pl-4 md:pl-6"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1"
          >
            <h3 class="text-lg md:text-xl font-semibold text-text-primary">
              {{ entry.data.title }}
            </h3>
            <span class="text-sm text-accent-400 font-medium">
              {{ entry.data.dateRange }}
            </span>
          </div>
          <p class="text-text-secondary text-sm md:text-base mb-1">
            {{ entry.data.employmentType }}
          </p>
          <ul class="mt-3 space-y-2 text-text-secondary text-sm md:text-base">
            <li
              v-for="(bullet, index) in entry.data.bullets"
              :key="index"
              class="flex items-start gap-2"
            >
              <span class="mt-1 text-accent-400" aria-hidden="true">•</span>
              <span>{{ bullet.text }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>

    <div class="card-elevated p-4 md:p-8">
      <h2 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-text-primary">
        {{ messages.experience.educationHeadline }}
      </h2>
      <div class="space-y-6">
        <article
          v-for="entry in educationEntries"
          :key="entry.key"
          class="border-l-4 border-accent-600 pl-4 md:pl-6"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1"
          >
            <h3 class="text-lg md:text-xl font-semibold text-text-primary">
              {{ entry.data.title }}
            </h3>
            <span class="text-sm text-accent-400 font-medium">
              {{ entry.data.dateRange }}
            </span>
          </div>
          <p class="text-text-secondary text-sm md:text-base">
            {{ entry.data.description }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";

const { messages: rawMessages } = useI18n();
const messages = computed(() => rawMessages.value);

const workEntries = computed(() => [
  { key: "freelance", data: messages.value.experience.freelance },
  { key: "naueGroup", data: messages.value.experience.naueGroup },
]);

const educationEntries = computed(() => [
  { key: "apprenticeship", data: messages.value.experience.apprenticeship },
  { key: "school", data: messages.value.experience.school },
]);
</script>
