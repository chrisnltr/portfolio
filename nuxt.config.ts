export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  modules: ["@nuxtjs/tailwindcss"],

  devtools: { enabled: false },

  runtimeConfig: {
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
