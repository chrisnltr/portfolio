<template>
  <div>
    <MainHeader />
    <main class="pt-16 min-h-full">
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <ExperienceSection />
      <AutomationAiSection />
      <NowSection />
      <!-- TODO: Wire up Projects and Contact sections as dedicated components. -->
    </main>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/components/layout/MainHeader.vue";
import HeroSection from "~/components/sections/HeroSection.vue";
import ImpactSection from "~/components/sections/ImpactSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import ExperienceSection from "~/components/sections/ExperienceSection.vue";
import AutomationAiSection from "~/components/sections/AutomationAiSection.vue";
import NowSection from "~/components/sections/NowSection.vue";
</script>

