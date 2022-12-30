import { useSSRContext, defineAsyncComponent, unref, mergeProps } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const a = { __name: "nuxt-error-page", __ssrInlineRender: true, props: { error: Object }, setup(s2) {
  var a2;
  const { error: o2 } = s2;
  (o2.stack || "").split("\n").splice(1).map((e2) => ({ text: e2.replace("webpack:/", "").replace(".vue", ".js").trim(), internal: e2.includes("node_modules") && !e2.includes(".cache") || e2.includes("internal") || e2.includes("new Promise") })).map((e2) => `<span class="stack${e2.internal ? " internal" : ""}">${e2.text}</span>`).join("\n");
  const u2 = Number(o2.statusCode || 500), d = 404 === u2, l = null != (a2 = o2.statusMessage) ? a2 : d ? "Page Not Found" : "Internal Server Error", p = o2.message || o2.toString(), i = defineAsyncComponent(() => import('./error-404.60ab206f.mjs').then((e2) => e2.default || e2)), c = defineAsyncComponent(() => import('./error-500.f4a7d8e2.mjs').then((e2) => e2.default || e2)), m = d ? i : c;
  return (e2, s3, a3, o3) => {
    s3(ssrRenderComponent(unref(m), mergeProps({ statusCode: unref(u2), statusMessage: unref(l), description: unref(p), stack: unref(void 0) }, o3), null, a3));
  };
} }, o = a.setup;
a.setup = (e2, r2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue"), o ? o(e2, r2) : void 0;
};
const u = a;

export { u as default };
