import{_ as a,a as e}from"./AppHeader.844a27fd.js";import s from"./AppBanner.df70a4c4.js";import t from"./AreaTitle.d4475132.js";import{u as l}from"./index.251a9acf.js";import{u as i,a as o}from"./shop.59954df9.js";import{_ as n}from"./document-copy.4e4ddecf.js";import{l as d,b as c}from"./element-plus.51c032f9.js";import{_ as r}from"./shopping-trolley.68786ad6.js";import{I as u,aT as p,r as m,J as v,K as _,a2 as f,_ as g,Y as b,aC as j,a0 as y,$ as x,Z as h,X as k,a4 as A,L as z,u as C,aX as S,aY as T,aZ as I}from"./entry.f0c30f1b.js";import"./AppAnimate.vue_vue_type_script_setup_true_lang.52dd1724.js";import"./plus.9e9d4eb4.js";import"./vuedraggable.b030dad4.js";import"./lodash.ea4d81e6.js";import"./sortablejs.8210fcbe.js";import"./FixMenu.vue_vue_type_style_index_0_scoped_5afae692_lang.46760c02.js";/* empty css                                                                  */const V={class:"tags-page page"},$={class:"content"},J={class:"type-list"},X={class:"tag-list"},Y={key:0,class:"image-con"},Z=[(a=>(S("data-v-facfa0c4"),a=a(),T(),a))((()=>g("img",{src:"https://image.lexica.art/md/6612175d-e172-4ae2-87a1-da2d4e7d2f6b"},null,-1)))],w={class:"text-con"},B={class:"zh"},D={class:"en"},F=I(u({__name:"index",async setup(u){let S,T;const{DefaultTagsApi:I}=l(),F=([S,T]=p((()=>I.getTags())),S=await S,T(),S),H=JSON.parse(F),K=m(H.class),L=m(K.value[0].data),M=m(0),N=m(!1),O=m(""),{copy:U}=i(),{addShop:q}=o(),E=a=>{O.value=a};return(l,i)=>{const o=a,u=s,p=t,m=e,S=d,T=r,I=c,F=n;return v(),_("div",V,[f(o),g("div",$,[f(u,{placeholder:"搜索标签",onSearchChange:E}),f(p,{title:"标签类别"}),g("div",J,[(v(!0),_(b,null,j(K.value,((a,e)=>(v(),x(m,{key:e,index:e+"","button-style":1,"button-size":"larger",class:h([e===M.value?"btn-accent":"btn-secondary"]),"button-text":null==a?void 0:a.name,onSubmit:a=>{return s=e,L.value=K.value[s].data,void(M.value=s);var s}},null,8,["index","class","button-text","onSubmit"])))),128))]),f(p,{title:"标签列表"},{titleSide:y((()=>[f(S,{modelValue:N.value,"onUpdate:modelValue":i[0]||(i[0]=a=>N.value=a),size:"large","inline-prompt":"","inactive-text":"隐藏Image","active-text":"开启Image",class:"title-side"},null,8,["modelValue"])])),_:1}),g("div",X,[(v(!0),_(b,null,j(L.value,((a,e)=>(v(),_("div",{key:e,class:"tag-item"},[N.value?(v(),_("div",Y,Z)):k("",!0),g("div",w,[g("p",B,A(null==a?void 0:a.zh),1),g("p",D,A(null==a?void 0:a.en),1)]),g("div",null,[f(I,{size:"small",circle:"",onClick:e=>C(q)(null==a?void 0:a.en)},{default:y((()=>[z(l.$slots,"icon",{},(()=>[f(T)]),!0)])),_:2},1032,["onClick"]),f(I,{size:"small",circle:"",onClick:e=>C(U)(null==a?void 0:a.en)},{default:y((()=>[z(l.$slots,"icon",{},(()=>[f(F)]),!0)])),_:2},1032,["onClick"])])])))),128))])])])}}}),[["__scopeId","data-v-facfa0c4"]]);export{F as default};