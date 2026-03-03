<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    :aria-label="projectTranslations.title"
    @click.self="emitClose"
  >
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

    <div
      class="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto card-elevated bg-background-secondary border border-border-primary p-4 md:p-6"
    >
      <button
        type="button"
        class="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-full p-1"
        @click="emitClose"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="space-y-4 md:space-y-6">
        <header>
          <p class="text-xs uppercase tracking-wide text-accent-400 mb-1">
            Case Study
          </p>
          <h2 class="text-2xl md:text-3xl font-bold text-text-primary">
            {{ projectTranslations.title }}
          </h2>
          <p class="text-text-secondary mt-2 text-sm md:text-base">
            {{ projectTranslations.subtitle }}
          </p>
        </header>

        <section class="grid md:grid-cols-2 gap-6 md:gap-8 text-sm md:text-base">
          <div class="space-y-3">
            <h3 class="font-semibold text-text-primary">
              Problem
            </h3>
            <p class="text-text-secondary">
              {{ projectTranslations.problem }}
            </p>
          </div>
          <div class="space-y-3">
            <h3 class="font-semibold text-text-primary">
              Solution
            </h3>
            <p class="text-text-secondary">
              {{ projectTranslations.solution }}
            </p>
          </div>
        </section>

        <section class="space-y-3 text-sm md:text-base">
          <h3 class="font-semibold text-text-primary">
            Outcome
          </h3>
          <p class="text-text-secondary">
            {{ projectTranslations.outcome }}
          </p>
        </section>

        <section class="grid md:grid-cols-2 gap-6 md:gap-8 text-sm md:text-base">
          <div class="space-y-3">
            <h3 class="font-semibold text-text-primary">
              {{ projectTranslations.myContributionTitle }}
            </h3>
            <p class="text-text-secondary">
              {{ projectTranslations.myContribution }}
            </p>
          </div>
          <div class="space-y-3">
            <h3 class="font-semibold text-text-primary">
              {{ projectTranslations.biggestChallengeTitle }}
            </h3>
            <p class="text-text-secondary">
              {{ projectTranslations.biggestChallenge }}
            </p>
          </div>
        </section>

        <section class="grid md:grid-cols-2 gap-6 md:gap-8 text-sm md:text-base">
          <div class="space-y-3">
            <h3 class="font-semibold text-text-primary">
              {{ projectTranslations.featuresTitle }}
            </h3>
            <ul class="space-y-2 text-text-secondary">
              <li v-for="feature in projectTranslations.features" :key="feature" class="flex gap-2">
                <span class="mt-1 text-accent-400">•</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
          <div class="space-y-3">
            <h3 class="font-semibold text-text-primary">
              {{ projectTranslations.techStackTitle }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in techStack"
                :key="tech"
                class="px-3 py-1 bg-accent-600/20 text-accent-400 rounded-full text-xs md:text-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </section>

        <section class="space-y-2">
          <h3 class="font-semibold text-text-primary text-sm md:text-base">
            {{ projectTranslations.linksTitle }}
          </h3>
          <div class="flex flex-wrap gap-3 text-sm md:text-base">
            <a
              v-if="links.liveUrl"
              :href="links.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary px-4 py-2 text-xs md:text-sm"
            >
              {{ projectTranslations.liveDemoLabel }}
            </a>
            <a
              v-if="links.githubUrl"
              :href="links.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary px-4 py-2 text-xs md:text-sm"
            >
              {{ projectTranslations.githubLabel }}
            </a>
            <p
              v-if="links.codeIsPrivate && !links.githubUrl"
              class="text-text-secondary text-xs md:text-sm"
            >
              {{ projectTranslations.codeOnRequestLabel }}
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectLinks } from "~/types/content";
import type { ProjectTranslations } from "~/types/i18n";

const props = defineProps<{
  open: boolean;
  projectTranslations: ProjectTranslations;
  techStack: string[];
  links: ProjectLinks;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const emitClose = () => {
  emit("close");
};
</script>

