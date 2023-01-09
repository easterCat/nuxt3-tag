import I from './Icon.f5d77518.mjs';
import d from './AreaTitle.4d925c02.mjs';
import { x } from './index.8cd5f84c.mjs';
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
const L = { name: "ep-upload-filled", render: function(e2, l2) {
  return openBlock(), createElementBlock("svg", S, U);
} }, P = defineComponent({ __name: "imageAnalysis", __ssrInlineRender: true, emits: ["setPreview"], setup(t2, { emit: n2 }) {
  x();
  const o2 = R();
  U$1(), p();
  const c2 = ref(`${o2.public.FLASK_BASE_API}/danbooru/upload`);
  ref([]), ref(0);
  const b2 = ref([]), I2 = ref(""), S2 = ref([]), U2 = ref(false), P2 = (e2) => {
    I2.value = e2.name;
  }, B2 = (e2, l2, a2) => {
    const { code: s2, data: t3 } = e2, n3 = R().public.IP_ADDRESS;
    if (200 === s2) {
      const { file_name: e3, file_path: l3 } = t3, i2 = a2.length;
      a2[i2 - 1].name = e3, a2[i2 - 1].url = n3 + l3, b2.value = a2;
    }
  }, D2 = (e2) => {
    n2("setPreview", e2.url);
  }, E = (e2) => {
    console.log(e2);
    const l2 = b2.value.findIndex((l3) => l3.name === e2.name);
    l2 >= 0 && b2.value.splice(l2, 1);
  };
  return (a2, i2, s2, t3) => {
    const n3 = I, o3 = ElRow, m2 = ElCol, _2 = ElUpload, H = L, R = d;
    i2(`<div${ssrRenderAttrs(mergeProps({ class: "tranfer-con" }, t3))} data-v-22613ee2><div class="button-con" data-v-22613ee2><button class="btn btn-secondary m-r-10 m-b-10" data-v-22613ee2> \u6E05\u7A7A `), i2(ssrRenderComponent(n3, { class: "m-l-6", name: "ant-design:delete-filled" }, null, s2)), i2('</button><button class="btn btn-accent m-r-10 m-b-10" data-v-22613ee2> \u5BFC\u51FA\u8D2D\u7269\u8F66 '), i2(ssrRenderComponent(n3, { class: "m-l-6", name: "clarity:shopping-cart-solid-badged" }, null, s2)), i2(`</button><button class="btn btn-primary m-r-10 m-b-10" data-v-22613ee2>${ssrInterpolate(unref(U2) ? "\u56FE\u7247\u89E3\u6790\u4E2D" : "\u89E3\u6790\u56FE\u7247")} `), unref(U2) ? i2(ssrRenderComponent(n3, { class: "m-l-6", name: "line-md:loading-twotone-loop" }, null, s2)) : i2(ssrRenderComponent(n3, { class: "m-l-6", name: "mdi:comment-edit" }, null, s2)), i2("</button></div>"), i2(ssrRenderComponent(o3, { gutter: 20 }, { default: withCtx((e2, l2, a3, i3) => {
      if (!l2)
        return [createVNode(m2, { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }, { default: withCtx(() => [createVNode(_2, { "file-list": unref(b2), "onUpdate:file-list": (e3) => isRef(b2) ? b2.value = e3 : null, class: "upload-demo", drag: "", action: unref(c2), accept: "image/png, image/jpeg, image/jpg", multiple: "", "list-type": "picture", "on-success": B2 }, { file: withCtx(({ file: e3 }) => [createVNode("div", { class: "upload-image-list-item" }, [createVNode("span", { onClick: (l3) => P2(e3) }, [createVNode("img", { class: "el-upload-list__item-thumbnail", src: e3.url, alt: "" }, null, 8, ["src"]), createVNode("span", { class: "m-l-6" }, toDisplayString(e3.name), 1), createVNode("input", { class: "checkbox m-l-10", type: "checkbox", checked: unref(I2) === e3.name }, null, 8, ["checked"])], 8, ["onClick"]), createVNode("span", { class: "el-upload-list__item-actions" }, [createVNode("span", null, [createVNode(n3, { name: "material-symbols:image", size: "28", onClick: (l3) => D2(e3) }, null, 8, ["onClick"])]), createVNode("span", { class: "m-l-10" }, [createVNode(n3, { name: "ic:baseline-delete", size: "28", onClick: (l3) => E(e3) }, null, 8, ["onClick"])])])])]), tip: withCtx(() => [createVNode("div", { class: "el-upload__tip" }, "jpg/png\u6587\u4EF6\u683C\u5F0F")]), default: withCtx(() => [createVNode("i", { class: "el-icon el-icon--upload" }, [createVNode(H)]), createVNode("div", { class: "el-upload__text" }, [createTextVNode(" \u62D6\u52A8\u56FE\u7247\u5230\u5F53\u524D\u533A\u57DF \u6216 "), createVNode("em", null, "\u70B9\u51FB\u4E0A\u4F20")])]), _: 1 }, 8, ["file-list", "onUpdate:file-list", "action"])]), _: 1 })];
      l2(ssrRenderComponent(m2, { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }, { default: withCtx((e3, l3, a4, i4) => {
        if (!l3)
          return [createVNode(_2, { "file-list": unref(b2), "onUpdate:file-list": (e4) => isRef(b2) ? b2.value = e4 : null, class: "upload-demo", drag: "", action: unref(c2), accept: "image/png, image/jpeg, image/jpg", multiple: "", "list-type": "picture", "on-success": B2 }, { file: withCtx(({ file: e4 }) => [createVNode("div", { class: "upload-image-list-item" }, [createVNode("span", { onClick: (l4) => P2(e4) }, [createVNode("img", { class: "el-upload-list__item-thumbnail", src: e4.url, alt: "" }, null, 8, ["src"]), createVNode("span", { class: "m-l-6" }, toDisplayString(e4.name), 1), createVNode("input", { class: "checkbox m-l-10", type: "checkbox", checked: unref(I2) === e4.name }, null, 8, ["checked"])], 8, ["onClick"]), createVNode("span", { class: "el-upload-list__item-actions" }, [createVNode("span", null, [createVNode(n3, { name: "material-symbols:image", size: "28", onClick: (l4) => D2(e4) }, null, 8, ["onClick"])]), createVNode("span", { class: "m-l-10" }, [createVNode(n3, { name: "ic:baseline-delete", size: "28", onClick: (l4) => E(e4) }, null, 8, ["onClick"])])])])]), tip: withCtx(() => [createVNode("div", { class: "el-upload__tip" }, "jpg/png\u6587\u4EF6\u683C\u5F0F")]), default: withCtx(() => [createVNode("i", { class: "el-icon el-icon--upload" }, [createVNode(H)]), createVNode("div", { class: "el-upload__text" }, [createTextVNode(" \u62D6\u52A8\u56FE\u7247\u5230\u5F53\u524D\u533A\u57DF \u6216 "), createVNode("em", null, "\u70B9\u51FB\u4E0A\u4F20")])]), _: 1 }, 8, ["file-list", "onUpdate:file-list", "action"])];
        l3(ssrRenderComponent(_2, { "file-list": unref(b2), "onUpdate:file-list": (e4) => isRef(b2) ? b2.value = e4 : null, class: "upload-demo", drag: "", action: unref(c2), accept: "image/png, image/jpeg, image/jpg", multiple: "", "list-type": "picture", "on-success": B2 }, { file: withCtx(({ file: e4 }, l4, a5, i5) => {
          if (!l4)
            return [createVNode("div", { class: "upload-image-list-item" }, [createVNode("span", { onClick: (l5) => P2(e4) }, [createVNode("img", { class: "el-upload-list__item-thumbnail", src: e4.url, alt: "" }, null, 8, ["src"]), createVNode("span", { class: "m-l-6" }, toDisplayString(e4.name), 1), createVNode("input", { class: "checkbox m-l-10", type: "checkbox", checked: unref(I2) === e4.name }, null, 8, ["checked"])], 8, ["onClick"]), createVNode("span", { class: "el-upload-list__item-actions" }, [createVNode("span", null, [createVNode(n3, { name: "material-symbols:image", size: "28", onClick: (l5) => D2(e4) }, null, 8, ["onClick"])]), createVNode("span", { class: "m-l-10" }, [createVNode(n3, { name: "ic:baseline-delete", size: "28", onClick: (l5) => E(e4) }, null, 8, ["onClick"])])])])];
          l4(`<div class="upload-image-list-item" data-v-22613ee2${i5}><span data-v-22613ee2${i5}><img class="el-upload-list__item-thumbnail"${ssrRenderAttr("src", e4.url)} alt="" data-v-22613ee2${i5}><span class="m-l-6" data-v-22613ee2${i5}>${ssrInterpolate(e4.name)}</span><input class="checkbox m-l-10" type="checkbox"${ssrIncludeBooleanAttr(unref(I2) === e4.name) ? " checked" : ""} data-v-22613ee2${i5}></span><span class="el-upload-list__item-actions" data-v-22613ee2${i5}><span data-v-22613ee2${i5}>`), l4(ssrRenderComponent(n3, { name: "material-symbols:image", size: "28", onClick: (l5) => D2(e4) }, null, a5, i5)), l4(`</span><span class="m-l-10" data-v-22613ee2${i5}>`), l4(ssrRenderComponent(n3, { name: "ic:baseline-delete", size: "28", onClick: (l5) => E(e4) }, null, a5, i5)), l4("</span></span></div>");
        }), tip: withCtx((e4, l4, a5, i5) => {
          if (!l4)
            return [createVNode("div", { class: "el-upload__tip" }, "jpg/png\u6587\u4EF6\u683C\u5F0F")];
          l4(`<div class="el-upload__tip" data-v-22613ee2${i5}>jpg/png\u6587\u4EF6\u683C\u5F0F</div>`);
        }), default: withCtx((e4, l4, a5, i5) => {
          if (!l4)
            return [createVNode("i", { class: "el-icon el-icon--upload" }, [createVNode(H)]), createVNode("div", { class: "el-upload__text" }, [createTextVNode(" \u62D6\u52A8\u56FE\u7247\u5230\u5F53\u524D\u533A\u57DF \u6216 "), createVNode("em", null, "\u70B9\u51FB\u4E0A\u4F20")])];
          l4(`<i class="el-icon el-icon--upload" data-v-22613ee2${i5}>`), l4(ssrRenderComponent(H, null, null, a5, i5)), l4(`</i><div class="el-upload__text" data-v-22613ee2${i5}> \u62D6\u52A8\u56FE\u7247\u5230\u5F53\u524D\u533A\u57DF \u6216 <em data-v-22613ee2${i5}>\u70B9\u51FB\u4E0A\u4F20</em></div>`);
        }), _: 1 }, a4, i4));
      }), _: 1 }, a3, i3));
    }), _: 1 }, s2)), i2(ssrRenderComponent(R, { title: "\u89E3\u6790\u6807\u7B7E " }, { titleSide: withCtx((e2, l2, a3, i3) => {
      if (!l2)
        return [createVNode("span", { style: { "font-size": "12px" } }, "(\u57FA\u4E8Edeepdanbooru\u89E3\u6790)")];
      l2(`<span style="${ssrRenderStyle({ "font-size": "12px" })}" data-v-22613ee2${i3}>(\u57FA\u4E8Edeepdanbooru\u89E3\u6790)</span>`);
    }), _: 1 }, s2)), i2('<div class="tags-con" data-v-22613ee2><!--[-->'), ssrRenderList(unref(S2), (e2, l2) => {
      var a3;
      i2(`<button class="btn btn-sm btn-secondary m-r-10 m-b-10" data-v-22613ee2><span data-v-22613ee2>${ssrInterpolate(null == (a3 = e2.key) ? void 0 : a3.toLowerCase())}</span><div class="badge m-l-8" data-v-22613ee2>${ssrInterpolate(e2.value)}</div></button>`);
    }), i2("<!--]--></div></div>");
  };
} }), B = P.setup;
P.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("pages/pc/utils/components/imageAnalysis.vue"), B ? B(e2, l2) : void 0;
};
const D = tn(P, [["__scopeId", "data-v-22613ee2"]]);

export { D as default };
