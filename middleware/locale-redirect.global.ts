/**
 * Permanent redirects from legacy /de and /en URLs to German root paths.
 * Works in Nuxt/Nitro (local + Vercel). Query strings are preserved by navigateTo.
 */
const exactMap: Record<string, string> = {
  "/de": "/",
  "/en": "/",
  "/de/": "/",
  "/en/": "/",
  "/de/impressum": "/impressum",
  "/en/imprint": "/impressum",
  "/de/datenschutz": "/datenschutz",
  "/en/privacy": "/datenschutz",
  "/de/lebenslauf": "/lebenslauf",
  "/en/resume": "/lebenslauf",
  "/de/danke": "/danke",
  "/en/thanks": "/danke",
  "/de/webseiten-pferdebetriebe": "/",
  "/en/websites-equestrian": "/",
  "/websites-fuer-pferdebetriebe": "/",
  "/webdesign-pferdebetriebe": "/",
};

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path.replace(/\/$/, "") || "/";
  const withSlash = to.path.endsWith("/") && to.path !== "/" ? to.path.slice(0, -1) : to.path;

  const exact = exactMap[path] || exactMap[withSlash] || exactMap[to.path];
  if (exact) {
    return navigateTo(
      { path: exact, query: to.query, hash: to.hash },
      { redirectCode: 301 },
    );
  }

  if (path.startsWith("/de/projekte/")) {
    const slug = path.slice("/de/projekte/".length);
    return navigateTo(
      { path: `/projekte/${slug}`, query: to.query, hash: to.hash },
      { redirectCode: 301 },
    );
  }

  if (path.startsWith("/en/projects/")) {
    const slug = path.slice("/en/projects/".length);
    return navigateTo(
      { path: `/projekte/${slug}`, query: to.query, hash: to.hash },
      { redirectCode: 301 },
    );
  }

  if (path.startsWith("/de/")) {
    const rest = path.slice(3) || "/";
    return navigateTo(
      { path: rest.startsWith("/") ? rest : `/${rest}`, query: to.query, hash: to.hash },
      { redirectCode: 301 },
    );
  }

  if (path.startsWith("/en/")) {
    return navigateTo(
      { path: "/", query: to.query, hash: to.hash },
      { redirectCode: 301 },
    );
  }
});
