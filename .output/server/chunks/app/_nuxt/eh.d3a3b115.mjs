import n from './client-only.f5bddb5b.mjs';
import g from './AppBanner.53c23105.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import C from './eHentai.562ed24f.mjs';
import J from './eHentaiMore.4e629719.mjs';
import { t as tn } from '../server.mjs';
import './AppAnimate.f960f33b.mjs';
import 'element-plus/lib';
import './sYw7uX71Xe.38399cea.mjs';
import '@element-plus/icons-vue';
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
import './AreaTitle.4d925c02.mjs';
import './index.8cd5f84c.mjs';
import 'vue-uuid';
import 'element-plus';
import './shop.4d5e891e.mjs';
import 'vue3-clipboard';
import './document-copy.11fbb28b.mjs';
import './shopping-trolley.94b396ca.mjs';

const u = defineComponent({ __name: "eh", __ssrInlineRender: true, setup(o2) {
  const i2 = ref(""), l2 = ref(""), u2 = (e2) => {
    i2.value = e2, l2.value = e2;
  };
  return (o3, r2, c2, d2) => {
    const v = n, f = g;
    r2(`<div${ssrRenderAttrs(mergeProps({ class: "eh-tags-page page" }, d2))} data-v-c447c4a0>`), r2(ssrRenderComponent(v, null, null, c2)), r2('<div class="content" data-v-c447c4a0>'), r2(ssrRenderComponent(f, { placeholder: "\u641C\u7D22\u6807\u7B7E", onSearchChange: u2 }, null, c2)), r2(ssrRenderComponent(C, { "search-text": i2.value }, null, c2)), r2(ssrRenderComponent(J, { "search-text": l2.value }, null, c2)), r2("</div></div>");
  };
} }), c = u.setup;
u.setup = (e2, t2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("pages/pc/tags/eh.vue"), c ? c(e2, t2) : void 0;
};
const d = tn(u, [["__scopeId", "data-v-c447c4a0"]]);

export { d as default };
