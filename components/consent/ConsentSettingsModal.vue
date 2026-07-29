<template>
  <Teleport to="body">
    <div
      v-if="settingsOpen"
      class="fixed inset-0 z-[9100] flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        class="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
        @click="closeSettings"
      />

      <div
        ref="dialogRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="descId"
        tabindex="-1"
        class="relative w-full sm:max-w-2xl max-h-[min(92vh,880px)] overflow-hidden rounded-t-xl sm:rounded-xl border border-border-primary bg-background-secondary shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex flex-col"
        @keydown="onKeydown"
      >
        <div class="flex items-start justify-between gap-3 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-border-primary">
          <div>
            <h2 :id="titleId" class="text-lg sm:text-xl font-semibold text-text-primary">
              {{ t.title }}
            </h2>
            <p :id="descId" class="text-sm text-text-secondary mt-1">
              {{ t.description }}
            </p>
          </div>
          <button
            type="button"
            class="btn-ghost shrink-0 min-h-[44px] min-w-[44px]"
            :aria-label="t.close"
            @click="closeSettings"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div class="overflow-y-auto flex-1 px-4 sm:px-6 py-4 space-y-4">
          <!-- Necessary -->
          <section class="rounded-lg border border-border-primary bg-background-tertiary/40 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold text-text-primary">{{ t.necessaryTitle }}</h3>
                <p class="text-sm text-text-secondary mt-1">{{ t.necessaryDescription }}</p>
              </div>
              <span
                class="tech-tag px-2 py-1 whitespace-nowrap"
                :aria-label="t.alwaysOn"
              >
                {{ t.alwaysOn }}
              </span>
            </div>
            <ul class="mt-3 space-y-3">
              <li
                v-for="service in necessaryServices"
                :key="service.id"
                class="text-sm text-text-secondary border-t border-border-primary/60 pt-3"
              >
                <p class="text-text-primary font-medium">{{ serviceLabel(service) }}</p>
                <p class="mt-1">{{ purpose(service) }}</p>
                <p class="mt-1"><span class="text-text-primary">{{ t.storage }}:</span> {{ storage(service) }}</p>
                <p class="mt-1"><span class="text-text-primary">{{ t.retention }}:</span> {{ retention(service) }}</p>
              </li>
            </ul>
          </section>

          <!-- Statistics -->
          <section class="rounded-lg border border-border-primary bg-background-tertiary/40 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold text-text-primary">{{ t.statisticsTitle }}</h3>
                <p class="text-sm text-text-secondary mt-1">{{ t.statisticsDescription }}</p>
              </div>
              <label class="inline-flex items-center gap-2 cursor-pointer select-none min-h-[44px]">
                <span class="sr-only">{{ t.statisticsTitle }}</span>
                <input
                  v-model="draftStatistics"
                  type="checkbox"
                  class="h-5 w-5 rounded border-border-primary bg-background-primary text-accent-600 focus:ring-accent-400"
                >
              </label>
            </div>
            <ul class="mt-3 space-y-3">
              <li
                v-for="service in statisticsServices"
                :key="service.id"
                class="text-sm text-text-secondary border-t border-border-primary/60 pt-3"
              >
                <p class="text-text-primary font-medium">{{ serviceLabel(service) }}</p>
                <p class="mt-1"><span class="text-text-primary">{{ t.provider }}:</span> {{ service.provider }}</p>
                <p class="mt-1">{{ purpose(service) }}</p>
                <p class="mt-1"><span class="text-text-primary">{{ t.storage }}:</span> {{ storage(service) }}</p>
                <p class="mt-1"><span class="text-text-primary">{{ t.retention }}:</span> {{ retention(service) }}</p>
                <p v-if="service.privacyUrl" class="mt-1">
                  <a
                    :href="service.privacyUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
                  >
                    {{ t.privacyHint }}
                  </a>
                </p>
              </li>
            </ul>
          </section>

          <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm pb-1">
            <NuxtLink
              :to="privacyLink"
              class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
              @click="closeSettings"
            >
              {{ t.privacy }}
            </NuxtLink>
            <NuxtLink
              :to="imprintLink"
              class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
              @click="closeSettings"
            >
              {{ t.imprint }}
            </NuxtLink>
          </div>
        </div>

        <div class="border-t border-border-primary px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            class="btn-primary flex-1 min-h-[44px]"
            @click="onSave"
          >
            {{ t.save }}
          </button>
          <button
            type="button"
            class="btn-secondary flex-1 min-h-[44px]"
            @click="onAcceptAll"
          >
            {{ t.acceptAll }}
          </button>
          <button
            type="button"
            class="btn-secondary flex-1 min-h-[44px]"
            @click="onRejectAll"
          >
            {{ t.rejectAll }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { CONSENT_SERVICES } from "~/types/consent";
import { useConsent } from "~/composables/useConsent";
import { useI18n } from "~/composables/useI18n";

const titleId = "consent-settings-title";
const descId = "consent-settings-desc";

const { locale, messages } = useI18n();
const {
  settingsOpen,
  categories,
  closeSettings,
  savePreferences,
  acceptAll,
  rejectAll,
} = useConsent();

const dialogRef = ref<HTMLElement | null>(null);
const draftStatistics = ref(false);

const t = computed(() => messages.value.consent.settings);

const privacyLink = computed(() =>
  locale.value === "de" ? "/de/datenschutz" : "/en/privacy",
);
const imprintLink = computed(() =>
  locale.value === "de" ? "/de/impressum" : "/en/imprint",
);

const necessaryServices = CONSENT_SERVICES.filter((s) => s.category === "necessary");
const statisticsServices = CONSENT_SERVICES.filter((s) => s.category === "statistics");

function serviceLabel(service: (typeof CONSENT_SERVICES)[number]): string {
  switch (service.id) {
    case "locale-preference":
      return t.value.serviceLocale;
    case "consent-storage":
      return t.value.serviceConsent;
    case "vercel-analytics":
      return t.value.serviceAnalytics;
    default:
      return "Service";
  }
}

function purpose(service: (typeof CONSENT_SERVICES)[number]) {
  return locale.value === "de" ? service.purposeDe : service.purposeEn;
}

function storage(service: (typeof CONSENT_SERVICES)[number]) {
  return locale.value === "de" ? service.storageDe : service.storageEn;
}

function retention(service: (typeof CONSENT_SERVICES)[number]) {
  return locale.value === "de" ? service.retentionDe : service.retentionEn;
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  const nodes = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  return Array.from(nodes).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
  );
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeSettings();
    return;
  }

  if (event.key !== "Tab" || !dialogRef.value) return;

  const focusable = getFocusable(dialogRef.value);
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function onSave() {
  savePreferences({ statistics: draftStatistics.value });
}

function onAcceptAll() {
  draftStatistics.value = true;
  acceptAll();
}

function onRejectAll() {
  draftStatistics.value = false;
  rejectAll();
}

watch(settingsOpen, async (open) => {
  if (open) {
    draftStatistics.value = categories.value.statistics;
    document.body.style.overflow = "hidden";
    await nextTick();
    dialogRef.value?.focus();
    return;
  }

  document.body.style.overflow = "";
});
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
