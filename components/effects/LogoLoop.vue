<template>
  <div
    ref="containerRef"
    class="logoloop"
    :class="rootClasses"
    :style="containerStyle"
    role="region"
    :aria-label="ariaLabel"
  >
    <ul
      v-if="isStatic"
      class="logoloop__static"
      role="list"
    >
      <li
        v-for="(item, index) in logos"
        :key="`static-${index}`"
        class="logoloop__item logoloop__item--static"
        role="listitem"
      >
        <LogoLoopItem :item="item" />
      </li>
    </ul>

    <div
      v-else
      ref="trackRef"
      class="logoloop__track"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <ul
        v-for="copyIndex in copyCount"
        :key="`copy-${copyIndex}`"
        :ref="(el) => bindSeqRef(el as HTMLUListElement | null, copyIndex)"
        class="logoloop__list"
        role="list"
        :aria-hidden="copyIndex > 1 ? 'true' : undefined"
      >
        <li
          v-for="(item, itemIndex) in logos"
          :key="`${copyIndex}-${itemIndex}`"
          class="logoloop__item"
          role="listitem"
        >
          <LogoLoopItem :item="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type CSSProperties,
  type PropType,
} from "vue";

export type LogoItemNode = {
  node: string;
  href?: string;
  title?: string;
  ariaLabel?: string;
};

export type LogoItemImage = {
  src: string;
  alt?: string;
  label?: string;
  brandColor?: string;
  href?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type LogoItem = LogoItemNode | LogoItemImage;

const props = withDefaults(
  defineProps<{
    logos: LogoItem[];
    speed?: number;
    direction?: "left" | "right" | "up" | "down";
    width?: number | string;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    ariaLabel?: string;
    className?: string;
    style?: CSSProperties;
  }>(),
  {
    speed: 30,
    direction: "left",
    width: "100%",
    logoHeight: 30,
    gap: 56,
    pauseOnHover: true,
    fadeOut: true,
    ariaLabel: "Technologien",
    className: "",
  },
);

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.45,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

const containerRef = ref<HTMLDivElement | null>(null);
const trackRef = ref<HTMLDivElement | null>(null);
const seqRef = ref<HTMLUListElement | null>(null);
const seqWidth = ref(0);
const copyCount = ref<number>(ANIMATION_CONFIG.MIN_COPIES);
const isHovered = ref(false);
const isStatic = ref(false);

let rafRef: number | null = null;
let lastTimestampRef: number | null = null;
const offsetRef = ref(0);
const velocityRef = ref(0);
let resizeObserver: ResizeObserver | null = null;

function bindSeqRef(el: HTMLUListElement | null, copyIndex: number) {
  if (copyIndex === 1) seqRef.value = el;
}

const isVertical = computed(() => props.direction === "up" || props.direction === "down");

const effectiveHoverSpeed = computed(() => {
  if (props.hoverSpeed !== undefined) return props.hoverSpeed;
  if (props.pauseOnHover === true) return 0;
  if (props.pauseOnHover === false) return undefined;
  return 0;
});

const targetVelocity = computed(() => {
  const magnitude = Math.abs(props.speed);
  const directionMultiplier = props.direction === "left" || props.direction === "up" ? 1 : -1;
  const speedMultiplier = props.speed < 0 ? -1 : 1;
  return magnitude * directionMultiplier * speedMultiplier;
});

const cssVariables = computed(() => ({
  "--logoloop-gap": `${props.gap}px`,
  "--logoloop-logoHeight": `${props.logoHeight}px`,
  ...(props.fadeOutColor ? { "--logoloop-fadeColor": props.fadeOutColor } : {}),
}));

const rootClasses = computed(() =>
  [
    isVertical.value ? "logoloop--vertical" : "logoloop--horizontal",
    props.fadeOut && !isStatic.value ? "logoloop--fade" : "",
    isStatic.value ? "logoloop--static-mode" : "",
    props.className,
  ].filter(Boolean),
);

const containerStyle = computed<CSSProperties>(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  ...cssVariables.value,
  ...props.style,
}));

function isNodeItem(item: LogoItem): item is LogoItemNode {
  return "node" in item;
}

const LogoLoopItem = defineComponent({
  name: "LogoLoopItem",
  props: {
    item: {
      type: Object as PropType<LogoItem>,
      required: true,
    },
  },
  setup(itemProps) {
    return () => {
      const item = itemProps.item;

      if (isNodeItem(item)) {
        const node = h("span", {
          class: "logoloop__node",
          innerHTML: item.node,
          "aria-hidden": item.href && !item.ariaLabel ? "true" : undefined,
        });
        return item.href
          ? h(
              "a",
              {
                class: "logoloop__link",
                href: item.href,
                "aria-label": item.ariaLabel ?? item.title ?? "Logo-Link",
                target: "_blank",
                rel: "noreferrer noopener",
              },
              node,
            )
          : node;
      }

      const imageItem = item as LogoItemImage;
      const badge = h(
        "span",
        {
          class: "logoloop__badge",
          style: imageItem.brandColor
            ? ({ "--logoloop-brand": imageItem.brandColor } as Record<string, string>)
            : undefined,
        },
        [
          h("img", {
            class: "logoloop__logo-img",
            src: imageItem.src,
            srcset: imageItem.srcSet,
            sizes: imageItem.sizes,
            width: imageItem.width ?? 30,
            height: imageItem.height ?? 30,
            alt: imageItem.alt ?? "",
            title: imageItem.title,
            loading: "lazy",
            decoding: "async",
            draggable: false,
          }),
          imageItem.label
            ? h("span", { class: "logoloop__label" }, imageItem.label)
            : null,
        ],
      );

      const aria = imageItem.alt ?? imageItem.label ?? imageItem.title;
      if (imageItem.href) {
        return h(
          "a",
          {
            class: "logoloop__link",
            href: imageItem.href,
            "aria-label": aria || "Logo-Link",
            target: "_blank",
            rel: "noreferrer noopener",
          },
          badge,
        );
      }

      return badge;
    };
  },
});

function handleMouseEnter() {
  if (effectiveHoverSpeed.value !== undefined) isHovered.value = true;
}

function handleMouseLeave() {
  if (effectiveHoverSpeed.value !== undefined) isHovered.value = false;
}

async function updateDimensions() {
  await nextTick();
  const containerWidth = containerRef.value?.clientWidth ?? 0;
  const sequenceRect = seqRef.value?.getBoundingClientRect();
  const sequenceWidth = sequenceRect?.width ?? 0;
  if (sequenceWidth > 0) {
    seqWidth.value = Math.ceil(sequenceWidth);
    const copiesNeeded =
      Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
    copyCount.value = Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded);
  }
}

function setupImageLoader() {
  const images = seqRef.value?.querySelectorAll("img") ?? [];
  if (images.length === 0) {
    updateDimensions();
    return () => {};
  }

  let remaining = images.length;
  const handleLoad = () => {
    remaining -= 1;
    if (remaining === 0) updateDimensions();
  };

  images.forEach((img) => {
    const htmlImg = img as HTMLImageElement;
    if (htmlImg.complete) handleLoad();
    else {
      htmlImg.addEventListener("load", handleLoad, { once: true });
      htmlImg.addEventListener("error", handleLoad, { once: true });
    }
  });

  return () => {
    images.forEach((img) => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleLoad);
    });
  };
}

function startAnimationLoop() {
  const track = trackRef.value;
  if (!track || isStatic.value) return () => {};

  if (seqWidth.value > 0) {
    offsetRef.value = ((offsetRef.value % seqWidth.value) + seqWidth.value) % seqWidth.value;
    track.style.transform = `translate3d(${-offsetRef.value}px, 0, 0)`;
  }

  const animate = (timestamp: number) => {
    if (lastTimestampRef === null) lastTimestampRef = timestamp;
    const deltaTime = Math.max(0, timestamp - lastTimestampRef) / 1000;
    lastTimestampRef = timestamp;

    const target =
      isHovered.value && effectiveHoverSpeed.value !== undefined
        ? effectiveHoverSpeed.value
        : targetVelocity.value;

    const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
    velocityRef.value += (target - velocityRef.value) * easingFactor;

    if (seqWidth.value > 0) {
      let nextOffset = offsetRef.value + velocityRef.value * deltaTime;
      nextOffset = ((nextOffset % seqWidth.value) + seqWidth.value) % seqWidth.value;
      offsetRef.value = nextOffset;
      track.style.transform = `translate3d(${-offsetRef.value}px, 0, 0)`;
    }

    rafRef = requestAnimationFrame(animate);
  };

  rafRef = requestAnimationFrame(animate);
  return () => {
    if (rafRef !== null) cancelAnimationFrame(rafRef);
    rafRef = null;
    lastTimestampRef = null;
  };
}

let cleanupImages: (() => void) | undefined;
let cleanupAnimation: (() => void) | undefined;

function initMotionPreference() {
  isStatic.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setup() {
  cleanupImages?.();
  cleanupAnimation?.();

  if (isStatic.value) return;

  if (typeof ResizeObserver !== "undefined" && containerRef.value) {
    resizeObserver?.disconnect();
    resizeObserver = new ResizeObserver(() => updateDimensions());
    resizeObserver.observe(containerRef.value);
    if (seqRef.value) resizeObserver.observe(seqRef.value);
  } else {
    window.addEventListener("resize", updateDimensions);
  }

  cleanupImages = setupImageLoader();
  cleanupAnimation = startAnimationLoop();
  updateDimensions();
}

onMounted(async () => {
  initMotionPreference();
  await nextTick();
  window.setTimeout(setup, 10);
});

onUnmounted(() => {
  cleanupImages?.();
  cleanupAnimation?.();
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateDimensions);
});

watch(
  () => [props.logos, props.gap, props.logoHeight],
  async () => {
    await nextTick();
    setup();
  },
  { deep: true },
);

watch([() => props.speed, () => props.pauseOnHover, () => props.hoverSpeed], () => {
  cleanupAnimation?.();
  cleanupAnimation = startAnimationLoop();
});
</script>

<style scoped>
.logoloop {
  position: relative;
  overflow-x: hidden;
  --logoloop-fadeColorAuto: var(--color-bg, #05070b);
}

.logoloop__track {
  display: flex;
  width: max-content;
  will-change: transform;
  user-select: none;
  position: relative;
  z-index: 0;
}

.logoloop__list {
  display: flex;
  align-items: center;
}

.logoloop__item {
  flex: 0 0 auto;
  margin-right: var(--logoloop-gap);
  line-height: 1;
}

.logoloop__static {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem 1.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.logoloop__item--static {
  margin: 0;
}

:deep(.logoloop__badge) {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding-inline: 0.1rem;
  transition: color var(--duration) var(--ease-out);
}

:deep(.logoloop__logo-img) {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  display: block;
  object-fit: contain;
  -webkit-user-drag: none;
  pointer-events: none;
  filter: grayscale(1) brightness(1.45) opacity(0.55);
  transition:
    filter var(--duration) var(--ease-out),
    opacity var(--duration) var(--ease-out);
}

:deep(.logoloop__label) {
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--color-text-subtle);
  white-space: nowrap;
  transition: color var(--duration) var(--ease-out);
}

.logoloop__item:hover :deep(.logoloop__logo-img),
.logoloop__item--static:hover :deep(.logoloop__logo-img) {
  filter: none;
  opacity: 0.95;
}

.logoloop__item:hover :deep(.logoloop__label),
.logoloop__item--static:hover :deep(.logoloop__label) {
  color: var(--logoloop-brand, var(--color-accent-hover));
}

:deep(.logoloop__link) {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  border-radius: 4px;
}

.logoloop--fade::before,
.logoloop--fade::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(24px, 8%, 120px);
  pointer-events: none;
  z-index: 10;
}

.logoloop--fade::before {
  left: 0;
  background: linear-gradient(
    to right,
    var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.logoloop--fade::after {
  right: 0;
  background: linear-gradient(
    to left,
    var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

@media (prefers-reduced-motion: reduce) {
  .logoloop__track {
    transform: none !important;
  }
}
</style>
