import l from"./Icon.f96b4a01.js";import{_ as e,a,b as s,c as t}from"./plus.bb77e419.js";import{u as i}from"./index.4fe012d4.js";import{h as o,B as n,q as c}from"./pinia.7ac5f2a7.js";import{F as d,G as u,W as r,e as m,Q as v,r as p,a as h,w as k,f,H as y,u as C,I as g,X as b,Y as x,Z as z,_,i as j,$ as w,a0 as S,a1 as V,a2 as L,U as B,a3 as E,a4 as T,a5 as O}from"./element-plus.3e7898c2.js";import{u as G,a as I}from"./shop.8f25176c.js";import{_ as N}from"./document-copy.9ed563a4.js";import{_ as U}from"./shopping-trolley.5f2a9482.js";import{d as $}from"./vuedraggable.5801950c.js";import{u as H}from"./uuid.d56aad75.js";import{_ as M}from"./entry.fcefc495.js";import"./lodash.93025024.js";import"./dayjs.3bf4ac2a.js";import"./store.e5acb8cd.js";import"./sortablejs.c8011fea.js";const A={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"},R=[r("path",{fill:"currentColor",d:"m199.04 672.64l193.984 112l224-387.968l-193.92-112l-224 388.032zm-23.872 60.16l32.896 148.288l144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112l56.704-98.112l-193.984-112l-56.64 98.112zM104.32 708.8l384-665.024l304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"},null,-1)];const q={name:"ep-edit-pen",render:function(l,e){return d(),u("svg",A,R)}},D={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"},F=[r("path",{fill:"currentColor",d:"M512 128L128 447.936V896h255.936V640H640v256h255.936V447.936z"},null,-1)];const J={name:"ep-home-filled",render:function(l,e){return d(),u("svg",D,F)}},K={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"},Q=[r("path",{fill:"currentColor",d:"M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"},null,-1)];const W={name:"ep-arrow-left-bold",render:function(l,e){return d(),u("svg",K,Q)}},X=l=>(S("data-v-691c23a8"),l=l(),V(),l),Y={class:"header"},Z={class:"back"},P={class:"header-center"},ll={class:"header-right"},el={class:"body"},al={class:"left"},sl={class:"left-layer1"},tl=X((()=>r("div",{class:"layer-top"},"数据来源",-1))),il={class:"layer-bottom"},ol=X((()=>r("div",{class:"layer-top"},"标签类别",-1))),nl={key:0,class:"type-list"},cl=["onClick"],dl={key:1,class:"type-list"},ul=["onClick"],rl={class:"center"},ml={class:"shop-card-con"},vl={class:"shop-item"},pl={class:"tran-text"},hl={class:"right"},kl={class:"tag-list"},fl={class:"text-con"},yl={class:"zh"},Cl={class:"text-con"},gl={class:"zh"},bl={key:0,class:"import-wrapper"},xl={class:"import-layer"},zl={class:"import-button"},_l=M(m({__name:"index",props:["modelValue"],async setup(m){let S,V;const{DefaultTagsApi:M}=i(),A=([S,V]=v((()=>M.getTags())),S=await S,V(),S),R=JSON.parse(A),D=o().public.GELBOORU_TOKEN,F=p({animation:400,group:"people",disabled:!1,ghostClass:"ghost"}),{GelbooruApi:K,ShopApi:Q}=i(),X=n(),_l=c(),jl=h("1"),wl=h(""),Sl=h(!1),Vl=h(1),Ll=h(0),{copy:Bl}=G(),{addShop:El,renameShopName:Tl,shopList:Ol,shop:Gl,onlySetShop:Il,initShop:Nl,setShop:Ul,clearShop:$l,removeShopByName:Hl,copyShop:Ml,addOneCircle:Al,removeOneCircle:Rl,createNewShopItem:ql}=I(),Dl=h(R.class),Fl=h(Dl.value[0].data),Jl=h([]),Kl=h([]);k(Ol,(l=>{"pc-design"===X.name&&Il(l.map((l=>l.text)).join(", "))}));const Ql=()=>{_l.go(-1)},Wl=()=>{_l.replace("/pc/home")},Xl=()=>{Sl.value=!0},Yl=()=>{Ul(wl.value),Sl.value=!1},Zl=async()=>{var l;const e=await Q.translate({text:Gl.value,type:1});(null==(l=null==e?void 0:e.data)?void 0:l.translateText).split("，").forEach(((l,e)=>{Ol.value[e].translateText=l}))},Pl=l=>{Vl.value=l,Ll.value=0,2===l&&(async()=>{const l=await K.getList();Jl.value=l.data})()},le=async(l,e)=>{if(1===Vl.value)Fl.value=Dl.value[l].data,Ll.value=l;else if(2===Vl.value){const a=await K.getTagsById({token:D,page:1,limit:100,category_id:e});Ll.value=l,Kl.value=a.data}};return f((()=>{Nl()})),(i,o)=>{const n=W,c=J,m=l,v=w.ElRadio,p=w.ElRadioGroup,h=a,k=s,f=q,S=t,V=U,G=w.ElButton,I=N,M=e;return d(),u("div",{class:b(["design-page page",{white:"2"===jl.value}])},[r("div",Y,[r("div",Z,[y(n,{onClick:Ql}),y(c,{onClick:Wl})]),r("div",P,[y(m,{size:"20",name:"material-symbols:shopping-cart",onClick:Xl}),y(m,{size:"24",name:"material-symbols:new-label-rounded",onClick:C(ql)},null,8,["onClick"]),y(m,{size:"20",name:"material-symbols:content-copy-rounded",onClick:C(Ml)},null,8,["onClick"]),y(m,{size:"19",name:"majesticons:translate",onClick:Zl}),y(m,{size:"20",name:"material-symbols:delete",onClick:C($l)},null,8,["onClick"])]),r("div",ll,[y(p,{modelValue:jl.value,"onUpdate:modelValue":o[0]||(o[0]=l=>jl.value=l),class:"ml-4"},{default:g((()=>[y(v,{label:"1",size:"large"},{default:g((()=>[L("深色")])),_:1}),y(v,{label:"2",size:"large"},{default:g((()=>[L("浅色")])),_:1})])),_:1},8,["modelValue"])])]),r("div",el,[r("div",al,[r("div",sl,[tl,r("div",il,[r("div",{class:b(["left-menu",{"item-active":1===Vl.value}]),onClick:o[1]||(o[1]=l=>Pl(1))}," 常规标签 ",2),r("div",{class:b(["left-menu",{"item-active":2===Vl.value}]),onClick:o[2]||(o[2]=l=>Pl(2))}," Gelbooru标签 ",2),r("div",{class:b(["left-menu",{"item-active":3===Vl.value}]),onClick:o[3]||(o[3]=l=>Pl(3))}," EH标签(500个) ",2),r("div",{class:b(["left-menu",{"item-active":4===Vl.value}]),onClick:o[4]||(o[4]=l=>Pl(4))}," EH标签(31000个) ",2)]),ol,1===Vl.value?(d(),u("div",nl,[(d(!0),u(x,null,z(Dl.value,((l,e)=>(d(),u("div",{key:e,class:b(["type-item",{"type-item-active ":e===Ll.value}]),onClick:l=>le(e)},B(null==l?void 0:l.name),11,cl)))),128))])):_("",!0),2===Vl.value?(d(),u("div",dl,[(d(!0),u(x,null,z(Jl.value,((l,e)=>(d(),u("div",{key:e,class:b(["type-item",{"type-item-active ":e===Ll.value}]),onClick:a=>le(e,null==l?void 0:l.id)},B(null==l?void 0:l.name)+"("+B(null==l?void 0:l.level)+") ",11,ul)))),128))])):_("",!0)])]),r("div",rl,[r("div",ml,[y(C($),{modelValue:C(Ol),"onUpdate:modelValue":o[5]||(o[5]=l=>j(Ol)?Ol.value=l:null),"component-data":{name:"list"},"drag-options":C(F),"item-key":l=>{(l=>{H.v4()})(l)}},{item:g((({element:l})=>[r("div",vl,[r("div",null,[r("span",null,B(l.text),1),r("span",pl,B(l.translateText),1),y(h,{class:"add",onClick:e=>C(Al)(l.text)},null,8,["onClick"]),y(k,{class:"minus",onClick:e=>C(Rl)(l.text)},null,8,["onClick"]),y(f,{class:"remove",onClick:e=>C(Tl)(l.text)},null,8,["onClick"]),y(S,{class:"remove",onClick:e=>C(Hl)(l.text)},null,8,["onClick"])])])])),_:1},8,["modelValue","drag-options","item-key"])])]),r("div",hl,[r("div",kl,[1===Vl.value?(d(!0),u(x,{key:0},z(Fl.value,((l,e)=>(d(),u("div",{key:e,class:"tag-item"},[r("div",fl,[r("p",yl,B(null==l?void 0:l.zh)+" "+B(null==l?void 0:l.en),1)]),r("div",null,[y(G,{size:"small",circle:"",onClick:e=>C(El)(null==l?void 0:l.en)},{default:g((()=>[E(i.$slots,"icon",{},(()=>[y(V)]),!0)])),_:2},1032,["onClick"]),y(G,{size:"small",circle:"",onClick:e=>C(Bl)(null==l?void 0:l.en)},{default:g((()=>[E(i.$slots,"icon",{},(()=>[y(I)]),!0)])),_:2},1032,["onClick"])])])))),128)):_("",!0),2===Vl.value?(d(!0),u(x,{key:1},z(Kl.value,((l,e)=>(d(),u("div",{key:e,class:"tag-item"},[r("div",Cl,[r("p",gl,B(null==l?void 0:l.t_name)+" "+B(null==l?void 0:l.name),1)]),r("div",null,[y(G,{size:"small",circle:"",onClick:e=>C(El)(null==l?void 0:l.en)},{default:g((()=>[E(i.$slots,"icon",{},(()=>[y(V)]),!0)])),_:2},1032,["onClick"]),y(G,{size:"small",circle:"",onClick:e=>C(Bl)(null==l?void 0:l.en)},{default:g((()=>[E(i.$slots,"icon",{},(()=>[y(I)]),!0)])),_:2},1032,["onClick"])])])))),128)):_("",!0)])])]),y(M,null,{default:g((()=>[Sl.value?(d(),u("div",bl,[r("div",xl,[T(r("textarea",{"onUpdate:modelValue":o[6]||(o[6]=l=>wl.value=l),type:"text"},null,512),[[O,wl.value]])]),r("div",zl,[r("button",{onClick:o[7]||(o[7]=()=>Sl.value=!1)},"取消"),r("button",{onClick:Yl},"确定")])])):_("",!0)])),_:1})],2)}}}),[["__scopeId","data-v-691c23a8"]]);export{_l as default};
