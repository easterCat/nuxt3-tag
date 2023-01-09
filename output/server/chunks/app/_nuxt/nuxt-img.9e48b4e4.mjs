import { S as St, K, U } from '../server.mjs';
import { defineComponent, ref, computed, h } from 'vue';
import 'ofetch';
import 'ohash';
import 'h3';
import 'hookable';
import 'unctx';
import 'ufo';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import 'store';
import 'vue/server-renderer';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const u = () => U().$img, n = { src: { type: String, required: true }, format: { type: String, default: void 0 }, quality: { type: [Number, String], default: void 0 }, background: { type: String, default: void 0 }, fit: { type: String, default: void 0 }, modifiers: { type: Object, default: void 0 }, preset: { type: String, default: void 0 }, provider: { type: String, default: void 0 }, sizes: { type: [Object, String], default: void 0 }, preload: { type: Boolean, default: void 0 }, width: { type: [String, Number], default: void 0 }, height: { type: [String, Number], default: void 0 }, alt: { type: String, default: void 0 }, referrerpolicy: { type: String, default: void 0 }, usemap: { type: String, default: void 0 }, longdesc: { type: String, default: void 0 }, ismap: { type: Boolean, default: void 0 }, loading: { type: String, default: void 0 }, crossorigin: { type: [Boolean, String], default: void 0, validator: (e2) => ["anonymous", "use-credentials", "", true, false].includes(e2) }, decoding: { type: String, default: void 0, validator: (e2) => ["async", "auto", "sync"].includes(e2) } }, p = (e2) => ({ options: computed(() => ({ provider: e2.provider, preset: e2.preset })), attrs: computed(() => ({ width: St(e2.width), height: St(e2.height), alt: e2.alt, referrerpolicy: e2.referrerpolicy, usemap: e2.usemap, longdesc: e2.longdesc, ismap: e2.ismap, crossorigin: true === e2.crossorigin ? "anonymous" : e2.crossorigin || void 0, loading: e2.loading, decoding: e2.decoding })), modifiers: computed(() => ({ ...e2.modifiers, width: St(e2.width), height: St(e2.height), format: e2.format, quality: e2.quality, background: e2.background, fit: e2.fit })) }), v = { ...n, placeholder: { type: [Boolean, String, Number, Array], default: void 0 } }, f = defineComponent({ name: "NuxtImg", props: v, setup: (e2, o2) => {
  const n2 = u(), v2 = p(e2), f2 = ref(false), g2 = computed(() => n2.getSizes(e2.src, { ...v2.options.value, sizes: e2.sizes, modifiers: { ...v2.modifiers.value, width: St(e2.width), height: St(e2.height) } })), c = computed(() => {
    const t2 = v2.attrs.value;
    return e2.sizes && (t2.sizes = g2.value.sizes, t2.srcset = g2.value.srcset), t2;
  }), m = computed(() => {
    let t2 = e2.placeholder;
    if ("" === t2 && (t2 = true), !t2 || f2.value)
      return false;
    if ("string" == typeof t2)
      return t2;
    const i2 = Array.isArray(t2) ? t2 : "number" == typeof t2 ? [t2, t2] : [10, 10];
    return n2(e2.src, { ...v2.modifiers.value, width: i2[0], height: i2[1], quality: i2[2] || 50 }, v2.options.value);
  }), y = computed(() => e2.sizes ? g2.value.src : n2(e2.src, v2.modifiers.value, v2.options.value)), h$1 = computed(() => m.value ? m.value : y.value);
  if (e2.preload) {
    const e3 = Object.values(g2.value).every((e4) => e4);
    K({ link: [{ rel: "preload", as: "image", ...e3 ? { href: g2.value.src, imagesizes: g2.value.sizes, imagesrcset: g2.value.srcset } : { href: h$1.value } }] });
  }
  const S = ref(null);
  return () => h("img", { ref: S, key: h$1.value, src: h$1.value, ...c.value, ...o2.attrs });
} }), g = Object.freeze(Object.defineProperty({ __proto__: null, imgProps: v, default: f }, Symbol.toStringTag, { value: "Module" }));

export { f as _, p as a, n as b, g as n, u };
