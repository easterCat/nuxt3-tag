import e from"./AreaTitle.cfe1977e.js";import{u as a}from"./index.479e5edd.js";import{u as l,a as s}from"./shop.40ca515e.js";import{l as t,b as i,n as o}from"./element-plus.88eee266.js";import{_ as n}from"./document-copy.47a105bc.js";import{_ as u}from"./shopping-trolley.eff500d8.js";import{I as c,aT as r,r as p,v,x as d,J as m,K as g,a2 as f,a0 as _,Y as h,aC as k,X as y,u as j,_ as x,a4 as z,L as C,b9 as b,aX as S,aY as T,aZ as A}from"./entry.03a65306.js";/* empty css                                                                  */import"./lodash.ea4d81e6.js";const E={class:"eh-con"},U=(e=>(S("data-v-187bf4ca"),e=e(),T(),e))((()=>x("span",{class:"eh-title-side-tip"},"(577个标签版本,高h,慎重)",-1))),V={key:0,class:"tag-list"},H=["onClick"],I={class:"text-con"},J={class:"zh"},X={class:"en"},Y={key:1,class:"demo-pagination-block"},$=A(c({__name:"eHentai",props:{searchText:{type:String,default:""}},async setup(c){let S,T;const A=c,{EhtagsApi:$}=a(),w=([S,T]=r((()=>$.getEhtags())),S=await S,T(),S),K=JSON.parse(w),L=p(!1),N=p([]),O=p(1),Z=p(50),q=p(0),{copy:B}=l(),{addShop:D}=s();v((()=>A.searchText),(e=>{P(e)}));const F=e=>{Z.value=e,O.value=1,M()},G=e=>{O.value=e,M()},M=()=>{N.value=K.slice(50*(O.value-1),50*O.value)},P=b((e=>{const a=K.filter((a=>a.k.includes(e)));a&&(O.value=1,N.value=a.slice(50*(O.value-1),50*O.value),q.value=a.length)}),1e3);return d((()=>{q.value=K.length,M()})),(a,l)=>{const s=t,c=e,r=u,p=i,v=n,d=o;return m(),g("div",E,[f(c,{title:"EH标签列表"},{titleSide:_((()=>[f(s,{modelValue:L.value,"onUpdate:modelValue":l[0]||(l[0]=e=>L.value=e),size:"large","inline-prompt":"","inactive-text":"隐藏","active-text":"开启",class:"title-side"},null,8,["modelValue"]),U])),_:1}),L.value?(m(),g("div",V,[(m(!0),g(h,null,k(N.value,((e,l)=>(m(),g("div",{key:l,class:"tag-item",onClick:a=>j(B)(null==e?void 0:e.v)},[x("div",I,[x("p",J,z(null==e?void 0:e.k),1),x("p",X,z(null==e?void 0:e.v),1)]),x("div",null,[f(p,{size:"small",circle:"",onClick:a=>j(D)(null==e?void 0:e.v)},{default:_((()=>[C(a.$slots,"icon",{},(()=>[f(r)]),!0)])),_:2},1032,["onClick"]),f(p,{size:"small",circle:"",onClick:a=>j(B)(null==e?void 0:e.v)},{default:_((()=>[C(a.$slots,"icon",{},(()=>[f(v)]),!0)])),_:2},1032,["onClick"])])],8,H)))),128))])):y("",!0),L.value?(m(),g("div",Y,[f(d,{"current-page":O.value,"onUpdate:current-page":l[1]||(l[1]=e=>O.value=e),"page-size":Z.value,"onUpdate:page-size":l[2]||(l[2]=e=>Z.value=e),"page-sizes":[50,100],background:!0,layout:"total, sizes, prev, pager, next, jumper",total:q.value,onSizeChange:F,onCurrentChange:G},null,8,["current-page","page-size","total"])])):y("",!0)])}}}),[["__scopeId","data-v-187bf4ca"]]);export{$ as default};