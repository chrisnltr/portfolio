<template>
  <div>
    <MainHeader />
    <main class="case-study overflow-x-hidden" id="main-content">
      <div class="container-page case-study__inner">
        <CaseStudyHero
          :project="project"
          @external-click="onExternalClick"
        />

        <ProjectFacts :project="project" />

        <CaseStudyStory :project="project" />

        <template v-if="layout === 'app'">
          <ProjectGallery :project="project" />
          <ProjectHighlights :project="project" />
          <TechnicalInsight :project="project" />
        </template>

        <template v-else-if="layout === 'internal'">
          <ProjectHighlights :project="project" />
          <ProjectGallery :project="project" />
          <TechnicalInsight :project="project" />
        </template>

        <template v-else-if="layout === 'archive'">
          <ProjectHighlights :project="project" />
          <ProjectGallery
            :project="project"
            :max-secondary="1"
          />
        </template>

        <template v-else>
          <ProjectHighlights :project="project" />
          <ProjectGallery v-if="project.images.length" :project="project" />
          <TechnicalInsight :project="project" />
        </template>

        <CaseStudyClosing
          :project="project"
          @cta-click="onCtaClick"
        />
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import MainHeader from "~/components/layout/MainHeader.vue";
import MainFooter from "~/components/layout/MainFooter.vue";
import CaseStudyHero from "~/components/projects/CaseStudyHero.vue";
import ProjectFacts from "~/components/projects/ProjectFacts.vue";
import CaseStudyStory from "~/components/projects/CaseStudyStory.vue";
import ProjectGallery from "~/components/projects/ProjectGallery.vue";
import ProjectHighlights from "~/components/projects/ProjectHighlights.vue";
import TechnicalInsight from "~/components/projects/TechnicalInsight.vue";
import CaseStudyClosing from "~/components/projects/CaseStudyClosing.vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { usePageSeo } from "~/composables/usePageSeo";
import { projectDetailPath } from "~/data/navigation";
import {
  getProjectSocialImage,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_TYPE,
  OG_IMAGE_WIDTH,
  projectPortfolioJsonLd,
} from "~/data/seo";
import type { ProjectCaseStudy } from "~/types/content";

const props = defineProps<{
  project: ProjectCaseStudy;
}>();

const requestURL = useRequestURL();
const config = useRuntimeConfig();
const { track } = useAnalytics();

const t = computed(() => props.project.content);
const layout = computed(() => props.project.layout || "default");

const pagePath = computed(() =>
  projectDetailPath(props.project.routeSlug),
);

const siteOrigin = computed(() => {
  const configured = String(config.public.siteUrl || "").replace(/\/$/, "");
  return configured || requestURL.origin;
});

const ogImage = computed(() => {
  return getProjectSocialImage(props.project);
});

usePageSeo(() => ({
  title: t.value.seoTitle,
  description: t.value.seoDescription,
  path: pagePath.value,
  ogImage: ogImage.value,
  ogImageAlt: `${t.value.title}: Projektvorschau`,
  ogImageWidth: OG_IMAGE_WIDTH,
  ogImageHeight: OG_IMAGE_HEIGHT,
  ogImageType: OG_IMAGE_TYPE,
  ogType: "article",
  jsonLd: projectPortfolioJsonLd(
    siteOrigin.value,
    pagePath.value,
    props.project,
  ),
}));

onMounted(() => {
  track("project_view", {
    project: props.project.slug,
    location: "case-study",
  });
});

function onExternalClick() {
  track("external_project_click", {
    project: props.project.slug,
    location: "case-study",
  });
}

function onCtaClick() {
  track("cta_click", {
    project: props.project.slug,
    location: "case-study",
    service: "contact",
  });
}
</script>

<style scoped>
.case-study {
  background: var(--color-bg);
  color: var(--color-text);
  padding-bottom: clamp(2.5rem, 5vw, 4rem);
}

.case-study__inner {
  max-width: 1100px;
  min-width: 0;
}
</style>
