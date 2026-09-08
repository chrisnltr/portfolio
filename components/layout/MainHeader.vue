<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 site-header"
    :class="{ 'is-scrolled': scrolled }"
  >
    <div class="container-page header-inner">
      <nav class="header-nav" :aria-label="messages.nav.ariaLabel">
        <NuxtLink to="/" class="brand-mark" @click="onBrandClick">
          <span class="brand-mark__sigil">{{ messages.nav.brandMark }}</span>
        </NuxtLink>

        <div class="header-desktop">
          <GooeyNav
            :items="gooeyNavItems"
            :active-index="activeGooeyIndex"
            :particle-count="8"
            :time-variance="200"
            color-scheme="blue"
            :aria-label="messages.nav.ariaLabel"
            @navigate="onGooeyNavigate"
          />
        </div>

        <button
          ref="menuToggleRef"
          type="button"
          class="header-menu-btn"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="mobileMenuOpen ? messages.nav.menuClose : messages.nav.menuToggle"
          @click="toggleMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.75"
              d="M4 7h16M4 12h16M4 17h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.75"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      <div
        v-if="mobileMenuOpen"
        id="mobile-nav"
        ref="mobileNavRef"
        class="header-mobile"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="sectionHref(item.hash)"
          class="nav-link header-mobile-link"
          :class="{ 'is-active': activeSection === item.hash }"
          @click="onMobileSectionNav($event, item.hash)"
        >
          {{ item.label }}
        </a>

        <a
          :href="sectionHref(contactNavHash)"
          class="nav-cta header-mobile-cta"
          :class="{ 'is-active': activeSection === contactNavHash }"
          @click="onMobileSectionNav($event, contactNavHash)"
        >
          {{ messages.nav.contact }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import GooeyNav from "~/components/effects/GooeyNav.vue";
import { useI18n } from "~/composables/useI18n";
import { contactNavHash, mainNavItems } from "~/data/navigation";

const mobileMenuOpen = ref(false);
const scrolled = ref(false);
const activeSection = ref("");
const scrollNavLock = ref<string | null>(null);
let scrollNavLockTimer: number | null = null;
const menuToggleRef = ref<HTMLButtonElement | null>(null);
const mobileNavRef = ref<HTMLElement | null>(null);
const route = useRoute();

const { messages } = useI18n();

const isHomePage = computed(() => {
  const path = route.path.replace(/\/$/, "") || "/";
  return path === "/";
});

const sectionHref = (hash: string) => {
  if (isHomePage.value) return `#${hash}`;
  return `/#${hash}`;
};

const navItems = computed(() =>
  mainNavItems.map((item) => ({
    id: item.id,
    hash: item.hash,
    label: messages.value.nav[item.id],
  })),
);

const gooeyNavItems = computed(() => [
  {
    id: "home",
    label: messages.value.nav.home,
    href: sectionHref("home"),
  },
  {
    id: "projects",
    label: messages.value.nav.projects,
    href: sectionHref("projects"),
  },
  {
    id: "contact",
    label: messages.value.nav.contact,
    href: sectionHref(contactNavHash),
    variant: "contact" as const,
  },
]);

const gooeyHashes = ["home", "projects", contactNavHash] as const;

const activeGooeyIndex = computed(() => {
  const current = activeSection.value || "home";
  const index = gooeyHashes.indexOf(current as (typeof gooeyHashes)[number]);
  return index >= 0 ? index : 0;
});

function onGooeyNavigate(index: number, event: MouseEvent) {
  onSectionNav(event, gooeyHashes[index]);
}

const trackedHashes = computed(() => [
  ...mainNavItems.map((i) => i.hash),
  contactNavHash,
]);

const setBodyScrollLock = (locked: boolean) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = locked ? "hidden" : "";
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = (returnFocus = false) => {
  if (!mobileMenuOpen.value) return;
  mobileMenuOpen.value = false;
  if (returnFocus) {
    nextTick(() => menuToggleRef.value?.focus());
  }
};

function setScrollNavLock(hash: string) {
  scrollNavLock.value = hash;
  if (scrollNavLockTimer !== null) window.clearTimeout(scrollNavLockTimer);
  scrollNavLockTimer = window.setTimeout(() => {
    scrollNavLock.value = null;
    scrollNavLockTimer = null;
    onScroll();
  }, 900);
}

function scrollToSection(hash: string) {
  if (!import.meta.client) return;

  activeSection.value = hash;
  setScrollNavLock(hash);

  if (hash === "home") {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    return;
  }

  const el = document.getElementById(hash);
  if (!el) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

function onBrandClick(event: MouseEvent) {
  closeMobileMenu();
  if (!isHomePage.value) return;
  event.preventDefault();
  history.pushState(null, "", "/");
  scrollToSection("home");
}

function onSectionNav(event: MouseEvent, hash: string) {
  if (!isHomePage.value) return;
  event.preventDefault();
  history.pushState(null, "", hash === "home" ? "/" : `#${hash}`);
  scrollToSection(hash);
}

function onMobileSectionNav(event: MouseEvent, hash: string) {
  closeMobileMenu();
  onSectionNav(event, hash);
}

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeMobileMenu(true);
    return;
  }

  if (!mobileMenuOpen.value || event.key !== "Tab" || !mobileNavRef.value) return;

  const panel = mobileNavRef.value;
  const toggle = menuToggleRef.value;
  const focusables = [
    ...(toggle ? [toggle] : []),
    ...Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)),
  ];
  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
};

const onScroll = () => {
  scrolled.value = window.scrollY > 8;
  if (!isHomePage.value) return;

  if (scrollNavLock.value) {
    activeSection.value = scrollNavLock.value;
    return;
  }

  const sections = trackedHashes.value;
  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 96;
  if (nearBottom) {
    activeSection.value = contactNavHash;
    return;
  }

  const probeY = Math.min(window.innerHeight * 0.32, 180);
  const home = document.getElementById("home");
  if (home && home.getBoundingClientRect().bottom > probeY + 80 && window.scrollY < 120) {
    activeSection.value = "home";
    return;
  }

  let current = "home";
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= probeY) current = id;
  }
  activeSection.value = current;
};

watch(mobileMenuOpen, async (open) => {
  setBodyScrollLock(open);
  if (open) {
    await nextTick();
    mobileNavRef.value?.querySelector<HTMLElement>("a")?.focus();
  }
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("scroll", onScroll);
  if (scrollNavLockTimer !== null) window.clearTimeout(scrollNavLockTimer);
  setBodyScrollLock(false);
});
</script>

<style scoped>
.header-inner {
  min-height: var(--header-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 0;
  min-height: calc(var(--header-height) - 1px);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  line-height: 1;
  padding: 0.35rem 0;
  border-radius: 4px;
}

.brand-mark__sigil {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--color-accent);
}

.brand-mark:hover .brand-mark__sigil {
  color: #4b7cff;
}

.header-desktop {
  display: none;
  align-items: center;
  gap: 1.75rem;
  min-width: 0;
}

.header-menu-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
}

.header-menu-btn:hover {
  color: var(--color-text);
  background: rgba(243, 246, 250, 0.05);
}

.header-mobile {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.65rem 0 1rem;
  border-top: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .header-desktop {
    display: flex;
  }

  .header-menu-btn,
  .header-mobile {
    display: none !important;
  }
}

.header-mobile-link {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  font-size: 1rem;
  padding-block: 0.55rem;
}

.header-mobile-link.is-active::after {
  display: none;
}

.header-mobile-cta {
  margin-top: 0.55rem;
  width: 100%;
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  padding: 0 0.9rem;
  border-radius: 8px;
  background: #2f66ff;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  line-height: 1;
  border: 1px solid transparent;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.nav-cta:hover {
  background: #4b7cff;
  transform: translateY(-1px);
}

.nav-cta:active {
  transform: translateY(0);
}

.nav-cta:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: 2px;
}
</style>
