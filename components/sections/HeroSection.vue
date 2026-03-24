<template>
  <section
    id="home"
    class="min-h-screen flex items-center justify-center animated-bg px-4"
  >
    <div class="container mx-auto text-center">
      <div class="animate-fade-in">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold animate-slide-up">
          <span
            class="gradient-text inline-block"
            style="
              font-weight: 600;
              background-size: 200% 200%;
              animation: gradientShift 3s ease-in-out infinite;
            "
          >
            {{ messages.hero.greeting }}
          </span>
          <span
            class="hero-name block mt-1 animate-slide-up cursor-pointer transition-all duration-500 ease-out hover:opacity-90"
            style="animation-delay: 0.15s"
          >
            {{ messages.hero.nameIntro }}
          </span>
        </h1>
        <h2
          class="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text mt-3 animate-slide-up"
          style="
            animation-delay: 0.3s;
            font-weight: 600;
            background-size: 200% 200%;
            animation: gradientShift 3s ease-in-out infinite;
          "
        >
          {{ messages.hero.roleHeadline }}
        </h2>
        <p
          class="text-lg md:text-xl lg:text-2xl text-text-secondary mt-4 mb-6 mx-auto animate-slide-up px-4 whitespace-nowrap"
          style="animation-delay: 0.45s"
        >
          {{ messages.hero.positioningLine }}
        </p>

        <div
          class="flex flex-col sm:flex-row items-center gap-3 justify-center mb-6 animate-slide-up"
          style="animation-delay: 0.55s"
        >
          <span
            class="inline-flex items-center gap-2 rounded-full border border-accent-600/60 bg-accent-600/10 px-3 py-1 text-xs md:text-sm text-accent-400"
          >
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{{ messages.hero.openToWorkBadge }}</span>
            <span class="hidden sm:inline text-text-secondary/80">
              · {{ messages.hero.locationLabel }}
            </span>
          </span>
        </div>

        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
          style="animation-delay: 0.65s"
        >
          <a
            :href="currentCvUrl"
            download
            class="btn-primary text-base md:text-lg px-8 py-3 group relative overflow-hidden inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="relative z-10">
              {{ messages.hero.downloadCv }}
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
            ></div>
          </a>

          <button
            type="button"
            class="btn-secondary text-base md:text-lg px-8 py-3 inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            @click="scrollToContact"
          >
            <span>{{ messages.hero.contactCta }}</span>
          </button>
        </div>

        <div
          class="mt-6 flex items-center justify-center gap-4 animate-slide-up"
          style="animation-delay: 0.75s"
        >
          <a
            v-for="link in profile.socialLinks"
            :key="link.id"
            :href="link.url"
            class="text-text-secondary hover:text-accent-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-full p-2"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="socialAriaLabel(link.type)"
          >
            <span v-if="link.type === 'github'" aria-hidden="true">
              <!-- Minimal GitHub icon -->
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.218.682-.486 0-.24-.01-1.038-.014-1.884-2.782.606-3.37-1.194-3.37-1.194-.454-1.155-1.11-1.463-1.11-1.463-.908-.622.069-.61.069-.61 1.004.071 1.532 1.037 1.532 1.037.892 1.53 2.341 1.088 2.91.832.091-.648.35-1.088.636-1.338-2.22-.253-4.555-1.115-4.555-4.962 0-1.096.39-1.993 1.029-2.694-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.029A9.45 9.45 0 0 1 12 6.844a9.43 9.43 0 0 1 2.504.337c1.909-1.3 2.748-1.029 2.748-1.029.546 1.378.203 2.397.1 2.65.64.701 1.028 1.598 1.028 2.694 0 3.857-2.339 4.706-4.566 4.955.359.31.678.923.678 1.861 0 1.344-.012 2.427-.012 2.756 0 .27.18.582.688.484A9.52 9.52 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"
                />
              </svg>
            </span>
            <span v-else-if="link.type === 'linkedin'" aria-hidden="true">
              <!-- Minimal LinkedIn icon -->
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.29H4.7V24H.22V8.29zM8.44 8.29h4.29v2.13h.06c.6-1.14 2.08-2.34 4.29-2.34 4.59 0 5.44 3.02 5.44 6.95V24h-4.48v-7.4c0-1.77-.03-4.05-2.47-4.05-2.47 0-2.85 1.93-2.85 3.93V24H8.44V8.29z"
                />
              </svg>
            </span>
            <span v-else aria-hidden="true">
              <!-- Minimal email icon -->
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  ry="2"
                ></rect>
                <polyline points="3 7 12 13 21 7"></polyline>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import { profile } from "~/data/profile";
import cvDownloadFile from "~/assets/css/Lebenslauf - Chris Leon Noltemeier.pdf?url";

const { locale, messages: rawMessages } = useI18n();

const messages = computed(() => rawMessages.value);

const currentCvUrl = computed(() => cvDownloadFile);

const scrollToContact = () => {
  if (typeof document === "undefined") return;
  const el = document.getElementById("contact");
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const socialAriaLabel = (type: "github" | "linkedin" | "email") => {
  const social = messages.value.social;
  if (type === "github") return social.githubLabel;
  if (type === "linkedin") return social.linkedinLabel;
  return social.emailLabel;
};
</script>

