import I from './Icon.80675534.mjs';
import d from './AreaTitle.60828984.mjs';
import { x } from './index.6b623cfb.mjs';
import { U, t as tn } from '../server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, isRef, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { s, p } from './shop.4d5e891e.mjs';
import { a } from './document-copy.11fbb28b.mjs';
import { m, h } from './opportunity.3ae6b5be.mjs';
import { ElRow, ElCol, ElSelect, ElOption, ElInput } from 'element-plus/lib';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
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
import 'vue-uuid';
import 'element-plus';
import 'vue3-clipboard';

const A = defineComponent({ __name: "generateImage", __ssrInlineRender: true, setup(u2) {
  x(), U(), s(), p();
  const x2 = ref(""), S2 = ref(""), A2 = ref(1), T2 = ref([]), B2 = ref(0), D = ref([]), E = ref(false), F = ref([{ label: "\u56FE\u7247\u5927\u5C0F 512*768", value: "512*768" }, { label: "\u56FE\u7247\u5927\u5C0F 768*512", value: "768*512" }, { label: "\u56FE\u7247\u5927\u5C0F 512*512", value: "512*512" }, { label: "\u56FE\u7247\u5927\u5C0F 768*768", value: "768*768" }, { label: "\u56FE\u7247\u5927\u5C0F 768*1024", value: "768*1024" }, { label: "\u56FE\u7247\u5927\u5C0F 1024*768", value: "1024*768" }]), G = ref("512*768"), H = ref([{ label: "k_euler_ancestral", value: "k_euler_ancestral" }, { label: "k_euler", value: "k_euler" }, { label: "k_lms", value: "k_lms" }, { label: "plms", value: "plms" }, { label: "ddim", value: "ddim" }]), J = ref("k_euler_ancestral"), K = ref("lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"), L = (l2) => {
    A2.value = l2.target.value || 1;
  };
  return (a2, t2, u3, n2) => {
    var f2;
    const g2 = I, M = ElRow, N = ElCol, O = ElSelect, Q = ElOption, W = ElInput, X = d, Y = m, Z = h, ll = a;
    t2(`<div${ssrRenderAttrs(mergeProps({ class: "tranfer-con" }, n2))} data-v-7509db7a><div class="button-con" data-v-7509db7a><button class="btn btn-secondary btn-sm m-r-10" data-v-7509db7a> \u6E05\u7A7A `), t2(ssrRenderComponent(g2, { class: "m-l-6", name: "ant-design:delete-filled" }, null, u3)), t2('</button><button class="btn btn-sm btn-accent m-r-10" data-v-7509db7a> \u8D2D\u7269\u8F66\u5BFC\u5165 '), t2(ssrRenderComponent(g2, { class: "m-l-6", name: "clarity:shopping-cart-solid-badged" }, null, u3)), t2(`</button><button class="btn btn-primary btn-sm m-r-10" data-v-7509db7a>${ssrInterpolate(unref(E) ? "\u56FE\u7247\u751F\u6210\u4E2D" : "\u751F\u6210")} `), unref(E) ? t2(ssrRenderComponent(g2, { class: "m-l-6", name: "line-md:loading-twotone-loop" }, null, u3)) : t2(ssrRenderComponent(g2, { class: "m-l-6", name: "entypo:brush" }, null, u3)), t2("</button></div>"), t2(ssrRenderComponent(M, { gutter: 20 }, { default: withCtx((l2, e2, a3, t3) => {
      if (!e2)
        return [createVNode(N, { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 }, { default: withCtx(() => [createVNode(O, { modelValue: unref(G), "onUpdate:modelValue": (l3) => isRef(G) ? G.value = l3 : null, placeholder: "\u56FE\u7247\u5927\u5C0F", size: "large", class: "w-full" }, { default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(F), (l3) => (openBlock(), createBlock(Q, { key: l3.value, label: l3.label, value: l3.value }, null, 8, ["label", "value"]))), 128))]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(N, { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 }, { default: withCtx(() => [createVNode(O, { modelValue: unref(J), "onUpdate:modelValue": (l3) => isRef(J) ? J.value = l3 : null, placeholder: "\u91C7\u6837\u5668", size: "large", class: "w-full" }, { default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(H), (l3) => (openBlock(), createBlock(Q, { key: l3.value, label: l3.label, value: l3.value }, null, 8, ["label", "value"]))), 128))]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(N, { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }, { default: withCtx(() => [createVNode(W, { modelValue: unref(S2), "onUpdate:modelValue": (l3) => isRef(S2) ? S2.value = l3 : null, placeholder: "\u8BF7\u8F93\u5165url,\u4F8B\u5982: https://cube-joan-released-philips.trycloudflare.com/generate-stream", clearable: "", size: "large" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(N, { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }, { default: withCtx(() => [createVNode(W, { modelValue: unref(x2), "onUpdate:modelValue": (l3) => isRef(x2) ? x2.value = l3 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165\u6B63\u9762Prompt", rows: 8, clearable: "", autosize: { minRows: 8, maxRows: 8 }, "show-word-limit": "", maxlength: "3000" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(N, { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }, { default: withCtx(() => [createVNode(W, { modelValue: unref(K), "onUpdate:modelValue": (l3) => isRef(K) ? K.value = l3 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165\u8D1F\u9762Prompt", rows: 8, clearable: "", autosize: { minRows: 8, maxRows: 8 }, "show-word-limit": "", maxlength: "3000" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(N, { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }, { default: withCtx(() => [createVNode("input", { type: "range", min: "1", max: "9", value: unref(A2), class: "range range-xs", step: "1", onChange: L }, null, 40, ["value"]), createVNode("div", { class: "flex justify-between w-full text-xs" }, [createVNode("span", null, "1\u5F20"), createVNode("span", null, "2\u5F20"), createVNode("span", null, "3\u5F20"), createVNode("span", null, "4\u5F20"), createVNode("span", null, "5\u5F20"), createVNode("span", null, "6\u5F20"), createVNode("span", null, "7\u5F20"), createVNode("span", null, "8\u5F20"), createVNode("span", null, "9\u5F20")])]), _: 1 })];
      e2(ssrRenderComponent(N, { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 }, { default: withCtx((l3, e3, a4, t4) => {
        if (!e3)
          return [createVNode(O, { modelValue: unref(G), "onUpdate:modelValue": (l4) => isRef(G) ? G.value = l4 : null, placeholder: "\u56FE\u7247\u5927\u5C0F", size: "large", class: "w-full" }, { default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(F), (l4) => (openBlock(), createBlock(Q, { key: l4.value, label: l4.label, value: l4.value }, null, 8, ["label", "value"]))), 128))]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])];
        e3(ssrRenderComponent(O, { modelValue: unref(G), "onUpdate:modelValue": (l4) => isRef(G) ? G.value = l4 : null, placeholder: "\u56FE\u7247\u5927\u5C0F", size: "large", class: "w-full" }, { default: withCtx((l4, e4, a5, t5) => {
          if (!e4)
            return [(openBlock(true), createBlock(Fragment, null, renderList(unref(F), (l5) => (openBlock(), createBlock(Q, { key: l5.value, label: l5.label, value: l5.value }, null, 8, ["label", "value"]))), 128))];
          e4("<!--[-->"), ssrRenderList(unref(F), (l5) => {
            e4(ssrRenderComponent(Q, { key: l5.value, label: l5.label, value: l5.value }, null, a5, t5));
          }), e4("<!--]-->");
        }), _: 1 }, a4, t4));
      }), _: 1 }, a3, t3)), e2(ssrRenderComponent(N, { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 }, { default: withCtx((l3, e3, a4, t4) => {
        if (!e3)
          return [createVNode(O, { modelValue: unref(J), "onUpdate:modelValue": (l4) => isRef(J) ? J.value = l4 : null, placeholder: "\u91C7\u6837\u5668", size: "large", class: "w-full" }, { default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(unref(H), (l4) => (openBlock(), createBlock(Q, { key: l4.value, label: l4.label, value: l4.value }, null, 8, ["label", "value"]))), 128))]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])];
        e3(ssrRenderComponent(O, { modelValue: unref(J), "onUpdate:modelValue": (l4) => isRef(J) ? J.value = l4 : null, placeholder: "\u91C7\u6837\u5668", size: "large", class: "w-full" }, { default: withCtx((l4, e4, a5, t5) => {
          if (!e4)
            return [(openBlock(true), createBlock(Fragment, null, renderList(unref(H), (l5) => (openBlock(), createBlock(Q, { key: l5.value, label: l5.label, value: l5.value }, null, 8, ["label", "value"]))), 128))];
          e4("<!--[-->"), ssrRenderList(unref(H), (l5) => {
            e4(ssrRenderComponent(Q, { key: l5.value, label: l5.label, value: l5.value }, null, a5, t5));
          }), e4("<!--]-->");
        }), _: 1 }, a4, t4));
      }), _: 1 }, a3, t3)), e2(ssrRenderComponent(N, { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }, { default: withCtx((l3, e3, a4, t4) => {
        if (!e3)
          return [createVNode(W, { modelValue: unref(S2), "onUpdate:modelValue": (l4) => isRef(S2) ? S2.value = l4 : null, placeholder: "\u8BF7\u8F93\u5165url,\u4F8B\u5982: https://cube-joan-released-philips.trycloudflare.com/generate-stream", clearable: "", size: "large" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
        e3(ssrRenderComponent(W, { modelValue: unref(S2), "onUpdate:modelValue": (l4) => isRef(S2) ? S2.value = l4 : null, placeholder: "\u8BF7\u8F93\u5165url,\u4F8B\u5982: https://cube-joan-released-philips.trycloudflare.com/generate-stream", clearable: "", size: "large" }, null, a4, t4));
      }), _: 1 }, a3, t3)), e2(ssrRenderComponent(N, { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }, { default: withCtx((l3, e3, a4, t4) => {
        if (!e3)
          return [createVNode(W, { modelValue: unref(x2), "onUpdate:modelValue": (l4) => isRef(x2) ? x2.value = l4 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165\u6B63\u9762Prompt", rows: 8, clearable: "", autosize: { minRows: 8, maxRows: 8 }, "show-word-limit": "", maxlength: "3000" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
        e3(ssrRenderComponent(W, { modelValue: unref(x2), "onUpdate:modelValue": (l4) => isRef(x2) ? x2.value = l4 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165\u6B63\u9762Prompt", rows: 8, clearable: "", autosize: { minRows: 8, maxRows: 8 }, "show-word-limit": "", maxlength: "3000" }, null, a4, t4));
      }), _: 1 }, a3, t3)), e2(ssrRenderComponent(N, { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }, { default: withCtx((l3, e3, a4, t4) => {
        if (!e3)
          return [createVNode(W, { modelValue: unref(K), "onUpdate:modelValue": (l4) => isRef(K) ? K.value = l4 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165\u8D1F\u9762Prompt", rows: 8, clearable: "", autosize: { minRows: 8, maxRows: 8 }, "show-word-limit": "", maxlength: "3000" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
        e3(ssrRenderComponent(W, { modelValue: unref(K), "onUpdate:modelValue": (l4) => isRef(K) ? K.value = l4 : null, type: "textarea", placeholder: "\u8BF7\u8F93\u5165\u8D1F\u9762Prompt", rows: 8, clearable: "", autosize: { minRows: 8, maxRows: 8 }, "show-word-limit": "", maxlength: "3000" }, null, a4, t4));
      }), _: 1 }, a3, t3)), e2(ssrRenderComponent(N, { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }, { default: withCtx((l3, e3, a4, t4) => {
        if (!e3)
          return [createVNode("input", { type: "range", min: "1", max: "9", value: unref(A2), class: "range range-xs", step: "1", onChange: L }, null, 40, ["value"]), createVNode("div", { class: "flex justify-between w-full text-xs" }, [createVNode("span", null, "1\u5F20"), createVNode("span", null, "2\u5F20"), createVNode("span", null, "3\u5F20"), createVNode("span", null, "4\u5F20"), createVNode("span", null, "5\u5F20"), createVNode("span", null, "6\u5F20"), createVNode("span", null, "7\u5F20"), createVNode("span", null, "8\u5F20"), createVNode("span", null, "9\u5F20")])];
        e3(`<input type="range" min="1" max="9"${ssrRenderAttr("value", unref(A2))} class="range range-xs" step="1" data-v-7509db7a${t4}><div class="flex justify-between w-full text-xs" data-v-7509db7a${t4}><span data-v-7509db7a${t4}>1\u5F20</span><span data-v-7509db7a${t4}>2\u5F20</span><span data-v-7509db7a${t4}>3\u5F20</span><span data-v-7509db7a${t4}>4\u5F20</span><span data-v-7509db7a${t4}>5\u5F20</span><span data-v-7509db7a${t4}>6\u5F20</span><span data-v-7509db7a${t4}>7\u5F20</span><span data-v-7509db7a${t4}>8\u5F20</span><span data-v-7509db7a${t4}>9\u5F20</span></div>`);
      }), _: 1 }, a3, t3));
    }), _: 1 }, u3)), unref(D) ? (t2('<div class="g-image m-t-20" data-v-7509db7a><ul data-v-7509db7a><!--[-->'), ssrRenderList(unref(D), (l2, e2) => {
      t2(`<li data-v-7509db7a><img${ssrRenderAttr("src", l2)} alt="" data-v-7509db7a></li>`);
    }), t2("<!--]--></ul></div>")) : t2("<!---->"), t2(ssrRenderComponent(X, { title: "\u5386\u53F2\u8BB0\u5F55" }, { titleSide: withCtx((l2, e2, a3, t3) => {
      if (!e2)
        return [createVNode("span", { class: "title-side" }, "\u603B\u6570:" + toDisplayString(unref(B2)) + "\u6761", 1)];
      e2(`<span class="title-side" data-v-7509db7a${t3}>\u603B\u6570:${ssrInterpolate(unref(B2))}\u6761</span>`);
    }), _: 1 }, u3)), unref(T2) && (null == (f2 = unref(T2)) ? void 0 : f2.length) ? (t2('<div class="history-con" data-v-7509db7a><div class="button-con" data-v-7509db7a><button class="btn btn-accent btn-sm" data-v-7509db7a>\u6E05\u7A7A\u5386\u53F2</button></div><!--[-->'), ssrRenderList(unref(T2), (l2, e2) => {
      t2(`<div class="history-item" data-v-7509db7a><p style="${ssrRenderStyle({ "font-weight": "bold", "margin-bottom": "4px" })}" data-v-7509db7a>`), t2(0 === e2 ? ssrRenderComponent(Y, { style: { color: "#67c23a", "font-size": "12px" } }, null, u3) : "<!---->"), t2(`<span data-v-7509db7a>${ssrInterpolate(null == l2 ? void 0 : l2.time)}</span></p><p data-v-7509db7a>${ssrInterpolate(null == l2 ? void 0 : l2.prompt)}</p><div class="history-button" data-v-7509db7a><button class="btn btn-sm btn-secondary m-r-10" data-v-7509db7a> \u5220\u9664 `), ssrRenderSlot(a2.$slots, "icon", {}, () => {
        t2(ssrRenderComponent(Z, { class: "m-l-6" }, null, u3));
      }, t2, u3), t2('</button><button class="btn btn-sm btn-accent m-r-10" data-v-7509db7a> \u590D\u5236 '), ssrRenderSlot(a2.$slots, "icon", {}, () => {
        t2(ssrRenderComponent(ll, { class: "m-l-6" }, null, u3));
      }, t2, u3), t2('</button><button class="btn btn-sm btn-primary" data-v-7509db7a> \u9009\u62E9 '), t2(ssrRenderComponent(g2, { class: "m-l-6", name: "icon-park-solid:full-selection" }, null, u3)), t2("</button></div></div>");
    }), t2("<!--]--></div>")) : t2('<div class="tags-con" data-v-7509db7a><p class="no-data" data-v-7509db7a>\u6682\u65E0\u8BB0\u5F55</p></div>'), t2("</div>");
  };
} }), T = A.setup;
A.setup = (l2, e2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("pages/pc/draw/components/generateImage.vue"), T ? T(l2, e2) : void 0;
};
const B = tn(A, [["__scopeId", "data-v-7509db7a"]]);

export { B as default };
