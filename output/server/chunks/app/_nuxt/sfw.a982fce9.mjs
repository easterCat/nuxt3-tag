import n from './client-only.f5bddb5b.mjs';
import g$1 from './AppBanner.53c23105.mjs';
import w from './TemplateDetail.23b183fa.mjs';
import { U, t as tn } from '../server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ID_INJECTION_KEY } from 'element-plus';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
import './shop.4d5e891e.mjs';
import 'vue3-clipboard';

const j = defineComponent({ __name: "sfw", __ssrInlineRender: true, setup(a2) {
  U().vueApp.provide(ID_INJECTION_KEY, { prefix: Math.floor(1e3 * Math.random()), current: 0 }), ref(true), ref(false);
  const i2 = ref(1);
  ref(36);
  const h2 = ref(0);
  ref(0);
  const j2 = ref(false);
  ref([]);
  const g2 = ref(null), _2 = computed(() => Array.from({ length: h2.value }, (t2, e2) => e2).slice(i2.value > 3 ? i2.value - 3 : i2.value, i2.value + 3));
  return (n2, a3, l2, r2) => {
    const p2 = n, w$1 = g$1, $ = w;
    a3(`<div${ssrRenderAttrs(mergeProps({ class: "template-page page" }, r2))} data-v-857e2d01>`), a3(ssrRenderComponent(p2, null, null, l2)), a3('<div class="content" data-v-857e2d01><div class="banner-con" data-v-857e2d01>'), a3(ssrRenderComponent(w$1, { placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u6807\u7B7E" }, null, l2)), a3("</div>"), a3(ssrRenderComponent(p2, null, null, l2)), a3(ssrRenderComponent(p2, null, null, l2)), a3('<div class="demo-pagination-block" data-v-857e2d01>'), unref(h2) && unref(h2) > 0 ? (a3('<div class="btn-group" data-v-857e2d01><button class="btn btn-outline" data-v-857e2d01>\u9996\u9875</button><button class="btn btn-outline" data-v-857e2d01>\u4E0A\u4E00\u9875</button><!--[-->'), ssrRenderList(unref(_2), (t2, e2) => {
      a3(`<button class="${ssrRenderClass([{ "btn-active": t2 === unref(i2) }, "btn"])}" data-v-857e2d01>${ssrInterpolate(t2)}</button>`);
    }), a3("<!--]-->"), unref(i2) < unref(h2) - 3 ? a3('<button class="btn" data-v-857e2d01>...</button>') : a3("<!---->"), a3(`<button class="${ssrRenderClass([{ "btn-active": unref(h2) === unref(i2) }, "btn"])}" data-v-857e2d01>${ssrInterpolate(unref(h2))}</button><button class="btn btn-outline" data-v-857e2d01>\u4E0B\u4E00\u9875</button><button class="btn btn-outline" data-v-857e2d01>\u5C3E\u9875</button><input${ssrRenderAttr("value", unref(i2))} type="text" placeholder="go" class="w-24 max-w-xs input input-bordered" data-v-857e2d01></div>`)) : a3("<!---->"), a3("</div></div>"), a3(ssrRenderComponent($, { modelValue: unref(j2), "onUpdate:modelValue": (t2) => isRef(j2) ? j2.value = t2 : null, "current-template": unref(g2) }, null, l2)), a3("</div>");
  };
} }), g = j.setup;
j.setup = (t2, e2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("pages/pc/template/sfw.vue"), g ? g(t2, e2) : void 0;
};
const _ = tn(j, [["__scopeId", "data-v-857e2d01"]]);

export { _ as default };
