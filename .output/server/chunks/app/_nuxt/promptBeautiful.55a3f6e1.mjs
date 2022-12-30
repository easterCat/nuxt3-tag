import d from './AreaTitle.60828984.mjs';
import { U, t as tn } from '../server.mjs';
import { createElementVNode, defineComponent, ref, mergeProps, withCtx, createVNode, unref, isRef, toDisplayString, useSSRContext, openBlock, createElementBlock } from 'vue';
import { s, p } from './shop.4d5e891e.mjs';
import { a } from './document-copy.11fbb28b.mjs';
import { m, h } from './opportunity.3ae6b5be.mjs';
import { ElRow, ElCol, ElInput } from 'element-plus/lib';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
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
import 'vue3-clipboard';
import 'element-plus';

const k = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, C = [createElementVNode("path", { fill: "currentColor", d: "M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256l512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" }, null, -1)];
const B = { name: "ep-check", render: function(t2, a2) {
  return openBlock(), createElementBlock("svg", k, C);
} }, I = defineComponent({ __name: "promptBeautiful", __ssrInlineRender: true, setup(e2) {
  U();
  const o2 = ref(""), l2 = ref(""), n2 = ref([]), p2 = ref([]), R2 = ref(0), { copy: k2 } = s();
  p();
  const C2 = () => {
    k2(l2.value);
  };
  return (a2, e3, s2, b2) => {
    var v2, k3;
    const I2 = ElRow, L2 = ElCol, P2 = ElInput, S = d, A = m, M = h, T = a, q = B;
    e3(`<div${ssrRenderAttrs(mergeProps({ class: "tranfer-con" }, b2))} data-v-21e55eaa><div class="button-con" data-v-21e55eaa><button class="btn btn-accent m-r-10 m-b-10" data-v-21e55eaa>\u683C\u5F0F\u5316</button><button class="btn btn-accent m-r-10 m-b-10" data-v-21e55eaa>\u6E05\u7A7A</button><button class="btn btn-accent m-r-10 m-b-10" data-v-21e55eaa> \u5927\u62EC\u53F7\u8F6C\u5706\u62EC\u53F7 </button><button class="btn btn-accent m-r-10 m-b-10" data-v-21e55eaa> \u5706\u62EC\u53F7\u8F6C\u5927\u62EC\u53F7 </button><button class="btn btn-accent m-r-10 m-b-10" data-v-21e55eaa> \u8D77\u624B\u5F0F </button><button class="btn btn-accent m-r-10 m-b-10" data-v-21e55eaa>\u8D2D\u7269\u8F66\u5BFC\u5165</button><button class="btn btn-accent m-r-10 m-b-10" data-v-21e55eaa>\u5BFC\u51FA\u8D2D\u7269\u8F66</button><button class="btn btn-accent m-r-10 m-b-10" data-v-21e55eaa> \u7A7A\u683C\u52A0\u9017\u53F7(\u7528\u4E8Edanbooru) </button><button class="btn btn-accent m-b-10" data-v-21e55eaa> \u53BB\u9664\u4E0B\u5212\u7EBF(\u7528\u4E8Edanbooru) </button></div>`), e3(ssrRenderComponent(I2, { gutter: 20 }, { default: withCtx((t2, a3, e4, n3) => {
      if (!a3)
        return [createVNode(L2, { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }, { default: withCtx(() => [createVNode(P2, { modelValue: unref(o2), "onUpdate:modelValue": (t3) => isRef(o2) ? o2.value = t3 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165promit", rows: 12, clearable: "", autosize: { minRows: 12 }, "show-word-limit": "", maxlength: "3000" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(L2, { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }, { default: withCtx(() => [createVNode(P2, { modelValue: unref(l2), "onUpdate:modelValue": (t3) => isRef(l2) ? l2.value = t3 : null, type: "textarea", placeholder: "\u8F93\u51FAprompt", rows: 12, autosize: { minRows: 12 }, readonly: "", "show-word-limit": "", maxlength: "3000", onClick: C2 }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })];
      a3(ssrRenderComponent(L2, { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }, { default: withCtx((t3, a4, e5, l3) => {
        if (!a4)
          return [createVNode(P2, { modelValue: unref(o2), "onUpdate:modelValue": (t4) => isRef(o2) ? o2.value = t4 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165promit", rows: 12, clearable: "", autosize: { minRows: 12 }, "show-word-limit": "", maxlength: "3000" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
        a4(ssrRenderComponent(P2, { modelValue: unref(o2), "onUpdate:modelValue": (t4) => isRef(o2) ? o2.value = t4 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165promit", rows: 12, clearable: "", autosize: { minRows: 12 }, "show-word-limit": "", maxlength: "3000" }, null, e5, l3));
      }), _: 1 }, e4, n3)), a3(ssrRenderComponent(L2, { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }, { default: withCtx((t3, a4, e5, o3) => {
        if (!a4)
          return [createVNode(P2, { modelValue: unref(l2), "onUpdate:modelValue": (t4) => isRef(l2) ? l2.value = t4 : null, type: "textarea", placeholder: "\u8F93\u51FAprompt", rows: 12, autosize: { minRows: 12 }, readonly: "", "show-word-limit": "", maxlength: "3000", onClick: C2 }, null, 8, ["modelValue", "onUpdate:modelValue"])];
        a4(ssrRenderComponent(P2, { modelValue: unref(l2), "onUpdate:modelValue": (t4) => isRef(l2) ? l2.value = t4 : null, type: "textarea", placeholder: "\u8F93\u51FAprompt", rows: 12, autosize: { minRows: 12 }, readonly: "", "show-word-limit": "", maxlength: "3000", onClick: C2 }, null, e5, o3));
      }), _: 1 }, e4, n3));
    }), _: 1 }, s2)), e3(ssrRenderComponent(S, { title: "Prompt\u5217\u8868" }, null, s2)), unref(n2) && (null == (v2 = unref(n2)) ? void 0 : v2.length) ? (e3('<div class="tags-con" data-v-21e55eaa><div class="m-b-10" data-v-21e55eaa><button class="btn btn-md btn-accent" data-v-21e55eaa> \u5F53\u524Dtags\u66FF\u6362prompt </button></div><!--[-->'), ssrRenderList(unref(n2), (t2, a3) => {
      e3(`<button class="btn btn-sm btn-secondary m-r-10 m-b-10" data-v-21e55eaa>${ssrInterpolate(t2)}</button>`);
    }), e3("<!--]--></div>")) : e3('<div class="tags-con" data-v-21e55eaa><p class="no-data" data-v-21e55eaa>\u6682\u65E0\u5217\u8868</p></div>'), e3(ssrRenderComponent(S, { title: "Prompt\u8BB0\u5F55" }, { titleSide: withCtx((t2, a3, e4, o3) => {
      if (!a3)
        return [createVNode("span", { class: "title-side" }, "\u603B\u6570:" + toDisplayString(unref(R2)) + "\u6761", 1)];
      a3(`<span class="title-side" data-v-21e55eaa${o3}>\u603B\u6570:${ssrInterpolate(unref(R2))}\u6761</span>`);
    }), _: 1 }, s2)), unref(p2) && (null == (k3 = unref(p2)) ? void 0 : k3.length) ? (e3('<div class="history-con" data-v-21e55eaa><div class="button-con" data-v-21e55eaa><button class="btn btn-md btn-accent m-b-15" data-v-21e55eaa>\u6E05\u7A7A\u5386\u53F2</button></div><!--[-->'), ssrRenderList(unref(p2), (t2, o3) => {
      e3(`<div class="history-item" data-v-21e55eaa><p style="${ssrRenderStyle({ "font-weight": "bold", "margin-bottom": "4px" })}" data-v-21e55eaa>`), e3(0 === o3 ? ssrRenderComponent(A, { style: { color: "#67c23a", "font-size": "12px" } }, null, s2) : "<!---->"), e3(`<span data-v-21e55eaa>${ssrInterpolate(null == t2 ? void 0 : t2.time)}</span></p><p data-v-21e55eaa>${ssrInterpolate(null == t2 ? void 0 : t2.prompt)}</p><div class="history-button" data-v-21e55eaa><button class="btn btn-sm btn-secondary m-r-10" data-v-21e55eaa>`), ssrRenderSlot(a2.$slots, "icon", {}, () => {
        e3(ssrRenderComponent(M, { class: "m-r-4" }, null, s2));
      }, e3, s2), e3(' \u5220\u9664 </button><button class="btn btn-sm btn-accent m-r-10" data-v-21e55eaa>'), ssrRenderSlot(a2.$slots, "icon", {}, () => {
        e3(ssrRenderComponent(T, { class: "m-r-4" }, null, s2));
      }, e3, s2), e3(' \u590D\u5236 </button><button class="btn btn-sm btn-primary m-r-10" data-v-21e55eaa>'), ssrRenderSlot(a2.$slots, "icon", {}, () => {
        e3(ssrRenderComponent(q, { class: "m-r-4" }, null, s2));
      }, e3, s2), e3(" \u9009\u62E9 </button></div></div>");
    }), e3("<!--]--></div>")) : e3('<div class="tags-con" data-v-21e55eaa><p class="no-data" data-v-21e55eaa>\u6682\u65E0\u8BB0\u5F55</p></div>'), e3("</div>");
  };
} }), L = I.setup;
I.setup = (t2, a2) => {
  const e2 = useSSRContext();
  return (e2.modules || (e2.modules = /* @__PURE__ */ new Set())).add("pages/pc/utils/components/promptBeautiful.vue"), L ? L(t2, a2) : void 0;
};
const P = tn(I, [["__scopeId", "data-v-21e55eaa"]]);

export { P as default };
