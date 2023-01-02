import d from './AreaTitle.4d925c02.mjs';
import { R, C as Ct, t as tn } from '../server.mjs';
import { defineComponent, ref, withAsyncContext, watch, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, unref, renderSlot, createTextVNode, useSSRContext } from 'vue';
import { x } from './index.8cd5f84c.mjs';
import { s, p } from './shop.4d5e891e.mjs';
import { ElSelect, ElOption, ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus/lib';
import { a } from './document-copy.11fbb28b.mjs';
import { t } from './shopping-trolley.94b396ca.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
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

const B = defineComponent({ __name: "gelbooru", __ssrInlineRender: true, props: { searchText: { type: String, default: "" } }, async setup(a2) {
  let _2, A2;
  const B2 = a2, E2 = R().public.GELBOORU_TOKEN, { GelbooruApi: F2 } = x(), { copy: L } = s(), { addShop: R$1 } = p(), V = ref([]), W = ref([]), K = ref([]), q = ref(1100), D = ref(1), H = ref(100), J = ref(0), M = ([_2, A2] = withAsyncContext(() => F2.getList()), _2 = await _2, A2(), _2);
  V.value = M.data, watch(() => B2.searchText, (e2) => {
    Y(e2);
  }), watch(q, async (e2) => {
    var l2;
    if (e2) {
      const a3 = await F2.getTagsById({ token: E2, page: 1, limit: 100, category_id: e2 });
      W.value = a3.data, J.value = null == (l2 = null == a3 ? void 0 : a3.data) ? void 0 : l2.length, X();
    }
  });
  const P = (e2) => {
    H.value = e2, D.value = 1, X();
  }, Q = (e2) => {
    D.value = e2, X();
  }, X = () => {
    K.value = W.value.slice((D.value - 1) * H.value, D.value * H.value);
  }, Y = Ct(async (e2) => {
    q.value = null;
    const l2 = await F2.searchTags({ token: "b8d9e7d1fa1dcc3e5116760c093be229", keyword: e2, page: 2, limit: 100 });
    W.value = l2.data, 100 == l2.data.length ? J.value = l2.data.length + 1 : J.value = l2.data.length, X();
  }, 1500);
  return (l2, a3, o2, t2) => {
    const r2 = d, _3 = ElSelect, h2 = ElOption, g2 = ElTable, w2 = ElTableColumn, O2 = ElButton, A3 = t, B3 = a, E3 = ElPagination;
    a3(`<div${ssrRenderAttrs(mergeProps({ class: "eh-con" }, t2))} data-v-5620b196>`), a3(ssrRenderComponent(r2, { title: "Gelbooru\u6807\u7B7E\u5217\u8868" }, { titleSide: withCtx((e2, l3, a4, o3) => {
      if (!l3)
        return [createVNode("span", { class: "eh-title-side-tip" }, "(\u5206\u7C7B\u4E0D\u597D\u7528,\u7528\u641C\u7D22)")];
      l3(`<span class="eh-title-side-tip" data-v-5620b196${o3}>(\u5206\u7C7B\u4E0D\u597D\u7528,\u7528\u641C\u7D22)</span>`);
    }), _: 1 }, o2)), a3('<div class="flex justify-between m-b-10" data-v-5620b196>'), a3(ssrRenderComponent(_3, { modelValue: q.value, "onUpdate:modelValue": (e2) => q.value = e2, placeholder: "\u7C7B\u522B", size: "large" }, { default: withCtx((e2, l3, a4, o3) => {
      if (!l3)
        return [(openBlock(true), createBlock(Fragment, null, renderList(V.value, (e3) => (openBlock(), createBlock(h2, { key: e3.value, label: `${null == e3 ? void 0 : e3.name}-${null == e3 ? void 0 : e3.level}`, value: null == e3 ? void 0 : e3.id }, null, 8, ["label", "value"]))), 128))];
      l3("<!--[-->"), ssrRenderList(V.value, (e3) => {
        l3(ssrRenderComponent(h2, { key: e3.value, label: `${null == e3 ? void 0 : e3.name}-${null == e3 ? void 0 : e3.level}`, value: null == e3 ? void 0 : e3.id }, null, a4, o3));
      }), l3("<!--]-->");
    }), _: 1 }, o2)), a3("</div>"), a3(ssrRenderComponent(g2, { class: "m-b-10", data: K.value, border: "", stripe: "", size: "large", style: { width: "100%" } }, { default: withCtx((e2, a4, o3, t3) => {
      if (!a4)
        return [createVNode(w2, { prop: "name", label: "\u539F\u59CB\u6807\u7B7E", width: "320" }, { default: withCtx((e3) => {
          var a5;
          return [createVNode("span", { class: "m-r-12" }, toDisplayString((null == (a5 = e3.row) ? void 0 : a5.name) || ""), 1), createVNode(O2, { size: "small", circle: "", onClick: (l3) => {
            var a6;
            return unref(R$1)((null == (a6 = e3.row) ? void 0 : a6.name) || "");
          } }, { default: withCtx(() => [renderSlot(l2.$slots, "icon", {}, () => [createVNode(A3)], true)]), _: 2 }, 1032, ["onClick"]), createVNode(O2, { size: "small", circle: "", onClick: (l3) => {
            var a6;
            return unref(L)((null == (a6 = e3.row) ? void 0 : a6.name) || "");
          } }, { default: withCtx(() => [renderSlot(l2.$slots, "icon", {}, () => [createVNode(B3)], true)]), _: 2 }, 1032, ["onClick"])];
        }), _: 3 }), createVNode(w2, { prop: "t_name", label: "\u540D\u79F0", width: "250" }), createVNode(w2, { prop: "t_name", label: "NSFW", width: "100" }, { default: withCtx((e3) => [createTextVNode(toDisplayString(e3.row.is_nsfw ? "\u662F" : "\u5426"), 1)]), _: 1 }), createVNode(w2, { prop: "desc", label: "\u63CF\u8FF0" }), createVNode(w2, { prop: "remarks", label: "\u8BE6\u7EC6" })];
      a4(ssrRenderComponent(w2, { prop: "name", label: "\u539F\u59CB\u6807\u7B7E", width: "320" }, { default: withCtx((e3, a5, o4, t4) => {
        var r3, i2;
        if (!a5)
          return [createVNode("span", { class: "m-r-12" }, toDisplayString((null == (i2 = e3.row) ? void 0 : i2.name) || ""), 1), createVNode(O2, { size: "small", circle: "", onClick: (l3) => {
            var a6;
            return unref(R$1)((null == (a6 = e3.row) ? void 0 : a6.name) || "");
          } }, { default: withCtx(() => [renderSlot(l2.$slots, "icon", {}, () => [createVNode(A3)], true)]), _: 2 }, 1032, ["onClick"]), createVNode(O2, { size: "small", circle: "", onClick: (l3) => {
            var a6;
            return unref(L)((null == (a6 = e3.row) ? void 0 : a6.name) || "");
          } }, { default: withCtx(() => [renderSlot(l2.$slots, "icon", {}, () => [createVNode(B3)], true)]), _: 2 }, 1032, ["onClick"])];
        a5(`<span class="m-r-12" data-v-5620b196${t4}>${ssrInterpolate((null == (r3 = e3.row) ? void 0 : r3.name) || "")}</span>`), a5(ssrRenderComponent(O2, { size: "small", circle: "", onClick: (l3) => {
          var a6;
          return unref(R$1)((null == (a6 = e3.row) ? void 0 : a6.name) || "");
        } }, { default: withCtx((e4, a6, o5, t5) => {
          if (!a6)
            return [renderSlot(l2.$slots, "icon", {}, () => [createVNode(A3)], true)];
          ssrRenderSlot(l2.$slots, "icon", {}, () => {
            a6(ssrRenderComponent(A3, null, null, o5, t5));
          }, a6, o5, t5);
        }), _: 2 }, o4, t4)), a5(ssrRenderComponent(O2, { size: "small", circle: "", onClick: (l3) => {
          var a6;
          return unref(L)((null == (a6 = e3.row) ? void 0 : a6.name) || "");
        } }, { default: withCtx((e4, a6, o5, t5) => {
          if (!a6)
            return [renderSlot(l2.$slots, "icon", {}, () => [createVNode(B3)], true)];
          ssrRenderSlot(l2.$slots, "icon", {}, () => {
            a6(ssrRenderComponent(B3, null, null, o5, t5));
          }, a6, o5, t5);
        }), _: 2 }, o4, t4));
      }), _: 3 }, o3, t3)), a4(ssrRenderComponent(w2, { prop: "t_name", label: "\u540D\u79F0", width: "250" }, null, o3, t3)), a4(ssrRenderComponent(w2, { prop: "t_name", label: "NSFW", width: "100" }, { default: withCtx((e3, l3, a5, o4) => {
        if (!l3)
          return [createTextVNode(toDisplayString(e3.row.is_nsfw ? "\u662F" : "\u5426"), 1)];
        l3(`${ssrInterpolate(e3.row.is_nsfw ? "\u662F" : "\u5426")}`);
      }), _: 1 }, o3, t3)), a4(ssrRenderComponent(w2, { prop: "desc", label: "\u63CF\u8FF0" }, null, o3, t3)), a4(ssrRenderComponent(w2, { prop: "remarks", label: "\u8BE6\u7EC6" }, null, o3, t3));
    }), _: 3 }, o2)), a3('<div class="demo-pagination-block" data-v-5620b196>'), a3(ssrRenderComponent(E3, { "current-page": D.value, "onUpdate:current-page": (e2) => D.value = e2, "page-size": H.value, "onUpdate:page-size": (e2) => H.value = e2, "page-sizes": [10, 20, 50, 100], background: true, layout: "total, sizes, prev, pager, next, jumper", total: J.value, onSizeChange: P, onCurrentChange: Q }, null, o2)), a3("</div></div>");
  };
} }), E = B.setup;
B.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("pages/pc/tags/components/gelbooru.vue"), E ? E(e2, l2) : void 0;
};
const F = tn(B, [["__scopeId", "data-v-5620b196"]]);

export { F as default };
