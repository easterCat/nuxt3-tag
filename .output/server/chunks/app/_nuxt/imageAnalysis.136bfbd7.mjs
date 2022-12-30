import I from './Icon.80675534.mjs';
import d from './AreaTitle.60828984.mjs';
import { x } from './index.6b623cfb.mjs';
import { R, U as U$1, t as tn } from '../server.mjs';
import { createElementVNode, defineComponent, ref, mergeProps, unref, withCtx, createVNode, isRef, toDisplayString, createTextVNode, useSSRContext, openBlock, createElementBlock } from 'vue';
import { p } from './shop.4d5e891e.mjs';
import { ElRow, ElCol, ElUpload } from 'element-plus/lib';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
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

const S = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, U = [createElementVNode("path", { fill: "currentColor", d: "M544 864V672h128L512 480L352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z" }, null, -1)];
const L = { name: "ep-upload-filled", render: function(a2, e2) {
  return openBlock(), createElementBlock("svg", S, U);
} }, P = defineComponent({ __name: "imageAnalysis", __ssrInlineRender: true, emits: ["setPreview"], setup(t2, { emit: n2 }) {
  x();
  const c2 = R();
  U$1(), p();
  const o2 = ref(c2.public.FLASK_BASE_API + "/danbooru/upload");
  ref([]), ref(0);
  const b2 = ref([]), I2 = ref(""), S2 = ref([]), U2 = ref(false), P2 = (a2) => {
    I2.value = a2.name;
  }, B2 = (a2, e2, l2) => {
    const { code: s2, data: t3 } = a2, n3 = R().public.IP_ADDRESS;
    if (200 === s2) {
      const { file_name: a3, file_path: e3 } = t3, i2 = l2.length;
      l2[i2 - 1].name = a3, l2[i2 - 1].url = n3 + e3, b2.value = l2;
    }
  }, D2 = (a2) => {
    n2("setPreview", a2.url);
  }, E = (a2) => {
    console.log(a2);
    const e2 = b2.value.findIndex((e3) => e3.name === a2.name);
    e2 >= 0 && b2.value.splice(e2, 1);
  };
  return (l2, i2, s2, t3) => {
    const n3 = I, c3 = ElRow, m2 = ElCol, _2 = ElUpload, H = L, R = d;
    i2(`<div${ssrRenderAttrs(mergeProps({ class: "tranfer-con" }, t3))} data-v-48caea2a><div class="button-con" data-v-48caea2a><button class="btn btn-secondary m-r-10 m-b-10" data-v-48caea2a> \u6E05\u7A7A `), i2(ssrRenderComponent(n3, { class: "m-l-6", name: "ant-design:delete-filled" }, null, s2)), i2('</button><button class="btn btn-accent m-r-10 m-b-10" data-v-48caea2a> \u5BFC\u51FA\u8D2D\u7269\u8F66 '), i2(ssrRenderComponent(n3, { class: "m-l-6", name: "clarity:shopping-cart-solid-badged" }, null, s2)), i2(`</button><button class="btn btn-primary m-r-10 m-b-10" data-v-48caea2a>${ssrInterpolate(unref(U2) ? "\u56FE\u7247\u89E3\u6790\u4E2D" : "\u89E3\u6790\u56FE\u7247")} `), unref(U2) ? i2(ssrRenderComponent(n3, { class: "m-l-6", name: "line-md:loading-twotone-loop" }, null, s2)) : i2(ssrRenderComponent(n3, { class: "m-l-6", name: "mdi:comment-edit" }, null, s2)), i2("</button></div>"), i2(ssrRenderComponent(c3, { gutter: 20 }, { default: withCtx((a2, e2, l3, i3) => {
      if (!e2)
        return [createVNode(m2, { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }, { default: withCtx(() => [createVNode(_2, { "file-list": unref(b2), "onUpdate:file-list": (a3) => isRef(b2) ? b2.value = a3 : null, class: "upload-demo", drag: "", action: unref(o2), accept: "image/png, image/jpeg, image/jpg", multiple: "", "list-type": "picture", "on-success": B2 }, { file: withCtx(({ file: a3 }) => [createVNode("div", { class: "upload-image-list-item" }, [createVNode("span", { onClick: (e3) => P2(a3) }, [createVNode("img", { class: "el-upload-list__item-thumbnail", src: a3.url, alt: "" }, null, 8, ["src"]), createVNode("span", { class: "m-l-6" }, toDisplayString(a3.name), 1), createVNode("input", { class: "checkbox m-l-10", type: "checkbox", checked: unref(I2) === a3.name }, null, 8, ["checked"])], 8, ["onClick"]), createVNode("span", { class: "el-upload-list__item-actions" }, [createVNode("span", null, [createVNode(n3, { name: "material-symbols:image", size: "28", onClick: (e3) => D2(a3) }, null, 8, ["onClick"])]), createVNode("span", { class: "m-l-10" }, [createVNode(n3, { name: "ic:baseline-delete", size: "28", onClick: (e3) => E(a3) }, null, 8, ["onClick"])])])])]), tip: withCtx(() => [createVNode("div", { class: "el-upload__tip" }, "jpg/png\u6587\u4EF6\u683C\u5F0F")]), default: withCtx(() => [createVNode("i", { class: "el-icon el-icon--upload" }, [createVNode(H)]), createVNode("div", { class: "el-upload__text" }, [createTextVNode(" \u62D6\u52A8\u56FE\u7247\u5230\u5F53\u524D\u533A\u57DF \u6216 "), createVNode("em", null, "\u70B9\u51FB\u4E0A\u4F20")])]), _: 1 }, 8, ["file-list", "onUpdate:file-list", "action"])]), _: 1 })];
      e2(ssrRenderComponent(m2, { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }, { default: withCtx((a3, e3, l4, i4) => {
        if (!e3)
          return [createVNode(_2, { "file-list": unref(b2), "onUpdate:file-list": (a4) => isRef(b2) ? b2.value = a4 : null, class: "upload-demo", drag: "", action: unref(o2), accept: "image/png, image/jpeg, image/jpg", multiple: "", "list-type": "picture", "on-success": B2 }, { file: withCtx(({ file: a4 }) => [createVNode("div", { class: "upload-image-list-item" }, [createVNode("span", { onClick: (e4) => P2(a4) }, [createVNode("img", { class: "el-upload-list__item-thumbnail", src: a4.url, alt: "" }, null, 8, ["src"]), createVNode("span", { class: "m-l-6" }, toDisplayString(a4.name), 1), createVNode("input", { class: "checkbox m-l-10", type: "checkbox", checked: unref(I2) === a4.name }, null, 8, ["checked"])], 8, ["onClick"]), createVNode("span", { class: "el-upload-list__item-actions" }, [createVNode("span", null, [createVNode(n3, { name: "material-symbols:image", size: "28", onClick: (e4) => D2(a4) }, null, 8, ["onClick"])]), createVNode("span", { class: "m-l-10" }, [createVNode(n3, { name: "ic:baseline-delete", size: "28", onClick: (e4) => E(a4) }, null, 8, ["onClick"])])])])]), tip: withCtx(() => [createVNode("div", { class: "el-upload__tip" }, "jpg/png\u6587\u4EF6\u683C\u5F0F")]), default: withCtx(() => [createVNode("i", { class: "el-icon el-icon--upload" }, [createVNode(H)]), createVNode("div", { class: "el-upload__text" }, [createTextVNode(" \u62D6\u52A8\u56FE\u7247\u5230\u5F53\u524D\u533A\u57DF \u6216 "), createVNode("em", null, "\u70B9\u51FB\u4E0A\u4F20")])]), _: 1 }, 8, ["file-list", "onUpdate:file-list", "action"])];
        e3(ssrRenderComponent(_2, { "file-list": unref(b2), "onUpdate:file-list": (a4) => isRef(b2) ? b2.value = a4 : null, class: "upload-demo", drag: "", action: unref(o2), accept: "image/png, image/jpeg, image/jpg", multiple: "", "list-type": "picture", "on-success": B2 }, { file: withCtx(({ file: a4 }, e4, l5, i5) => {
          if (!e4)
            return [createVNode("div", { class: "upload-image-list-item" }, [createVNode("span", { onClick: (e5) => P2(a4) }, [createVNode("img", { class: "el-upload-list__item-thumbnail", src: a4.url, alt: "" }, null, 8, ["src"]), createVNode("span", { class: "m-l-6" }, toDisplayString(a4.name), 1), createVNode("input", { class: "checkbox m-l-10", type: "checkbox", checked: unref(I2) === a4.name }, null, 8, ["checked"])], 8, ["onClick"]), createVNode("span", { class: "el-upload-list__item-actions" }, [createVNode("span", null, [createVNode(n3, { name: "material-symbols:image", size: "28", onClick: (e5) => D2(a4) }, null, 8, ["onClick"])]), createVNode("span", { class: "m-l-10" }, [createVNode(n3, { name: "ic:baseline-delete", size: "28", onClick: (e5) => E(a4) }, null, 8, ["onClick"])])])])];
          e4(`<div class="upload-image-list-item" data-v-48caea2a${i5}><span data-v-48caea2a${i5}><img class="el-upload-list__item-thumbnail"${ssrRenderAttr("src", a4.url)} alt="" data-v-48caea2a${i5}><span class="m-l-6" data-v-48caea2a${i5}>${ssrInterpolate(a4.name)}</span><input class="checkbox m-l-10" type="checkbox"${ssrIncludeBooleanAttr(unref(I2) === a4.name) ? " checked" : ""} data-v-48caea2a${i5}></span><span class="el-upload-list__item-actions" data-v-48caea2a${i5}><span data-v-48caea2a${i5}>`), e4(ssrRenderComponent(n3, { name: "material-symbols:image", size: "28", onClick: (e5) => D2(a4) }, null, l5, i5)), e4(`</span><span class="m-l-10" data-v-48caea2a${i5}>`), e4(ssrRenderComponent(n3, { name: "ic:baseline-delete", size: "28", onClick: (e5) => E(a4) }, null, l5, i5)), e4("</span></span></div>");
        }), tip: withCtx((a4, e4, l5, i5) => {
          if (!e4)
            return [createVNode("div", { class: "el-upload__tip" }, "jpg/png\u6587\u4EF6\u683C\u5F0F")];
          e4(`<div class="el-upload__tip" data-v-48caea2a${i5}>jpg/png\u6587\u4EF6\u683C\u5F0F</div>`);
        }), default: withCtx((a4, e4, l5, i5) => {
          if (!e4)
            return [createVNode("i", { class: "el-icon el-icon--upload" }, [createVNode(H)]), createVNode("div", { class: "el-upload__text" }, [createTextVNode(" \u62D6\u52A8\u56FE\u7247\u5230\u5F53\u524D\u533A\u57DF \u6216 "), createVNode("em", null, "\u70B9\u51FB\u4E0A\u4F20")])];
          e4(`<i class="el-icon el-icon--upload" data-v-48caea2a${i5}>`), e4(ssrRenderComponent(H, null, null, l5, i5)), e4(`</i><div class="el-upload__text" data-v-48caea2a${i5}> \u62D6\u52A8\u56FE\u7247\u5230\u5F53\u524D\u533A\u57DF \u6216 <em data-v-48caea2a${i5}>\u70B9\u51FB\u4E0A\u4F20</em></div>`);
        }), _: 1 }, l4, i4));
      }), _: 1 }, l3, i3));
    }), _: 1 }, s2)), i2(ssrRenderComponent(R, { title: "\u89E3\u6790\u6807\u7B7E " }, { titleSide: withCtx((a2, e2, l3, i3) => {
      if (!e2)
        return [createVNode("span", { style: { "font-size": "12px" } }, "(\u57FA\u4E8Edeepdanbooru\u89E3\u6790)")];
      e2(`<span style="${ssrRenderStyle({ "font-size": "12px" })}" data-v-48caea2a${i3}>(\u57FA\u4E8Edeepdanbooru\u89E3\u6790)</span>`);
    }), _: 1 }, s2)), i2('<div class="tags-con" data-v-48caea2a><!--[-->'), ssrRenderList(unref(S2), (a2, e2) => {
      var l3;
      i2(`<button class="btn btn-sm btn-secondary m-r-10 m-b-10" data-v-48caea2a><span data-v-48caea2a>${ssrInterpolate(null == (l3 = a2.key) ? void 0 : l3.toLowerCase())}</span><div class="badge m-l-8" data-v-48caea2a>${ssrInterpolate(a2.value)}</div></button>`);
    }), i2("<!--]--></div></div>");
  };
} }), B = P.setup;
P.setup = (a2, e2) => {
  const l2 = useSSRContext();
  return (l2.modules || (l2.modules = /* @__PURE__ */ new Set())).add("pages/pc/utils/components/imageAnalysis.vue"), B ? B(a2, e2) : void 0;
};
const D = tn(P, [["__scopeId", "data-v-48caea2a"]]);

export { D as default };
