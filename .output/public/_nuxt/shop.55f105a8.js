import{b0 as e,a$ as t,b1 as o}from"./entry.7629be39.js";import{c as a,d as n}from"./element-plus.bf29918d.js";const l=()=>({copy:t=>{const o=t?t.trim():"";e(o,void 0,(e=>{if(!e)return a({showClose:!0,message:"复制成功",type:"success"});console.log(e)}))}}),s=()=>{const{$store:e}=t(),{copy:a}=l(),s="shop",p=o("shop",(()=>"")),r=o("shopList",(()=>[])),i=()=>{p.value=e.get(s)||"",p.value?h():r.value=[]};function v(){e.set(s,p.value)}function m(){p.value=r.value.map((e=>e.text)).join(",")}function h(){r.value=p.value.split(",").map((e=>({text:e.trim()})))}return i(),{shop:p,shopList:r,initShop:i,setShop:e=>(p.value=e,h(),v(),c("初始化购物车")),onlySetShop:e=>{p.value=e,v()},clearShop:()=>{n.alert("确定清空购物车","提示",{confirmButtonText:"确定",callback:t=>{if("confirm"===t)return p.value="",r.value=[],e.remove(s),c("清空购物车")}})},addShop:e=>e?p.value.includes(e)?u("购物车已存在该标签"):(r.value.push({text:e}),m(),v(),c("添加购物车成功")):u("错误数据"),removeShop:e=>(r.value.splice(e,1),m(),v(),c("删除成功")),removeShopByName:e=>{const t=r.value.findIndex((t=>t.text===e));return r.value.splice(t,1),m(),v(),c("删除成功")},renameShopName:e=>{n.prompt("请输入新内容","修改",{confirmButtonText:"OK",cancelButtonText:"Cancel"}).then((({value:t})=>{const o=r.value.findIndex((t=>t.text===e));r.value[o].text=t,m(),v()})).catch((()=>{console.log("取消创建 :>> ")}))},copyShop:()=>{a(p.value)},addOneCircle:e=>{const t=r.value.findIndex((t=>t.text===e)),o=`(${e})`;r.value.splice(t,1,o),m(),v()},removeOneCircle:e=>{const t=r.value.findIndex((t=>t.text===e)),o=e.replace("(","").replace(")","");r.value.splice(t,1,o),m(),v()},createNewShopItem:()=>{n.prompt("请输入标签内容","提示",{confirmButtonText:"OK",cancelButtonText:"Cancel"}).then((({value:e})=>{r.value.push({text:e}),m(),v()})).catch((()=>{console.log("取消创建 :>> ")}))}}};function c(e){return a({showClose:!0,message:e,type:"success"})}function u(e){return a({showClose:!0,message:e,type:"warning"})}export{s as a,l as u};