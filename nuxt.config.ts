export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  // Vercel Analytics is loaded only after statistics consent (see useConsent).
  modules: ["@nuxtjs/tailwindcss"],

  devtools: { enabled: false },

  runtimeConfig: {
    // Private (server-only). Set in Vercel / .env.local — never expose to the client.
    resendApiKey: process.env.RESEND_API_KEY || "",
    contactToEmail: process.env.CONTACT_TO_EMAIL || "",
    contactFromEmail: process.env.CONTACT_FROM_EMAIL || "",
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || "",
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "",
      // Prefer Nuxt public naming; NEXT_PUBLIC_* also accepted for familiarity.
      turnstileSiteKey:
        process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY ||
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
        "",
    },
  },

  css: ["~/assets/css/main.css"],

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
