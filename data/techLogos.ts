export type TechLogoItem = {
  src: string;
  label: string;
  alt?: string;
  brandColor?: string;
};

/** Technologies referenced in profile, experience, and project content. */
export const techLogoItems: TechLogoItem[] = [
  {
    src: "/images/logos/typescript.svg",
    label: "TypeScript",
    alt: "TypeScript",
    brandColor: "#3178C6",
  },
  {
    src: "/images/logos/vue.svg",
    label: "Vue.js",
    alt: "Vue.js",
    brandColor: "#4FC08D",
  },
  {
    src: "/images/logos/nuxt.svg",
    label: "Nuxt",
    alt: "Nuxt",
    brandColor: "#00DC82",
  },
  {
    src: "/images/logos/nodejs.svg",
    label: "Node.js",
    alt: "Node.js",
    brandColor: "#339933",
  },
  {
    src: "/images/logos/postgresql.svg",
    label: "PostgreSQL",
    alt: "PostgreSQL",
    brandColor: "#4169E1",
  },
  {
    src: "/images/logos/shopify.svg",
    label: "Shopify",
    alt: "Shopify",
    brandColor: "#7AB55C",
  },
];
