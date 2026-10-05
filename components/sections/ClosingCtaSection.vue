<template>
  <section
    :id="sectionId"
    class="closing-cta"
  >
    <div class="container-page closing-cta__inner">
      <div class="closing-cta__copy">
        <h2 class="closing-cta__title">{{ resolvedTitle }}</h2>
        <p class="closing-cta__body">{{ resolvedBody }}</p>
      </div>
      <div class="closing-cta__actions">
        <NuxtLink
          :to="contactPath"
          class="closing-cta__primary"
          @click="onPrimary"
        >
          <span>{{ resolvedPrimaryCta }}</span>
          <span aria-hidden="true">→</span>
        </NuxtLink>
        <a
          :href="`mailto:${profile.email}`"
          class="closing-cta__email"
          @click="onEmail"
        >
          <svg
            class="closing-cta__email-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6.5h16v11H4v-11z"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linejoin="round"
            />
            <path
              d="M4.5 7.5 12 13l7.5-5.5"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ resolvedEmailCta }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAnalytics } from "~/composables/useAnalytics";
import { useI18n } from "~/composables/useI18n";
import { paths } from "~/data/navigation";
import { profile } from "~/data/profile";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    title?: string;
    body?: string;
    primaryCta?: string;
    emailCta?: string;
  }>(),
  {
    sectionId: "cta",
  },
);

const { messages } = useI18n();
const { track } = useAnalytics();
const contactPath = paths.contact;

const resolvedTitle = computed(
  () => props.title ?? messages.value.closingCta.title,
);
const resolvedBody = computed(
  () => props.body ?? messages.value.closingCta.body,
);
const resolvedPrimaryCta = computed(
  () => props.primaryCta ?? messages.value.closingCta.primaryCta,
);
const resolvedEmailCta = computed(
  () => props.emailCta ?? messages.value.closingCta.emailCta,
);

function onPrimary() {
  track("cta_click", {
    location: "home-closing-cta",
    service: "erstgespraech",
  });
}

function onEmail() {
  track("email_click", { location: "home-closing-cta" });
}
</script>

<style scoped>
.closing-cta {
  position: relative;
  padding-block: clamp(3.5rem, 8vw, 5.5rem);
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.closing-cta__inner {
  display: grid;
  justify-items: center;
  gap: 1.5rem;
  max-width: 42rem;
  text-align: center;
}

.closing-cta__copy {
  display: grid;
  gap: 0.65rem;
}

.closing-cta__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4.8vw, 2.65rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: #fff;
  text-wrap: balance;
}

.closing-cta__body {
  margin: 0;
  font-size: clamp(1rem, 2.2vw, 1.15rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.88);
}

.closing-cta__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.85rem 1.35rem;
}

.closing-cta__primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.9rem;
  padding: 0.7rem 1.45rem;
  border-radius: 999px;
  background: #fff;
  color: var(--color-accent);
  font-size: 0.98rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 28px rgba(10, 24, 64, 0.18);
  transition:
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.closing-cta__primary:hover {
  transform: translateY(-1px);
  background: #f4f7ff;
  color: var(--color-accent-hover);
}

.closing-cta__primary:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.closing-cta__email {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.75rem;
  font-size: 0.98rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.closing-cta__email:hover {
  opacity: 0.88;
}

.closing-cta__email:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
  border-radius: 4px;
}

.closing-cta__email-icon {
  width: 1.15rem;
  height: 1.15rem;
  flex-shrink: 0;
}

@media (max-width: 639px) {
  .closing-cta__actions {
    flex-direction: column;
    width: 100%;
  }

  .closing-cta__primary,
  .closing-cta__email {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .closing-cta__primary {
    transition: none;
  }

  .closing-cta__primary:hover {
    transform: none;
  }
}
</style>
