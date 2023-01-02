import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { t as tn } from '../server.mjs';
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

const m = defineComponent({ __name: "AreaTitle", __ssrInlineRender: true, props: { title: { type: String, default: "" } }, setup: (t2) => (o2, s2, m2, a2) => {
  s2(`<div${ssrRenderAttrs(mergeProps({ class: "area-title" }, a2))} data-v-463d59bb><span data-v-463d59bb>${ssrInterpolate(t2.title)}</span>`), ssrRenderSlot(o2.$slots, "titleSide", {}, null, s2, m2), s2("</div>");
} }), a = m.setup;
m.setup = (t2, e2) => {
  const r2 = useSSRContext();
  return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("components/pc/AreaTitle.vue"), a ? a(t2, e2) : void 0;
};
const d = tn(m, [["__scopeId", "data-v-463d59bb"]]);

export { d as default };
