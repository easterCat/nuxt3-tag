import{_ as e}from"./AppHeader.41b86523.js";import{_ as a}from"./FixMenu.vue_vue_type_style_index_0_scoped_8a5ecf18_lang.9c1025d6.js";import l from"./AppBanner.700ba76e.js";import t from"./index.283ae9d4.js";import s from"./TemplateDetail.90bd7f26.js";import{u as n,a as o}from"./index.4fe012d4.js";import{u}from"./pinia.7ac5f2a7.js";import{l as i}from"./lodash.93025024.js";import{e as r,a as p,f as d,F as c,G as m,H as v,I as _,a9 as f,a4 as g,W as b,u as j,X as h}from"./element-plus.3e7898c2.js";import{_ as y}from"./entry.fcefc495.js";import"./plus.bb77e419.js";import"./shop.8f25176c.js";import"./vuedraggable.5801950c.js";import"./dayjs.3bf4ac2a.js";import"./sortablejs.c8011fea.js";import"./uuid.d56aad75.js";/* empty css                                                                  *//* empty css                                                                  */import"./Icon.f96b4a01.js";import"./store.e5acb8cd.js";import"./sYw7uX71Xe.38399cea.js";const x={class:"home-page page"},I={class:"content"},T={class:"banner-con"},S={class:"control-blur-btns"},w=y(r({__name:"index",setup(r){let y=null;const{TemplateApi:w}=n(),A=p(!0),{$store:k}=u(),z=p(!1),C=p(null),F=p(!1),M=p(1),V=p(50),X=p(""),B=p(""),H=p([]),U=e=>{C.value={...e},z.value=!0},D=i.debounce((async e=>{if(e===B.value)return;H.value=[],B.value=e,F.value=!0;const a=await w.getTemplates({pageIndex:M.value,pageSize:V.value,searchTag:B.value});F.value=!1,H.value=(null==a?void 0:a.templates)&&0!==(null==a?void 0:a.templates.length)?null==a?void 0:a.templates:[]}),1200),G=async e=>{(await w.likeTemplateById({id:e,userId:null==y?void 0:y.userId})).like&&console.log(" 喜爱成功:>> ")},L=async e=>{if(F.value)return;F.value=!0;const a=await w.getTemplates({pageIndex:e.pageIndex,pageSize:e.pageSize,searchTag:B.value});F.value=!1;const l=(null==a?void 0:a.templates)?null==a?void 0:a.templates:[];H.value=H.value.concat([...l])};return d((()=>{y=o(),X.value=k.get("ip"),(async()=>{w.setIp();const e=Math.ceil(80*Math.random()),a=await w.getTemplates({pageIndex:e||1,pageSize:50});H.value=(null==a?void 0:a.templates)?null==a?void 0:a.templates:[]})()})),(n,o)=>{const u=e,i=a,r=l,p=t,d=s,y=f("animate-css");return c(),m("div",x,[v(i,null,{default:_((()=>[v(u)])),_:1}),v(i,null,{default:_((()=>[g((c(),m("div",I,[b("div",T,[v(r,{placeholder:"请输入关键标签",onSearchChange:j(D)},null,8,["onSearchChange"])]),b("div",S,[b("button",{class:h(["btn btn-sm m-r-10",[A.value?"btn-accent":"btn-s-30"]]),onClick:o[0]||(o[0]=()=>A.value=!0)}," 模糊 ",2),b("button",{class:h(["btn btn-sm",[A.value?"btn-s-30":"btn-accent"]]),onClick:o[1]||(o[1]=()=>A.value=!1)}," 原图 ",2)]),v(p,{datas:H.value,flur:A.value,loading:F.value,"search-text":B.value,onLoad:L,onPreview:U,onFavorite:G},null,8,["datas","flur","loading","search-text"])])),[[y,{direction:"modifySlideInUp",delay:0}]])])),_:1}),v(d,{modelValue:z.value,"onUpdate:modelValue":o[2]||(o[2]=e=>z.value=e),"current-template":C.value},null,8,["modelValue","current-template"])])}}}),[["__scopeId","data-v-d77811e2"]]);export{w as default};
