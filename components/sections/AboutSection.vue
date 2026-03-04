<template>
  <section
    id="about"
    class="modern-section flex items-center py-14 md:py-20"
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

          <div class="flex flex-col items-center justify-center h-full">
            <div class="tech-cube-scene">
              <div class="tech-cube">
                <div class="tech-cube-face tech-cube-front">
                  <div class="tech-cube-content">
                    <h3>Tech focus</h3>
                    <ul>
                      <li>Vue.js / Nuxt</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>Node.js / REST APIs</li>
                      <li>PostgreSQL</li>
                      <li>Docker & CI/CD</li>
                      <li>Automation & tooling</li>
                    </ul>
                  </div>
                </div>
                <div class="tech-cube-face tech-cube-back">
                  <div class="tech-cube-content">
                    <h3>Stack</h3>
                    <ul>
                      <li>Vue · Node · PostgreSQL</li>
                      <li>Docker · CI/CD</li>
                      <li>TypeScript · Tailwind</li>
                    </ul>
                  </div>
                </div>
                <div class="tech-cube-face tech-cube-left">
                  <div class="tech-cube-content">
                    <h3></h3>
                  </div>
                </div>
                <div class="tech-cube-face tech-cube-right">
                  <div class="tech-cube-content">
                    <h3></h3>
                  </div>
                </div>
                <div class="tech-cube-face tech-cube-top">
                  <div class="tech-cube-content">
                    <h3></h3>
                  </div>
                </div>
                <div class="tech-cube-face tech-cube-bottom">
                  <div class="tech-cube-content">
                    <h3>Focus</h3>
                    <ul>
                      <li>APIs & Integrationen</li>
                      <li>Interne Tools</li>
                      <li>Automatisierung</li>
                    </ul>
                  </div>
                </div>
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

