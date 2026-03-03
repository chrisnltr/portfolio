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

<style scoped>
.scene {
  width: 200px;
  height: 200px;
  perspective: 1000px;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .scene {
    width: 400px;
    height: 400px;
    margin: 30px auto;
  }
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(59, 130, 246, 0.05);
  border: 2px solid rgba(59, 130, 246, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  padding: 10px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .face {
    padding: 20px;
  }
}

.tech-content {
  text-align: center;
  color: rgba(59, 130, 246, 0.9);
  width: 100%;
}

.tech-content h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 6px;
  color: rgba(59, 130, 246, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (min-width: 768px) {
  .tech-content h3 {
    font-size: 24px;
    margin-bottom: 15px;
  }
}

.tech-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-content li {
  font-size: 12px;
  margin-bottom: 4px;
  font-weight: 600;
  opacity: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

@media (min-width: 768px) {
  .tech-content li {
    font-size: 20px;
    margin-bottom: 10px;
  }
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1s ease-in-out;
  cursor: pointer;
}

@media (min-width: 768px) {
  .cube:hover {
    transform: rotateY(180deg) rotateX(-45deg) scaleZ(1.2) scaleX(1.2)
      scaleY(1.2);
  }
}

.cube-rotated {
  transform: rotateY(180deg) rotateX(-45deg) scaleZ(1.2) scaleX(1.2) scaleY(1.2);
}

.front {
  transform: rotateY(0deg) translateZ(100px);
}

.back {
  transform: rotateY(180deg) translateZ(100px);
}

.left {
  transform: rotateY(-90deg) translateZ(100px);
}

.right {
  transform: rotateY(90deg) translateZ(100px);
}

.top {
  transform: rotateX(90deg) translateZ(100px);
}

.bottom {
  transform: rotateX(-90deg) translateZ(100px) rotateZ(180deg);
}

@media (min-width: 768px) {
  .front {
    transform: rotateY(0deg) translateZ(200px);
  }

  .back {
    transform: rotateY(180deg) translateZ(200px);
  }

  .left {
    transform: rotateY(-90deg) translateZ(200px);
  }

  .right {
    transform: rotateY(90deg) translateZ(200px);
  }

  .top {
    transform: rotateX(90deg) translateZ(200px);
  }

  .bottom {
    transform: rotateX(-90deg) translateZ(200px) rotateZ(180deg);
  }
}
</style>
