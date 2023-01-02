import n from './client-only.f5bddb5b.mjs';
import { ElRow } from 'element-plus/lib';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { s } from './sYw7uX71Xe.38399cea.mjs';
import p from 'dayjs';
import { c } from './index.8cd5f84c.mjs';
import { t as tn } from '../server.mjs';
import 'vue-uuid';
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

const b = defineComponent({ __name: "index", __ssrInlineRender: true, setup(d2) {
  const r2 = c();
  return (d3, u2, f2, b2) => {
    const y2 = n, h2 = ElRow;
    u2(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page page" }, b2))} data-v-60491d15>`), u2(ssrRenderComponent(y2, null, null, f2)), u2(`<div class="content" data-v-60491d15><div class="banner-con" data-v-60491d15><div class="banner-image" data-v-60491d15><img${ssrRenderAttr("src", s)} alt="" data-v-60491d15></div></div><div class="profile-con" data-v-60491d15><div class="avatar-con" data-v-60491d15><div class="avatar" data-v-60491d15><div class="w-32 rounded-full" data-v-60491d15><img src="https://placeimg.com/192/192/people" data-v-60491d15></div></div></div><div class="info-con" data-v-60491d15><div class="left" data-v-60491d15><div class="shadow stats" data-v-60491d15><div class="stat place-items-center" data-v-60491d15><div class="stat-title" data-v-60491d15>\u5173\u6CE8</div><div class="stat-value" data-v-60491d15>999</div><div class="stat-desc" data-v-60491d15>\u622A\u6B62 January 1st to February 1st</div></div><div class="stat place-items-center" data-v-60491d15><div class="stat-title" data-v-60491d15>\u8FFD\u968F</div><div class="stat-value text-secondary" data-v-60491d15>4,200</div><div class="stat-desc text-secondary" data-v-60491d15> \u622A\u6B62 January 1st to February 1st </div></div></div></div><div class="center" data-v-60491d15><div class="shadow stats" data-v-60491d15><div class="stat place-items-center" data-v-60491d15><div class="stat-title" data-v-60491d15>\u6635\u79F0</div><div class="stat-value" data-v-60491d15>${ssrInterpolate(unref(r2).nickname)}</div><div class="stat-desc" data-v-60491d15>\u622A\u6B62 January 1st to February 1st</div></div></div></div><div class="right" data-v-60491d15><div class="shadow stats" data-v-60491d15><div class="stat place-items-center" data-v-60491d15><div class="stat-title" data-v-60491d15>\u7528\u6237\u7B49\u7EA7</div><div class="stat-value" data-v-60491d15>${ssrInterpolate(r2.roleId ? { 1: "\u7BA1\u7406\u5458", 2: "\u5F00\u53D1\u8005", 3: "\u8D21\u732E\u8005", 4: "\u6E38\u5BA2" }[r2.roleId] : "")}</div><div class="stat-desc" data-v-60491d15>\u622A\u6B62 January 1st to February 1st</div></div><div class="stat place-items-center" data-v-60491d15><div class="stat-title" data-v-60491d15>\u52A0\u5165\u5929\u6570</div><div class="stat-value text-secondary" data-v-60491d15>${ssrInterpolate(p(p().format("YYYY-MM-DD")).diff(r2.userInfo.create_time, "day"))}</div><div class="stat-desc text-secondary" data-v-60491d15> \u622A\u6B62 January 1st to February 1st </div></div></div></div></div></div><div class="tabs-con" data-v-60491d15><div class="tabs" data-v-60491d15><a class="tab tab-lg tab-bordered tab-active" data-v-60491d15>\u6536\u85CF</a></div></div><div class="collect-con" data-v-60491d15>`), u2(ssrRenderComponent(h2, { class: "list-con", gutter: 20 }, { default: withCtx((a2, t2, d4, s2) => {
      if (!t2)
        return [createVNode(y2)];
      t2(ssrRenderComponent(y2, null, null, d4, s2));
    }), _: 1 }, f2)), u2("</div></div></div>");
  };
} }), y = b.setup;
b.setup = (a2, t2) => {
  const d2 = useSSRContext();
  return (d2.modules || (d2.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/index.vue"), y ? y(a2, t2) : void 0;
};
const h = tn(b, [["__scopeId", "data-v-60491d15"]]);

export { h as default };
