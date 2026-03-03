<template>
  <section
    id="about"
    class="min-h-screen modern-section flex items-center py-12"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 gradient-text animate-slide-up"
        >
          {{ messages.about.title }}
        </h2>
        <div
          class="grid md:grid-cols-2 gap-8 md:gap-12 items-start animate-slide-left"
        >
          <div class="space-y-4 md:space-y-6 text-left">
            <p
              v-for="(paragraph, index) in messages.about.paragraphs"
              :key="index"
              class="text-lg text-text-secondary leading-relaxed"
            >
              {{ paragraph }}
            </p>
          </div>

          <div
            class="card-elevated p-6 md:p-8 flex flex-col gap-4 text-left h-full"
          >
            <h3
              class="text-base md:text-lg font-semibold text-text-primary tracking-wide uppercase text-xs mb-2"
            >
              Tech focus
            </h3>
            <div class="grid grid-cols-2 gap-4 text-sm md:text-base">
              <div>
                <p class="text-text-secondary font-semibold mb-2">
                  Frontend
                </p>
                <ul class="space-y-1 text-text-secondary">
                  <li>Vue.js / Nuxt</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Responsive UIs</li>
                </ul>
              </div>
              <div>
                <p class="text-text-secondary font-semibold mb-2">
                  Backend & Ops
                </p>
                <ul class="space-y-1 text-text-secondary">
                  <li>Node.js / REST APIs</li>
                  <li>PostgreSQL</li>
                  <li>Docker & CI/CD</li>
                  <li>Automation & tooling</li>
                </ul>
              </div>
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

