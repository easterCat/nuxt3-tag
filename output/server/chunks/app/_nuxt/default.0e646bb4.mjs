import n from './client-only.f5bddb5b.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
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

const u = {};
const d = u.setup;
u.setup = (o2, t2) => {
  const e2 = useSSRContext();
  return (e2.modules || (e2.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue"), d ? d(o2, t2) : void 0;
};
const p = tn(u, [["ssrRender", function(r2, m2, u2, d2) {
  const p2 = n;
  m2(`<div${ssrRenderAttrs(mergeProps({ class: "default-layout" }, d2))} data-v-f9f28976>`), ssrRenderSlot(r2.$slots, "default", {}, null, m2, u2), m2(ssrRenderComponent(p2, null, null, u2)), m2("</div>");
}], ["__scopeId", "data-v-f9f28976"]]);

export { p as default };
