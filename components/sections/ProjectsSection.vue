<template>
  <section
    id="projects"
    class="modern-section flex items-center py-14 md:py-20 transition-all duration-700 ease-out"
  >
    <div class="container mx-auto px-4">
      <div
        class="grid md:grid-cols-[2fr_3fr] gap-6 md:gap-8 max-w-7xl mx-auto min-h-[560px] items-start"
      >
        <div class="flex flex-col h-full justify-start mt-4 md:mt-8">
          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text text-center mb-6 md:mb-8"
          >
            {{ messages.projects.title }}
          </h2>

          <div
            class="space-y-3 pr-2 md:pr-4 flex-1 flex flex-col justify-start"
          >
            <article
              v-for="project in localizedProjects"
              :key="project.slug"
              role="button"
              tabindex="0"
              class="card-elevated group hover:glow hover:scale-[1.02] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              :class="{
                'bg-accent-600/10 border-accent-600/40':
                  project.slug === selectedSlug,
              }"
              @click="selectProject(project.slug)"
              @keydown.enter="selectProject(project.slug)"
              @keydown.space.prevent="selectProject(project.slug)"
            >
              <div class="flex gap-3 md:gap-4 p-3 md:p-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-20 h-12 md:w-24 md:h-16 bg-background-tertiary rounded-lg overflow-hidden image-hover"
                  >
                    <img
                      :src="project.images[0]"
                      :alt="project.translations.title + ' – screenshot'"
                      class="w-full h-full object-cover transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h3
                    class="text-base md:text-lg font-bold mb-1.5 text-text-primary truncate"
                  >
                    {{ project.translations.title }}
                  </h3>
                  <p
                    class="text-text-secondary mb-2 text-xs md:text-sm line-clamp-2"
                  >
                    {{ project.translations.shortDescription }}
                  </p>
                  <div class="flex gap-1 flex-wrap">
                    <span
                      v-for="tech in project.techStack.slice(0, 3)"
                      :key="tech"
                      class="tech-tag text-[10px] md:text-xs px-2 py-0.5"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div
          class="bg-background-secondary border border-border-primary rounded-xl p-4 md:p-6 h-full flex flex-col justify-start mt-4 md:mt-8 max-h-[calc(100vh-6rem)] overflow-y-auto"
        >
          <div v-if="currentProject" class="flex flex-col h-full">
            <div
              class="aspect-video bg-background-tertiary rounded-lg mb-3 overflow-hidden relative group"
            >
              <img
                :src="currentProject.images[selectedImageIndex]"
                :alt="currentProject.translations.title + ' – screenshot ' + (selectedImageIndex + 1)"
                class="w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
                decoding="async"
              />
              <template v-if="currentProject.images.length > 1">
                <button
                  type="button"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  :aria-label="messages.projects.prevImage"
                  @click="prevImage"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  :aria-label="messages.projects.nextImage"
                  @click="nextImage"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </template>
            </div>
            <div
              v-if="currentProject.images.length > 1"
              class="flex gap-2 mb-4 flex-wrap"
              role="tablist"
              :aria-label="messages.projects.galleryLabel"
            >
              <button
                v-for="(img, idx) in currentProject.images"
                :key="idx"
                type="button"
                role="tab"
                :aria-selected="selectedImageIndex === idx"
                :tabindex="selectedImageIndex === idx ? 0 : -1"
                class="w-14 h-10 md:w-16 md:h-11 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                :class="selectedImageIndex === idx ? 'border-accent-500 opacity-100' : 'border-border-primary opacity-70 hover:opacity-90'"
                @click="selectedImageIndex = idx"
              >
                <img
                  :src="img"
                  :alt="currentProject.translations.title + ' – Vorschaubild ' + (idx + 1)"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            </div>

            <h3 class="text-xl md:text-2xl font-bold text-text-primary mb-1">
              {{ currentProject.translations.title }}
            </h3>
            <p class="text-text-secondary text-sm md:text-base mb-2">
              {{ currentProject.translations.subtitle }}
            </p>
            <p class="text-text-secondary text-xs md:text-sm mb-4 line-clamp-3">
              {{ currentProject.translations.shortDescription }}
            </p>

            <div class="mb-4 flex-1 overflow-y-auto">
              <h4
                class="text-sm md:text-base font-semibold text-text-primary mb-2"
              >
                {{ currentProject.translations.featuresTitle }}
              </h4>
              <ul
                class="text-text-secondary space-y-1.5 text-xs md:text-sm max-h-40 overflow-y-auto pr-1"
              >
                <li
                  v-for="feature in currentProject.translations.features"
                  :key="feature"
                  class="flex gap-2 items-start"
                >
                  <span class="mt-1 text-accent-400">•</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div class="mb-4">
              <h4
                class="text-sm md:text-base font-semibold text-text-primary mb-2"
              >
                {{ currentProject.translations.techStackTitle }}
              </h4>
              <div class="flex flex-wrap gap-1.5 md:gap-2">
                <span
                  v-for="tech in currentProject.techStack"
                  :key="tech"
                  class="px-2 md:px-3 py-0.5 bg-accent-600/20 text-accent-400 rounded-full text-[10px] md:text-xs"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="mt-auto flex flex-wrap items-center gap-3">
              <button
                v-if="showCaseStudyButton"
                type="button"
                class="btn-primary text-xs md:text-sm px-4 py-2"
                @click="openModal"
              >
                {{ currentProject.translations.caseStudyCta }}
              </button>
              <a
                v-if="currentProjectWebsiteUrl"
                :href="currentProjectWebsiteUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary text-xs md:text-sm px-4 py-2 inline-flex items-center"
              >
                {{ currentProject.translations.liveDemoLabel }}
              </a>

              <a
                v-if="currentProject.links.liveUrl"
                :href="currentProject.links.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs md:text-sm text-accent-400 hover:text-accent-300 underline-offset-4 hover:underline"
              >
                {{ currentProject.translations.liveDemoLabel }}
              </a>
              <a
                v-if="currentProject.links.githubUrl"
                :href="currentProject.links.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs md:text-sm text-accent-400 hover:text-accent-300 underline-offset-4 hover:underline"
              >
                {{ currentProject.translations.githubLabel }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <ProjectCaseStudyModal
        v-if="currentProject"
        :open="modalOpen"
        :project-translations="currentProject.translations"
        :tech-stack="currentProject.techStack"
        :links="currentProject.links"
        @close="modalOpen = false"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "~/composables/useI18n";
import { projects } from "~/data/projects";
import ProjectCaseStudyModal from "~/components/projects/ProjectCaseStudyModal.vue";
import type { AppLocale } from "~/types/i18n";

const { locale, messages: rawMessages } = useI18n();
const messages = computed(() => rawMessages.value);

const localizedProjects = computed(() => {
  const currentLocale = locale.value as AppLocale;
  return projects.map((project) => ({
    slug: project.slug,
    images: project.images,
    techStack: project.techStack,
    links: project.links,
    translations: project.translations[currentLocale],
  }));
});

const selectedSlug = ref<string | null>(
  localizedProjects.value.length > 0 ? localizedProjects.value[0].slug : null,
);
const modalOpen = ref(false);

const currentProject = computed(() =>
  localizedProjects.value.find((p) => p.slug === selectedSlug.value) ??
  localizedProjects.value[0] ??
  null,
);

const selectedImageIndex = ref(0);

const showCaseStudyButton = computed(
  () => currentProject.value?.slug !== "accident-report-app",
);

const currentProjectWebsiteUrl = computed(() => {
  if (!currentProject.value) return "";
  if (currentProject.value.slug === "accident-report-app") {
    return locale.value === "de"
      ? "https://crashreport-site.vercel.app/de"
      : "https://crashreport-site.vercel.app/en";
  }
  return currentProject.value.links.liveUrl;
});

const selectProject = (slug: string) => {
  selectedSlug.value = slug;
  selectedImageIndex.value = 0;
};

const prevImage = () => {
  if (!currentProject.value) return;
  const len = currentProject.value.images.length;
  selectedImageIndex.value = (selectedImageIndex.value - 1 + len) % len;
};

const nextImage = () => {
  if (!currentProject.value) return;
  const len = currentProject.value.images.length;
  selectedImageIndex.value = (selectedImageIndex.value + 1) % len;
};

const openModal = () => {
  modalOpen.value = true;
};
</script>

