<template>
  <article
    class="testimonial-card"
    :class="{ 'testimonial-card--draft': testimonial.isDraft }"
    :aria-label="
      testimonial.isDraft
        ? `Kundenstimme noch einholen: ${testimonial.draft.title}`
        : `Kundenstimme von ${testimonial.customerName}`
    "
  >
    <template v-if="testimonial.isDraft">
      <p class="testimonial-card__badge">{{ testimonial.draft.badge }}</p>
      <h3 class="testimonial-card__title">{{ testimonial.draft.title }}</h3>
      <p class="testimonial-card__brief">{{ testimonial.draft.brief }}</p>
      <div class="testimonial-card__needed">
        <p class="testimonial-card__needed-label">Zusätzlich benötigte Daten</p>
        <ul>
          <li v-for="item in testimonial.draft.needed" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <p class="testimonial-card__image-hint">{{ testimonial.draft.imageHint }}</p>
    </template>

    <template v-else>
      <p class="testimonial-card__mark" aria-hidden="true">“</p>
      <blockquote class="testimonial-card__quote">
        <p>{{ testimonial.quote }}</p>
      </blockquote>
      <div class="testimonial-card__footer">
        <div
          v-if="testimonial.image || testimonial.logo"
          class="testimonial-card__avatar"
        >
          <img
            v-if="testimonial.image"
            :src="testimonial.image"
            :alt="`Foto von ${testimonial.customerName}`"
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
          />
          <img
            v-else-if="testimonial.logo"
            :src="testimonial.logo"
            :alt="`Logo ${testimonial.company}`"
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div
          v-else
          class="testimonial-card__initials"
          aria-hidden="true"
        >
          {{ initials }}
        </div>
        <div class="testimonial-card__meta">
          <p class="testimonial-card__name">{{ testimonial.customerName }}</p>
          <p class="testimonial-card__role">
            {{ testimonial.role }}
            <span v-if="testimonial.company"> · {{ testimonial.company }}</span>
          </p>
          <p class="testimonial-card__project">{{ testimonial.projectType }}</p>
        </div>
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { LandingTestimonial } from "~/data/websiteLanding";

const props = defineProps<{
  testimonial: LandingTestimonial;
}>();

const initials = computed(() => {
  const name = props.testimonial.customerName.trim();
  if (!name) return "CLN";
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
});
</script>

<style scoped>
.testimonial-card {
  display: grid;
  gap: 0.85rem;
  height: 100%;
  padding: clamp(1.25rem, 2.5vw, 1.7rem);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  box-shadow: 0 8px 24px rgba(18, 26, 38, 0.05);
}

.testimonial-card--draft {
  --vp-pink: #ff2db8;
  --vp-pink-deep: #d1008a;
  --vp-ink: #3b0030;
  border: 2px dashed var(--vp-pink-deep);
  background:
    repeating-linear-gradient(
      -45deg,
      rgba(255, 45, 184, 0.14) 0 10px,
      rgba(255, 45, 184, 0.24) 10px 20px
    ),
    linear-gradient(160deg, #ff6ad5 0%, var(--vp-pink) 55%, #ff1493 100%);
  color: var(--vp-ink);
  box-shadow: 0 8px 22px rgba(209, 0, 138, 0.16);
}

.testimonial-card__badge {
  margin: 0;
  display: inline-flex;
  align-self: start;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(59, 0, 48, 0.18);
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-pink-deep);
}

.testimonial-card__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.testimonial-card__brief,
.testimonial-card__image-hint {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
  color: rgba(59, 0, 48, 0.82);
}

.testimonial-card__needed {
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  border: 1.5px dashed rgba(59, 0, 48, 0.3);
  background: rgba(255, 255, 255, 0.55);
}

.testimonial-card__needed-label {
  margin: 0 0 0.4rem;
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--vp-pink-deep);
}

.testimonial-card__needed ul {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.25rem;
  font-size: 0.88rem;
  line-height: 1.4;
}

.testimonial-card__mark {
  margin: 0;
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 0.7;
  color: rgba(47, 102, 255, 0.28);
}

.testimonial-card__quote {
  margin: 0;
}

.testimonial-card__quote p {
  margin: 0;
  font-size: clamp(1.05rem, 1.8vw, 1.2rem);
  line-height: 1.5;
  letter-spacing: -0.015em;
  color: var(--color-text);
}

.testimonial-card__footer {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.85rem;
  align-items: center;
  margin-top: 0.35rem;
  padding-top: 0.95rem;
  border-top: 1px solid var(--color-border);
}

.testimonial-card__avatar,
.testimonial-card__initials {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--color-border-strong);
  background: var(--color-accent-surface);
}

.testimonial-card__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-card__initials {
  display: grid;
  place-items: center;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-accent);
}

.testimonial-card__name {
  margin: 0;
  font-weight: 700;
  color: var(--color-text);
}

.testimonial-card__role,
.testimonial-card__project {
  margin: 0.15rem 0 0;
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.testimonial-card__project {
  font-weight: 550;
  color: var(--color-accent);
}
</style>
