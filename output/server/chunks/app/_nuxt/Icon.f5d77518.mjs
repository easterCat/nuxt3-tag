import { U, s as se, J, t as tn } from '../server.mjs';
import { defineComponent, ref, computed, watch, withAsyncContext, unref, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { Icon } from '@iconify/vue/dist/offline';
import { loadIcon } from '@iconify/vue';
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

const y = defineComponent({ __name: "Icon", __ssrInlineRender: true, props: { name: { type: String, required: true }, size: { type: String, default: "" } }, async setup(i2) {
  let v2, w2;
  const y2 = i2, x2 = U(), I2 = se().nuxtIcon, S = J("icons", () => ({})), z = ref(false), $ = computed(() => ((null == I2 ? void 0 : I2.aliases) || {})[y2.name] || y2.name), b = computed(() => {
    var e2;
    return null == (e2 = S.value) ? void 0 : e2[$.value];
  }), j = computed(() => x2.vueApp.component($.value)), k = computed(() => {
    const e2 = y2.size || (null == I2 ? void 0 : I2.size) || "1em";
    return String(Number(e2)) === e2 ? `${e2}px` : e2;
  });
  async function q() {
    var e2;
    j.value || (null == (e2 = S.value) ? void 0 : e2[$.value]) || (z.value = true, S.value[$.value] = await loadIcon($.value).catch(() => {
    }), z.value = false);
  }
  return watch(() => $.value, q), !j.value && ([v2, w2] = withAsyncContext(() => q()), v2 = await v2, w2()), (e2, t2, o2, n2) => {
    unref(z) ? t2(`<span${ssrRenderAttrs(mergeProps({ class: "icon", width: unref(k), height: unref(k) }, n2))} data-v-07e34052></span>`) : unref(b) ? t2(ssrRenderComponent(unref(Icon), mergeProps({ icon: unref(b), class: "icon", width: unref(k), height: unref(k) }, n2), null, o2)) : unref(j) ? ssrRenderVNode(t2, createVNode(resolveDynamicComponent(unref(j)), mergeProps({ class: "icon", width: unref(k), height: unref(k) }, n2), null), o2) : t2(`<span${ssrRenderAttrs(mergeProps({ class: "icon", style: { fontSize: unref(k), lineHeight: unref(k), width: unref(k), height: unref(k) } }, n2))} data-v-07e34052>${ssrInterpolate(i2.name)}</span>`);
  };
} }), x = y.setup;
y.setup = (e2, t2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt-icon/dist/runtime/Icon.vue"), x ? x(e2, t2) : void 0;
};
const I = tn(y, [["__scopeId", "data-v-07e34052"]]);

export { I as default };
