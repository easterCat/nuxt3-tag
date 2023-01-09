import { t as tn, K } from '../server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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

const a = { __name: "error-500", __ssrInlineRender: true, props: { appName: { type: String, default: "Nuxt" }, version: { type: String, default: "" }, statusCode: { type: Number, default: 500 }, statusMessage: { type: String, default: "Server error" }, description: { type: String, default: "This page is temporarily unavailable." } }, setup(o2) {
  const s2 = o2;
  return K({ title: `${s2.statusCode} - ${s2.statusMessage} | ${s2.appName}`, script: [], style: [{ children: '*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}' }] }), (t2, s3, a2, n2) => {
    s3(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, n2))} data-v-06f637f2><div class="fixed -bottom-1/2 left-0 right-0 h-1/2 spotlight" data-v-06f637f2></div><div class="max-w-520px text-center" data-v-06f637f2><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-06f637f2>${ssrInterpolate(o2.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-06f637f2>${ssrInterpolate(o2.description)}</p></div></div>`);
  };
} }, n = a.setup;
a.setup = (t2, e2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui-templates/dist/templates/error-500.vue"), n ? n(t2, e2) : void 0;
};
const d = tn(a, [["__scopeId", "data-v-06f637f2"]]);

export { d as default };
