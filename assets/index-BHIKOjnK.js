var g=(b,p,t)=>new Promise((u,n)=>{var _=o=>{try{s(t.next(o))}catch(i){n(i)}},d=o=>{try{s(t.throw(o))}catch(i){n(i)}},s=o=>o.done?u(o.value):Promise.resolve(o.value).then(_,d);s((t=t.apply(b,p)).next())});import{bd as k,r as x,C,o as w,c as m,i as h,ay as v,b3 as L,aP as B,aQ as D,j as e,w as r,m as c,K as T,bB as j,s as N,bC as S,bD as V,bE as A}from"./index-CHeSYODq.js";const R={class:"app-container"},F=h("code",null,"Documentation",-1),I=["src"],K={class:"app-container"},U={__name:"index",setup(b){const p=k(),t=x([]),u=C(()=>p.getErrorLogInfoList);function n(o){return{vue:"success",script:"",resource:"info",ajax:"danger",promise:"warning"}[o]}function _(){throw new Error("fire vue error!")}function d(){t.value.push(`${new Date().getTime()}.png`)}function s(){return g(this,null,function*(){yield j()})}return(o,i)=>{const f=N,E=S,a=V,y=A;return w(),m(v,null,[h("div",R,[F,(w(!0),m(v,null,L(t.value,l=>B((w(),m("img",{key:l,src:l,alt:""},null,8,I)),[[D,!1]])),128))]),h("div",K,[e(f,{onClick:_},{default:r(()=>[c("点击触发vue错误")]),_:1}),e(f,{onClick:d},{default:r(()=>[c("点击触发资源加载错误")]),_:1}),e(f,{onClick:s},{default:r(()=>[c("点击触发ajax错误")]),_:1}),e(y,{data:u.value,border:"",style:{width:"100%"}},{default:r(()=>[e(a,{prop:"type",label:"类型",width:"90"},{default:r(l=>[e(E,{type:n(l.row.type),"disable-transitions":""},{default:r(()=>[c(T(l.row.type),1)]),_:2},1032,["type"])]),_:1}),e(a,{prop:"url",label:"URL",width:"200","show-overflow-tooltip":""}),e(a,{prop:"time",label:"时间",width:"160"}),e(a,{prop:"file",label:"文件",width:"200","show-overflow-tooltip":""}),e(a,{prop:"name",label:"Name",width:"200","show-overflow-tooltip":""}),e(a,{prop:"message",label:"错误信息",width:"300","show-overflow-tooltip":""}),e(a,{prop:"stack",label:"stack信息","show-overflow-tooltip":""})]),_:1},8,["data"])])],64)}}};export{U as default};