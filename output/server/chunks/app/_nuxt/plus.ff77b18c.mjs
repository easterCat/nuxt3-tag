import { createElementVNode, openBlock, createElementBlock } from 'vue';

const t = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, r = [createElementVNode("path", { fill: "currentColor", d: "M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" }, null, -1)];
const h = { name: "ep-delete-filled", render: function(n2, h2) {
  return openBlock(), createElementBlock("svg", t, r);
} }, l = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, o = [createElementVNode("path", { fill: "currentColor", d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z" }, null, -1)];
const i = { name: "ep-minus", render: function(n2, t2) {
  return openBlock(), createElementBlock("svg", l, o);
} }, m = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" }, u = [createElementVNode("path", { fill: "currentColor", d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z" }, null, -1)];
const v = { name: "ep-plus", render: function(n2, t2) {
  return openBlock(), createElementBlock("svg", m, u);
} };

export { h, i, v };
