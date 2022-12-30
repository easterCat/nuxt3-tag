import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderSlot } from 'vue/server-renderer';

const o = defineComponent({ __name: "AppAnimate", __ssrInlineRender: true, props: { name: { type: String, default: "fadeIn" }, enterDuration: { type: Number, default: 800 }, leaveDuration: { type: Number, default: 800 } }, setup(e2) {
  const n2 = ref(false);
  return (e3, t2, o2, p2) => {
    unref(n2) ? ssrRenderSlot(e3.$slots, "default", {}, null, t2, o2) : t2("<!---->");
  };
} }), p = o.setup;
o.setup = (e2, t2) => {
  const r2 = useSSRContext();
  return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("components/AppAnimate.vue"), p ? p(e2, t2) : void 0;
};

export { o as default };
