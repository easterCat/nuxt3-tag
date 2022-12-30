import n$1 from './client-only.f5bddb5b.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as a$1 } from './utils.da672ed3.mjs';
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

const n = defineComponent({ __name: "index", __ssrInlineRender: true, setup: (e2) => (ref(a$1), (e3, r2, i2, s2) => {
  const d2 = n$1;
  r2(`<div${ssrRenderAttrs(mergeProps({ class: "draw-page page" }, s2))} data-v-c9664b54>`), r2(ssrRenderComponent(d2, null, null, i2)), r2(ssrRenderComponent(d2, null, null, i2)), r2("</div>");
}) }), u = n.setup;
n.setup = (o2, e2) => {
  const r2 = useSSRContext();
  return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("pages/pc/draw/index.vue"), u ? u(o2, e2) : void 0;
};
const a = tn(n, [["__scopeId", "data-v-c9664b54"]]);

export { a as default };
