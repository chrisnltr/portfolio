export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  // Vercel Analytics is loaded only after statistics consent (see useConsent).
  modules: ["@nuxtjs/tailwindcss"],

  devtools: { enabled: false },

  runtimeConfig: {
    // Private (server-only). Set in Vercel / .env.local - never expose to the client.
    resendApiKey: process.env.RESEND_API_KEY || "",
    contactToEmail: process.env.CONTACT_TO_EMAIL || "",
    contactFromEmail: process.env.CONTACT_FROM_EMAIL || "",
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || "",
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "",
      // Prefer Nuxt public naming; NEXT_PUBLIC_* / VITE_* also accepted for familiarity.
      turnstileSiteKey:
        process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY ||
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
        "",
      // Optional analytics / ads — empty = no external scripts loaded.
      gaMeasurementId:
        process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID ||
        process.env.VITE_GA_MEASUREMENT_ID ||
        "",
      googleAdsId:
        process.env.NUXT_PUBLIC_GOOGLE_ADS_ID ||
        process.env.VITE_GOOGLE_ADS_ID ||
        "",
      googleAdsConversionLabel:
        process.env.NUXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ||
        process.env.VITE_GOOGLE_ADS_CONVERSION_LABEL ||
        "",
      metaPixelId:
        process.env.NUXT_PUBLIC_META_PIXEL_ID ||
        process.env.VITE_META_PIXEL_ID ||
        "",
    },
  },

  css: [
    "@fontsource-variable/manrope/index.css",
    "@fontsource-variable/inter/wght.css",
    "~/assets/css/main.css",
  ],

  tailwindcss: {
    configPath: "tailwind.config.cjs",
    viewer: false,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
