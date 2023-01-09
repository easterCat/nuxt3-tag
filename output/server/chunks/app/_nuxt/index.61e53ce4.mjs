import I from './Icon.f5d77518.mjs';
import o from './AppAnimate.f960f33b.mjs';
import { x } from './index.8cd5f84c.mjs';
import { R, Y as Y$1, M, t as tn } from '../server.mjs';
import { createElementVNode, defineComponent, withAsyncContext, reactive, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, isRef, toDisplayString, renderSlot, openBlock, createBlock, withDirectives, vModelText, createCommentVNode, useSSRContext, createElementBlock } from 'vue';
import { s, p } from './shop.4d5e891e.mjs';
import { a } from './document-copy.11fbb28b.mjs';
import { t } from './shopping-trolley.94b396ca.mjs';
import { ElRadioGroup, ElRadio, ElButton } from 'element-plus/lib';
import { v, i, h } from './plus.ff77b18c.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import q$1 from 'vuedraggable';
import { uuid } from 'vue-uuid';
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
import 'element-plus';
import 'vue3-clipboard';

const q = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, F = [createElementVNode("path", { fill: "currentColor", d: "m199.04 672.64l193.984 112l224-387.968l-193.92-112l-224 388.032zm-23.872 60.16l32.896 148.288l144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112l56.704-98.112l-193.984-112l-56.64 98.112zM104.32 708.8l384-665.024l304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z" }, null, -1)];
const P = { name: "ep-edit-pen", render: function(a2, e2) {
  return openBlock(), createElementBlock("svg", q, F);
} }, Q = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, W = [createElementVNode("path", { fill: "currentColor", d: "M512 128L128 447.936V896h255.936V640H640v256h255.936V447.936z" }, null, -1)];
const X = { name: "ep-home-filled", render: function(a2, e2) {
  return openBlock(), createElementBlock("svg", Q, W);
} }, Y = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, Z = [createElementVNode("path", { fill: "currentColor", d: "M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z" }, null, -1)];
const aa = { name: "ep-arrow-left-bold", render: function(a2, e2) {
  return openBlock(), createElementBlock("svg", Y, Z);
} }, ea = defineComponent({ __name: "index", __ssrInlineRender: true, props: ["modelValue"], async setup(n2) {
  let d2, c2;
  const { DefaultTagsApi: w2 } = x(), K2 = ([d2, c2] = withAsyncContext(() => w2.getTags()), d2 = await d2, c2(), d2), q2 = JSON.parse(K2);
  R().public.GELBOORU_TOKEN;
  const F2 = reactive({ animation: 400, group: "people", disabled: false, ghostClass: "ghost" }), { GelbooruApi: Q2, ShopApi: W2 } = x(), Y2 = Y$1(), Z2 = M(), ea2 = ref("1"), la2 = ref(""), ta2 = ref(false), ia = ref(1), sa = ref(0), { copy: oa } = s(), { addShop: na, renameShopName: da, shopList: ca, shop: va, onlySetShop: ra, initShop: ua, setShop: ma, clearShop: pa, removeShopByName: fa, copyShop: xa, addOneCircle: ha, removeOneCircle: ba, createNewShopItem: $a } = p(), ga = ref(q2.class), ya = ref(ga.value[0].data), Ca = ref([]), ka = ref([]);
  watch(ca, (a2) => {
    "pc-design" === Y2.name && ra(a2.map((a3) => a3.text).join(", "));
  });
  const za = () => {
    Z2.go(-1);
  }, _a = () => {
    Z2.replace("/pc/home");
  }, wa = () => {
    ta2.value = true;
  }, Sa = () => {
    ma(la2.value), ta2.value = false;
  }, ja = async () => {
    var a2;
    const e2 = await W2.translate({ text: va.value, type: 1 });
    (null == (a2 = null == e2 ? void 0 : e2.data) ? void 0 : a2.translateText).split("\uFF0C").forEach((a3, e3) => {
      ca.value[e3].translateText = a3;
    });
  };
  return (l2, t2, i2, s2) => {
    const n3 = aa, d3 = X, c3 = I, v2 = ElRadioGroup, r2 = ElRadio, u2 = v, m2 = i, w3 = P, S2 = h, j2 = ElButton, K3 = t, q3 = a, Q3 = o;
    t2(`<div${ssrRenderAttrs(mergeProps({ class: ["design-page page", { white: "2" === ea2.value }] }, s2))} data-v-691c23a8><div class="header" data-v-691c23a8><div class="back" data-v-691c23a8>`), t2(ssrRenderComponent(n3, { onClick: za }, null, i2)), t2(ssrRenderComponent(d3, { onClick: _a }, null, i2)), t2('</div><div class="header-center" data-v-691c23a8>'), t2(ssrRenderComponent(c3, { size: "20", name: "material-symbols:shopping-cart", onClick: wa }, null, i2)), t2(ssrRenderComponent(c3, { size: "24", name: "material-symbols:new-label-rounded", onClick: unref($a) }, null, i2)), t2(ssrRenderComponent(c3, { size: "20", name: "material-symbols:content-copy-rounded", onClick: unref(xa) }, null, i2)), t2(ssrRenderComponent(c3, { size: "19", name: "majesticons:translate", onClick: ja }, null, i2)), t2(ssrRenderComponent(c3, { size: "20", name: "material-symbols:delete", onClick: unref(pa) }, null, i2)), t2('</div><div class="header-right" data-v-691c23a8>'), t2(ssrRenderComponent(v2, { modelValue: ea2.value, "onUpdate:modelValue": (a2) => ea2.value = a2, class: "ml-4" }, { default: withCtx((a2, e2, l3, t3) => {
      if (!e2)
        return [createVNode(r2, { label: "1", size: "large" }, { default: withCtx(() => [createTextVNode("\u6DF1\u8272")]), _: 1 }), createVNode(r2, { label: "2", size: "large" }, { default: withCtx(() => [createTextVNode("\u6D45\u8272")]), _: 1 })];
      e2(ssrRenderComponent(r2, { label: "1", size: "large" }, { default: withCtx((a3, e3, l4, t4) => {
        if (!e3)
          return [createTextVNode("\u6DF1\u8272")];
        e3("\u6DF1\u8272");
      }), _: 1 }, l3, t3)), e2(ssrRenderComponent(r2, { label: "2", size: "large" }, { default: withCtx((a3, e3, l4, t4) => {
        if (!e3)
          return [createTextVNode("\u6D45\u8272")];
        e3("\u6D45\u8272");
      }), _: 1 }, l3, t3));
    }), _: 1 }, i2)), t2(`</div></div><div class="body" data-v-691c23a8><div class="left" data-v-691c23a8><div class="left-layer1" data-v-691c23a8><div class="layer-top" data-v-691c23a8>\u6570\u636E\u6765\u6E90</div><div class="layer-bottom" data-v-691c23a8><div class="${ssrRenderClass([{ "item-active": 1 === ia.value }, "left-menu"])}" data-v-691c23a8> \u5E38\u89C4\u6807\u7B7E </div><div class="${ssrRenderClass([{ "item-active": 2 === ia.value }, "left-menu"])}" data-v-691c23a8> Gelbooru\u6807\u7B7E </div><div class="${ssrRenderClass([{ "item-active": 3 === ia.value }, "left-menu"])}" data-v-691c23a8> EH\u6807\u7B7E(500\u4E2A) </div><div class="${ssrRenderClass([{ "item-active": 4 === ia.value }, "left-menu"])}" data-v-691c23a8> EH\u6807\u7B7E(31000\u4E2A) </div></div><div class="layer-top" data-v-691c23a8>\u6807\u7B7E\u7C7B\u522B</div>`), 1 === ia.value ? (t2('<div class="type-list" data-v-691c23a8><!--[-->'), ssrRenderList(ga.value, (a2, e2) => {
      t2(`<div class="${ssrRenderClass([{ "type-item-active ": e2 === sa.value }, "type-item"])}" data-v-691c23a8>${ssrInterpolate(null == a2 ? void 0 : a2.name)}</div>`);
    }), t2("<!--]--></div>")) : t2("<!---->"), 2 === ia.value ? (t2('<div class="type-list" data-v-691c23a8><!--[-->'), ssrRenderList(Ca.value, (a2, e2) => {
      t2(`<div class="${ssrRenderClass([{ "type-item-active ": e2 === sa.value }, "type-item"])}" data-v-691c23a8>${ssrInterpolate(null == a2 ? void 0 : a2.name)}(${ssrInterpolate(null == a2 ? void 0 : a2.level)}) </div>`);
    }), t2("<!--]--></div>")) : t2("<!---->"), t2('</div></div><div class="center" data-v-691c23a8><div class="shop-card-con" data-v-691c23a8>'), t2(ssrRenderComponent(unref(q$1), { modelValue: unref(ca), "onUpdate:modelValue": (a2) => isRef(ca) ? ca.value = a2 : null, "component-data": { name: "list" }, "drag-options": unref(F2), "item-key": (a2) => {
      ((a3) => {
        uuid.v4();
      })();
    } }, { item: withCtx(({ element: a2 }, e2, l3, t3) => {
      if (!e2)
        return [createVNode("div", { class: "shop-item" }, [createVNode("div", null, [createVNode("span", null, toDisplayString(a2.text), 1), createVNode("span", { class: "tran-text" }, toDisplayString(a2.translateText), 1), createVNode(u2, { class: "add", onClick: (e3) => unref(ha)(a2.text) }, null, 8, ["onClick"]), createVNode(m2, { class: "minus", onClick: (e3) => unref(ba)(a2.text) }, null, 8, ["onClick"]), createVNode(w3, { class: "remove", onClick: (e3) => unref(da)(a2.text) }, null, 8, ["onClick"]), createVNode(S2, { class: "remove", onClick: (e3) => unref(fa)(a2.text) }, null, 8, ["onClick"])])])];
      e2(`<div class="shop-item" data-v-691c23a8${t3}><div data-v-691c23a8${t3}><span data-v-691c23a8${t3}>${ssrInterpolate(a2.text)}</span><span class="tran-text" data-v-691c23a8${t3}>${ssrInterpolate(a2.translateText)}</span>`), e2(ssrRenderComponent(u2, { class: "add", onClick: (e3) => unref(ha)(a2.text) }, null, l3, t3)), e2(ssrRenderComponent(m2, { class: "minus", onClick: (e3) => unref(ba)(a2.text) }, null, l3, t3)), e2(ssrRenderComponent(w3, { class: "remove", onClick: (e3) => unref(da)(a2.text) }, null, l3, t3)), e2(ssrRenderComponent(S2, { class: "remove", onClick: (e3) => unref(fa)(a2.text) }, null, l3, t3)), e2("</div></div>");
    }), _: 1 }, i2)), t2('</div></div><div class="right" data-v-691c23a8><div class="tag-list" data-v-691c23a8>'), 1 === ia.value ? (t2("<!--[-->"), ssrRenderList(ya.value, (a2, e2) => {
      t2(`<div class="tag-item" data-v-691c23a8><div class="text-con" data-v-691c23a8><p class="zh" data-v-691c23a8>${ssrInterpolate(null == a2 ? void 0 : a2.zh)} ${ssrInterpolate(null == a2 ? void 0 : a2.en)}</p></div><div data-v-691c23a8>`), t2(ssrRenderComponent(j2, { size: "small", circle: "", onClick: (e3) => unref(na)(null == a2 ? void 0 : a2.en) }, { default: withCtx((a3, e3, t3, i3) => {
        if (!e3)
          return [renderSlot(l2.$slots, "icon", {}, () => [createVNode(K3)], true)];
        ssrRenderSlot(l2.$slots, "icon", {}, () => {
          e3(ssrRenderComponent(K3, null, null, t3, i3));
        }, e3, t3, i3);
      }), _: 2 }, i2)), t2(ssrRenderComponent(j2, { size: "small", circle: "", onClick: (e3) => unref(oa)(null == a2 ? void 0 : a2.en) }, { default: withCtx((a3, e3, t3, i3) => {
        if (!e3)
          return [renderSlot(l2.$slots, "icon", {}, () => [createVNode(q3)], true)];
        ssrRenderSlot(l2.$slots, "icon", {}, () => {
          e3(ssrRenderComponent(q3, null, null, t3, i3));
        }, e3, t3, i3);
      }), _: 2 }, i2)), t2("</div></div>");
    }), t2("<!--]-->")) : t2("<!---->"), 2 === ia.value ? (t2("<!--[-->"), ssrRenderList(ka.value, (a2, e2) => {
      t2(`<div class="tag-item" data-v-691c23a8><div class="text-con" data-v-691c23a8><p class="zh" data-v-691c23a8>${ssrInterpolate(null == a2 ? void 0 : a2.t_name)} ${ssrInterpolate(null == a2 ? void 0 : a2.name)}</p></div><div data-v-691c23a8>`), t2(ssrRenderComponent(j2, { size: "small", circle: "", onClick: (e3) => unref(na)(null == a2 ? void 0 : a2.en) }, { default: withCtx((a3, e3, t3, i3) => {
        if (!e3)
          return [renderSlot(l2.$slots, "icon", {}, () => [createVNode(K3)], true)];
        ssrRenderSlot(l2.$slots, "icon", {}, () => {
          e3(ssrRenderComponent(K3, null, null, t3, i3));
        }, e3, t3, i3);
      }), _: 2 }, i2)), t2(ssrRenderComponent(j2, { size: "small", circle: "", onClick: (e3) => unref(oa)(null == a2 ? void 0 : a2.en) }, { default: withCtx((a3, e3, t3, i3) => {
        if (!e3)
          return [renderSlot(l2.$slots, "icon", {}, () => [createVNode(q3)], true)];
        ssrRenderSlot(l2.$slots, "icon", {}, () => {
          e3(ssrRenderComponent(q3, null, null, t3, i3));
        }, e3, t3, i3);
      }), _: 2 }, i2)), t2("</div></div>");
    }), t2("<!--]-->")) : t2("<!---->"), t2("</div></div></div>"), t2(ssrRenderComponent(Q3, null, { default: withCtx((a2, e2, l3, t3) => {
      if (!e2)
        return [ta2.value ? (openBlock(), createBlock("div", { key: 0, class: "import-wrapper" }, [createVNode("div", { class: "import-layer" }, [withDirectives(createVNode("textarea", { "onUpdate:modelValue": (a3) => la2.value = a3, type: "text" }, null, 8, ["onUpdate:modelValue"]), [[vModelText, la2.value]])]), createVNode("div", { class: "import-button" }, [createVNode("button", { onClick: () => ta2.value = false }, "\u53D6\u6D88", 8, ["onClick"]), createVNode("button", { onClick: Sa }, "\u786E\u5B9A")])])) : createCommentVNode("", true)];
      ta2.value ? e2(`<div class="import-wrapper" data-v-691c23a8${t3}><div class="import-layer" data-v-691c23a8${t3}><textarea type="text" data-v-691c23a8${t3}>${ssrInterpolate(la2.value)}</textarea></div><div class="import-button" data-v-691c23a8${t3}><button data-v-691c23a8${t3}>\u53D6\u6D88</button><button data-v-691c23a8${t3}>\u786E\u5B9A</button></div></div>`) : e2("<!---->");
    }), _: 1 }, i2)), t2("</div>");
  };
} }), la = ea.setup;
ea.setup = (a2, e2) => {
  const l2 = useSSRContext();
  return (l2.modules || (l2.modules = /* @__PURE__ */ new Set())).add("pages/pc/design/index.vue"), la ? la(a2, e2) : void 0;
};
const ta = tn(ea, [["__scopeId", "data-v-691c23a8"]]);

export { ta as default };
