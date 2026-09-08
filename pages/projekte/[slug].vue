<template>
  <ProjectDetailView :project="project" />
</template>

<script setup lang="ts">
import ProjectDetailView from "~/components/projects/ProjectDetailView.vue";
import { getProjectByRouteSlug } from "~/data/projects";

const route = useRoute();
const slug = String(route.params.slug || "");
const project = getProjectByRouteSlug(slug);

if (!project) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}
</script>
