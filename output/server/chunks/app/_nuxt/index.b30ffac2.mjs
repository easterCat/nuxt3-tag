import n from './client-only.f5bddb5b.mjs';
import { T as Tt, d as dt } from './AppHeader.6ac0a703.mjs';
import o from './AppAnimate.f960f33b.mjs';
import d$1 from './AppFooter.87fbca18.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { t as tn } from '../server.mjs';
import './nuxt-img.9e48b4e4.mjs';
import './shop.4d5e891e.mjs';
import 'element-plus/lib';
import 'vue3-clipboard';
import 'element-plus';
import './plus.ff77b18c.mjs';
import 'vuedraggable';
import 'vue-uuid';
import './index.8cd5f84c.mjs';
import 'lodash';
import './Icon.f5d77518.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
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

const d = {};
const f = d.setup;
d.setup = (e2, o2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/pc/links/index.vue"), f ? f(e2, o2) : void 0;
};
const c = tn(d, [["ssrRender", function(n2, a2, d2, f2) {
  const c2 = n, v = Tt, j = o, b = dt, h = d$1;
  a2(`<div${ssrRenderAttrs(mergeProps({ class: "links-page page bg-base-100" }, f2))}>`), a2(ssrRenderComponent(c2, null, { default: withCtx((e2, o2, t2, r2) => {
    if (!o2)
      return [createVNode(v)];
    o2(ssrRenderComponent(v, null, null, t2, r2));
  }), _: 1 }, d2)), a2(ssrRenderComponent(j, null, { default: withCtx((e2, o2, t2, r2) => {
    if (!o2)
      return [createVNode("div", { class: "content" }, [createVNode(b, { "show-left-menu": true })])];
    o2(`<div class="content"${r2}>`), o2(ssrRenderComponent(b, { "show-left-menu": true }, null, t2, r2)), o2("</div>");
  }), _: 1 }, d2)), a2(ssrRenderComponent(h, null, null, d2)), a2("</div>");
}]]);

export { c as default };
