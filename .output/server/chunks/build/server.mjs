import { hasInjectionContext, getCurrentInstance, createApp, provide, toRef, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, shallowReactive, reactive, effectScope, computed, defineComponent, h, isReadonly, isRef, isShallow, isReactive, toRaw, inject, defineAsyncComponent, mergeProps, getCurrentScope, ref, useSSRContext } from 'vue';
import { k as hasProtocol, l as isScriptProtocol, m as joinURL, w as withQuery, n as sanitizeStatusCode, o as getContext, $ as $fetch, p as createHooks, h as createError$1, q as isEqual, r as stringifyParsedURL, v as stringifyQuery, x as parseQuery, y as toRouteMatcher, z as createRouter, A as defu } from '../_/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.17.7";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.add(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance || (nuxtAppInstance = getNuxtAppCtx(id).tryUse());
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to || (to = "/");
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value || (error2.value = nuxtError);
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  const route = fullPath && typeof fullPath === "object" ? fullPath : {};
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = new URL(fullPath.toString(), "http://localhost");
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: route.params || {},
    name: void 0,
    matched: route.matched || [],
    redirectedFrom: void 0,
    meta: route.meta || {},
    href: fullPath
  };
}
const router_DclsWNDeVV7SyG4lslgLnjbQUK1ws8wgf2FHaAbo7Cw = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      "error": []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false) ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware || (nuxtApp._middleware = {
      global: [],
      named: {}
    });
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          {
            const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
            if (routeRules.appMiddleware) {
              for (const key in routeRules.appMiddleware) {
                const guard = nuxtApp._middleware.named[key];
                if (!guard) {
                  return;
                }
                if (routeRules.appMiddleware[key]) {
                  middlewareEntries.add(guard);
                } else {
                  middlewareEntries.delete(guard);
                }
              }
            }
          }
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  router_DclsWNDeVV7SyG4lslgLnjbQUK1ws8wgf2FHaAbo7Cw,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4
];
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const mousePosition = ref({ x: 0, y: 0 });
    ref(null);
    const isHoveringTarget = ref(false);
    const animateName = ref(false);
    const selectedProject = ref(0);
    const selectedImageIndex = ref(0);
    const imageModalOpen = ref(false);
    const showZoomIcon = ref(false);
    const mobileMenuOpen = ref(false);
    const projectData = ref([
      {
        title: "Accident Report App",
        description: "Digital accident documentation system built with Flutter, enabling users to create complete insurance-ready accident reports with photos, sketches, and map integration.",
        images: [
          "/images/UnfallApp1.png",
          "/images/UnfallApp2.png",
          "/images/UnfallApp3.png"
        ],
        features: [
          "Accident Report Creation: Collect all relevant insurance data in structured forms",
          "Interactive Accident Sketch: Draw accident scenarios on a Google Maps background",
          "Photo Upload: Attach accident images directly within the report",
          "PDF Export: Generate and share a standardized accident report PDF",
          "Multi-language Support: Automatic translations for international usability"
        ],
        technologies: [
          "Flutter",
          "Dart",
          "Google Maps API",
          "SQLite",
          "flutter_localizations",
          "flutter_gen"
        ],
        demoButton: "View Demo"
      },
      {
        title: "Billiard Battle 3D",
        description: "Online 3D billiards game built with Unity, featuring real-time 1v1 matches with friends, realistic physics, smooth cue controls, private rooms, and a clean, responsive UI.",
        images: [
          "/images/BilliardGame1.png",
          "/images/BilliardGame2.png",
          "/images/BilliardGame3.png",
          "/images/BilliardGame4.png",
          "/images/BilliardGame5.png"
        ],
        features: [
          "Online 1v1 Matches: Challenge friends via invite codes or quick join",
          "Realistic Physics: Accurate ball collisions, spin/English, cushions, and powerful breaks",
          "Cue Controls & Aiming: Aim line, spin selector, and variable shot power",
          "Private Rooms: Create and share room codes for frictionless friend matches",
          "Rules & Timers: Standard pool rules (8-Ball/9-Ball) with optional shot timer and fouls",
          "Custom Themes: Table/cue customization and AI-generated menu backgrounds"
        ],
        technologies: [
          "Unity",
          "C#",
          "Unity Input System",
          "Mirror Networking",
          "Steamworks"
        ]
      },
      {
        title: "Hardware Management",
        description: "Hardware management system with Nuxt 3 and Vue.js, featuring search, filter, Microsoft OAuth, CSV export, history tracking, and responsive UI.",
        images: [
          "/images/HardwareManager1.png",
          "/images/HardwareManager2.png",
          "/images/HardwareManager3.png"
        ],
        features: [
          "Hardware Data Sheet Management: Create, edit, delete hardware data sheets",
          "Advanced Search & Filtering: Multiple search criteria",
          "User Authentication: Login/logout with password hashing",
          "CSV Export: Complete export of all hardware data",
          "Hardware History: Track changes to hardware data sheets"
        ],
        technologies: [
          "Vue.js",
          "Nuxt 3",
          "Nuxt UI",
          "Tailwind CSS",
          "TypeScript",
          "Node.js",
          "Drizzle ORM",
          "PostgreSQL",
          "bcrypt",
          "Docker",
          "Terraform",
          "Cypress"
        ]
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "h-screen bg-background-primary overflow-hidden",
        style: { "scroll-snap-type": "y mandatory" }
      }, _attrs))} data-v-5caf6d3c><div class="particles" data-v-5caf6d3c><div class="particle" data-v-5caf6d3c></div><div class="particle" data-v-5caf6d3c></div><div class="particle" data-v-5caf6d3c></div><div class="particle" data-v-5caf6d3c></div><div class="particle" data-v-5caf6d3c></div><div class="particle" data-v-5caf6d3c></div><div class="particle" data-v-5caf6d3c></div><div class="particle" data-v-5caf6d3c></div><div class="particle" data-v-5caf6d3c></div></div><div class="${ssrRenderClass([
        isHoveringTarget.value ? "bg-blue-500/40 w-20 h-20" : "bg-blue-400/20 w-6 h-6",
        "fixed pointer-events-none z-[9999] rounded-full blur-xl transition-all duration-300 ease-out"
      ])}" style="${ssrRenderStyle({
        left: mousePosition.value.x + "px",
        top: mousePosition.value.y + "px",
        transform: "translate(-50%, -50%)",
        boxShadow: isHoveringTarget.value ? "0 0 40px 20px rgba(59, 130, 246, 0.5)" : "0 0 20px 10px rgba(96, 165, 250, 0.3)"
      })}" data-v-5caf6d3c></div><header class="fixed top-0 left-0 right-0 z-50 glass-header" data-v-5caf6d3c><div class="container mx-auto px-6 py-4" data-v-5caf6d3c><nav class="flex items-center justify-between" data-v-5caf6d3c><div class="text-2xl md:text-3xl font-bold gradient-text" data-v-5caf6d3c> My Portfolio </div><div class="hidden md:flex items-center space-x-10" data-v-5caf6d3c><a href="#home" class="link cursor-glow text-lg font-medium" data-v-5caf6d3c>Home</a><a href="#about" class="link cursor-glow text-lg font-medium" data-v-5caf6d3c>About</a><a href="#experience" class="link cursor-glow text-lg font-medium" data-v-5caf6d3c>Experience</a><a href="#projects" class="link cursor-glow text-lg font-medium" data-v-5caf6d3c>Projects</a><a href="#contact" class="link cursor-glow text-lg font-medium" data-v-5caf6d3c>Contact</a></div><button class="md:hidden btn-ghost" data-v-5caf6d3c><svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5caf6d3c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-5caf6d3c></path></svg></button></nav>`);
      if (mobileMenuOpen.value) {
        _push(`<div class="md:hidden mt-6 pb-6 border-t border-border-primary" data-v-5caf6d3c><div class="flex flex-col space-y-6 pt-6" data-v-5caf6d3c><a href="#home" class="link cursor-glow text-xl font-medium" data-v-5caf6d3c>Home</a><a href="#about" class="link cursor-glow text-xl font-medium" data-v-5caf6d3c>About</a><a href="#experience" class="link cursor-glow text-xl font-medium" data-v-5caf6d3c>Experience</a><a href="#projects" class="link cursor-glow text-xl font-medium" data-v-5caf6d3c>Projects</a><a href="#contact" class="link cursor-glow text-xl font-medium" data-v-5caf6d3c>Contact</a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><main class="pt-24 h-full" data-v-5caf6d3c><section id="home" class="h-screen flex items-center justify-center animated-bg px-4" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}" data-v-5caf6d3c><div class="container mx-auto text-center" data-v-5caf6d3c><div class="animate-fade-in" data-v-5caf6d3c><h1 class="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text animate-slide-up" style="${ssrRenderStyle({ "font-weight": "600", "background-size": "200% 200%", "animation": "gradientShift 3s ease-in-out infinite" })}" data-v-5caf6d3c> Hey, I&#39;m </h1><h1 class="text-4xl md:text-6xl lg:text-7xl font-bold" style="${ssrRenderStyle({ "font-weight": "600" })}" data-v-5caf6d3c><span class="text-text-primary hover:gradient-text transition-all duration-500 ease-out cursor-pointer animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-5caf6d3c><span class="${ssrRenderClass([animateName.value ? "animate-bounce" : ""])}" data-v-5caf6d3c> Chris Leon Noltemeier </span></span></h1><h1 class="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mt-2 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.4s", "font-weight": "600", "background-size": "200% 200%", "animation": "gradientShift 3s ease-in-out infinite" })}" data-v-5caf6d3c> Full-Stack Developer </h1><br data-v-5caf6d3c><p class="text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto animate-slide-up px-4" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}" data-v-5caf6d3c> I am passionate about learning new technologies and building efficient solutions </p></div></div></section><section id="about" class="h-screen modern-section flex items-center py-8" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}" data-v-5caf6d3c><div class="container mx-auto px-4" data-v-5caf6d3c><div class="max-w-6xl mx-auto" data-v-5caf6d3c><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 gradient-text animate-slide-up" data-v-5caf6d3c> About Me </h2><div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center" data-v-5caf6d3c><div class="space-y-4 md:space-y-6 animate-slide-left order-2 md:order-1" data-v-5caf6d3c><p class="text-lg text-text-secondary leading-relaxed" data-v-5caf6d3c> I’m Chris Leon Noltemeier, a full-stack developer passionate about creating efficient, user-friendly applications that solve real-world problems. I enjoy turning ideas into working products and bringing them all the way from concept to deployment. </p><p class="text-lg text-text-secondary leading-relaxed" data-v-5caf6d3c> My experience covers modern frontend frameworks, scalable backend systems, and cloud infrastructure. I focus on writing clean, maintainable code and building reliable solutions that can grow with future needs. </p><p class="text-lg text-text-secondary leading-relaxed" data-v-5caf6d3c> I’m always eager to learn new technologies, improve workflows through automation, and take on challenges across the full stack—from intuitive interfaces to optimized backend performance and cloud environments. </p></div><div class="scene animate-slide-right" data-v-5caf6d3c><div class="cube" data-v-5caf6d3c><div class="face front" data-v-5caf6d3c><div class="tech-content" data-v-5caf6d3c><h3 data-v-5caf6d3c>Frontend</h3><ul data-v-5caf6d3c><li data-v-5caf6d3c>Vue.js</li><li data-v-5caf6d3c>Nuxt.js</li><li data-v-5caf6d3c>TypeScript</li><li data-v-5caf6d3c>JavaScript</li><li data-v-5caf6d3c>HTML/CSS</li><li data-v-5caf6d3c>Tailwind CSS</li></ul></div></div><div class="face back" data-v-5caf6d3c><div class="tech-content" data-v-5caf6d3c><h3 data-v-5caf6d3c>Backend</h3><ul data-v-5caf6d3c><li data-v-5caf6d3c>Python</li><li data-v-5caf6d3c>FastAPI</li><li data-v-5caf6d3c>REST APIs</li></ul><br data-v-5caf6d3c><h3 data-v-5caf6d3c>Database</h3><ul data-v-5caf6d3c><li data-v-5caf6d3c>PostgreSQL</li><li data-v-5caf6d3c>SQLite</li></ul></div></div><div class="face left" data-v-5caf6d3c><div class="tech-content" data-v-5caf6d3c></div></div><div class="face right" data-v-5caf6d3c><div class="tech-content" data-v-5caf6d3c></div></div><div class="face top" data-v-5caf6d3c><div class="tech-content" data-v-5caf6d3c></div></div><div class="face bottom" data-v-5caf6d3c><div class="tech-content" data-v-5caf6d3c><h3 data-v-5caf6d3c>DevOps</h3><ul data-v-5caf6d3c><li data-v-5caf6d3c>Docker</li><li data-v-5caf6d3c>AWS</li><li data-v-5caf6d3c>Terraform</li><li data-v-5caf6d3c>CI/CD</li><li data-v-5caf6d3c>Git</li></ul></div></div></div></div></div></div></div></section><section id="experience" class="h-screen modern-section flex items-center py-8" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}" data-v-5caf6d3c><div class="container mx-auto px-4" data-v-5caf6d3c><div class="max-w-4xl mx-auto" data-v-5caf6d3c><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 gradient-text animate-slide-up" data-v-5caf6d3c> Experience &amp; Education </h2><div class="space-y-8" data-v-5caf6d3c><div class="card-elevated p-4 md:p-8" data-v-5caf6d3c><h3 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-text-primary" data-v-5caf6d3c> Work Experience </h3><div class="space-y-6" data-v-5caf6d3c><div class="border-l-4 border-accent-600 pl-6" data-v-5caf6d3c><div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2" data-v-5caf6d3c><h4 class="text-xl font-semibold text-text-primary" data-v-5caf6d3c> Software Developer </h4><span class="text-sm text-accent-400 font-medium" data-v-5caf6d3c> June 2025–Present </span></div><p class="text-lg text-accent-400 font-medium mb-1" data-v-5caf6d3c> Naue Group </p><p class="text-text-secondary" data-v-5caf6d3c>Full-time</p></div></div></div><div class="card-elevated p-4 md:p-8" data-v-5caf6d3c><h3 class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-text-primary" data-v-5caf6d3c> Education </h3><div class="space-y-6" data-v-5caf6d3c><div class="border-l-4 border-accent-600 pl-6" data-v-5caf6d3c><div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2" data-v-5caf6d3c><h4 class="text-xl font-semibold text-text-primary" data-v-5caf6d3c> IT Specialist Application Development </h4><span class="text-sm text-accent-400 font-medium" data-v-5caf6d3c> Aug. 2022–June 2025 </span></div><p class="text-lg text-accent-400 font-medium mb-1" data-v-5caf6d3c> Berufskolleg Lübbecke </p><p class="text-text-secondary" data-v-5caf6d3c>Apprenticeship</p></div><div class="border-l-4 border-accent-600 pl-6" data-v-5caf6d3c><div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2" data-v-5caf6d3c><h4 class="text-xl font-semibold text-text-primary" data-v-5caf6d3c> Technical College Certificate in Computer Science </h4><span class="text-sm text-accent-400 font-medium" data-v-5caf6d3c> Aug. 2020–July 2022 </span></div><p class="text-lg text-accent-400 font-medium mb-1" data-v-5caf6d3c> Berufskolleg Lübbecke </p><p class="text-text-secondary" data-v-5caf6d3c>High School Diploma</p></div></div></div></div></div></div></section><section id="projects" class="h-screen modern-section flex items-center py-8 transition-all duration-800 ease-out" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}" data-v-5caf6d3c><div class="container mx-auto px-4" data-v-5caf6d3c><div class="grid md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto min-h-[600px] md:min-h-[700px] items-start" data-v-5caf6d3c><div class="flex flex-col h-full justify-start" data-v-5caf6d3c><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text animate-slide-up text-center mb-6 md:mb-8 mt-28" data-v-5caf6d3c> My Projects </h2><div class="space-y-3 pr-2 md:pr-4 flex-1 flex flex-col justify-start" data-v-5caf6d3c><!--[-->`);
      ssrRenderList(projectData.value, (project, index) => {
        _push(`<div class="${ssrRenderClass([{
          "ring-2 ring-accent-400 bg-accent-600/10": selectedProject.value === index
        }, "card-elevated group hover:glow hover:scale-105 transition-all duration-300 cursor-pointer"])}" data-v-5caf6d3c><div class="flex gap-3 md:gap-4 p-3 md:p-4" data-v-5caf6d3c><div class="flex-shrink-0" data-v-5caf6d3c><div class="w-20 h-12 md:w-24 md:h-16 bg-background-tertiary rounded-lg overflow-hidden image-hover" data-v-5caf6d3c><img${ssrRenderAttr("src", project.images[0])}${ssrRenderAttr("alt", project.title + " Screenshot")} class="w-full h-full object-cover transition-transform duration-300" data-v-5caf6d3c></div></div><div class="flex-1 min-w-0" data-v-5caf6d3c><h3 class="text-base md:text-lg font-bold mb-2 text-text-primary truncate" data-v-5caf6d3c>${ssrInterpolate(project.title)}</h3><p class="text-text-secondary mb-3 text-xs md:text-sm line-clamp-2" data-v-5caf6d3c>${ssrInterpolate(project.description)}</p><div class="flex gap-1 flex-wrap" data-v-5caf6d3c><!--[-->`);
        ssrRenderList(project.technologies, (tech) => {
          _push(`<span class="tech-tag text-xs px-2 py-1" data-v-5caf6d3c>${ssrInterpolate(tech)}</span>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-background-secondary border border-border-primary rounded-xl p-4 md:p-6 h-full flex flex-col justify-start mt-8" data-v-5caf6d3c><div class="animate-fade-in flex flex-col justify-start h-full" data-v-5caf6d3c><div class="aspect-video bg-background-tertiary rounded-lg mb-4 overflow-hidden cursor-pointer relative flex-shrink-0" data-v-5caf6d3c><img${ssrRenderAttr(
        "src",
        (_a = projectData.value[selectedProject.value]) == null ? void 0 : _a.images[selectedImageIndex.value]
      )}${ssrRenderAttr("alt", ((_b = projectData.value[selectedProject.value]) == null ? void 0 : _b.title) + " Screenshot")} class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" data-v-5caf6d3c>`);
      if (((_c = projectData.value[selectedProject.value]) == null ? void 0 : _c.images.length) > 1) {
        _push(`<div class="absolute inset-0 flex items-center justify-between p-2 pointer-events-none" data-v-5caf6d3c><button class="${ssrRenderClass([{ "opacity-50": selectedImageIndex.value === 0 }, "bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-2 transition-all duration-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30"])}" data-v-5caf6d3c><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5caf6d3c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-5caf6d3c></path></svg></button><button class="${ssrRenderClass([{
          "opacity-50": selectedImageIndex.value === ((_d = projectData.value[selectedProject.value]) == null ? void 0 : _d.images.length) - 1
        }, "bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-2 transition-all duration-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30"])}" data-v-5caf6d3c><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5caf6d3c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-5caf6d3c></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_e = projectData.value[selectedProject.value]) == null ? void 0 : _e.images.length) > 1) {
        _push(`<div class="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none" data-v-5caf6d3c>${ssrInterpolate(selectedImageIndex.value + 1)} / ${ssrInterpolate((_f = projectData.value[selectedProject.value]) == null ? void 0 : _f.images.length)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showZoomIcon.value) {
        _push(`<div class="absolute inset-0 bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none" data-v-5caf6d3c><svg class="w-8 h-8 text-white transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5caf6d3c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" data-v-5caf6d3c></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h2 class="text-xl md:text-2xl font-bold text-text-primary mb-3 flex-shrink-0" data-v-5caf6d3c>${ssrInterpolate((_g = projectData.value[selectedProject.value]) == null ? void 0 : _g.title)}</h2><p class="text-text-secondary mb-4 text-sm md:text-base flex-shrink-0 line-clamp-2" data-v-5caf6d3c>${ssrInterpolate((_h = projectData.value[selectedProject.value]) == null ? void 0 : _h.description)}</p><div class="mb-4 flex-1 min-h-0 overflow-y-auto" data-v-5caf6d3c><h3 class="text-base md:text-lg font-semibold text-text-primary mb-2" data-v-5caf6d3c> Features </h3><ul class="text-text-secondary space-y-1 text-xs md:text-sm" data-v-5caf6d3c><!--[-->`);
      ssrRenderList((_i = projectData.value[selectedProject.value]) == null ? void 0 : _i.features, (feature) => {
        _push(`<li class="flex items-start" data-v-5caf6d3c><span class="text-accent-400 mr-2 mt-1" data-v-5caf6d3c>•</span><span data-v-5caf6d3c>${ssrInterpolate(feature)}</span></li>`);
      });
      _push(`<!--]--></ul></div><div class="mb-4 flex-shrink-0" data-v-5caf6d3c><h3 class="text-base md:text-lg font-semibold text-text-primary mb-2" data-v-5caf6d3c> Technologies </h3><div class="flex flex-wrap gap-1 md:gap-2" data-v-5caf6d3c><!--[-->`);
      ssrRenderList((_j = projectData.value[selectedProject.value]) == null ? void 0 : _j.technologies, (tech) => {
        _push(`<span class="px-2 md:px-3 py-1 bg-accent-600/20 text-accent-400 rounded-full text-xs md:text-sm" data-v-5caf6d3c>${ssrInterpolate(tech)}</span>`);
      });
      _push(`<!--]--></div></div></div></div></div></div></section><section id="contact" class="h-screen modern-section flex flex-col justify-center py-8" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}" data-v-5caf6d3c><div class="container mx-auto px-4 flex-1 flex items-center" data-v-5caf6d3c><div class="max-w-2xl mx-auto text-center" data-v-5caf6d3c><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 gradient-text animate-slide-up" data-v-5caf6d3c> Get In Touch </h2><p class="text-base md:text-lg text-text-secondary mb-6 md:mb-8 px-4" data-v-5caf6d3c> I&#39;m always interested in new opportunities and exciting projects. Let&#39;s work together to bring your ideas to life! </p><div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4" data-v-5caf6d3c><button class="btn-primary text-base md:text-lg px-6 md:px-8 py-3 group relative overflow-hidden" data-v-5caf6d3c><span class="relative z-10" data-v-5caf6d3c>Send Message</span><div class="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" data-v-5caf6d3c></div></button><button class="btn-secondary text-base md:text-lg px-6 md:px-8 py-3" data-v-5caf6d3c> View Resume </button></div></div></div></section></main>`);
      if (imageModalOpen.value) {
        _push(`<div class="fixed inset-0 z-[99999] flex items-center justify-center p-4" data-v-5caf6d3c><div class="absolute inset-0 bg-black/90 backdrop-blur-sm" data-v-5caf6d3c></div><div class="relative max-w-[95vw] max-h-[95vh] animate-fade-in" data-v-5caf6d3c><button class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10" data-v-5caf6d3c><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5caf6d3c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-5caf6d3c></path></svg></button>`);
        if (((_k = projectData.value[selectedProject.value]) == null ? void 0 : _k.images.length) > 1) {
          _push(`<div class="absolute inset-0 flex items-center justify-between p-4 pointer-events-none" data-v-5caf6d3c><button class="${ssrRenderClass([{ "opacity-50": selectedImageIndex.value === 0 }, "bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-3 transition-all duration-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30"])}" data-v-5caf6d3c><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5caf6d3c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-5caf6d3c></path></svg></button><button class="${ssrRenderClass([{
            "opacity-50": selectedImageIndex.value === ((_l = projectData.value[selectedProject.value]) == null ? void 0 : _l.images.length) - 1
          }, "bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-3 transition-all duration-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30"])}" data-v-5caf6d3c><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5caf6d3c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-5caf6d3c></path></svg></button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (((_m = projectData.value[selectedProject.value]) == null ? void 0 : _m.images.length) > 1) {
          _push(`<div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full pointer-events-none" data-v-5caf6d3c>${ssrInterpolate(selectedImageIndex.value + 1)} / ${ssrInterpolate((_n = projectData.value[selectedProject.value]) == null ? void 0 : _n.images.length)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<img${ssrRenderAttr("src", (_o = projectData.value[selectedProject.value]) == null ? void 0 : _o.images[selectedImageIndex.value])}${ssrRenderAttr("alt", ((_p = projectData.value[selectedProject.value]) == null ? void 0 : _p.title) + " Screenshot")} class="w-full h-full object-contain rounded-lg shadow-2xl" data-v-5caf6d3c></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5caf6d3c"]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-BNwv3EHQ.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-1Qd1vrCO.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    var _a;
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      (_a = nuxt.payload).error || (_a.error = createError(error));
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { _export_sfc as _, useNuxtApp as a, useRuntimeConfig as b, nuxtLinkDefaults as c, entry$1 as default, navigateTo as n, resolveRouteObject as r, tryUseNuxtApp as t, useRouter as u };
//# sourceMappingURL=server.mjs.map
