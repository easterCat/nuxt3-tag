import d from './AppFooter.e3180869.mjs';
import { x, c } from './index.6b623cfb.mjs';
import { M, t as tn } from '../server.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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

const r = defineComponent({ __name: "index", __ssrInlineRender: true, setup(l2) {
  x(), M(), c();
  const n2 = ref("login"), p2 = ref("admin"), r2 = ref("123456"), u2 = ref("admin@qq.com"), m2 = ref("\u8D85\u7EA7\u7BA1\u7406\u5458");
  return (e2, t2, d2, l3) => {
    const s2 = d;
    t2(`<div${ssrRenderAttrs(mergeProps({ class: "login-page page bg-base-100" }, l3))} data-v-bd74ce45><div class="content" data-v-bd74ce45><div class="outer-con" data-v-bd74ce45><div class="inner-con" data-v-bd74ce45>`), "login" === unref(n2) ? t2(`<div class="login-con" data-v-bd74ce45><div class="w-full form-control" data-v-bd74ce45><div class="item-1" data-v-bd74ce45><label class="label" data-v-bd74ce45><span class="label-text" data-v-bd74ce45>\u7528\u6237\u540D</span></label><input${ssrRenderAttr("value", unref(p2))} type="text" placeholder="\u8BF7\u8F93\u5165\u7528\u6237\u540D" class="w-full input input-bordered" data-v-bd74ce45></div><div class="item-2" data-v-bd74ce45><label class="label" data-v-bd74ce45><span class="label-text" data-v-bd74ce45>\u5BC6\u7801</span></label><input${ssrRenderAttr("value", unref(r2))} type="text" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" class="w-full input input-bordered" data-v-bd74ce45></div></div><div class="item-5" data-v-bd74ce45><button class="btn btn-accent btn-block" data-v-bd74ce45>\u767B\u5F55</button></div><a class="link link-accent" data-v-bd74ce45> \u6CA1\u6709\u8D26\u53F7,\u53BB\u6CE8\u518C </a></div>`) : t2("<!---->"), "register" === unref(n2) ? t2(`<div class="register-con" data-v-bd74ce45><div class="w-full form-control" data-v-bd74ce45><div class="item-1" data-v-bd74ce45><label class="label" data-v-bd74ce45><span class="label-text" data-v-bd74ce45>\u7528\u6237\u540D (\u5FC5\u586B)</span></label><input${ssrRenderAttr("value", unref(p2))} type="text" placeholder="\u8BF7\u8F93\u5165\u7528\u6237\u540D" class="w-full input input-bordered" data-v-bd74ce45></div><div class="item-2" data-v-bd74ce45><label class="label" data-v-bd74ce45><span class="label-text" data-v-bd74ce45>\u5BC6\u7801 (\u5FC5\u586B)</span></label><input${ssrRenderAttr("value", unref(r2))} type="password" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" class="w-full input input-bordered" data-v-bd74ce45></div><div class="item-3" data-v-bd74ce45><label class="label" data-v-bd74ce45><span class="label-text" data-v-bd74ce45>\u6635\u79F0</span></label><input${ssrRenderAttr("value", unref(m2))} type="text" placeholder="\u8BF7\u8F93\u5165\u6635\u79F0,\u975E\u5FC5\u586B" class="w-full input input-bordered" data-v-bd74ce45></div><div class="item-4" data-v-bd74ce45><label class="label" data-v-bd74ce45><span class="label-text" data-v-bd74ce45>\u90AE\u7BB1</span></label><input${ssrRenderAttr("value", unref(u2))} type="text" placeholder="\u8BF7\u8F93\u5165\u90AE\u7BB1,\u975E\u5FC5\u586B" class="w-full input input-bordered" data-v-bd74ce45></div></div><div class="item-5" data-v-bd74ce45><button class="btn btn-accent btn-block" data-v-bd74ce45>\u6CE8\u518C</button></div><a class="link link-accent" data-v-bd74ce45> \u5DF2\u6709\u8D26\u53F7,\u53BB\u767B\u5F55 </a></div>`) : t2("<!---->"), t2("</div></div></div>"), t2(ssrRenderComponent(s2, null, null, d2)), t2("</div>");
  };
} }), u = r.setup;
r.setup = (a2, e2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/pc/login/index.vue"), u ? u(a2, e2) : void 0;
};
const m = tn(r, [["__scopeId", "data-v-bd74ce45"]]);

export { m as default };
