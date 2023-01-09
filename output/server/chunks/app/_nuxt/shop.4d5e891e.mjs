import { U, J } from '../server.mjs';
import { ElMessage } from 'element-plus/lib';
import { copyText } from 'vue3-clipboard';
import { ElMessageBox, ElNotification } from 'element-plus';

const s = () => ({ copy: (e2) => {
  const t2 = e2 ? e2.trim() : "";
  copyText(t2, void 0, (e3) => {
    if (!e3)
      return ElMessage({ showClose: true, message: "\u590D\u5236\u6210\u529F", type: "success" });
    console.log(e3);
  });
} });
let u = null;
function c(e2) {
  return u && u.close(), u = ElNotification({ showClose: true, message: e2, type: "success", duration: 1500 }), u;
}
function r(e2) {
  return u && u.close(), u = ElNotification({ showClose: true, message: e2, type: "warning", duration: 1500 }), u;
}
const p = () => {
  const { $store: o2 } = U(), { copy: l2 } = s(), n2 = "shop", u2 = J("shop", () => ""), p2 = J("shopList", () => []), i = () => {
    u2.value = o2.get(n2) || "", u2.value ? h() : p2.value = [];
  };
  function m() {
    o2.set(n2, u2.value);
  }
  function v() {
    u2.value = p2.value.map((e2) => e2.text).join(",");
  }
  function h() {
    p2.value = u2.value.split(",").map((e2) => ({ text: e2.trim() }));
  }
  return i(), { shop: u2, shopList: p2, initShop: i, setShop: (e2) => (u2.value = e2, h(), m(), c("\u521D\u59CB\u5316\u8D2D\u7269\u8F66")), onlySetShop: (e2) => {
    u2.value = e2, m();
  }, clearShop: () => {
    ElMessageBox.alert("\u786E\u5B9A\u6E05\u7A7A\u8D2D\u7269\u8F66", "\u63D0\u793A", { confirmButtonText: "\u786E\u5B9A", callback: (e2) => {
      if ("confirm" === e2)
        return u2.value = "", p2.value = [], o2.remove(n2), c("\u6E05\u7A7A\u8D2D\u7269\u8F66");
    } });
  }, addShop: (e2) => e2 ? u2.value.includes(e2) ? r("\u8D2D\u7269\u8F66\u5DF2\u5B58\u5728\u8BE5\u6807\u7B7E") : (p2.value.push({ text: e2 }), v(), m(), c("\u6DFB\u52A0\u8D2D\u7269\u8F66\u6210\u529F")) : r("\u9519\u8BEF\u6570\u636E"), removeShop: (e2) => (p2.value.splice(e2, 1), v(), m(), c("\u5220\u9664\u6210\u529F")), removeShopByName: (e2) => {
    const t2 = p2.value.findIndex((t3) => t3.text === e2);
    return p2.value.splice(t2, 1), v(), m(), c("\u5220\u9664\u6210\u529F");
  }, renameShopName: (e2) => {
    ElMessageBox.prompt("\u8BF7\u8F93\u5165\u65B0\u5185\u5BB9", "\u4FEE\u6539", { confirmButtonText: "OK", cancelButtonText: "Cancel" }).then(({ value: t2 }) => {
      const o3 = p2.value.findIndex((t3) => t3.text === e2);
      p2.value[o3].text = t2, v(), m();
    }).catch(() => {
      console.log("\u53D6\u6D88\u521B\u5EFA :>> ");
    });
  }, copyShop: () => {
    l2(u2.value);
  }, addOneCircle: (e2) => {
    const t2 = p2.value.findIndex((t3) => t3.text === e2), o3 = `(${e2})`;
    p2.value.splice(t2, 1, o3), v(), m();
  }, removeOneCircle: (e2) => {
    const t2 = p2.value.findIndex((t3) => t3.text === e2), o3 = e2.replace("(", "").replace(")", "");
    p2.value.splice(t2, 1, o3), v(), m();
  }, createNewShopItem: () => {
    ElMessageBox.prompt("\u8BF7\u8F93\u5165\u6807\u7B7E\u5185\u5BB9", "\u63D0\u793A", { confirmButtonText: "OK", cancelButtonText: "Cancel" }).then(({ value: e2 }) => {
      p2.value.push({ text: e2 }), v(), m();
    }).catch(() => {
      console.log("\u53D6\u6D88\u521B\u5EFA :>> ");
    });
  } };
};

export { p, s };
