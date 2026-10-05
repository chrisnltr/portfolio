<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 site-header landing-header"
    :class="{ 'is-scrolled': scrolled }"
  >
    <div class="container-page landing-header__inner">
      <nav class="landing-header__nav" :aria-label="navLabel">
        <NuxtLink to="/" class="landing-header__brand">
          <span class="landing-header__sigil">{{ brandMark }}</span>
        </NuxtLink>

        <div class="landing-header__actions">
          <NuxtLink
            v-if="secondaryHref && secondaryLabel"
            :to="secondaryHref"
            class="landing-header__secondary"
          >
            {{ secondaryLabel }}
          </NuxtLink>
          <NuxtLink
            :to="primaryTo"
            class="landing-header__cta"
            @click="onPrimaryClick"
          >
            <span class="landing-header__cta-full" aria-hidden="true">{{ primaryLabel }}</span>
            <span class="landing-header__cta-short" aria-hidden="true">{{ primaryShortLabel }}</span>
            <span class="sr-only">{{ primaryLabel }}</span>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useI18n } from "~/composables/useI18n";
import { contactPath } from "~/data/navigation";

const props = withDefaults(
  defineProps<{
    primaryLabel?: string;
    primaryShortLabel?: string;
    primaryTo?: string | { path: string; query?: Record<string, string> };
    secondaryLabel?: string;
    secondaryHref?: string;
    analyticsLocation?: string;
  }>(),
  {
    primaryLabel: "Kostenloses Erstgespräch",
    primaryShortLabel: "Erstgespräch",
    secondaryLabel: "Projekte ansehen",
    secondaryHref: "/#projects",
    analyticsLocation: "website-landing-header",
  },
);

const { messages } = useI18n();
const { track } = useAnalytics();
const scrolled = ref(false);

const brandMark = computed(() => messages.value.nav.brandMark);
const navLabel = computed(() => messages.value.nav.ariaLabel);
const primaryTo = computed(
  () =>
    props.primaryTo ?? {
      path: contactPath,
      query: { projekt: "website" },
    },
);

function onPrimaryClick() {
  track("cta_click", {
    location: props.analyticsLocation,
    service: "website-erstgespraech",
  });
}

const onScroll = () => {
  scrolled.value = window.scrollY > 8;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.landing-header__inner {
  min-height: var(--header-height);
  display: flex;
  align-items: center;
}

.landing-header__nav {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  min-height: calc(var(--header-height) - 1px);
}

.landing-header__brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  line-height: 1;
  padding: 0.35rem 0;
  border-radius: 4px;
  min-height: 2.75rem;
}

.landing-header__sigil {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--color-accent);
}

.landing-header__brand:hover .landing-header__sigil {
  color: var(--color-accent-hover);
}

.landing-header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  min-width: 0;
}

.landing-header__secondary {
  display: none;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 550;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 4px;
  padding: 0.4rem 0.2rem;
}

.landing-header__secondary:hover {
  color: var(--color-text);
}

.landing-header__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.55rem 0.95rem;
  border-radius: 8px;
  background: #2f66ff;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 650;
  text-decoration: none;
  line-height: 1.1;
  border: 1px solid transparent;
  white-space: nowrap;
  transition:
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.landing-header__cta:hover {
  background: #4b7cff;
  transform: translateY(-1px);
}

.landing-header__cta:focus-visible,
.landing-header__secondary:focus-visible,
.landing-header__brand:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: 2px;
}

.landing-header__cta-short {
  display: inline;
}

.landing-header__cta-full {
  display: none;
}

@media (min-width: 640px) {
  .landing-header__cta-short {
    display: none;
  }

  .landing-header__cta-full {
    display: inline;
  }

  .landing-header__cta {
    padding: 0.6rem 1.05rem;
    font-size: 0.88rem;
  }
}

@media (min-width: 768px) {
  .landing-header__secondary {
    display: inline-flex;
  }
}
</style>
