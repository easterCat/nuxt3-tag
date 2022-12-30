import n from './client-only.f5bddb5b.mjs';
import g from './AppBanner.aa5c1424.mjs';
import d from './AreaTitle.60828984.mjs';
import { x } from './index.6b623cfb.mjs';
import { s, p } from './shop.4d5e891e.mjs';
import { ElSwitch } from 'element-plus/lib';
import { defineComponent, withAsyncContext, ref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { t as tn } from '../server.mjs';
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
import 'vue-uuid';
import 'element-plus';
import 'vue3-clipboard';

const b = defineComponent({ __name: "index", __ssrInlineRender: true, async setup(s2) {
  let c2, g2;
  const { DefaultTagsApi: b2 } = x(), h2 = ([c2, g2] = withAsyncContext(() => b2.getTags()), c2 = await c2, g2(), c2), j2 = JSON.parse(h2), x$1 = ref(j2.class);
  ref(x$1.value[0].data), ref(0);
  const _ = ref(false), I = ref("");
  s(), p();
  const V = (e2) => {
    I.value = e2;
  };
  return (i2, o2, l2, s3) => {
    const p2 = n, m2 = g, c3 = d, g3 = ElSwitch;
    o2(`<div${ssrRenderAttrs(mergeProps({ class: "tags-page page" }, s3))} data-v-db8aa3cc>`), o2(ssrRenderComponent(p2, null, null, l2)), o2('<div class="content" data-v-db8aa3cc>'), o2(ssrRenderComponent(m2, { placeholder: "\u641C\u7D22\u6807\u7B7E", onSearchChange: V }, null, l2)), o2(ssrRenderComponent(c3, { title: "\u6807\u7B7E\u7C7B\u522B" }, null, l2)), o2('<div class="type-list" data-v-db8aa3cc>'), o2(ssrRenderComponent(p2, null, null, l2)), o2("</div>"), o2(ssrRenderComponent(c3, { title: "\u6807\u7B7E\u5217\u8868" }, { titleSide: withCtx((e2, t2, a2, i3) => {
      if (!t2)
        return [createVNode(g3, { modelValue: _.value, "onUpdate:modelValue": (e3) => _.value = e3, size: "large", "inline-prompt": "", "inactive-text": "\u9690\u85CFImage", "active-text": "\u5F00\u542FImage", class: "title-side" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
      t2(ssrRenderComponent(g3, { modelValue: _.value, "onUpdate:modelValue": (e3) => _.value = e3, size: "large", "inline-prompt": "", "inactive-text": "\u9690\u85CFImage", "active-text": "\u5F00\u542FImage", class: "title-side" }, null, a2, i3));
    }), _: 1 }, l2)), o2('<div class="tag-list" data-v-db8aa3cc>'), o2(ssrRenderComponent(p2, null, null, l2)), o2("</div></div></div>");
  };
} }), h = b.setup;
b.setup = (e2, t2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("pages/pc/tags/index.vue"), h ? h(e2, t2) : void 0;
};
const j = tn(b, [["__scopeId", "data-v-db8aa3cc"]]);

export { j as default };
