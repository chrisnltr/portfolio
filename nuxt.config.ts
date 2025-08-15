// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Ensure app router is used
  experimental: {
    appDir: true,
  },

  // CSS
  css: ["./assets/css/main.css"],

  // PostCSS
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },

  // App config
  app: {
    head: {
      title: "My Portfolio",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "A modern portfolio website built with Nuxt.js and Tailwind CSS",
        },
        { name: "theme-color", content: "#000000" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Build config
  build: {
    // No transpile needed for Tailwind CSS v4
  },
});
