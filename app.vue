<template>
  <div class="min-h-screen bg-background-primary">
    <div class="particles" :class="{ 'particles--reduced': isMobile }">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
    <div
      v-if="!isMobile"
      ref="cursorFollower"
      class="fixed pointer-events-none z-[9999] rounded-full blur-xl transition-all duration-300 ease-out"
      :class="
        isHoveringTarget ? 'bg-blue-500/40 w-20 h-20' : 'bg-blue-400/20 w-6 h-6'
      "
      :style="{
        left: mousePosition.x + 'px',
        top: mousePosition.y + 'px',
        transform: 'translate(-50%, -50%)',
        boxShadow: isHoveringTarget
          ? '0 0 40px 20px rgba(59, 130, 246, 0.5)'
          : '0 0 20px 10px rgba(96, 165, 250, 0.3)',
      }"
    ></div>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const mousePosition = ref({ x: 0, y: 0 });
const cursorFollower = ref<HTMLElement | null>(null);
const isHoveringTarget = ref(false);
const isMobile = ref(false);

const updateMousePosition = (e: MouseEvent) => {
  window.requestAnimationFrame(() => {
    mousePosition.value = {
      x: e.clientX,
      y: e.clientY,
    };
  });
};

const checkHover = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const isTargetElement =
    target.closest("nav") ||
    target.closest("button") ||
    target.closest("a") ||
    target.closest("span") ||
    target.closest("h1") ||
    target.closest("h2") ||
    target.closest("h3") ||
    target.closest("p") ||
    target.closest(".card-elevated");

  if (isHoveringTarget.value !== !!isTargetElement) {
    isHoveringTarget.value = !!isTargetElement;
  }
};

const checkMobile = () => {
  if (typeof window === "undefined") return;
  isMobile.value = window.innerWidth <= 768 || "ontouchstart" in window;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  if (!isMobile.value) {
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", checkHover);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);

  if (!isMobile.value) {
    document.removeEventListener("mousemove", updateMousePosition);
    document.removeEventListener("mouseover", checkHover);
  }
});
</script>

