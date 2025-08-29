import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  nitro: {
    preset: "vercel"
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {}
    }
  },

  // App Head
  app: {
    head: {
      title: "Chris Leon Noltemeier",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "A modern portfolio website built with Nuxt.js and Tailwind CSS"
        },
        { name: "theme-color", content: "#000000" }
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/images/CN-transparent.png" }
      ]
    }
  },

  // Vercel-spezifische Konfiguration
  experimental: {
    payloadExtraction: false
  },

  // Build-Optimierungen
  build: {
    transpile: []
  }
});
