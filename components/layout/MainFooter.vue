<template>
  <footer
    class="site-footer"
    role="contentinfo"
  >
    <div class="container-page footer-inner">
      <div class="footer-brand">
        <NuxtLink
          to="/"
          class="footer-brand-mark"
          :aria-label="brandHomeLabel"
        >
          {{ messages.nav.brandMark }}
        </NuxtLink>
        <p class="footer-copy">
          © 2026 {{ messages.nav.brandName }}
        </p>
      </div>

      <nav class="footer-legal" :aria-label="messages.footer.legalNavLabel">
        <NuxtLink to="/impressum">{{ messages.footer.impressum }}</NuxtLink>
        <NuxtLink to="/datenschutz">{{ messages.footer.datenschutz }}</NuxtLink>
        <NuxtLink to="/agb">{{ messages.footer.agb }}</NuxtLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";

const { messages } = useI18n();

const brandHomeLabel = computed(
  () => `${messages.value.nav.brandMark}, zur Startseite`,
);
</script>

<style scoped>
.site-footer {
  background: rgba(5, 7, 11, 0.97);
  color: var(--color-text-subtle);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  min-height: 3.5rem;
  padding-block: 0.85rem;
}

.footer-brand,
.footer-legal {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem 1.25rem;
}

.footer-brand-mark {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--color-accent);
  text-decoration: none;
  line-height: 1;
  border-radius: 4px;
}

.footer-brand-mark:hover {
  color: #4b7cff;
}

.footer-brand-mark:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: 2px;
}

.footer-copy {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.35;
  color: var(--color-text-subtle);
}

.footer-legal {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  line-height: 1.35;
}

.footer-legal a {
  color: inherit;
  text-decoration: none;
  border-radius: 4px;
  min-height: 2.5rem;
  display: inline-flex;
  align-items: center;
}

.footer-legal a:hover {
  color: #ffffff;
}

.footer-legal a:focus-visible {
  outline: 2px solid #93b0ff;
  outline-offset: 2px;
}

@media (max-width: 639px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
    padding-block: 1rem;
    min-height: 0;
  }

  .footer-brand {
    gap: 0.65rem 1rem;
  }

  .footer-legal {
    gap: 0.15rem 1rem;
    width: 100%;
  }

  .footer-legal a {
    min-height: 2.75rem;
    padding-inline: 0.1rem;
  }
}
</style>
