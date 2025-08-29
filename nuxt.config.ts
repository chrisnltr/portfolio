import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },

  nitro: {
    preset: "vercel",
    externals: {
      inline: [
        "vue-bundle-renderer",
        "vue",
        "vue/server-renderer"
      ]
    }
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
        // stelle sicher, dass die Datei unter /public/images/CN-transparent.png liegt
        { rel: "icon", type: "image/png", href: "/images/CN-transparent.png" },
        { rel: "apple-touch-icon", type: "image/png", href: "/images/CN-transparent.png" },
        { rel: "shortcut icon", type: "image/png", href: "/images/CN-transparent.png" }
      ]
    }
  },

  build: {
    // keine Transpiles nötig für Tailwind v4
  }
});
