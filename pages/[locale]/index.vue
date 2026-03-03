<template>
  <main class="pt-16 min-h-full">
    <!-- Hero, About, Experience, Projects and Contact sections will be split into dedicated components in subsequent steps -->
    <!-- For now, we mirror the existing layout so routing and i18n wiring can be verified. -->

    <section
      id="home"
      class="min-h-screen flex items-center justify-center animated-bg px-4"
    >
      <div class="container mx-auto text-center">
        <div class="animate-fade-in">
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text animate-slide-up"
            style="
              font-weight: 600;
              background-size: 200% 200%;
              animation: gradientShift 3s ease-in-out infinite;
            "
          >
            {{ messages.hero.greeting }}
          </h1>
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-bold"
            style="font-weight: 600"
          >
            <span
              class="text-text-primary hover:gradient-text transition-all duration-500 ease-out cursor-pointer animate-slide-up"
              style="animation-delay: 0.2s"
            >
              <span>
                {{ messages.hero.nameIntro }}
              </span>
            </span>
          </h1>
          <h1
            class="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text mt-2 animate-slide-up"
            style="
              animation-delay: 0.4s;
              font-weight: 600;
              background-size: 200% 200%;
              animation: gradientShift 3s ease-in-out infinite;
            "
          >
            {{ messages.hero.roleHeadline }}
          </h1>
          <p
            class="text-lg md:text-xl lg:text-2xl text-text-secondary mt-4 mb-8 max-w-2xl mx-auto animate-slide-up px-4"
            style="animation-delay: 0.5s"
          >
            {{ messages.hero.positioningLine }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-accent-600/60 bg-accent-600/10 px-3 py-1 text-xs md:text-sm text-accent-400"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{{ messages.hero.openToWorkBadge }}</span>
              <span class="text-text-secondary/80">
                · {{ messages.hero.locationLabel }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";

const { messages: rawMessages } = useI18n();
const messages = computed(() => rawMessages.value);

definePageMeta({
  middleware: "locale",
});
</script>

