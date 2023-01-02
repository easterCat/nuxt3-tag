import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { t as tn } from '../server.mjs';
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

const i = {};
const r = i.setup;
i.setup = (t2, a2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue"), r ? r(t2, a2) : void 0;
};
const d = tn(i, [["ssrRender", function(e2, o2, i2, r2) {
  o2(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, r2))} data-v-8732dae2><ul class="circles" data-v-8732dae2><li data-v-8732dae2></li><li data-v-8732dae2></li><li data-v-8732dae2></li><li data-v-8732dae2></li><li data-v-8732dae2></li><li data-v-8732dae2></li><li data-v-8732dae2></li><li data-v-8732dae2></li><li data-v-8732dae2></li><li data-v-8732dae2></li></ul></footer>`);
}], ["__scopeId", "data-v-8732dae2"]]);

export { d as default };
