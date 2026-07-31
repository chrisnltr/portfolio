<template>
  <div
    ref="containerRef"
    class="cf-turnstile-host flex justify-center min-h-[65px]"
    aria-label="Cloudflare Turnstile"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { loadTurnstileScript } from "~/utils/turnstile";

const props = withDefaults(
  defineProps<{
    siteKey: string;
    modelValue?: string;
    theme?: "dark" | "light" | "auto";
  }>(),
  {
    modelValue: "",
    theme: "dark",
  },
);

const emit = defineEmits<{
  "update:modelValue": [token: string];
}>();

const containerRef = ref<HTMLElement | null>(null);
let widgetId: string | undefined;

function renderWidget() {
  if (!containerRef.value || !window.turnstile || !props.siteKey) {
    return;
  }

  if (widgetId !== undefined) {
    window.turnstile.remove(widgetId);
    widgetId = undefined;
  }

  containerRef.value.innerHTML = "";
  widgetId = window.turnstile.render(containerRef.value, {
    sitekey: props.siteKey,
    theme: props.theme,
    callback: (token: string) => {
      emit("update:modelValue", token);
    },
    "expired-callback": () => {
      emit("update:modelValue", "");
    },
    "error-callback": () => {
      emit("update:modelValue", "");
    },
  });
}

function reset() {
  emit("update:modelValue", "");
  if (widgetId !== undefined && window.turnstile) {
    window.turnstile.reset(widgetId);
  } else {
    renderWidget();
  }
}

defineExpose({ reset });

onMounted(async () => {
  try {
    await loadTurnstileScript();
    renderWidget();
  } catch (err) {
    console.error("Turnstile init error:", err);
  }
});

watch(
  () => props.siteKey,
  () => {
    if (window.turnstile) {
      renderWidget();
    }
  },
);

onBeforeUnmount(() => {
  if (widgetId !== undefined && window.turnstile) {
    window.turnstile.remove(widgetId);
    widgetId = undefined;
  }
});
</script>
