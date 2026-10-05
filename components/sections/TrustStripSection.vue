<template>
  <section
    class="trust-strip"
    :aria-label="messages.trustStrip.items.join(', ')"
  >
    <div class="container-page trust-strip__inner">
      <ul class="trust-strip__list">
        <li
          v-for="item in messages.trustStrip.items"
          :key="item"
          class="trust-strip__item"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "~/composables/useI18n";

const { messages } = useI18n();
</script>

<style scoped>
.trust-strip {
  border-block: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 72%, var(--color-bg));
}

.trust-strip__inner {
  padding-block: 0.85rem;
}

.trust-strip__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.55rem 0.35rem;
}

.trust-strip__item {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.trust-strip__item:not(:last-child)::after {
  content: "";
  display: inline-block;
  width: 0.28rem;
  height: 0.28rem;
  margin-inline: 0.85rem 0.5rem;
  border-radius: 999px;
  background: var(--color-accent);
  vertical-align: middle;
  opacity: 0.55;
}

@media (max-width: 639px) {
  .trust-strip__inner {
    padding-block: 0.85rem;
  }

  .trust-strip__list {
    justify-content: flex-start;
    gap: 0.45rem 0.2rem;
  }

  .trust-strip__item {
    font-size: 0.72rem;
  }

  .trust-strip__item:not(:last-child)::after {
    margin-inline: 0.65rem 0.35rem;
  }
}
</style>
