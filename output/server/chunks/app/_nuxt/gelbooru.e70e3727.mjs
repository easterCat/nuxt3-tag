import n from './client-only.f5bddb5b.mjs';
import { T as Tt } from './AppHeader.6ac0a703.mjs';
import g from './AppBanner.53c23105.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import F from './gelbooru.503acb1c.mjs';
import { t as tn } from '../server.mjs';
import './nuxt-img.9e48b4e4.mjs';
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
import './AppAnimate.f960f33b.mjs';
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
import './sYw7uX71Xe.38399cea.mjs';
import '@element-plus/icons-vue';
import './AreaTitle.4d925c02.mjs';
import './document-copy.11fbb28b.mjs';
import './shopping-trolley.94b396ca.mjs';

const c = defineComponent({ __name: "gelbooru", __ssrInlineRender: true, setup(r2) {
  const a2 = ref(""), d2 = (e2) => {
    a2.value = e2;
  };
  return (r3, p2, c2, f2) => {
    const b2 = n, v = Tt, j = g;
    p2(`<div${ssrRenderAttrs(mergeProps({ class: "gelbooru-tags-page page" }, f2))} data-v-afb86d95>`), p2(ssrRenderComponent(b2, null, { default: withCtx((e2, o2, t2, r4) => {
      if (!o2)
        return [createVNode(v)];
      o2(ssrRenderComponent(v, null, null, t2, r4));
    }), _: 1 }, c2)), p2('<div class="content" data-v-afb86d95>'), p2(ssrRenderComponent(j, { placeholder: "\u641C\u7D22\u6807\u7B7E", onSearchChange: d2 }, null, c2)), p2(ssrRenderComponent(F, { "search-text": a2.value }, null, c2)), p2("</div></div>");
  };
} }), f = c.setup;
c.setup = (e2, o2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/pc/tags/gelbooru.vue"), f ? f(e2, o2) : void 0;
};
const b = tn(c, [["__scopeId", "data-v-afb86d95"]]);

export { b as default };
