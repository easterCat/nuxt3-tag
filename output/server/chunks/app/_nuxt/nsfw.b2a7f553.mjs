import n from './client-only.f5bddb5b.mjs';
import g from './AppBanner.53c23105.mjs';
import w$1 from './TemplateDetail.23b183fa.mjs';
import { U, t as tn } from '../server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, unref, isRef, useSSRContext } from 'vue';
import { ID_INJECTION_KEY } from 'element-plus';
import { ElRow } from 'element-plus/lib';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import './AppAnimate.f960f33b.mjs';
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

const w = defineComponent({ __name: "nsfw", __ssrInlineRender: true, setup(a2) {
  U().vueApp.provide(ID_INJECTION_KEY, { prefix: Math.floor(1e3 * Math.random()), current: 0 }), ref(true), ref(false);
  const m2 = ref(1);
  ref(36);
  const _2 = ref(0);
  ref(0);
  const w2 = ref(false);
  ref([]);
  const $2 = ref(null), A2 = computed(() => Array.from({ length: _2.value }, (t2, e2) => e2).slice(m2.value > 3 ? m2.value - 3 : m2.value, m2.value + 3));
  return (n2, a3, l2, r2) => {
    const d2 = n, y = g, k = ElRow, I = w$1;
    a3(`<div${ssrRenderAttrs(mergeProps({ class: "template-page page" }, r2))} data-v-9c168868>`), a3(ssrRenderComponent(d2, null, null, l2)), a3('<div class="content" data-v-9c168868><div class="banner-con" data-v-9c168868>'), a3(ssrRenderComponent(y, { placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u6807\u7B7E" }, null, l2)), a3("</div>"), a3(ssrRenderComponent(d2, null, null, l2)), a3(ssrRenderComponent(k, { class: "list-con", gutter: 20 }, { default: withCtx((t2, e2, o2, n3) => {
      if (!e2)
        return [createVNode(d2)];
      e2(ssrRenderComponent(d2, null, null, o2, n3));
    }), _: 1 }, l2)), a3('<div class="demo-pagination-block" data-v-9c168868>'), unref(_2) && unref(_2) > 0 ? (a3('<div class="btn-group" data-v-9c168868><button class="btn btn-outline" data-v-9c168868>\u9996\u9875</button><button class="btn btn-outline" data-v-9c168868>\u4E0A\u4E00\u9875</button><!--[-->'), ssrRenderList(unref(A2), (t2, e2) => {
      a3(`<button class="${ssrRenderClass([{ "btn-active": t2 === unref(m2) }, "btn"])}" data-v-9c168868>${ssrInterpolate(t2)}</button>`);
    }), a3("<!--]-->"), unref(m2) < unref(_2) - 3 ? a3('<button class="btn" data-v-9c168868>...</button>') : a3("<!---->"), a3(`<button class="${ssrRenderClass([{ "btn-active": unref(_2) === unref(m2) }, "btn"])}" data-v-9c168868>${ssrInterpolate(unref(_2))}</button><button class="btn btn-outline" data-v-9c168868>\u4E0B\u4E00\u9875</button><button class="btn btn-outline" data-v-9c168868>\u5C3E\u9875</button><input${ssrRenderAttr("value", unref(m2))} type="text" placeholder="go" class="w-24 max-w-xs input input-bordered" data-v-9c168868></div>`)) : a3("<!---->"), a3("</div></div>"), a3(ssrRenderComponent(I, { modelValue: unref(w2), "onUpdate:modelValue": (t2) => isRef(w2) ? w2.value = t2 : null, "current-template": unref($2) }, null, l2)), a3("</div>");
  };
} }), $ = w.setup;
w.setup = (t2, e2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("pages/pc/template/nsfw.vue"), $ ? $(t2, e2) : void 0;
};
const A = tn(w, [["__scopeId", "data-v-9c168868"]]);

export { A as default };
