<template>
  <section
    id="kundenstimmen"
    class="wl-testimonials"
    aria-labelledby="website-testimonials-title"
  >
    <div class="container-page">
      <header class="wl-testimonials__intro">
        <p class="wl-testimonials__eyebrow">Zusammenarbeit</p>
        <h2 id="website-testimonials-title" class="wl-testimonials__title">
          Was Kundinnen über die Zusammenarbeit sagen.
        </h2>
        <p class="wl-testimonials__lead">
          Echte Rückmeldungen zu Kommunikation, Umsetzung und dem fertigen
          Ergebnis.
        </p>
      </header>

      <div class="wl-testimonials__grid">
        <TestimonialCard
          v-for="item in testimonials"
          :key="item.id"
          :testimonial="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TestimonialCard from "~/components/landing/TestimonialCard.vue";
import { websiteLandingTestimonials } from "~/data/websiteLanding";

const testimonials = websiteLandingTestimonials;
</script>

<style scoped>
.wl-testimonials {
  padding-block: clamp(3rem, 6vw, 5rem);
  background:
    linear-gradient(
      180deg,
      rgba(232, 238, 246, 0.55) 0%,
      rgba(243, 245, 248, 0) 100%
    );
}

.wl-testimonials__intro {
  max-width: 38rem;
  margin-bottom: clamp(1.75rem, 3.5vw, 2.5rem);
}

.wl-testimonials__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wl-testimonials__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.6vw, 2.55rem);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--color-text);
  text-wrap: balance;
}

.wl-testimonials__lead {
  margin: 0.85rem 0 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.wl-testimonials__grid {
  display: grid;
  gap: 1.15rem;
}

@media (min-width: 900px) {
  .wl-testimonials__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.35rem;
    align-items: stretch;
  }
}
</style>
