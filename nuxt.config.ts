import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

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
      title: "Chris Leon Noltemeier",
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
      link: [
        { rel: "icon", type: "image/png", href: "/images/CN-transparent.png" },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/images/CN-transparent.png",
        },
        {
          rel: "shortcut icon",
          type: "image/png",
          href: "/images/CN-transparent.png",
        },
      ],
    },
  },

  // Build config
  build: {
    // No transpile needed for Tailwind CSS v4
  },


});
