export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  modules: ["@nuxtjs/tailwindcss", "@vercel/analytics/nuxt"],

  devtools: { enabled: false },

  runtimeConfig: {
    // TODO: Set in Vercel (or .env): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL; optional FORMSPREE_ENDPOINT for fallback.
    resendApiKey: "",
    contactToEmail: "",
    contactFromEmail: "",
    formspreeEndpoint: "",
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "",
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
