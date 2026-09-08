<template>
  <section
    :id="sectionId"
    class="section-pad--compact about-section"
  >
    <div class="container-page about">
      <div class="about__copy">
        <p class="section-label">{{ resolvedEyebrow }}</p>
        <h2 class="section-heading">{{ resolvedTitle }}</h2>
        <div class="about__paragraphs">
          <p v-for="(paragraph, index) in resolvedParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <p v-if="resolvedTrustItems.length" class="about__trust">
          <span
            v-for="(item, index) in resolvedTrustItems"
            :key="item"
          >
            {{ item }}<template v-if="index < resolvedTrustItems.length - 1"> · </template>
          </span>
        </p>

        <div v-if="showTechLoop" class="about__tech">
          <p class="about__tech-label">{{ messages.about.techLoopLabel }}</p>
          <LogoLoop
            :logos="techLogoItems"
            :logo-height="30"
            :gap="56"
            :speed="30"
            fade-out
            :fade-out-color="'var(--color-bg)'"
            aria-label="Technologien, mit denen ich arbeite"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LogoLoop from "~/components/effects/LogoLoop.vue";
import { useI18n } from "~/composables/useI18n";
import { techLogoItems } from "~/data/techLogos";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    eyebrow?: string;
    title?: string;
    paragraphs?: string[];
    trustItems?: string[];
    showTechLoop?: boolean;
  }>(),
  {
    sectionId: "about",
    showTechLoop: true,
  },
);

const { messages } = useI18n();

const resolvedEyebrow = computed(
  () => props.eyebrow ?? messages.value.about.eyebrow,
);
const resolvedTitle = computed(
  () => props.title ?? messages.value.about.title,
);
const resolvedParagraphs = computed(
  () => props.paragraphs ?? messages.value.about.paragraphs,
);
const resolvedTrustItems = computed(
  () => props.trustItems ?? messages.value.about.trustItems,
);
</script>

<style scoped>
.about-section {
  background: transparent;
  border-block: 1px solid var(--color-border);
}

.about {
  display: flex;
  justify-content: center;
}

.about__copy {
  width: min(100%, 42rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about__paragraphs {
  margin: 1rem 0 0;
  display: grid;
  gap: 0.85rem;
  max-width: var(--measure);
}

.about__paragraphs p {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.about__trust {
  margin: 1rem 0 1.15rem;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--color-text-subtle);
  max-width: 36rem;
}

.about__tech {
  margin: 0;
  width: 100%;
  max-width: 100%;
}

.about__tech-label {
  margin: 0 0 0.65rem;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

@media (max-width: 767px) {
  .about__copy {
    width: 100%;
    text-align: left;
    align-items: flex-start;
  }

  .about__paragraphs {
    margin-top: 0.85rem;
    gap: 0.75rem;
  }

  .about__paragraphs p {
    font-size: 1rem;
    line-height: 1.6;
  }

  .about__trust {
    margin: 0.95rem 0 1rem;
    font-size: 0.8125rem;
    line-height: 1.5;
  }

  .about__tech {
    margin-top: 0.25rem;
    max-width: 100%;
    overflow: hidden;
  }

  .about__tech-label {
    margin-bottom: 0.55rem;
  }
}
</style>
