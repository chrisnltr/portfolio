<template>
  <Teleport to="body">
    <div
      v-if="visible"
      :class="[
        'intro-animation fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden',
        isOutro ? 'pointer-events-none bg-transparent' : 'bg-white',
      ]"
      role="presentation"
      :aria-hidden="!isOutro"
    >
      <img
        v-if="displaySrc && (showFrames || isOutro)"
        :key="imageKey"
        :src="displaySrc"
        alt=""
        class="intro-animation__frame block select-none"
        :class="{ 'intro-animation__frame--outro': isOutro }"
        draggable="false"
      />

      <button
        v-if="!isOutro"
        type="button"
        class="intro-animation__skip absolute bottom-6 right-6 z-10 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-black/70 backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
        @click="skip"
      >
        {{ skipLabel }}
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { shallowRef, ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "#app";
import {
  getIntroFramePaths,
  INTRO_FPS,
  INTRO_OUTRO_IMAGE,
  INTRO_OUTRO_HOLD_MS,
  INTRO_WHITE_HOLD_MS,
} from "~/data/introAnimation";

const props = withDefaults(
  defineProps<{
    /** Beim Replay per Namensklick: kein weißer Vorspann */
    skipWhiteHold?: boolean;
  }>(),
  { skipWhiteHold: false },
);

const emit = defineEmits<{
  "frames-complete": [];
  complete: [];
  skip: [];
}>();

const route = useRoute();
const frames = getIntroFramePaths();
const currentSrc = shallowRef(frames[0] ?? "");
const showFrames = ref(false);
const isOutro = ref(false);
const visible = ref(true);
const imageKey = ref(0);

const displaySrc = computed(() =>
  isOutro.value ? INTRO_OUTRO_IMAGE : currentSrc.value,
);

const frameMs = 1000 / INTRO_FPS;
const INITIAL_PRELOAD = 20;
const BATCH_SIZE = 32;

const skipLabel =
  route.path.startsWith("/de") || route.params.locale === "de"
    ? "Überspringen"
    : "Skip";

let frameIndex = 0;
let rafId = 0;
let lastTick = 0;
let finished = false;
let whiteHoldTimer = 0;
let outroTimer = 0;

const preloadImage = (url: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });

const preloadBatch = (urls: string[]) =>
  Promise.all(urls.map((url) => preloadImage(url)));

const preloadRemaining = async (startAt: number) => {
  for (let i = startAt; i < frames.length; i += BATCH_SIZE) {
    await preloadBatch(frames.slice(i, i + BATCH_SIZE));
  }
};

const endIntro = () => {
  if (finished) return;
  finished = true;
  cancelAnimationFrame(rafId);
  clearTimeout(whiteHoldTimer);
  clearTimeout(outroTimer);
  visible.value = false;
  emit("complete");
};

const skip = () => {
  if (finished) return;
  finished = true;
  cancelAnimationFrame(rafId);
  clearTimeout(whiteHoldTimer);
  clearTimeout(outroTimer);
  visible.value = false;
  emit("skip");
};

const startOutro = () => {
  if (finished || isOutro.value) return;

  cancelAnimationFrame(rafId);
  isOutro.value = true;
  imageKey.value += 1;

  emit("frames-complete");

  outroTimer = window.setTimeout(endIntro, INTRO_OUTRO_HOLD_MS);
};

const finishFrames = () => {
  if (finished) return;
  startOutro();
};

const tick = (timestamp: number) => {
  if (finished || isOutro.value) return;

  if (!lastTick) lastTick = timestamp;

  const elapsed = timestamp - lastTick;
  if (elapsed >= frameMs) {
    const steps = Math.min(
      Math.floor(elapsed / frameMs),
      frames.length - 1 - frameIndex,
    );

    if (steps > 0) {
      frameIndex += steps;
      currentSrc.value = frames[frameIndex] ?? currentSrc.value;
      lastTick = timestamp - (elapsed % frameMs);

      if (frameIndex >= frames.length - 1) {
        finishFrames();
        return;
      }
    }
  }

  rafId = requestAnimationFrame(tick);
};

const startPlayback = () => {
  showFrames.value = true;
  lastTick = 0;
  rafId = requestAnimationFrame(tick);
};

onMounted(async () => {
  document.body.style.overflow = "hidden";

  const initial = frames.slice(0, INITIAL_PRELOAD);
  await preloadImage(INTRO_OUTRO_IMAGE);
  void preloadBatch(initial).then(() => preloadRemaining(INITIAL_PRELOAD));

  if (props.skipWhiteHold) {
    startPlayback();
  } else {
    whiteHoldTimer = window.setTimeout(startPlayback, INTRO_WHITE_HOLD_MS);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  clearTimeout(whiteHoldTimer);
  clearTimeout(outroTimer);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.intro-animation__frame {
  width: 100vw;
  max-width: 100vw;
  height: auto;
  max-height: 100vh;
  max-height: 100dvh;
}

.intro-animation__frame--outro {
  width: 100vw;
  max-width: 100vw;
  height: auto;
  max-height: 100vh;
  max-height: 100dvh;
  object-fit: contain;
  object-position: center;
  /* Falls noch schwarze Pixel im PNG: auf dunkler Startseite unsichtbar */
  mix-blend-mode: screen;
}
</style>
