import o from './AppAnimate.f960f33b.mjs';
import { createElementVNode, defineComponent, watch, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, createTextVNode, unref, useSSRContext, createElementBlock } from 'vue';
import { p, s } from './shop.4d5e891e.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { t as tn } from '../server.mjs';
import 'element-plus/lib';
import 'vue3-clipboard';
import 'element-plus';
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

const f = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, z = [createElementVNode("path", { fill: "currentColor", d: "M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z" }, null, -1), createElementVNode("path", { fill: "currentColor", d: "M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z" }, null, -1)];
const b = { name: "ep-copy-document", render: function(l2, a2) {
  return openBlock(), createElementBlock("svg", f, z);
} }, y = defineComponent({ __name: "TemplateDetail", __ssrInlineRender: true, props: ["modelValue", "currentTemplate"], emits: ["update:modelValue"], setup(n2, { emit: a2 }) {
  const t2 = n2;
  watch(() => t2.modelValue, (l2) => {
    l2 && z2();
  });
  const { setShop: v2 } = p(), { copy: x2 } = s(), f2 = () => {
    y2(), a2("update:modelValue", false);
  }, z2 = () => {
    document.body.style.overflowY = "hidden", document.addEventListener("touchmove", function(l2) {
      l2.preventDefault();
    }, false);
  }, y2 = () => {
    document.body.style.overflowY = "", document.removeEventListener("touchmove", function(l2) {
      l2.preventDefault();
    }, false);
  }, C2 = () => {
    var l2;
    v2(null == (l2 = t2.currentTemplate) ? void 0 : l2.prompt);
  };
  return (a3, t3, c2, v3) => {
    const m2 = o, $2 = b;
    t3(`<div${ssrRenderAttrs(v3)} data-v-229ccdc6>`), t3(ssrRenderComponent(m2, null, { default: withCtx((l2, a4, t4, c3) => {
      var p2, v4, m3, T2, z3, b2, y3, w2, V, g, j, A, D, H, E, I, L, M, S, Y, B, R, q, F, G, J, K, N, O, P, Q, U, W, X, Z, ll, el, nl, al, tl, cl, pl, rl, dl, ul, ol, il, sl, vl, ml, $l, Tl, hl, _l;
      if (!a4)
        return [n2.modelValue ? (openBlock(), createBlock("div", { key: 0, class: "template-preview" }, [createVNode("div", { class: "preview-wrap", onClick: f2 }), createVNode("div", { class: "preview-con" }, [createVNode("div", { class: "left" }, [createVNode("div", { class: "list-con" }, [createVNode("ul", null, [createVNode("li", null, [createVNode("span", null, "name :"), createVNode("span", null, toDisplayString(null == (N = n2.currentTemplate) ? void 0 : N.name), 1)]), (null == (O = n2.currentTemplate) ? void 0 : O.author) ? (openBlock(), createBlock("li", { key: 0 }, [createVNode("span", null, "author :"), createVNode("span", null, toDisplayString(null == (P = n2.currentTemplate) ? void 0 : P.author), 1)])) : createCommentVNode("", true), `${null == (Q = n2.currentTemplate) ? void 0 : Q.like}` ? (openBlock(), createBlock("li", { key: 1 }, [createVNode("span", null, "like :"), createVNode("span", null, toDisplayString(null == (U = n2.currentTemplate) ? void 0 : U.like), 1)])) : createCommentVNode("", true), createVNode("li", null, [createVNode("span", null, "prompt :"), createVNode("span", null, [createTextVNode(toDisplayString(null == (W = n2.currentTemplate) ? void 0 : W.prompt) + " ", 1), createVNode($2, { onClick: (l3) => {
          var e2;
          return unref(x2)(null == (e2 = n2.currentTemplate) ? void 0 : e2.prompt);
        } }, null, 8, ["onClick"])])]), (null == (X = n2.currentTemplate) ? void 0 : X.prompt_zh) ? (openBlock(), createBlock("li", { key: 2 }, [createVNode("span", null, "prompt_zh :"), createVNode("span", null, [createTextVNode(toDisplayString(null == (Z = n2.currentTemplate) ? void 0 : Z.prompt_zh) + " ", 1), createVNode($2, { onClick: (l3) => {
          var e2;
          return unref(x2)(null == (e2 = n2.currentTemplate) ? void 0 : e2.prompt_zh);
        } }, null, 8, ["onClick"])])])) : createCommentVNode("", true), (null == (ll = n2.currentTemplate) ? void 0 : ll.n_prompt) ? (openBlock(), createBlock("li", { key: 3 }, [createVNode("span", null, "n_prompt :"), createVNode("span", null, [createTextVNode(toDisplayString(null == (el = n2.currentTemplate) ? void 0 : el.n_prompt) + " ", 1), createVNode($2, { onClick: (l3) => {
          var e2;
          return unref(x2)(null == (e2 = n2.currentTemplate) ? void 0 : e2.n_prompt);
        } }, null, 8, ["onClick"])])])) : createCommentVNode("", true), (null == (nl = n2.currentTemplate) ? void 0 : nl.n_prompt_zh) ? (openBlock(), createBlock("li", { key: 4 }, [createVNode("span", null, "n_prompt_zh :"), createVNode("span", null, [createTextVNode(toDisplayString(null == (al = n2.currentTemplate) ? void 0 : al.n_prompt_zh) + " ", 1), createVNode($2, { onClick: (l3) => {
          var e2;
          return unref(x2)(null == (e2 = n2.currentTemplate) ? void 0 : e2.n_prompt_zh);
        } }, null, 8, ["onClick"])])])) : createCommentVNode("", true), (null == (tl = n2.currentTemplate) ? void 0 : tl.step) ? (openBlock(), createBlock("li", { key: 5 }, [createVNode("span", null, "step :"), createVNode("span", null, toDisplayString(null == (cl = n2.currentTemplate) ? void 0 : cl.step), 1)])) : createCommentVNode("", true), (null == (pl = n2.currentTemplate) ? void 0 : pl.sampler) ? (openBlock(), createBlock("li", { key: 6 }, [createVNode("span", null, "sampler :"), createVNode("span", null, toDisplayString(null == (rl = n2.currentTemplate) ? void 0 : rl.sampler), 1)])) : createCommentVNode("", true), (null == (dl = n2.currentTemplate) ? void 0 : dl.scale) ? (openBlock(), createBlock("li", { key: 7 }, [createVNode("span", null, "scale :"), createVNode("span", null, toDisplayString(null == (ul = n2.currentTemplate) ? void 0 : ul.scale), 1)])) : createCommentVNode("", true), (null == (ol = n2.currentTemplate) ? void 0 : ol.seed) ? (openBlock(), createBlock("li", { key: 8 }, [createVNode("span", null, "seed :"), createVNode("span", null, toDisplayString(null == (il = n2.currentTemplate) ? void 0 : il.seed), 1)])) : createCommentVNode("", true), (null == (sl = n2.currentTemplate) ? void 0 : sl.size) ? (openBlock(), createBlock("li", { key: 9 }, [createVNode("span", null, "size :"), createVNode("span", null, toDisplayString(null == (vl = n2.currentTemplate) ? void 0 : vl.size), 1)])) : createCommentVNode("", true), (null == (ml = n2.currentTemplate) ? void 0 : ml.model) ? (openBlock(), createBlock("li", { key: 10 }, [createVNode("span", null, "model :"), createVNode("span", null, toDisplayString(null == ($l = n2.currentTemplate) ? void 0 : $l.model), 1)])) : createCommentVNode("", true), (null == (Tl = n2.currentTemplate) ? void 0 : Tl.desc) ? (openBlock(), createBlock("li", { key: 11 }, [createVNode("span", null, "desc :"), createVNode("span", null, toDisplayString(null == (hl = n2.currentTemplate) ? void 0 : hl.desc), 1)])) : createCommentVNode("", true)])])]), createVNode("div", { class: "right" }, [createVNode("div", { class: "image-con" }, [createVNode("img", { src: null == (_l = n2.currentTemplate) ? void 0 : _l.preview, alt: "" }, null, 8, ["src"])]), createVNode("div", { class: "button-con" }, [createVNode("button", { class: "btn btn-secondary m-r-10", onClick: f2 }, "\u5173\u95ED"), createVNode("button", { class: "btn btn-accent", onClick: C2 }, "\u5BFC\u5165\u8D2D\u7269\u8F66")])])])])) : createCommentVNode("", true)];
      n2.modelValue ? (a4(`<div class="template-preview" data-v-229ccdc6${c3}><div class="preview-wrap" data-v-229ccdc6${c3}></div><div class="preview-con" data-v-229ccdc6${c3}><div class="left" data-v-229ccdc6${c3}><div class="list-con" data-v-229ccdc6${c3}><ul data-v-229ccdc6${c3}><li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>name :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (p2 = n2.currentTemplate) ? void 0 : p2.name)}</span></li>`), (null == (v4 = n2.currentTemplate) ? void 0 : v4.author) ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>author :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (m3 = n2.currentTemplate) ? void 0 : m3.author)}</span></li>`) : a4("<!---->"), `${null == (T2 = n2.currentTemplate) ? void 0 : T2.like}` ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>like :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (z3 = n2.currentTemplate) ? void 0 : z3.like)}</span></li>`) : a4("<!---->"), a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>prompt :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (b2 = n2.currentTemplate) ? void 0 : b2.prompt)} `), a4(ssrRenderComponent($2, { onClick: (l3) => {
        var e2;
        return unref(x2)(null == (e2 = n2.currentTemplate) ? void 0 : e2.prompt);
      } }, null, t4, c3)), a4("</span></li>"), (null == (y3 = n2.currentTemplate) ? void 0 : y3.prompt_zh) ? (a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>prompt_zh :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (w2 = n2.currentTemplate) ? void 0 : w2.prompt_zh)} `), a4(ssrRenderComponent($2, { onClick: (l3) => {
        var e2;
        return unref(x2)(null == (e2 = n2.currentTemplate) ? void 0 : e2.prompt_zh);
      } }, null, t4, c3)), a4("</span></li>")) : a4("<!---->"), (null == (V = n2.currentTemplate) ? void 0 : V.n_prompt) ? (a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>n_prompt :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (g = n2.currentTemplate) ? void 0 : g.n_prompt)} `), a4(ssrRenderComponent($2, { onClick: (l3) => {
        var e2;
        return unref(x2)(null == (e2 = n2.currentTemplate) ? void 0 : e2.n_prompt);
      } }, null, t4, c3)), a4("</span></li>")) : a4("<!---->"), (null == (j = n2.currentTemplate) ? void 0 : j.n_prompt_zh) ? (a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>n_prompt_zh :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (A = n2.currentTemplate) ? void 0 : A.n_prompt_zh)} `), a4(ssrRenderComponent($2, { onClick: (l3) => {
        var e2;
        return unref(x2)(null == (e2 = n2.currentTemplate) ? void 0 : e2.n_prompt_zh);
      } }, null, t4, c3)), a4("</span></li>")) : a4("<!---->"), (null == (D = n2.currentTemplate) ? void 0 : D.step) ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>step :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (H = n2.currentTemplate) ? void 0 : H.step)}</span></li>`) : a4("<!---->"), (null == (E = n2.currentTemplate) ? void 0 : E.sampler) ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>sampler :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (I = n2.currentTemplate) ? void 0 : I.sampler)}</span></li>`) : a4("<!---->"), (null == (L = n2.currentTemplate) ? void 0 : L.scale) ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>scale :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (M = n2.currentTemplate) ? void 0 : M.scale)}</span></li>`) : a4("<!---->"), (null == (S = n2.currentTemplate) ? void 0 : S.seed) ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>seed :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (Y = n2.currentTemplate) ? void 0 : Y.seed)}</span></li>`) : a4("<!---->"), (null == (B = n2.currentTemplate) ? void 0 : B.size) ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>size :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (R = n2.currentTemplate) ? void 0 : R.size)}</span></li>`) : a4("<!---->"), (null == (q = n2.currentTemplate) ? void 0 : q.model) ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>model :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (F = n2.currentTemplate) ? void 0 : F.model)}</span></li>`) : a4("<!---->"), (null == (G = n2.currentTemplate) ? void 0 : G.desc) ? a4(`<li data-v-229ccdc6${c3}><span data-v-229ccdc6${c3}>desc :</span><span data-v-229ccdc6${c3}>${ssrInterpolate(null == (J = n2.currentTemplate) ? void 0 : J.desc)}</span></li>`) : a4("<!---->"), a4(`</ul></div></div><div class="right" data-v-229ccdc6${c3}><div class="image-con" data-v-229ccdc6${c3}><img${ssrRenderAttr("src", null == (K = n2.currentTemplate) ? void 0 : K.preview)} alt="" data-v-229ccdc6${c3}></div><div class="button-con" data-v-229ccdc6${c3}><button class="btn btn-secondary m-r-10" data-v-229ccdc6${c3}>\u5173\u95ED</button><button class="btn btn-accent" data-v-229ccdc6${c3}>\u5BFC\u5165\u8D2D\u7269\u8F66</button></div></div></div></div>`)) : a4("<!---->");
    }), _: 1 }, c2)), t3("</div>");
  };
} }), C = y.setup;
y.setup = (l2, e2) => {
  const n2 = useSSRContext();
  return (n2.modules || (n2.modules = /* @__PURE__ */ new Set())).add("components/pc/TemplateDetail.vue"), C ? C(l2, e2) : void 0;
};
const w = tn(y, [["__scopeId", "data-v-229ccdc6"]]);

export { w as default };
