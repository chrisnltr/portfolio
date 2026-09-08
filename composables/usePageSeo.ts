export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative path to social preview image */
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: "website" | "article" | "profile";
  robots?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

function toAbsolute(origin: string, pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${origin}${path}`;
}

/**
 * Applies canonical, Open Graph and optional JSON-LD for the German-only site.
 */
export function usePageSeo(input: MaybeRefOrGetter<PageSeoInput>) {
  const requestURL = useRequestURL();
  const config = useRuntimeConfig();

  const resolved = computed(() => toValue(input));

  const origin = computed(() => {
    const configured = (config.public.siteUrl as string | undefined)?.replace(
      /\/$/,
      "",
    );
    return configured || requestURL.origin;
  });

  const canonical = computed(() =>
    toAbsolute(origin.value, resolved.value.path),
  );

  const ogImage = computed(() => {
    const img = resolved.value.ogImage || "/og-default.png";
    return toAbsolute(origin.value, img);
  });

  useHead(() => {
    const seo = resolved.value;
    const scripts = seo.jsonLd
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify(
              Array.isArray(seo.jsonLd) ? seo.jsonLd : seo.jsonLd,
            ),
          },
        ]
      : [];

    return {
      htmlAttrs: { lang: "de" },
      link: [{ rel: "canonical", href: canonical.value }],
      script: scripts,
    };
  });

  useSeoMeta({
    title: () => resolved.value.title,
    description: () => resolved.value.description,
    ogTitle: () => resolved.value.title,
    ogDescription: () => resolved.value.description,
    ogType: () => resolved.value.ogType || "website",
    ogUrl: () => canonical.value,
    ogImage: () => ogImage.value,
    ogImageAlt: () => resolved.value.ogImageAlt || resolved.value.title,
    ogImageWidth: () => resolved.value.ogImageWidth || 1200,
    ogImageHeight: () => resolved.value.ogImageHeight || 630,
    ogLocale: "de_DE",
    twitterCard: "summary_large_image",
    twitterTitle: () => resolved.value.title,
    twitterDescription: () => resolved.value.description,
    twitterImage: () => ogImage.value,
    robots: () => resolved.value.robots,
  });

  return { canonical, ogImage, origin };
}
