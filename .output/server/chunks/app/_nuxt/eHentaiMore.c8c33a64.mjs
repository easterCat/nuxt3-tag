import d from './AreaTitle.60828984.mjs';
import { x } from './index.6b623cfb.mjs';
import { s, p } from './shop.4d5e891e.mjs';
import { Y, C as Ct, t as tn } from '../server.mjs';
import { defineComponent, ref, reactive, watch, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, unref, toDisplayString, renderSlot, createTextVNode, useSSRContext } from 'vue';
import { ElSwitch, ElSelect, ElOption, ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus/lib';
import { a } from './document-copy.11fbb28b.mjs';
import { t } from './shopping-trolley.94b396ca.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
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

const D = defineComponent({ __name: "eHentaiMore", __ssrInlineRender: true, props: { searchText: { type: String, default: "" } }, setup(o2) {
  const k2 = o2, { EhttApi: E2 } = x(), { copy: D2 } = s(), { addShop: I2 } = p(), J2 = Y(), N = ref(false), O = ref(false), W = ref(1), q = ref(20), B = ref(0), F = ref("hidden"), G = ref(""), K = ref([]);
  let P = reactive([]), Q = reactive([]), X = reactive([]), Y$1 = reactive([]), Z = reactive({ data: [] });
  const ee = new Worker("/nuxt3-tag/worker.js");
  ee.onmessage = function(e2) {
    const { type: l2, data: a2 } = e2.data;
    "all" === l2 && (Q = a2, X = a2, B.value = X.length, ne()), "select" === l2 && (X = a2, B.value = X.length, ne()), "search" === l2 && (X = a2, B.value = X.length, ne());
  }, ee.onerror = function(e2) {
    console.log(["worker ERROR: Line ", e2.lineno, " in ", e2.filename, ": ", e2.message].join(""));
  }, watch(N, (e2) => {
    "pc-tags-eh" === J2.name && e2 && !O.value && (O.value = true, le());
  }), watch(k2, (e2) => {
    "pc-tags-eh" === J2.name && oe(e2.searchText);
  }), watch(G, async (e2) => {
    "pc-tags-eh" === J2.name && ee.postMessage({ type: "select", data: Q, select: e2 });
  });
  const le = async () => {
    Z = await E2.getNameSpaceList(), K.value = Z.data;
    const e2 = await E2.getAllJsonData();
    P = JSON.parse(e2).data, ee.postMessage({ type: "all", data: P });
  }, ae = (e2) => {
    q.value = e2, W.value = 1, ne();
  }, te = (e2) => {
    W.value = e2, ne();
  }, ne = () => {
    Y$1 = X.slice((W.value - 1) * q.value, W.value * q.value), console.log("tableData :>> ", Y$1);
  }, oe = Ct((e2) => {
    G.value = "", ee.postMessage({ type: "search", data: Q, search: e2 });
  }, 1500);
  return (l2, a2, t2, n2) => {
    const o3 = d, i2 = ElSwitch, u2 = ElSelect, r2 = ElOption, k3 = ElTable, A2 = ElTableColumn, E3 = ElButton, J3 = t, O2 = a, P2 = ElPagination;
    a2(`<div${ssrRenderAttrs(mergeProps({ class: "eh-con" }, n2))} data-v-11642907>`), a2(ssrRenderComponent(o3, { title: "EH\u8D85\u591A\u6807\u7B7E\u5217\u8868" }, { titleSide: withCtx((e2, l3, a3, t3) => {
      if (!l3)
        return [createVNode(i2, { modelValue: N.value, "onUpdate:modelValue": (e3) => N.value = e3, size: "large", "inline-prompt": "", "inactive-text": "\u9690\u85CF", "active-text": "\u5F00\u542F", class: "title-side" }, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("span", { class: "eh-title-side-tip" }, "(31813\u4E2A\u6807\u7B7E\u7248\u672C,\u9AD8h,\u614E\u91CD)")];
      l3(ssrRenderComponent(i2, { modelValue: N.value, "onUpdate:modelValue": (e3) => N.value = e3, size: "large", "inline-prompt": "", "inactive-text": "\u9690\u85CF", "active-text": "\u5F00\u542F", class: "title-side" }, null, a3, t3)), l3(`<span class="eh-title-side-tip" data-v-11642907${t3}>(31813\u4E2A\u6807\u7B7E\u7248\u672C,\u9AD8h,\u614E\u91CD)</span>`);
    }), _: 1 }, t2)), N.value ? (a2('<div class="flex justify-between m-b-10" data-v-11642907>'), a2(ssrRenderComponent(u2, { modelValue: G.value, "onUpdate:modelValue": (e2) => G.value = e2, class: "m-2", placeholder: "\u547D\u540D\u7A7A\u95F4", size: "large" }, { default: withCtx((e2, l3, a3, t3) => {
      if (!l3)
        return [(openBlock(true), createBlock(Fragment, null, renderList(K.value, (e3) => {
          var l4;
          return openBlock(), createBlock(r2, { key: e3.value, label: `${null == e3 ? void 0 : e3.namespace} ${null == (l4 = null == e3 ? void 0 : e3.frontMatters) ? void 0 : l4.name} ${null == e3 ? void 0 : e3.count}\u6761`, value: e3.namespace }, null, 8, ["label", "value"]);
        }), 128))];
      l3("<!--[-->"), ssrRenderList(K.value, (e3) => {
        var n3;
        l3(ssrRenderComponent(r2, { key: e3.value, label: `${null == e3 ? void 0 : e3.namespace} ${null == (n3 = null == e3 ? void 0 : e3.frontMatters) ? void 0 : n3.name} ${null == e3 ? void 0 : e3.count}\u6761`, value: e3.namespace }, null, a3, t3));
      }), l3("<!--]-->");
    }), _: 1 }, t2)), a2(`<div class="control-blur-btns" data-v-11642907><button class="${ssrRenderClass([["hidden" === F.value ? "btn-accent" : "btn-secondary-30"], "btn btn-sm m-r-10"])}" data-v-11642907> \u9690\u85CF </button><button class="${ssrRenderClass([["flur" === F.value ? "btn-accent" : "btn-secondary-30"], "btn btn-sm m-r-10"])}" data-v-11642907> \u6A21\u7CCA </button><button class="${ssrRenderClass([["show" === F.value ? "btn-accent" : "btn-secondary-30"], "btn btn-sm m-r-10"])}" data-v-11642907> \u7F29\u5C0F </button><button class="${ssrRenderClass([["default" === F.value ? "btn-accent" : "btn-secondary-30"], "btn btn-sm"])}" data-v-11642907> \u539F\u56FE </button></div></div>`)) : a2("<!---->"), N.value ? a2(ssrRenderComponent(k3, { class: "m-b-10", data: unref(Y$1), border: "", stripe: "", size: "large", style: { width: "100%" } }, { default: withCtx((e2, a3, t3, n3) => {
      if (!a3)
        return [createVNode(A2, { prop: "namespace", label: "\u547D\u540D\u7A7A\u95F4", width: "130" }), createVNode(A2, { prop: "key", label: "\u539F\u59CB\u6807\u7B7E", width: "270" }, { default: withCtx((e3) => {
          var a4;
          return [createVNode("span", { class: "m-r-12" }, toDisplayString((null == (a4 = e3.row) ? void 0 : a4.key) || ""), 1), createVNode(E3, { size: "small", circle: "", onClick: (l3) => {
            var a5;
            return unref(I2)((null == (a5 = e3.row) ? void 0 : a5.key) || "");
          } }, { default: withCtx(() => [renderSlot(l2.$slots, "icon", {}, () => [createVNode(J3)], true)]), _: 2 }, 1032, ["onClick"]), createVNode(E3, { size: "small", circle: "", onClick: (l3) => {
            var a5;
            return unref(D2)((null == (a5 = e3.row) ? void 0 : a5.key) || "");
          } }, { default: withCtx(() => [renderSlot(l2.$slots, "icon", {}, () => [createVNode(O2)], true)]), _: 2 }, 1032, ["onClick"])];
        }), _: 3 }), createVNode(A2, { prop: "value", label: "\u540D\u79F0", width: "170" }, { default: withCtx((e3) => {
          var l3, a4, t4;
          return [createTextVNode(toDisplayString((null == (t4 = null == (a4 = null == (l3 = e3.row) ? void 0 : l3.value) ? void 0 : a4.name) ? void 0 : t4.text) || ""), 1)];
        }), _: 1 }), createVNode(A2, { prop: "value", label: "\u63CF\u8FF0" }, { default: withCtx((e3) => {
          var l3, a4, t4;
          return [createVNode("div", { class: ["table-intro", { "show-img": "show" === F.value, "hidden-img": "hidden" === F.value, "flur-img": "flur" === F.value, "default-img": "default" === F.value }], innerHTML: (null == (t4 = null == (a4 = null == (l3 = e3.row) ? void 0 : l3.value) ? void 0 : a4.intro) ? void 0 : t4.html) || "" }, null, 10, ["innerHTML"])];
        }), _: 1 }), createVNode(A2, { prop: "value", label: "\u6570\u636E\u5E93\u9875\u9762", width: "180" }, { default: withCtx((e3) => {
          var l3, a4, t4;
          return [createVNode("div", { innerHTML: (null == (t4 = null == (a4 = null == (l3 = e3.row) ? void 0 : l3.value) ? void 0 : a4.links) ? void 0 : t4.html.replace(/(<a)/g, "<a target='_blank'")) || "" }, null, 8, ["innerHTML"])];
        }), _: 1 })];
      a3(ssrRenderComponent(A2, { prop: "namespace", label: "\u547D\u540D\u7A7A\u95F4", width: "130" }, null, t3, n3)), a3(ssrRenderComponent(A2, { prop: "key", label: "\u539F\u59CB\u6807\u7B7E", width: "270" }, { default: withCtx((e3, a4, t4, n4) => {
        var o4, i3;
        if (!a4)
          return [createVNode("span", { class: "m-r-12" }, toDisplayString((null == (i3 = e3.row) ? void 0 : i3.key) || ""), 1), createVNode(E3, { size: "small", circle: "", onClick: (l3) => {
            var a5;
            return unref(I2)((null == (a5 = e3.row) ? void 0 : a5.key) || "");
          } }, { default: withCtx(() => [renderSlot(l2.$slots, "icon", {}, () => [createVNode(J3)], true)]), _: 2 }, 1032, ["onClick"]), createVNode(E3, { size: "small", circle: "", onClick: (l3) => {
            var a5;
            return unref(D2)((null == (a5 = e3.row) ? void 0 : a5.key) || "");
          } }, { default: withCtx(() => [renderSlot(l2.$slots, "icon", {}, () => [createVNode(O2)], true)]), _: 2 }, 1032, ["onClick"])];
        a4(`<span class="m-r-12" data-v-11642907${n4}>${ssrInterpolate((null == (o4 = e3.row) ? void 0 : o4.key) || "")}</span>`), a4(ssrRenderComponent(E3, { size: "small", circle: "", onClick: (l3) => {
          var a5;
          return unref(I2)((null == (a5 = e3.row) ? void 0 : a5.key) || "");
        } }, { default: withCtx((e4, a5, t5, n5) => {
          if (!a5)
            return [renderSlot(l2.$slots, "icon", {}, () => [createVNode(J3)], true)];
          ssrRenderSlot(l2.$slots, "icon", {}, () => {
            a5(ssrRenderComponent(J3, null, null, t5, n5));
          }, a5, t5, n5);
        }), _: 2 }, t4, n4)), a4(ssrRenderComponent(E3, { size: "small", circle: "", onClick: (l3) => {
          var a5;
          return unref(D2)((null == (a5 = e3.row) ? void 0 : a5.key) || "");
        } }, { default: withCtx((e4, a5, t5, n5) => {
          if (!a5)
            return [renderSlot(l2.$slots, "icon", {}, () => [createVNode(O2)], true)];
          ssrRenderSlot(l2.$slots, "icon", {}, () => {
            a5(ssrRenderComponent(O2, null, null, t5, n5));
          }, a5, t5, n5);
        }), _: 2 }, t4, n4));
      }), _: 3 }, t3, n3)), a3(ssrRenderComponent(A2, { prop: "value", label: "\u540D\u79F0", width: "170" }, { default: withCtx((e3, l3, a4, t4) => {
        var n4, o4, i3, u3, r3, s2;
        if (!l3)
          return [createTextVNode(toDisplayString((null == (s2 = null == (r3 = null == (u3 = e3.row) ? void 0 : u3.value) ? void 0 : r3.name) ? void 0 : s2.text) || ""), 1)];
        l3(`${ssrInterpolate((null == (i3 = null == (o4 = null == (n4 = e3.row) ? void 0 : n4.value) ? void 0 : o4.name) ? void 0 : i3.text) || "")}`);
      }), _: 1 }, t3, n3)), a3(ssrRenderComponent(A2, { prop: "value", label: "\u63CF\u8FF0" }, { default: withCtx((e3, l3, a4, t4) => {
        var n4, o4, i3, u3, r3, s2;
        if (!l3)
          return [createVNode("div", { class: ["table-intro", { "show-img": "show" === F.value, "hidden-img": "hidden" === F.value, "flur-img": "flur" === F.value, "default-img": "default" === F.value }], innerHTML: (null == (s2 = null == (r3 = null == (u3 = e3.row) ? void 0 : u3.value) ? void 0 : r3.intro) ? void 0 : s2.html) || "" }, null, 10, ["innerHTML"])];
        l3(`<div class="${ssrRenderClass([{ "show-img": "show" === F.value, "hidden-img": "hidden" === F.value, "flur-img": "flur" === F.value, "default-img": "default" === F.value }, "table-intro"])}" data-v-11642907${t4}>${(null == (i3 = null == (o4 = null == (n4 = e3.row) ? void 0 : n4.value) ? void 0 : o4.intro) ? void 0 : i3.html) || ""}</div>`);
      }), _: 1 }, t3, n3)), a3(ssrRenderComponent(A2, { prop: "value", label: "\u6570\u636E\u5E93\u9875\u9762", width: "180" }, { default: withCtx((e3, l3, a4, t4) => {
        var n4, o4, i3, u3, r3, s2;
        if (!l3)
          return [createVNode("div", { innerHTML: (null == (s2 = null == (r3 = null == (u3 = e3.row) ? void 0 : u3.value) ? void 0 : r3.links) ? void 0 : s2.html.replace(/(<a)/g, "<a target='_blank'")) || "" }, null, 8, ["innerHTML"])];
        l3(`<div data-v-11642907${t4}>${(null == (i3 = null == (o4 = null == (n4 = e3.row) ? void 0 : n4.value) ? void 0 : o4.links) ? void 0 : i3.html.replace(/(<a)/g, "<a target='_blank'")) || ""}</div>`);
      }), _: 1 }, t3, n3));
    }), _: 3 }, t2)) : a2("<!---->"), N.value ? (a2('<div class="demo-pagination-block" data-v-11642907>'), a2(ssrRenderComponent(P2, { "current-page": W.value, "onUpdate:current-page": (e2) => W.value = e2, "page-size": q.value, "onUpdate:page-size": (e2) => q.value = e2, "page-sizes": [20, 50, 100], background: true, layout: "total, sizes, prev, pager, next, jumper", total: B.value, onSizeChange: ae, onCurrentChange: te }, null, t2)), a2("</div>")) : a2("<!---->"), a2("</div>");
  };
} }), I = D.setup;
D.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("pages/pc/tags/components/eHentaiMore.vue"), I ? I(e2, l2) : void 0;
};
const J = tn(D, [["__scopeId", "data-v-11642907"]]);

export { J as default };
