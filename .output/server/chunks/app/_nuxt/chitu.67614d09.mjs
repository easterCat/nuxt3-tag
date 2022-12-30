import n from './client-only.f5bddb5b.mjs';
import g from './AppBanner.aa5c1424.mjs';
import d from './AreaTitle.60828984.mjs';
import { _ as f } from './nuxt-img.6facc9db.mjs';
import w from './TemplateDetail.5ee75c59.mjs';
import { s, p } from './shop.4d5e891e.mjs';
import { x } from './index.6b623cfb.mjs';
import { t as tn, Q } from '../server.mjs';
import { defineComponent, reactive, ref, onUnmounted, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { a } from './document-copy.11fbb28b.mjs';
import { t } from './shopping-trolley.94b396ca.mjs';
import { ElSwitch, ElTooltip } from 'element-plus/lib';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import ue from 'lodash';
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
import 'vue3-clipboard';
import 'element-plus';
import 'vue-uuid';

const S = defineComponent({ __name: "chitu", __ssrInlineRender: true, setup(r2) {
  s(), p();
  const { TemplateApi: j2 } = x(), $2 = async (e2) => {
    const t2 = (await Q(e2, "$XHYNvCeXRl")).data;
    return JSON.parse(t2._rawValue);
  };
  reactive([{ name: "\u53C2\u8003\u56FE", file: $2("https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/NovelAI_cankaotu.json") }, { name: "\u4EBA\u7269", file: $2("https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/NovelAI_huageren.json") }, { name: "\u7269\u4F53", file: $2("https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/NovelAI_huagewuti.json") }, { name: "\u6784\u56FE", file: $2("https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/NovelAI_goutu.json") }, { name: "\u753B\u98CE", file: $2("https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/NovelAI_huafeng.json") }, { name: "\u6B63\u9762\u8BCD\u7EC4", file: $2("https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/NovelAI_zhengmiantag.json") }, { name: "\u8D1F\u9762\u8BCD\u7EC4", file: $2("https://raw.githubusercontent.com/easterCat/nuxt-utils-assets/main/json/NovelAI_fumiantag.json") }]);
  const S2 = ref([]), T2 = ref(0), H2 = ref(true), U = ref(""), X = ref({}), E = ref(false), R = ref(1), Y = ref(50), B = ref(window.document.body);
  let D = [], J = 0;
  const L = (e2) => {
    U.value = e2;
  }, O = () => {
    S2.value = S2.value.concat(D.slice(50 * J, 50 * (J + 1)));
  }, q = ue.throttle(() => {
    const e2 = B.value.scrollTop;
    B.value.scrollHeight - (e2 + (document.documentElement.clientHeight || document.body.clientHeight)) <= 100 && (console.log("\u89E6\u5E95"), T2.value ? (J++, O()) : (R.value++, (async () => {
      const e3 = await j2.getTemplatesChitu({ pageIndex: R.value, pageSize: Y.value });
      S2.value = [...S2.value, ...(null == e3 ? void 0 : e3.templates) ? e3.templates : []];
    })()));
  }, 1500);
  return onUnmounted(() => {
    B.value.removeEventListener("scroll", q);
  }), (n2, i2, s2, u2) => {
    const r3 = n, m2 = g, c2 = d, p2 = ElSwitch, j3 = f, z2 = ElTooltip, $3 = t, U2 = a, R2 = w;
    i2(`<div${ssrRenderAttrs(mergeProps({ class: "chitu-tags-page page" }, u2))} data-v-2542acc7>`), i2(ssrRenderComponent(r3, null, null, s2)), i2('<div class="content" data-v-2542acc7>'), i2(ssrRenderComponent(m2, { placeholder: "\u641C\u7D22\u6807\u7B7E", onSearchChange: L }, null, s2)), i2(ssrRenderComponent(c2, { title: "\u6807\u7B7E\u7C7B\u522B" }, null, s2)), i2('<div class="type-list" data-v-2542acc7>'), i2(ssrRenderComponent(r3, null, null, s2)), i2("</div>"), i2(ssrRenderComponent(c2, { title: "\u6807\u7B7E\u5217\u8868" }, { titleSide: withCtx((e2, t2, l2, a2) => {
      if (!t2)
        return [createVNode(p2, { modelValue: H2.value, "onUpdate:modelValue": (e3) => H2.value = e3, size: "large", "inline-prompt": "", "inactive-text": "\u9690\u85CFImage", "active-text": "\u5F00\u542FImage", class: "title-side" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
      t2(ssrRenderComponent(p2, { modelValue: H2.value, "onUpdate:modelValue": (e3) => H2.value = e3, size: "large", "inline-prompt": "", "inactive-text": "\u9690\u85CFImage", "active-text": "\u5F00\u542FImage", class: "title-side" }, null, l2, a2));
    }), _: 1 }, s2)), unref(J) ? (i2('<div class="tag-list" data-v-2542acc7>'), i2(ssrRenderComponent(r3, null, null, s2)), i2("</div>")) : i2("<!---->"), T2.value ? (i2('<div class="tag-list" data-v-2542acc7>'), i2(ssrRenderComponent(r3, null, null, s2)), i2("</div>")) : (i2('<div class="tag-list" data-v-2542acc7><!--[-->'), ssrRenderList(S2.value, (e2, t2) => {
      i2(`<div class="tag-item-img ll-media bg-base-100"${ssrRenderAttr("data-index", t2)} data-v-2542acc7>`), H2.value && 5 !== T2.value && 6 !== T2.value ? (i2('<div class="image-con" data-v-2542acc7>'), (null == e2 ? void 0 : e2.file1) ? i2(ssrRenderComponent(j3, { src: null == e2 ? void 0 : e2.file1, onClick: (t3) => ((e3) => {
        T2.value ? (X.value = { author: e3.author, n_prompt: e3.n_prompt, preview: e3.preview, model: e3.model, prompt: e3.prompt, prompt_zh: e3.prompt_zh, name: e3.name, desc: e3.desc }, E.value = true) : (X.value = { name: e3.name, author: e3.author, preview: e3.preview, prompt: e3.prompt, prompt_zh: e3.prompt_zh, n_prompt: e3.n_prompt, model: e3.model, desc: e3.desc, like: e3.like }, E.value = true);
      })(e2) }, null, s2)) : i2("<!---->"), i2("</div>")) : i2("<!---->"), i2('<div class="text-con" data-v-2542acc7>'), i2(ssrRenderComponent(z2, { class: "box-item", effect: "dark", content: null == e2 ? void 0 : e2.prompt, placement: "top" }, { default: withCtx((t3, l2, a2, o2) => {
        if (!l2)
          return [(null == e2 ? void 0 : e2.title) ? (openBlock(), createBlock("p", { key: 0, class: "en" }, toDisplayString((null == e2 ? void 0 : e2.title.length) > 24 ? (null == e2 ? void 0 : e2.title.slice(0, 24)) + "..." : null == e2 ? void 0 : e2.title), 1)) : (openBlock(), createBlock("p", { key: 1, class: "en" }, toDisplayString((null == e2 ? void 0 : e2.prompt.length) > 24 ? (null == e2 ? void 0 : e2.prompt.slice(0, 24)) + "..." : null == e2 ? void 0 : e2.prompt), 1))];
        (null == e2 ? void 0 : e2.title) ? l2(`<p class="en" data-v-2542acc7${o2}>${ssrInterpolate((null == e2 ? void 0 : e2.title.length) > 24 ? (null == e2 ? void 0 : e2.title.slice(0, 24)) + "..." : null == e2 ? void 0 : e2.title)}</p>`) : l2(`<p class="en" data-v-2542acc7${o2}>${ssrInterpolate((null == e2 ? void 0 : e2.prompt.length) > 24 ? (null == e2 ? void 0 : e2.prompt.slice(0, 24)) + "..." : null == e2 ? void 0 : e2.prompt)}</p>`);
      }), _: 2 }, s2)), i2('</div><div class="button-con" data-v-2542acc7><button class="btn btn-sm btn-circle btn-accent m-r-10" data-v-2542acc7>'), i2(ssrRenderComponent($3, null, null, s2)), i2('</button><button class="btn btn-sm btn-circle btn-secondary" data-v-2542acc7>'), i2(ssrRenderComponent(U2, null, null, s2)), i2("</button></div></div>");
    }), i2("<!--]--></div>")), i2("</div>"), i2(ssrRenderComponent(R2, { modelValue: E.value, "onUpdate:modelValue": (e2) => E.value = e2, "current-template": X.value }, null, s2)), i2("</div>");
  };
} }), T = S.setup;
S.setup = (e2, t2) => {
  const l2 = useSSRContext();
  return (l2.modules || (l2.modules = /* @__PURE__ */ new Set())).add("pages/pc/tags/chitu.vue"), T ? T(e2, t2) : void 0;
};
const H = tn(S, [["__scopeId", "data-v-2542acc7"]]);

export { H as default };
