import { getCurrentInstance, toRef, isRef, inject, reactive, effectScope, ref, markRaw, unref, computed, defineComponent, h as h$1, resolveComponent, onServerPrefetch, watch, isReactive, toRaw, getCurrentScope, onScopeDispose, toRefs, nextTick, defineAsyncComponent, version, Suspense, Transition, provide, mergeProps, withCtx, createVNode, shallowRef, useSSRContext, createApp, onErrorCaptured } from 'vue';
import { $fetch as $fetch$1 } from 'ofetch';
import { hash } from 'ohash';
import { createError, sendRedirect } from 'h3';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { hasProtocol, parseURL, joinURL, encodeParam, encodePath, isEqual, withLeadingSlash } from 'ufo';
import { createHead, useHead } from '@unhead/vue';
import { renderDOMHead, debouncedRenderDOMHead } from '@unhead/dom';
import { useRoute, RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { defu } from 'defu';
import Be$1 from 'store';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSuspense } from 'vue/server-renderer';
import { a as useRuntimeConfig } from '../nitro/node-server.mjs';

const k$1 = getContext("nuxt-app");
function D$1(e2) {
  let o2 = 0;
  const n2 = { provide: void 0, globalName: "nuxt", payload: reactive({ data: {}, state: {}, _errors: {}, serverRendered: true }), static: { data: {} }, isHydrating: false, deferHydration() {
    if (!n2.isHydrating)
      return () => {
      };
    o2++;
    let e3 = false;
    return () => {
      if (!e3)
        return e3 = true, o2--, 0 === o2 ? (n2.isHydrating = false, n2.callHook("app:suspense:resolve")) : void 0;
    };
  }, _asyncDataPromises: {}, _asyncData: {}, ...e2 };
  n2.hooks = createHooks(), n2.hook = n2.hooks.hook, n2.callHook = n2.hooks.callHook, n2.provide = (e3, t2) => {
    const o3 = "$" + e3;
    q(n2, o3, t2), q(n2.vueApp.config.globalProperties, o3, t2);
  }, q(n2.vueApp, "$nuxt", n2), q(n2.vueApp.config.globalProperties, "$nuxt", n2), n2.ssrContext && (n2.ssrContext.nuxt = n2), n2.ssrContext = n2.ssrContext || {}, n2.ssrContext.payload && Object.assign(n2.payload, n2.ssrContext.payload), n2.ssrContext.payload = n2.payload, n2.payload.config = { public: e2.ssrContext.runtimeConfig.public, app: e2.ssrContext.runtimeConfig.app };
  const r2 = e2.ssrContext.runtimeConfig, a2 = new Proxy(r2, { get(e3, t2) {
    var o3;
    return "public" === t2 ? e3.public : null != (o3 = e3[t2]) ? o3 : e3.public[t2];
  }, set: (e3, t2, o3) => false });
  return n2.provide("config", a2), n2;
}
async function I$1(e2, t2) {
  if ("function" != typeof t2)
    return;
  const { provide: o2 } = await T$1(e2, t2, [e2]) || {};
  if (o2 && "object" == typeof o2)
    for (const n2 in o2)
      e2.provide(n2, o2[n2]);
}
async function V(e2, t2) {
  for (const o2 of t2)
    await I$1(e2, o2);
}
function j$1(e2) {
  return e2.map((e3) => "function" != typeof e3 ? null : e3.length > 1 ? (t2) => e3(t2, t2.provide) : e3).filter(Boolean);
}
function A$1(e2) {
  return e2.__nuxt_plugin = true, e2;
}
function T$1(e2, t2, o2) {
  const n2 = () => o2 ? t2(...o2) : t2();
  return k$1.callAsync(e2, n2);
}
function U$1() {
  const t2 = k$1.tryUse();
  if (!t2) {
    const t3 = getCurrentInstance();
    if (!t3)
      throw new Error("nuxt instance unavailable");
    return t3.appContext.app.$nuxt;
  }
  return t2;
}
function R$1() {
  return U$1().$config;
}
function q(e2, t2, o2) {
  Object.defineProperty(e2, t2, { get: () => o2 });
}
const L = () => toRef(U$1().payload, "error"), H$1 = (e2) => {
  const t2 = F(e2);
  try {
    U$1().callHook("app:error", t2);
    const e3 = L();
    e3.value = e3.value || t2;
  } catch {
    throw t2;
  }
  return t2;
}, F = (e2) => {
  const t2 = createError(e2);
  return t2.__nuxt_error = true, t2;
}, z$1 = () => null;
function B(...e2) {
  var t2, o2, s2, i2, c2, l2, u2;
  const p2 = "string" == typeof e2[e2.length - 1] ? e2.pop() : void 0;
  "string" != typeof e2[0] && e2.unshift(p2);
  let [d2, f2, y2 = {}] = e2;
  if ("string" != typeof d2)
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  if ("function" != typeof f2)
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  y2.server = null == (t2 = y2.server) || t2, y2.default = null != (o2 = y2.default) ? o2 : z$1, y2.lazy = null != (s2 = y2.lazy) && s2, y2.immediate = null == (i2 = y2.immediate) || i2;
  const v2 = U$1(), h2 = () => v2.isHydrating ? v2.payload.data[d2] : v2.static.data[d2], g2 = () => void 0 !== h2();
  v2._asyncData[d2] || (v2._asyncData[d2] = { data: ref(null != (u2 = null != (l2 = h2()) ? l2 : null == (c2 = y2.default) ? void 0 : c2.call(y2)) ? u2 : null), pending: ref(!g2()), error: ref(v2.payload._errors[d2] ? F(v2.payload._errors[d2]) : null) });
  const m2 = { ...v2._asyncData[d2] };
  m2.refresh = m2.execute = (e3 = {}) => {
    if (v2._asyncDataPromises[d2]) {
      if (false === e3.dedupe)
        return v2._asyncDataPromises[d2];
      v2._asyncDataPromises[d2].cancelled = true;
    }
    if (e3._initial && g2())
      return h2();
    m2.pending.value = true;
    const t3 = new Promise((e4, t4) => {
      try {
        e4(f2(v2));
      } catch (o3) {
        t4(o3);
      }
    }).then((e4) => {
      if (t3.cancelled)
        return v2._asyncDataPromises[d2];
      y2.transform && (e4 = y2.transform(e4)), y2.pick && (e4 = function(e5, t4) {
        const o3 = {};
        for (const n2 of t4)
          o3[n2] = e5[n2];
        return o3;
      }(e4, y2.pick)), m2.data.value = e4, m2.error.value = null;
    }).catch((e4) => {
      var o3, n2;
      if (t3.cancelled)
        return v2._asyncDataPromises[d2];
      m2.error.value = e4, m2.data.value = unref(null != (n2 = null == (o3 = y2.default) ? void 0 : o3.call(y2)) ? n2 : null);
    }).finally(() => {
      t3.cancelled || (m2.pending.value = false, v2.payload.data[d2] = m2.data.value, m2.error.value && (v2.payload._errors[d2] = F(m2.error.value)), delete v2._asyncDataPromises[d2]);
    });
    return v2._asyncDataPromises[d2] = t3, v2._asyncDataPromises[d2];
  };
  if (false !== y2.server && v2.payload.serverRendered && y2.immediate) {
    const e3 = m2.refresh({ _initial: true });
    onServerPrefetch(() => e3);
  }
  const _2 = Promise.resolve(v2._asyncDataPromises[d2]).then(() => m2);
  return Object.assign(_2, m2), _2;
}
function J(...e2) {
  const t2 = "string" == typeof e2[e2.length - 1] ? e2.pop() : void 0;
  "string" != typeof e2[0] && e2.unshift(t2);
  const [n2, r2] = e2;
  if (!n2 || "string" != typeof n2)
    throw new TypeError("[nuxt] [useState] key must be a string: " + n2);
  if (void 0 !== r2 && "function" != typeof r2)
    throw new Error("[nuxt] [useState] init must be a function: " + r2);
  const a2 = "$s" + n2, i2 = U$1(), c2 = toRef(i2.payload.state, a2);
  if (void 0 === c2.value && r2) {
    const e3 = r2();
    if (isRef(e3))
      return i2.payload.state[a2] = e3, e3;
    c2.value = e3;
  }
  return c2;
}
const M$1 = () => {
  var e2;
  return null == (e2 = U$1()) ? void 0 : e2.$router;
}, Y = () => getCurrentInstance() ? inject("_route", U$1()._route) : U$1()._route, G = (e2) => e2, W = (e2, t2) => {
  e2 || (e2 = "/");
  const o2 = "string" == typeof e2 ? e2 : e2.path || "/", n2 = hasProtocol(o2, true);
  if (n2 && !(null == t2 ? void 0 : t2.external))
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  if (n2 && "script:" === parseURL(o2).protocol)
    throw new Error("Cannot navigate to an URL with script protocol.");
  const r2 = M$1();
  {
    const a2 = U$1();
    if (a2.ssrContext && a2.ssrContext.event) {
      const s2 = n2 ? o2 : joinURL(R$1().app.baseURL, r2.resolve(e2).fullPath || "/");
      return a2.callHook("app:redirected").then(() => sendRedirect(a2.ssrContext.event, s2, (null == t2 ? void 0 : t2.redirectCode) || 302));
    }
  }
  return n2 ? ((null == t2 ? void 0 : t2.replace) ? location.replace(o2) : location.href = o2, Promise.resolve()) : (null == t2 ? void 0 : t2.replace) ? r2.replace(e2) : r2.push(e2);
};
function K(e2, t2) {
  return U$1()._useHead(e2, t2);
}
function Q(e2, o2, n2) {
  const [r2 = {}, s2] = "string" == typeof o2 ? [{}, o2] : [o2, n2], i2 = r2.key || hash([s2, unref(r2.baseURL), "string" == typeof e2 ? e2 : "", unref(r2.params)]);
  if (!i2 || "string" != typeof i2)
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + i2);
  if (!e2)
    throw new Error("[nuxt] [useFetch] request is missing.");
  const l2 = i2 === s2 ? "$f" + i2 : i2, u2 = computed(() => {
    let t2 = e2;
    return "function" == typeof t2 && (t2 = t2()), unref(t2);
  }), { server: p2, lazy: d2, default: f2, transform: y2, pick: v2, watch: h2, immediate: g2, ...m2 } = r2, _2 = reactive({ ...m2, cache: "boolean" == typeof r2.cache ? void 0 : r2.cache });
  let b2;
  return B(l2, () => {
    var e3;
    return null == (e3 = null == b2 ? void 0 : b2.abort) || e3.call(b2), b2 = "undefined" != typeof AbortController ? new AbortController() : {}, $fetch(u2.value, { signal: b2.signal, ..._2 });
  }, { server: p2, lazy: d2, default: f2, transform: y2, pick: v2, immediate: g2, watch: [_2, u2, ...h2 || []] });
}
function X(e2 = U$1()) {
  var t2;
  return null == (t2 = e2.ssrContext) ? void 0 : t2.event;
}
function Z(e2) {
  const t2 = e2.componentName || "NuxtLink";
  return defineComponent({ name: t2, props: { to: { type: [String, Object], default: void 0, required: false }, href: { type: [String, Object], default: void 0, required: false }, target: { type: String, default: void 0, required: false }, rel: { type: String, default: void 0, required: false }, noRel: { type: Boolean, default: void 0, required: false }, prefetch: { type: Boolean, default: void 0, required: false }, noPrefetch: { type: Boolean, default: void 0, required: false }, activeClass: { type: String, default: void 0, required: false }, exactActiveClass: { type: String, default: void 0, required: false }, prefetchedClass: { type: String, default: void 0, required: false }, replace: { type: Boolean, default: void 0, required: false }, ariaCurrentValue: { type: String, default: void 0, required: false }, external: { type: Boolean, default: void 0, required: false }, custom: { type: Boolean, default: void 0, required: false } }, setup(t3, { slots: o2 }) {
    const r2 = M$1(), a2 = computed(() => t3.to || t3.href || ""), s2 = computed(() => !!t3.external || (!(!t3.target || "_self" === t3.target) || "object" != typeof a2.value && ("" === a2.value || hasProtocol(a2.value, true)))), i2 = ref(false);
    return () => {
      var n2, c2, l2;
      if (!s2.value)
        return h$1(resolveComponent("RouterLink"), { ref: void 0, to: a2.value, ...i2.value && !t3.custom ? { class: t3.prefetchedClass || e2.prefetchedClass } : {}, activeClass: t3.activeClass || e2.activeClass, exactActiveClass: t3.exactActiveClass || e2.exactActiveClass, replace: t3.replace, ariaCurrentValue: t3.ariaCurrentValue, custom: t3.custom }, o2.default);
      const d2 = "object" == typeof a2.value ? null != (c2 = null == (n2 = r2.resolve(a2.value)) ? void 0 : n2.href) ? c2 : null : a2.value || null, f2 = t3.target || null, y2 = t3.noRel ? null : ((...e3) => e3.find((e4) => void 0 !== e4))(t3.rel, e2.externalRelAttribute, d2 ? "noopener noreferrer" : "") || null, v2 = () => W(d2, { replace: t3.replace });
      return t3.custom ? o2.default ? o2.default({ href: d2, navigate: v2, route: r2.resolve(d2), rel: y2, target: f2, isExternal: s2.value, isActive: false, isExactActive: false }) : null : h$1("a", { ref: void 0, href: d2, rel: y2, target: f2 }, null == (l2 = o2.default) ? void 0 : l2.call(o2));
    };
  } });
}
const ee = Z({ componentName: "NuxtLink" }), te = Object.freeze(Object.defineProperty({ __proto__: null, defineNuxtLink: Z, default: ee }, Symbol.toStringTag, { value: "Module" }));
function oe(e2) {
  return null !== e2 && "object" == typeof e2;
}
function ne(e2, t2, o2 = ".", n2) {
  if (!oe(t2))
    return ne(e2, {}, o2, n2);
  const r2 = Object.assign({}, t2);
  for (const a2 in e2) {
    if ("__proto__" === a2 || "constructor" === a2)
      continue;
    const t3 = e2[a2];
    null != t3 && (n2 && n2(r2, a2, t3, o2) || (Array.isArray(t3) && Array.isArray(r2[a2]) ? r2[a2] = [...t3, ...r2[a2]] : oe(t3) && oe(r2[a2]) ? r2[a2] = ne(t3, r2[a2], (o2 ? `${o2}.` : "") + a2.toString(), n2) : r2[a2] = t3));
  }
  return r2;
}
var re;
const ae = (re = (e2, t2, o2, n2) => {
  if (void 0 !== e2[t2] && "function" == typeof o2)
    return e2[t2] = o2(e2[t2]), true;
}, (...e2) => e2.reduce((e3, t2) => ne(e3, t2, "", re), {}))({});
function se() {
  const e2 = U$1();
  return e2._appConfig || (e2._appConfig = reactive(ae)), e2._appConfig;
}
/*!
  * pinia v2.0.28
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let le;
const ue = (e2) => le = e2, pe = Symbol();
function de(e2) {
  return e2 && "object" == typeof e2 && "[object Object]" === Object.prototype.toString.call(e2) && "function" != typeof e2.toJSON;
}
var fe, ye;
(ye = fe || (fe = {})).direct = "direct", ye.patchObject = "patch object", ye.patchFunction = "patch function";
const ve = false;
const qe = () => {
};
function Le(e2, t2, o2, n2 = qe) {
  e2.push(t2);
  const r2 = () => {
    const o3 = e2.indexOf(t2);
    o3 > -1 && (e2.splice(o3, 1), n2());
  };
  return !o2 && getCurrentScope() && onScopeDispose(r2), r2;
}
function He(e2, ...t2) {
  e2.slice().forEach((e3) => {
    e3(...t2);
  });
}
function Fe(e2, t2) {
  e2 instanceof Map && t2 instanceof Map && t2.forEach((t3, o2) => e2.set(o2, t3)), e2 instanceof Set && t2 instanceof Set && t2.forEach(e2.add, e2);
  for (const o2 in t2) {
    if (!t2.hasOwnProperty(o2))
      continue;
    const n2 = t2[o2], r2 = e2[o2];
    de(r2) && de(n2) && e2.hasOwnProperty(o2) && !isRef(n2) && !isReactive(n2) ? e2[o2] = Fe(r2, n2) : e2[o2] = n2;
  }
  return e2;
}
const ze = Symbol();
const { assign: Be } = Object;
function Je$1(e2) {
  return !(!isRef(e2) || !e2.effect);
}
function Me(e2, t2, o2, r2) {
  const { state: a2, actions: s2, getters: i2 } = t2, l2 = o2.state.value[e2];
  let u2;
  return u2 = Ye$1(e2, function() {
    l2 || false || (o2.state.value[e2] = a2 ? a2() : {});
    const t3 = toRefs(o2.state.value[e2]);
    return Be(t3, s2, Object.keys(i2 || {}).reduce((n2, r3) => (n2[r3] = markRaw(computed(() => {
      ue(o2);
      const t4 = o2._s.get(e2);
      return i2[r3].call(t4, t4);
    })), n2), {}));
  }, t2, o2, r2, true), u2.$reset = function() {
    const e3 = a2 ? a2() : {};
    this.$patch((t3) => {
      Be(t3, e3);
    });
  }, u2;
}
function Ye$1(e2, r2, a2 = {}, i2, l2, u2) {
  let p2;
  const m2 = Be({ actions: {} }, a2);
  const _2 = { deep: true };
  let b2, E2;
  let w2, $2 = markRaw([]), O2 = markRaw([]);
  const N2 = i2.state.value[e2];
  u2 || N2 || false || (i2.state.value[e2] = {});
  const P2 = ref({});
  let x2;
  function C2(t2) {
    let o2;
    b2 = E2 = false, "function" == typeof t2 ? (t2(i2.state.value[e2]), o2 = { type: fe.patchFunction, storeId: e2, events: w2 }) : (Fe(i2.state.value[e2], t2), o2 = { type: fe.patchObject, payload: t2, storeId: e2, events: w2 });
    const n2 = x2 = Symbol();
    nextTick().then(() => {
      x2 === n2 && (b2 = true);
    }), E2 = true, He($2, o2, i2.state.value[e2]);
  }
  const S2 = qe;
  function k2(t2, o2) {
    return function() {
      ue(i2);
      const n2 = Array.from(arguments), r3 = [], a3 = [];
      function s2(e3) {
        r3.push(e3);
      }
      function c2(e3) {
        a3.push(e3);
      }
      let l3;
      He(O2, { args: n2, name: t2, store: V2, after: s2, onError: c2 });
      try {
        l3 = o2.apply(this && this.$id === e2 ? this : V2, n2);
      } catch (u3) {
        throw He(a3, u3), u3;
      }
      return l3 instanceof Promise ? l3.then((e3) => (He(r3, e3), e3)).catch((e3) => (He(a3, e3), Promise.reject(e3))) : (He(r3, l3), l3);
    };
  }
  markRaw({ actions: {}, getters: {}, state: [], hotState: P2 }); const I2 = { _p: i2, $id: e2, $onAction: Le.bind(null, O2), $patch: C2, $reset: S2, $subscribe(t2, o2 = {}) {
    const n2 = Le($2, t2, o2.detached, () => r3()), r3 = p2.run(() => watch(() => i2.state.value[e2], (n3) => {
      ("sync" === o2.flush ? E2 : b2) && t2({ storeId: e2, type: fe.direct, events: w2 }, n3);
    }, Be({}, _2, o2)));
    return n2;
  }, $dispose: function() {
    p2.stop(), $2 = [], O2 = [], i2._s.delete(e2);
  } }, V2 = reactive(I2);
  i2._s.set(e2, V2);
  const j2 = i2._e.run(() => (p2 = effectScope(), p2.run(() => r2())));
  for (const t2 in j2) {
    const n2 = j2[t2];
    if (isRef(n2) && !Je$1(n2) || isReactive(n2))
      u2 || (!N2 || de(A2 = n2) && A2.hasOwnProperty(ze) || (isRef(n2) ? n2.value = N2[t2] : Fe(n2, N2[t2])), i2.state.value[e2][t2] = n2);
    else if ("function" == typeof n2) {
      const e3 = k2(t2, n2);
      j2[t2] = e3, m2.actions[t2] = n2;
    } else
      ;
  }
  var A2;
  if (Be(V2, j2), Be(toRaw(V2), j2), Object.defineProperty(V2, "$state", { get: () => i2.state.value[e2], set: (e3) => {
    C2((t2) => {
      Be(t2, e3);
    });
  } }), ve) ;
  return i2._p.forEach((e3) => {
    Be(V2, p2.run(() => e3({ store: V2, app: i2._a, pinia: i2, options: m2 })));
  }), N2 && u2 && a2.hydrate && a2.hydrate(V2.$state, N2), b2 = true, E2 = true, V2;
}
function Ge$1(t2, o2, n2) {
  let r2, a2;
  const s2 = "function" == typeof o2;
  function c2(t3, n3) {
    const l2 = getCurrentInstance();
    if ((t3 = (t3) || l2 && inject(pe, null)) && ue(t3), false)
      ;
    (t3 = le)._s.has(r2) || (s2 ? Ye$1(r2, o2, a2, t3) : Me(r2, a2, t3), false);
    const u2 = t3._s.get(r2);
    return u2;
  }
  return "string" == typeof t2 ? (r2 = t2, a2 = s2 ? n2 : o2) : (a2 = t2, r2 = t2.id), c2.$id = r2, c2;
}
const We = A$1((e2) => {
  const t2 = function() {
    const e3 = effectScope(true), t3 = e3.run(() => ref({}));
    let o2 = [], r2 = [];
    const a2 = markRaw({ install(e4) {
      ue(a2), a2._a = e4, e4.provide(pe, a2), e4.config.globalProperties.$pinia = a2, r2.forEach((e5) => o2.push(e5)), r2 = [];
    }, use(e4) {
      return this._a ? o2.push(e4) : r2.push(e4), this;
    }, _p: o2, _a: null, _e: e3, _s: /* @__PURE__ */ new Map(), state: t3 });
    return a2;
  }();
  return e2.vueApp.use(t2), ue(t2), e2.payload.pinia = t2.state.value, { provide: { pinia: t2 } };
});

const pinia_4d1705f1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _: ee,
  a: G,
  b: R$1,
  c: F,
  d: A$1,
  e: L,
  f: T$1,
  g: J,
  h: K,
  i: M$1,
  j: We,
  k: Y,
  l: j$1,
  m: D$1,
  n: W,
  o: V,
  p: se,
  q: Ge$1,
  r: X,
  s: H$1,
  t: Q,
  u: U$1,
  v: te
});

var e,t,n,o,i,a,l,s,r,u,d,c,p,m,f,h,v,g,y,b,w,x,j,_,k,T,M,$,A,O,S,H,U,D,E,P,I,R,C,z;const Ke=useRuntimeConfig().app,Je={Icon:defineAsyncComponent((()=>import('./_nuxt/Icon.f5d77518.mjs').then((e=>e.default||e))))},Ve=A$1((e=>{for(const t in Je)e.vueApp.component(t,Je[t]),e.vueApp.component("Lazy"+t,Je[t]);}));version.startsWith("2.");const Ye={meta:[{name:"viewport",content:"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"},{charset:"utf-8"},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-status-bar-style",content:"black"},{name:"description",content:"AI绘画的辅助工具."},{name:"referrer",content:"never"},{name:'msapplication-TileColor"',content:"#ffffff"},{name:'theme-color"',content:"#ffffff"}],link:[{rel:"icon",type:"image/x-icon",href:"/nuxt3-tag/dute_favicon_32x32.ico"},{rel:"stylesheet",type:"text/css",href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"}],style:[],script:[{src:"https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js",defer:!0}],noscript:[],charset:"utf-8",viewport:"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",title:"AI绘画的辅助工具"},Ge=!1,Qe=A$1((e=>{const t=function(e){const t=createHead(),n={unhead:t,install(e){version.startsWith("3")&&(e.config.globalProperties.$head=t,e.provide("usehead",t));},resolveTags:()=>t.resolveTags(),headEntries:()=>t.headEntries(),headTags:()=>t.resolveTags(),push:(e,n)=>t.push(e,n),addEntry:(e,n)=>t.push(e,n),addHeadObjs:(e,n)=>t.push(e,n),addReactiveEntry(e,t){const n=useHead(e,t);return void 0!==n?n.dispose:()=>{}},removeHeadObjs(){},updateDOM(e,n){n?renderDOMHead(t,{document:e}):debouncedRenderDOMHead(t,{delayFn:e=>setTimeout((()=>e()),50),document:e});},internalHooks:t.hooks,hooks:{"before:dom":[],"resolved:tags":[],"resolved:entries":[]}};return t.addHeadObjs=n.addHeadObjs,t.updateDOM=n.updateDOM,t.hooks.hook("dom:beforeRender",(e=>{for(const t of n.hooks["before:dom"])!1===t()&&(e.shouldRender=!1);})),e&&n.addHeadObjs(e),n}();t.push(Ye),e.vueApp.use(t),e._useHead=useHead,e.ssrContext.renderMeta=async()=>{const{renderSSRHead:e}=await import('@unhead/ssr'),n=await e(t.unhead);return {...n,bodyScriptsPrepend:n.bodyTagsOpen,bodyScripts:n.bodyTags}};})),Xe={},Ze={},et={},tt={},nt={},ot={},it={},at={},lt={},st={},rt={},ut={},dt={},ct={},pt={},mt={},ft={},ht={},vt={},gt={},yt=[{name:null!=(e=null==Xe?void 0:Xe.name)?e:"index",path:null!=(t=null==Xe?void 0:Xe.path)?t:"/",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/index.vue",children:[],meta:Xe,alias:(null==Xe?void 0:Xe.alias)||[],redirect:(null==Xe?void 0:Xe.redirect)||void 0,component:()=>import('./_nuxt/index.06831073.mjs').then((e=>e.default||e))},{name:null!=(n=null==Ze?void 0:Ze.name)?n:"pc-design",path:null!=(o=null==Ze?void 0:Ze.path)?o:"/pc/design",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/design/index.vue",children:[],meta:Ze,alias:(null==Ze?void 0:Ze.alias)||[],redirect:(null==Ze?void 0:Ze.redirect)||void 0,component:()=>import('./_nuxt/index.61e53ce4.mjs').then((e=>e.default||e))},{name:null!=(i=null==et?void 0:et.name)?i:"pc-draw-components-generateImage",path:null!=(a=null==et?void 0:et.path)?a:"/pc/draw/components/generateImage",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/draw/components/generateImage.vue",children:[],meta:et,alias:(null==et?void 0:et.alias)||[],redirect:(null==et?void 0:et.redirect)||void 0,component:()=>import('./_nuxt/generateImage.3f26d9e0.mjs').then((e=>e.default||e))},{name:null!=(l=null==tt?void 0:tt.name)?l:"pc-draw",path:null!=(s=null==tt?void 0:tt.path)?s:"/pc/draw",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/draw/index.vue",children:[],meta:tt,alias:(null==tt?void 0:tt.alias)||[],redirect:(null==tt?void 0:tt.redirect)||void 0,component:()=>import('./_nuxt/index.bad383e0.mjs').then((e=>e.default||e))},{name:null!=(r=null==nt?void 0:nt.name)?r:"pc-home",path:null!=(u=null==nt?void 0:nt.path)?u:"/pc/home",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/home/index.vue",children:[],meta:nt,alias:(null==nt?void 0:nt.alias)||[],redirect:(null==nt?void 0:nt.redirect)||void 0,component:()=>import('./_nuxt/index.f352ded4.mjs').then((e=>e.default||e))},{name:null!=(d=null==ot?void 0:ot.name)?d:"pc-links",path:null!=(c=null==ot?void 0:ot.path)?c:"/pc/links",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/links/index.vue",children:[],meta:ot,alias:(null==ot?void 0:ot.alias)||[],redirect:(null==ot?void 0:ot.redirect)||void 0,component:()=>import('./_nuxt/index.b30ffac2.mjs').then((e=>e.default||e))},{name:null!=(p=null==it?void 0:it.name)?p:"pc-login",path:null!=(m=null==it?void 0:it.path)?m:"/pc/login",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/login/index.vue",children:[],meta:it,alias:(null==it?void 0:it.alias)||[],redirect:(null==it?void 0:it.redirect)||void 0,component:()=>import('./_nuxt/index.dd9063ae.mjs').then((e=>e.default||e))},{name:null!=(f=null==at?void 0:at.name)?f:"pc-profile",path:null!=(h=null==at?void 0:at.path)?h:"/pc/profile",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/profile/index.vue",children:[],meta:at,alias:(null==at?void 0:at.alias)||[],redirect:(null==at?void 0:at.redirect)||void 0,component:()=>import('./_nuxt/index.31537a05.mjs').then((e=>e.default||e))},{name:null!=(v=null==lt?void 0:lt.name)?v:"pc-tags-chitu",path:null!=(g=null==lt?void 0:lt.path)?g:"/pc/tags/chitu",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/tags/chitu.vue",children:[],meta:lt,alias:(null==lt?void 0:lt.alias)||[],redirect:(null==lt?void 0:lt.redirect)||void 0,component:()=>import('./_nuxt/chitu.2d58f21c.mjs').then((e=>e.default||e))},{name:null!=(y=null==st?void 0:st.name)?y:"pc-tags-components-eHentai",path:null!=(b=null==st?void 0:st.path)?b:"/pc/tags/components/eHentai",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/tags/components/eHentai.vue",children:[],meta:st,alias:(null==st?void 0:st.alias)||[],redirect:(null==st?void 0:st.redirect)||void 0,component:()=>import('./_nuxt/eHentai.562ed24f.mjs').then((e=>e.default||e))},{name:null!=(w=null==rt?void 0:rt.name)?w:"pc-tags-components-eHentaiMore",path:null!=(x=null==rt?void 0:rt.path)?x:"/pc/tags/components/eHentaiMore",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/tags/components/eHentaiMore.vue",children:[],meta:rt,alias:(null==rt?void 0:rt.alias)||[],redirect:(null==rt?void 0:rt.redirect)||void 0,component:()=>import('./_nuxt/eHentaiMore.4e629719.mjs').then((e=>e.default||e))},{name:null!=(j=null==ut?void 0:ut.name)?j:"pc-tags-components-gelbooru",path:null!=(_=null==ut?void 0:ut.path)?_:"/pc/tags/components/gelbooru",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/tags/components/gelbooru.vue",children:[],meta:ut,alias:(null==ut?void 0:ut.alias)||[],redirect:(null==ut?void 0:ut.redirect)||void 0,component:()=>import('./_nuxt/gelbooru.503acb1c.mjs').then((e=>e.default||e))},{name:null!=(k=null==dt?void 0:dt.name)?k:"pc-tags-eh",path:null!=(T=null==dt?void 0:dt.path)?T:"/pc/tags/eh",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/tags/eh.vue",children:[],meta:dt,alias:(null==dt?void 0:dt.alias)||[],redirect:(null==dt?void 0:dt.redirect)||void 0,component:()=>import('./_nuxt/eh.d3a3b115.mjs').then((e=>e.default||e))},{name:null!=(M=null==ct?void 0:ct.name)?M:"pc-tags-gelbooru",path:null!=($=null==ct?void 0:ct.path)?$:"/pc/tags/gelbooru",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/tags/gelbooru.vue",children:[],meta:ct,alias:(null==ct?void 0:ct.alias)||[],redirect:(null==ct?void 0:ct.redirect)||void 0,component:()=>import('./_nuxt/gelbooru.e70e3727.mjs').then((e=>e.default||e))},{name:null!=(A=null==pt?void 0:pt.name)?A:"pc-tags",path:null!=(O=null==pt?void 0:pt.path)?O:"/pc/tags",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/tags/index.vue",children:[],meta:pt,alias:(null==pt?void 0:pt.alias)||[],redirect:(null==pt?void 0:pt.redirect)||void 0,component:()=>import('./_nuxt/index.b64978e7.mjs').then((e=>e.default||e))},{name:null!=(S=null==mt?void 0:mt.name)?S:"pc-template-nsfw",path:null!=(H=null==mt?void 0:mt.path)?H:"/pc/template/nsfw",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/template/nsfw.vue",children:[],meta:mt,alias:(null==mt?void 0:mt.alias)||[],redirect:(null==mt?void 0:mt.redirect)||void 0,component:()=>import('./_nuxt/nsfw.b2a7f553.mjs').then((e=>e.default||e))},{name:null!=(U=null==ft?void 0:ft.name)?U:"pc-template-sfw",path:null!=(D=null==ft?void 0:ft.path)?D:"/pc/template/sfw",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/template/sfw.vue",children:[],meta:ft,alias:(null==ft?void 0:ft.alias)||[],redirect:(null==ft?void 0:ft.redirect)||void 0,component:()=>import('./_nuxt/sfw.a982fce9.mjs').then((e=>e.default||e))},{name:null!=(E=null==ht?void 0:ht.name)?E:"pc-utils-components-imageAnalysis",path:null!=(P=null==ht?void 0:ht.path)?P:"/pc/utils/components/imageAnalysis",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/utils/components/imageAnalysis.vue",children:[],meta:ht,alias:(null==ht?void 0:ht.alias)||[],redirect:(null==ht?void 0:ht.redirect)||void 0,component:()=>import('./_nuxt/imageAnalysis.d901eab9.mjs').then((e=>e.default||e))},{name:null!=(I=null==vt?void 0:vt.name)?I:"pc-utils-components-promptBeautiful",path:null!=(R=null==vt?void 0:vt.path)?R:"/pc/utils/components/promptBeautiful",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/utils/components/promptBeautiful.vue",children:[],meta:vt,alias:(null==vt?void 0:vt.alias)||[],redirect:(null==vt?void 0:vt.redirect)||void 0,component:()=>import('./_nuxt/promptBeautiful.a04ffb70.mjs').then((e=>e.default||e))},{name:null!=(C=null==gt?void 0:gt.name)?C:"pc-utils",path:null!=(z=null==gt?void 0:gt.path)?z:"/pc/utils",file:"/Users/lilin/Desktop/stable-diffution-utils-project/src/pages/pc/utils/index.vue",children:[],meta:gt,alias:(null==gt?void 0:gt.alias)||[],redirect:(null==gt?void 0:gt.redirect)||void 0,component:()=>import('./_nuxt/index.fd1ccbe0.mjs').then((e=>e.default||e))}];function bt(e){try{const t=document.querySelector(e);if(t)return parseFloat(getComputedStyle(t).scrollMarginTop)}catch{}return 0}const wt={...{scrollBehavior(e,t,n){const o=U$1();let i=n||void 0;if(!i&&t&&e&&!1!==e.meta.scrollToTop&&function(e,t){const n=e.matched[0]===t.matched[0];if(!n)return !0;if(n&&JSON.stringify(e.params)!==JSON.stringify(t.params))return !0;return !1}(t,e)&&(i={left:0,top:0}),e.path===t.path){if(t.hash&&!e.hash)return {left:0,top:0};if(e.hash)return {el:e.hash,top:bt(e.hash)}}const a=e=>{var t;return !!(null!=(t=e.meta.pageTransition)?t:Ge)},l=a(t)&&a(e)?"page:transition:finish":"page:finish";return new Promise((t=>{o.hooks.hookOnce(l,(async()=>{await nextTick(),e.hash&&(i={el:e.hash,top:bt(e.hash)}),t(i);}));}))}}},xt=[G((async e=>{var t;let n,o;if(!(null==(t=e.meta)?void 0:t.validate))return;const i=([n,o]=executeAsync((()=>Promise.resolve(e.meta.validate(e)))),n=await n,o(),n);return "boolean"==typeof i?i:F(i)}))],jt={index:()=>import('./_nuxt/index.3976eb5b.mjs')},_t=A$1((async e=>{var t,n,o,i;let a,l,s=R$1().app.baseURL;wt.hashMode&&!s.includes("#")&&(s+="#");const r=null!=(n=null==(t=wt.history)?void 0:t.call(wt,s))?n:createMemoryHistory(s),u=null!=(i=null==(o=wt.routes)?void 0:o.call(wt,yt))?i:yt,d=e.ssrContext.url,c=createRouter({...wt,history:r,routes:u});e.vueApp.use(c);const p=shallowRef(c.currentRoute.value);c.afterEach(((e,t)=>{p.value=t;})),Object.defineProperty(e.vueApp.config.globalProperties,"previousRoute",{get:()=>p.value});const m=shallowRef(c.resolve(d)),f=()=>{m.value=c.currentRoute.value;};e.hook("page:finish",f),c.afterEach(((e,t)=>{var n,o,i,a;(null==(o=null==(n=e.matched[0])?void 0:n.components)?void 0:o.default)===(null==(a=null==(i=t.matched[0])?void 0:i.components)?void 0:a.default)&&f();}));const h={};for(const y in m.value)h[y]=computed((()=>m.value[y]));e._route=reactive(h),e._middleware=e._middleware||{global:[],named:{}},L();try{[a,l]=executeAsync((()=>c.push(d))),await a,l(),[a,l]=executeAsync((()=>c.isReady())),await a,l();}catch(g){T$1(e,H$1,[g]);}const v=J("_layout");return c.beforeEach((async(t,n)=>{var o,i;t.meta=reactive(t.meta),e.isHydrating&&(t.meta.layout=null!=(o=v.value)?o:t.meta.layout),e._processingMiddleware=!0;const a=new Set([...xt,...e._middleware.global]);for(const e of t.matched){const t=e.meta.middleware;if(t)if(Array.isArray(t))for(const e of t)a.add(e);else a.add(t);}for(const l of a){const o="string"==typeof l?e._middleware.named[l]||await(null==(i=jt[l])?void 0:i.call(jt).then((e=>e.default||e))):l;if(!o)throw new Error(`Unknown route middleware: '${l}'.`);const a=await T$1(e,o,[t,n]);if(!1===a||a instanceof Error){const t=a||createError({statusCode:404,statusMessage:`Page Not Found: ${d}`});return await T$1(e,H$1,[t]),!1}if(a||!1===a)return a}})),c.afterEach((async t=>{if(delete e._processingMiddleware,0===t.matched.length)T$1(e,H$1,[createError({statusCode:404,fatal:!1,statusMessage:`Page not found: ${t.fullPath}`})]);else {const n=t.fullPath||"/";isEqual(n,d)||await T$1(e,W,[n]);}})),e.hooks.hookOnce("app:created",(async()=>{try{await c.replace({...c.resolve(d),name:void 0,force:!0});}catch(g){T$1(e,H$1,[g]);}})),{provide:{router:c}}})),kt="Sunset",Tt="ColorScheme",Mt=A$1((e=>{const t=J("color-mode",(()=>reactive({preference:kt,value:kt,unknown:!0,forced:!1}))).value,n={};K({htmlAttrs:n}),M$1().afterEach((e=>{const o=e.meta.colorMode;o&&"system"!==o?(t.value=n["data-color-mode-forced"]=o,n["data-theme"]=t.value,t.forced=!0):"system"===o&&console.warn("You cannot force the colorMode to system at the page level.");})),e.provide("colorMode",t);}));async function $t(e,t){const n=await async function(e){{const t=(await import('image-meta').then((e=>e.imageMeta)))(await fetch(e).then((e=>e.buffer())));if(!t)throw new Error(`No metadata could be extracted from the image \`${e}\`.`);const{width:n,height:o}=t;return {width:n,height:o,ratio:n&&o?n/o:void 0}}}(t).catch((e=>(console.error("Failed to get image meta for "+t,e+""),{width:0,height:0,ratio:0})));return n}function At(e=""){return e.split(/[?#]/).shift().split("/").pop().split(".").pop()}function Ot(e){return t=>t?e[t]||t:e.missingValue}function St(e=""){return "number"==typeof e?e:"string"==typeof e&&e.replace("px","").match(/^\d+$/g)?parseInt(e,10):void 0}function Ht(e){const t={options:e},n=(e,n={})=>Ut(t,e,n),o=(e,t={},o={})=>n(e,{...o,modifiers:defu(t,o.modifiers||{})}).url;for(const i in e.presets)o[i]=(t,n,a)=>o(t,n,{...e.presets[i],...a});return o.options=e,o.getImage=n,o.getMeta=(e,n)=>async function(e,t,n){const o=Ut(e,t,{...n});return "function"==typeof o.getMeta?await o.getMeta():await $t(0,o.url)}(t,e,n),o.getSizes=(e,n)=>function(e,t,n){var o,i;const a=St(null==(o=n.modifiers)?void 0:o.width),l=St(null==(i=n.modifiers)?void 0:i.height),s=a&&l?l/a:0,r=[],u={};if("string"==typeof n.sizes)for(const c of n.sizes.split(/[\s,]+/).filter((e=>e))){const e=c.split(":");2===e.length&&(u[e[0].trim()]=e[1].trim());}else Object.assign(u,n.sizes);for(const c in u){const o=e.options.screens&&e.options.screens[c]||parseInt(c);let i=String(u[c]);const a=i.endsWith("vw");if(!a&&/^\d+$/.test(i)&&(i+="px"),!a&&!i.endsWith("px"))continue;let d=parseInt(i);if(!o||!d)continue;a&&(d=Math.round(d/100*o));const p=s?Math.round(d*s):l;r.push({width:d,size:i,screenMaxWidth:o,media:`(max-width: ${o}px)`,src:e.$img(t,{...n.modifiers,width:d,height:p},n)});}r.sort(((e,t)=>e.screenMaxWidth-t.screenMaxWidth));const d=r[r.length-1];d&&(d.media="");return {sizes:r.map((e=>`${e.media?e.media+" ":""}${e.size}`)).join(", "),srcset:r.map((e=>`${e.src} ${e.width}w`)).join(", "),src:null==d?void 0:d.src}}(t,e,n),t.$img=o,o}function Ut(e,t,n){var o,i;if("string"!=typeof t||""===t)throw new TypeError(`input must be a string (received ${typeof t}: ${JSON.stringify(t)})`);if(t.startsWith("data:"))return {url:t};const{provider:a,defaults:l}=function(e,t){const n=e.options.providers[t];if(!n)throw new Error("Unknown provider: "+t);return n}(e,n.provider||e.options.provider),s=function(e,t){if(!t)return {};if(!e.options.presets[t])throw new Error("Unknown preset: "+t);return e.options.presets[t]}(e,n.preset);if(t=hasProtocol(t)?t:withLeadingSlash(t),!a.supportsAlias)for(const c in e.options.alias)t.startsWith(c)&&(t=joinURL(e.options.alias[c],t.substr(c.length)));if(a.validateDomains&&hasProtocol(t)){const n=parseURL(t).host;if(!e.options.domains.find((e=>e===n)))return {url:t}}const r=defu(n,s,l);r.modifiers={...r.modifiers};const u=r.modifiers.format;(null==(o=r.modifiers)?void 0:o.width)&&(r.modifiers.width=St(r.modifiers.width)),(null==(i=r.modifiers)?void 0:i.height)&&(r.modifiers.height=St(r.modifiers.height));const d=a.getImage(t,r,e);return d.format=d.format||u||"",d}const Dt=function({formatter:e,keyMap:t,joinWith:n="/",valueMap:o}={}){e||(e=(e,t)=>`${e}=${t}`),t&&"function"!=typeof t&&(t=Ot(t));const i=o||{};return Object.keys(i).forEach((e=>{"function"!=typeof i[e]&&(i[e]=Ot(i[e]));})),(o={})=>Object.entries(o).filter((([e,t])=>void 0!==t)).map((([n,a])=>{const l=i[n];return "function"==typeof l&&(a=l(o[n])),n="function"==typeof t?t(n):n,e(n,a)})).join(n)}({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:",",formatter:(e,t)=>encodeParam(e)+"_"+encodeParam(t)}),Et=Object.freeze(Object.defineProperty({__proto__:null,getImage:(e,{modifiers:t={},baseURL:n}={},o)=>{t.width&&t.height&&(t.resize=`${t.width}x${t.height}`,delete t.width,delete t.height);const i=Dt(t)||"_";return n||(n=joinURL("/","/_ipx")),{url:joinURL(n,i,encodePath(e))}},validateDomains:!0,supportsAlias:!0},Symbol.toStringTag,{value:"Module"})),Pt={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipx",domains:[],alias:{}};Pt.providers={ipx:{provider:Et,defaults:{}}};const It=A$1((()=>({provide:{img:Ht(Pt)}})));let Rt=null;const Ct=(e,t)=>(...n)=>{Rt&&(window.clearTimeout(Rt),Rt=null),Rt=setTimeout((()=>{e.apply(void 0,n),Rt=null;}),t);};let zt=[];const Wt=[];const Lt={install(e){e.directive("scroll-to",{mounted(e,t){const n=(document.querySelector(t.value.target)||null).offsetTop||0;Wt.push(n);const o=document.querySelector(t.value.container)||window,i=o.offsetTop||0,a=t.value.behavior||"",l=t.value.time||500,s=t.value.cb||null,r=t.value.syncCb||null;e.addEventListener("click",(()=>{!function(e,t,n,o,i){zt.forEach((e=>window.cancelAnimationFrame(e))),zt=[];const a=t.scrollTop;if(a===e)return;let l=null;if("smooth"!==o)return void t.scrollTo({top:e});const s=window.requestAnimationFrame((function o(s){l=l||s;const r=s-l,u=Math.abs((e-a)*r/n);if(a<e?t.scrollTo(0,a+u):t.scrollTo(0,a-u),r<n){const e=window.requestAnimationFrame(o);zt.push(e);}else t.scrollTo(0,e),i&&i();}));zt.push(s);}(n-i,o,l,a,r),s&&s();})),o.addEventListener("scroll",Ct((e=>{const t=e.target.scrollTop,n=Wt.findIndex(((e,n)=>{const o=Wt[n-1]?Wt[n-1]:0;return t<=e&&t>=o}));console.log("findIndex :>> ",n),(n||0===n)&&s&&s(n);}),1500));}});}},Bt=(e,t,n)=>{const{direction:o,delay:i,timing:a,duration:l,iteration:s}=t,r=["animate__animated"];o?r.push(`animate__${o}`):r.push("animate__fadeIn"),e.style["animation-duration"]=l?`${l}ms`:"500ms",e.style["animation-delay"]=i?`${i}ms`:"0ms",e.style["animation-iteration-count"]=s?`${a}`:"1",e.style["animation-timing-function"]=a?`${a}`:"linear";const u=`${e.classList.value} ${r.join(" ")}`;e.className=u,e.setAttribute("animate-data",u);},Ft={install:(e,t)=>{e.directive("animate-css",{mounted(e,t){const{value:n,modifiers:o}=t;((e,t,n)=>{const{click:o,hover:i}=n;"string"==typeof t&&(t={classes:t}),o?e.onclick=()=>{Bt(e,t);}:i?e.onmouseover=()=>{Bt(e,t);}:Bt(e,t);})(e,n,o);}});}},qt=[We,Ve,Qe,_t,Mt,It,A$1((e=>{e.vueApp.use(Lt),e.vueApp.use(Ft);})),A$1((()=>({provide:{store:Be$1}})))],Nt=defineComponent({setup:(e,{slots:t})=>()=>{var e;return null==(e=t.default)?void 0:e.call(t)}}),Kt=(e,t,n)=>({default:()=>t?h$1(e,!0===t?{}:t,n):h$1(Nt,{},n)}),Jt={default:()=>import('./_nuxt/default.0e646bb4.mjs').then((e=>e.default||e))},Vt=defineComponent({props:{name:String},async setup(e,t){const n=await Jt[e.name]().then((e=>e.default||e));return ()=>h$1(n,{},t.slots)}}),Yt=defineComponent({props:{name:{type:[String,Boolean,Object],default:null}},setup(e,t){const n=inject("_route"),o=n===Y()?useRoute():n,i=computed((()=>{var t,n;return null!=(n=null!=(t=unref(e.name))?t:o.meta.layout)?n:"default"}));return ()=>{var e;const n=i.value&&i.value in Jt,a=null!=(e=o.meta.layoutTransition)&&e;return Kt(Transition,n&&a,{default:()=>Kt(Vt,n&&{key:i.value,name:i.value,hasTransition:void 0},t.slots).default()}).default()}}}),Gt=Object.freeze(Object.defineProperty({__proto__:null,default:Yt},Symbol.toStringTag,{value:"Module"})),Qt=defineComponent({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(e,{attrs:t}){const n=U$1();return ()=>h$1(RouterView,{name:e.name,route:e.route,...t},{default:t=>{var o,i,a;if(!t.Component)return;const l=((e,t)=>{var n;const o=t.route.matched.find((e=>{var n;return (null==(n=e.components)?void 0:n.default)===t.Component.type})),i=null!=(n=null!=e?e:null==o?void 0:o.meta.key)?n:o&&(a=t.route,o.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,(e=>{var t;return (null==(t=a.params[e.slice(1)])?void 0:t.toString())||""})));var a;return "function"==typeof i?i(t.route):i})(e.pageKey,t),s=n.deferHydration(),r=!!(null!=(i=null!=(o=e.transition)?o:t.route.meta.pageTransition)?i:Ge),u=r&&function(e){const t=e.map((e=>({...e,onAfterLeave:Xt(e.onAfterLeave)})));return defu(...t)}([e.transition,t.route.meta.pageTransition,Ge,{onAfterLeave:()=>{n.callHook("page:transition:finish",t.Component);}}].filter(Boolean));return Kt(Transition,r&&u,(null!=(a=e.keepalive)?a:t.route.meta.keepalive,d=h$1(Suspense,{onPending:()=>n.callHook("page:start",t.Component),onResolve:()=>{nextTick((()=>n.callHook("page:finish",t.Component).finally(s)));}},{default:()=>h$1(Zt,{key:l,routeProps:t,pageKey:l,hasTransition:r})}),{default:()=>d})).default();var d;}})}});function Xt(e){return Array.isArray(e)?e:e?[e]:[]}const Zt=defineComponent({props:["routeProps","pageKey","hasTransition"],setup(e){const t=e.pageKey,n=e.routeProps.route,o={};for(const i in e.routeProps.route)o[i]=computed((()=>t===e.pageKey?e.routeProps.route[i]:n[i]));return provide("_route",reactive(o)),()=>h$1(e.routeProps.Component)}}),en=Object.freeze(Object.defineProperty({__proto__:null,default:Qt},Symbol.toStringTag,{value:"Module"})),tn=(e,t)=>{const n=e.__vccOpts||e;for(const[o,i]of t)n[o]=i;return n},nn={};const on=nn.setup;nn.setup=(e,t)=>{const n=useSSRContext();return (n.modules||(n.modules=new Set)).add("app.vue"),on?on(e,t):void 0};const an=tn(nn,[["ssrRender",function(e,t,n,o){const i=Yt,a=Qt;t(`<div${ssrRenderAttrs(mergeProps({class:"stable-app"},o))}>`),t(ssrRenderComponent(i,{name:"default"},{default:withCtx(((e,t,n,o)=>{if(!t)return [createVNode(a)];t(ssrRenderComponent(a,null,null,n,o));})),_:1},n)),t("</div>");}]]),ln={__name:"nuxt-root",__ssrInlineRender:!0,setup(e){const t=defineAsyncComponent((()=>import('./_nuxt/error-component.92274859.mjs').then((e=>e.default||e)))),n=U$1();n.deferHydration(),provide("_route",Y()),n.hooks.callHookWith((e=>e.map((e=>e()))),"vue:setup");const o=L();return onErrorCaptured(((e,t,o)=>{n.hooks.callHook("vue:error",e,t,o).catch((e=>console.error("[nuxt] Error in `vue:error` hook",e))),T$1(n,H$1,[e]);})),(e,n,i,a)=>{ssrRenderSuspense(n,{default:()=>{unref(o)?n(ssrRenderComponent(unref(t),{error:unref(o)},null,i)):n(ssrRenderComponent(unref(an),null,null,i));},_:1});}}},sn=ln.setup;let rn;ln.setup=(e,t)=>{const n=useSSRContext();return (n.modules||(n.modules=new Set)).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue"),sn?sn(e,t):void 0},globalThis.$fetch||(globalThis.$fetch=$fetch$1.create({baseURL:Ke.baseURL}));const un=j$1(qt);rn=async function(e){const t=createApp(ln),n=D$1({vueApp:t,ssrContext:e});try{await V(n,un),await n.hooks.callHook("app:created",t);}catch(o){await n.callHook("app:error",o),n.payload.error=n.payload.error||o;}return t};const dn=e=>rn(e);

const server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _: tn,
  a: en,
  c: Tt,
  d: Ct,
  'default': dn,
  g: At,
  l: Gt,
  p: St
});

export { At as A, Ct as C, Ge$1 as G, J, K, M$1 as M, Q, R$1 as R, St as S, Tt as T, U$1 as U, Y, G as a, server as b, ee as e, pinia_4d1705f1 as p, se as s, tn as t };
