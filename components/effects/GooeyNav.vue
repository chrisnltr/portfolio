<template>
  <div
    ref="containerRef"
    class="gooey-nav-container"
    :class="{ 'gooey-nav-container--green': props.colorScheme === 'green' }"
  >
    <svg class="gooey-nav-svg-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter
          :id="filterId"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          color-interpolation-filters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="gooey"
          />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </defs>
    </svg>

    <nav :aria-label="ariaLabel">
      <ul ref="navRef">
        <li
          v-for="(item, index) in items"
          :key="item.id ?? index"
          :class="{
            active: internalIndex === index,
            'gooey-nav-item--contact': item.variant === 'contact',
          }"
        >
          <a
            :href="item.href"
            @click="(e) => onItemClick(e, index)"
            @keydown="(e) => onKeyDown(e, index)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <span
      ref="filterRef"
      class="effect filter"
      :style="{ filter: `url(#${filterId})` }"
      aria-hidden="true"
    />
    <span ref="textRef" class="effect text" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useId, watch } from "vue";

export type GooeyNavItem = {
  id?: string;
  label: string;
  href: string;
  variant?: "default" | "contact";
};

const props = withDefaults(
  defineProps<{
    items: GooeyNavItem[];
    activeIndex?: number;
    animationTime?: number;
    particleCount?: number;
    particleDistances?: [number, number];
    particleR?: number;
    timeVariance?: number;
    colors?: number[];
    colorScheme?: "blue" | "green";
    ariaLabel?: string;
  }>(),
  {
    activeIndex: 0,
    animationTime: 600,
    particleCount: 8,
    particleDistances: () => [52, 8],
    particleR: 100,
    timeVariance: 200,
    colors: () => [1, 2, 3, 1, 2, 3, 1, 4],
    colorScheme: "blue",
    ariaLabel: "Navigation",
  },
);

const emit = defineEmits<{
  navigate: [index: number, event: MouseEvent];
  "update:activeIndex": [index: number];
}>();

const filterId = `gooey-nav-filter-${useId().replace(/:/g, "")}`;

const containerRef = ref<HTMLDivElement | null>(null);
const navRef = ref<HTMLUListElement | null>(null);
const filterRef = ref<HTMLSpanElement | null>(null);
const textRef = ref<HTMLSpanElement | null>(null);
const internalIndex = ref(props.activeIndex);

const noise = (n = 1) => n / 2 - Math.random() * n;

function getXY(distance: number, pointIndex: number, totalPoints: number): [number, number] {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
}

function createParticle(i: number, t: number, d: [number, number], r: number) {
  const rotate = noise(r / 10);
  return {
    start: getXY(d[0], props.particleCount - i, props.particleCount),
    end: getXY(d[1] + noise(7), props.particleCount - i, props.particleCount),
    time: t,
    scale: 1 + noise(0.2),
    color: props.colors[Math.floor(Math.random() * props.colors.length)],
    rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
  };
}

function makeParticles(element: HTMLElement) {
  const d = props.particleDistances;
  const r = props.particleR;
  const bubbleTime = props.animationTime * 2 + props.timeVariance;
  element.style.setProperty("--time", `${bubbleTime}ms`);

  for (let i = 0; i < props.particleCount; i++) {
    const t = props.animationTime * 2 + noise(props.timeVariance * 2);
    const p = createParticle(i, t, d, r);

    window.setTimeout(() => {
      const particle = document.createElement("span");
      const point = document.createElement("span");
      particle.classList.add("particle");
      particle.style.setProperty("--start-x", `${p.start[0]}px`);
      particle.style.setProperty("--start-y", `${p.start[1]}px`);
      particle.style.setProperty("--end-x", `${p.end[0]}px`);
      particle.style.setProperty("--end-y", `${p.end[1]}px`);
      particle.style.setProperty("--time", `${p.time}ms`);
      particle.style.setProperty("--scale", `${p.scale}`);
      particle.style.setProperty("--color", `var(--gooey-color-${p.color}, #4b7cff)`);
      particle.style.setProperty("--rotate", `${p.rotate}deg`);
      point.classList.add("point");
      particle.appendChild(point);
      element.appendChild(particle);
      window.setTimeout(() => {
        try {
          element.removeChild(particle);
        } catch {
          /* particle already removed */
        }
      }, t);
    }, 30);
  }
}

function updateEffectPosition(element: HTMLElement) {
  if (!containerRef.value || !filterRef.value || !textRef.value) return;
  const containerRect = containerRef.value.getBoundingClientRect();
  const pos = element.getBoundingClientRect();
  const styles = {
    left: `${pos.left - containerRect.left}px`,
    top: `${pos.top - containerRect.top}px`,
    width: `${pos.width}px`,
    height: `${pos.height}px`,
  };
  Object.assign(filterRef.value.style, styles);
  Object.assign(textRef.value.style, styles);
  textRef.value.textContent = element.textContent?.trim() ?? "";
}

function activateItem(index: number, liEl: HTMLElement, animate = true) {
  internalIndex.value = index;

  updateEffectPosition(liEl);

  if (filterRef.value) {
    filterRef.value.querySelectorAll(".particle").forEach((p) => p.remove());
  }

  if (!animate) {
    filterRef.value?.classList.add("active");
    textRef.value?.classList.add("active");
    return;
  }

  if (filterRef.value) {
    filterRef.value.classList.remove("active");
    void filterRef.value.offsetWidth;
    makeParticles(filterRef.value);
    filterRef.value.classList.add("active");
  }

  if (textRef.value) {
    textRef.value.classList.remove("active");
    void textRef.value.offsetWidth;
    textRef.value.classList.add("active");
  }
}

function onItemClick(event: MouseEvent, index: number) {
  const liEl = (event.currentTarget as HTMLAnchorElement).parentElement as HTMLElement;
  if (internalIndex.value !== index) {
    activateItem(index, liEl, true);
    emit("update:activeIndex", index);
  }
  emit("navigate", index, event);
}

function onKeyDown(event: KeyboardEvent, index: number) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  const liEl = (event.currentTarget as HTMLAnchorElement).parentElement;
  if (liEl) {
    activateItem(index, liEl);
    emit("navigate", index, event as unknown as MouseEvent);
  }
}

function syncActivePosition(index: number) {
  nextTick(() => {
    requestAnimationFrame(() => {
      const li = navRef.value?.querySelectorAll("li")[index] as HTMLElement | undefined;
      if (li) activateItem(index, li, false);
    });
  });
}

let resizeObserver: ResizeObserver | null = null;

watch(
  () => props.activeIndex,
  (index) => {
    if (index === internalIndex.value) return;
    internalIndex.value = index;
    syncActivePosition(index);
  },
);

onMounted(() => {
  syncActivePosition(props.activeIndex);

  if (containerRef.value && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => syncActivePosition(internalIndex.value));
    resizeObserver.observe(containerRef.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<style scoped>
.gooey-nav-container {
  --gooey-color-1: #2f66ff;
  --gooey-color-2: #4b7cff;
  --gooey-color-3: rgba(255, 255, 255, 0.88);
  --gooey-color-4: #1a3a7a;

  position: relative;
  isolation: isolate;
}

.gooey-nav-svg-defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}

.gooey-nav-container nav {
  display: flex;
  position: relative;
  z-index: 2;
  transform: translate3d(0, 0, 0.01px);
}

.gooey-nav-container nav ul {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 3;
}

.gooey-nav-container nav ul li {
  border-radius: 100vw;
  position: relative;
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out);
  color: var(--color-text-muted);
}

.gooey-nav-container nav ul li a {
  display: inline-flex;
  align-items: center;
  min-height: 2.25rem;
  padding: 0.45rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
  border-radius: 100vw;
}

.gooey-nav-item--contact a {
  font-weight: 600;
}

.gooey-nav-container nav ul li:focus-within:has(:focus-visible) a {
  outline: 2px solid rgba(47, 102, 255, 0.55);
  outline-offset: 2px;
}

.gooey-nav-container nav ul li.active {
  color: transparent;
}

.gooey-nav-container .effect {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  display: grid;
  place-items: center;
  background: transparent;
  box-shadow: none;
  overflow: visible;
}

.gooey-nav-container .effect.text {
  color: var(--color-text-muted);
  transition: color 0.3s ease;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 3;
  filter: none;
}

.gooey-nav-container .effect.text.active {
  color: #fff;
  font-weight: 600;
}

.gooey-nav-container .effect.filter {
  background: transparent;
  box-shadow: none;
  z-index: 1;
}

.gooey-nav-container .effect.filter::before {
  content: none;
  display: none;
}

.gooey-nav-container .effect.filter::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  transform: scale(0);
  opacity: 0;
  border-radius: 100vw;
  box-shadow: none;
}

.gooey-nav-container .effect.filter.active::after {
  animation: gooey-pill 0.3s ease both;
}

@keyframes gooey-pill {
  to {
    transform: scale(1);
    opacity: 1;
  }
}

:deep(.particle),
:deep(.point) {
  display: block;
  opacity: 0;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  transform-origin: center;
  background: transparent;
  box-shadow: none;
}

:deep(.particle) {
  --time: 5s;
  position: absolute;
  top: calc(50% - 7px);
  left: calc(50% - 7px);
  animation: gooey-particle calc(var(--time)) ease 1 -350ms;
}

:deep(.point) {
  background: var(--color);
  opacity: 1;
  animation: gooey-point calc(var(--time)) ease 1 -350ms;
}

@keyframes gooey-particle {
  0% {
    transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
    opacity: 1;
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
  }

  70% {
    transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
    opacity: 1;
    animation-timing-function: ease;
  }

  85% {
    transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
    opacity: 1;
  }

  100% {
    transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
    opacity: 1;
  }
}

@keyframes gooey-point {
  0% {
    transform: scale(0);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
  }

  25% {
    transform: scale(calc(var(--scale) * 0.25));
  }

  38% {
    opacity: 1;
  }

  65% {
    transform: scale(var(--scale));
    opacity: 1;
    animation-timing-function: ease;
  }

  85% {
    transform: scale(var(--scale));
    opacity: 1;
  }

  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gooey-nav-container .effect {
    display: none;
  }

  .gooey-nav-container nav ul li.active {
    color: #fff;
  }

  .gooey-nav-container nav ul li.active a {
    background: var(--color-accent);
  }
}
</style>
