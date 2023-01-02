import d from './AreaTitle.4d925c02.mjs';
import { x } from './index.8cd5f84c.mjs';
import { s, p } from './shop.4d5e891e.mjs';
import { defineComponent, withAsyncContext, ref, watch, mergeProps, withCtx, createVNode, unref, renderSlot, useSSRContext } from 'vue';
import { ElSwitch, ElButton, ElPagination } from 'element-plus/lib';
import { a } from './document-copy.11fbb28b.mjs';
import { t } from './shopping-trolley.94b396ca.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { C as Ct, t as tn } from '../server.mjs';
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
import 'vue-uuid';
import 'element-plus';
import 'vue3-clipboard';

const S = defineComponent({ __name: "eHentai", __ssrInlineRender: true, props: { searchText: { type: String, default: "" } }, async setup(i2) {
  let v2, y2;
  const S2 = i2, { EhtagsApi: V2 } = x(), C2 = ([v2, y2] = withAsyncContext(() => V2.getEhtags()), v2 = await v2, y2(), v2), U = JSON.parse(C2), E = ref(false), H = ref([]), T = ref(1), w = ref(50), A = ref(0), { copy: I } = s(), { addShop: J } = p();
  watch(() => S2.searchText, (e2) => {
    q(e2);
  });
  const N = (e2) => {
    w.value = e2, T.value = 1, R();
  }, O = (e2) => {
    T.value = e2, R();
  }, R = () => {
    H.value = U.slice(50 * (T.value - 1), 50 * T.value);
  }, q = Ct((e2) => {
    const a2 = U.filter((a3) => a3.k.includes(e2));
    a2 && (T.value = 1, H.value = a2.slice(50 * (T.value - 1), 50 * T.value), A.value = a2.length);
  }, 1e3);
  return (a2, t2, l2, i3) => {
    const o2 = d, s2 = ElSwitch, r2 = ElButton, v3 = t, k2 = a, y3 = ElPagination;
    t2(`<div${ssrRenderAttrs(mergeProps({ class: "eh-con" }, i3))} data-v-187bf4ca>`), t2(ssrRenderComponent(o2, { title: "EH\u6807\u7B7E\u5217\u8868" }, { titleSide: withCtx((e2, a3, t3, l3) => {
      if (!a3)
        return [createVNode(s2, { modelValue: E.value, "onUpdate:modelValue": (e3) => E.value = e3, size: "large", "inline-prompt": "", "inactive-text": "\u9690\u85CF", "active-text": "\u5F00\u542F", class: "title-side" }, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("span", { class: "eh-title-side-tip" }, "(577\u4E2A\u6807\u7B7E\u7248\u672C,\u9AD8h,\u614E\u91CD)")];
      a3(ssrRenderComponent(s2, { modelValue: E.value, "onUpdate:modelValue": (e3) => E.value = e3, size: "large", "inline-prompt": "", "inactive-text": "\u9690\u85CF", "active-text": "\u5F00\u542F", class: "title-side" }, null, t3, l3)), a3(`<span class="eh-title-side-tip" data-v-187bf4ca${l3}>(577\u4E2A\u6807\u7B7E\u7248\u672C,\u9AD8h,\u614E\u91CD)</span>`);
    }), _: 1 }, l2)), E.value ? (t2('<div class="tag-list" data-v-187bf4ca><!--[-->'), ssrRenderList(H.value, (e2, i4) => {
      t2(`<div class="tag-item" data-v-187bf4ca><div class="text-con" data-v-187bf4ca><p class="zh" data-v-187bf4ca>${ssrInterpolate(null == e2 ? void 0 : e2.k)}</p><p class="en" data-v-187bf4ca>${ssrInterpolate(null == e2 ? void 0 : e2.v)}</p></div><div data-v-187bf4ca>`), t2(ssrRenderComponent(r2, { size: "small", circle: "", onClick: (a3) => unref(J)(null == e2 ? void 0 : e2.v) }, { default: withCtx((e3, t3, l3, i5) => {
        if (!t3)
          return [renderSlot(a2.$slots, "icon", {}, () => [createVNode(v3)], true)];
        ssrRenderSlot(a2.$slots, "icon", {}, () => {
          t3(ssrRenderComponent(v3, null, null, l3, i5));
        }, t3, l3, i5);
      }), _: 2 }, l2)), t2(ssrRenderComponent(r2, { size: "small", circle: "", onClick: (a3) => unref(I)(null == e2 ? void 0 : e2.v) }, { default: withCtx((e3, t3, l3, i5) => {
        if (!t3)
          return [renderSlot(a2.$slots, "icon", {}, () => [createVNode(k2)], true)];
        ssrRenderSlot(a2.$slots, "icon", {}, () => {
          t3(ssrRenderComponent(k2, null, null, l3, i5));
        }, t3, l3, i5);
      }), _: 2 }, l2)), t2("</div></div>");
    }), t2("<!--]--></div>")) : t2("<!---->"), E.value ? (t2('<div class="demo-pagination-block" data-v-187bf4ca>'), t2(ssrRenderComponent(y3, { "current-page": T.value, "onUpdate:current-page": (e2) => T.value = e2, "page-size": w.value, "onUpdate:page-size": (e2) => w.value = e2, "page-sizes": [50, 100], background: true, layout: "total, sizes, prev, pager, next, jumper", total: A.value, onSizeChange: N, onCurrentChange: O }, null, l2)), t2("</div>")) : t2("<!---->"), t2("</div>");
  };
} }), V = S.setup;
S.setup = (e2, a2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/pc/tags/components/eHentai.vue"), V ? V(e2, a2) : void 0;
};
const C = tn(S, [["__scopeId", "data-v-187bf4ca"]]);

export { C as default };
