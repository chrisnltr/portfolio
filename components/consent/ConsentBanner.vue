<template>
  <Teleport to="body">
    <div
      v-if="bannerVisible && !settingsOpen"
      class="consent-banner"
      role="presentation"
    >
      <div
        class="consent-banner__backdrop"
        aria-hidden="true"
      />
      <div
        ref="panelRef"
        class="consent-banner__panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="descId"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <h2 :id="titleId" class="consent-banner__title">
          {{ t.title }}
        </h2>
        <p :id="descId" class="consent-banner__desc">
          {{ t.description }}
        </p>

        <div class="consent-banner__links">
          <NuxtLink
            :to="privacyLink"
            class="link-quiet consent-banner__link"
          >
            {{ t.privacy }}
          </NuxtLink>
          <NuxtLink
            :to="imprintLink"
            class="link-quiet consent-banner__link"
          >
            {{ t.imprint }}
          </NuxtLink>
        </div>

        <div class="consent-banner__actions">
          <button
            ref="acceptRef"
            type="button"
            class="btn-primary consent-banner__btn"
            @click="acceptAll"
          >
            {{ t.acceptAll }}
          </button>
          <button
            type="button"
            class="btn-secondary consent-banner__btn"
            @click="rejectAll"
          >
            {{ t.rejectAll }}
          </button>
          <button
            type="button"
            class="btn-secondary consent-banner__btn"
            @click="onOpenSettings"
          >
            {{ t.settings }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { useConsent } from "~/composables/useConsent";
import { useI18n } from "~/composables/useI18n";
import {
  focusWithoutScroll,
  lockBodyScroll,
  unlockBodyScroll,
} from "~/composables/useScrollLock";

const titleId = "consent-banner-title";
const descId = "consent-banner-desc";

const { messages } = useI18n();
const { bannerVisible, settingsOpen, acceptAll, rejectAll, openSettings } =
  useConsent();

const t = computed(() => messages.value.consent.banner);
const panelRef = ref<HTMLElement | null>(null);
const acceptRef = ref<HTMLButtonElement | null>(null);
const scrollLocked = ref(false);

const privacyLink = "/datenschutz";
const imprintLink = "/impressum";

function syncScrollLock() {
  const shouldLock = bannerVisible.value;
  if (shouldLock && !scrollLocked.value) {
    lockBodyScroll();
    scrollLocked.value = true;
    return;
  }
  if (!shouldLock && scrollLocked.value) {
    unlockBodyScroll();
    scrollLocked.value = false;
  }
}

function onOpenSettings(event: MouseEvent) {
  openSettings(event.currentTarget as HTMLElement);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    openSettings(acceptRef.value);
  }
}

watch(bannerVisible, async (bannerOpen) => {
  syncScrollLock();
  if (!bannerOpen) return;
  await nextTick();
  if (!settingsOpen.value) {
    focusWithoutScroll(panelRef.value);
  }
}, { immediate: true });

watch(settingsOpen, async (open) => {
  if (open || !bannerVisible.value) return;
  await nextTick();
  focusWithoutScroll(panelRef.value);
});

onBeforeUnmount(() => {
  if (scrollLocked.value) {
    unlockBodyScroll();
    scrollLocked.value = false;
  }
});
</script>

<style scoped>
.consent-banner {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding:
    max(0.75rem, env(safe-area-inset-top, 0px))
    max(0.875rem, env(safe-area-inset-right, 0px))
    max(0.875rem, env(safe-area-inset-bottom, 0px))
    max(0.875rem, env(safe-area-inset-left, 0px));
  pointer-events: none;
}

.consent-banner__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.42);
  pointer-events: auto;
}

.consent-banner__panel {
  position: relative;
  z-index: 1;
  width: min(100%, 26rem);
  max-height: min(78dvh, 78vh);
  overflow-y: auto;
  overscroll-behavior: contain;
  margin: 0;
  padding: 1.05rem 1.1rem 1.1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-soft);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
  pointer-events: auto;
  outline: none;
}

.consent-banner__title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 650;
  line-height: 1.3;
  color: var(--color-text);
}

.consent-banner__desc {
  margin: 0.45rem 0 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.consent-banner__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.85rem;
  margin-top: 0.65rem;
}

.consent-banner__link {
  font-size: 0.8125rem;
  min-height: 2.5rem;
}

.consent-banner__actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.consent-banner__btn {
  width: 100%;
  font-size: 0.9rem;
  min-height: 2.75rem;
  max-height: none;
}

@media (min-width: 640px) {
  .consent-banner {
    align-items: center;
    padding: 1.25rem;
  }

  .consent-banner__panel {
    max-height: min(85dvh, 85vh);
    padding: 1.25rem;
  }

  .consent-banner__title {
    font-size: 1.125rem;
  }

  .consent-banner__desc {
    font-size: 0.9rem;
  }
}

@media (max-height: 520px) {
  .consent-banner {
    align-items: stretch;
  }

  .consent-banner__panel {
    max-height: none;
    height: 100%;
    border-radius: 0.9rem;
  }
}
</style>
