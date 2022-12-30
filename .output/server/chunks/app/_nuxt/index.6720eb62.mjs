import n from './client-only.f5bddb5b.mjs';
import w from './TemplateDetail.5ee75c59.mjs';
import { x } from './index.6b623cfb.mjs';
import { U, t as tn } from '../server.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import ue from 'lodash';
import './AppAnimate.f960f33b.mjs';
import './shop.4d5e891e.mjs';
import 'element-plus/lib';
import 'vue3-clipboard';
import 'element-plus';
import 'vue-uuid';
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

const d = defineComponent({ __name: "index", __ssrInlineRender: true, setup(l2) {
  const { TemplateApi: m2 } = x();
  ref(true), U();
  const s2 = ref(false), d2 = ref(null), v2 = ref(false), c2 = ref(1), f = ref(50);
  ref("");
  const h = ref(""), b = ref([]);
  return ue.debounce(async (e2) => {
    if (e2 === h.value)
      return;
    b.value = [], h.value = e2, v2.value = true;
    const t2 = await m2.getTemplates({ pageIndex: c2.value, pageSize: f.value, searchTag: h.value });
    v2.value = false, b.value = (null == t2 ? void 0 : t2.templates) && 0 !== (null == t2 ? void 0 : t2.templates.length) ? null == t2 ? void 0 : t2.templates : [];
  }, 1200), (o2, r2, l3, a2) => {
    const m3 = n, n2 = w;
    r2(`<div${ssrRenderAttrs(mergeProps({ class: "home-page page" }, a2))} data-v-1a7dd1d8>`), r2(ssrRenderComponent(m3, null, null, l3)), r2(ssrRenderComponent(m3, null, null, l3)), r2(ssrRenderComponent(n2, { modelValue: s2.value, "onUpdate:modelValue": (e2) => s2.value = e2, "current-template": d2.value }, null, l3)), r2("</div>");
  };
} }), v = d.setup;
d.setup = (e2, t2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("pages/pc/home/index.vue"), v ? v(e2, t2) : void 0;
};
const c = tn(d, [["__scopeId", "data-v-1a7dd1d8"]]);

export { c as default };
