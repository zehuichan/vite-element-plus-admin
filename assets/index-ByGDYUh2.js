var g=(b,p,t)=>new Promise((u,n)=>{var d=o=>{try{s(t.next(o))}catch(i){n(i)}},_=o=>{try{s(t.throw(o))}catch(i){n(i)}},s=o=>o.done?u(o.value):Promise.resolve(o.value).then(d,_);s((t=t.apply(b,p)).next())});import{cX as y,r as x,m as L,o as w,f as h,b as m,F as v,h as C,bN as N,bE as T,e,w as a,s as c,t as j,dj as B,z as D,dk as S,dg as V,dh as A}from"./index-o0xeFpyr.js";const F={class:"app-container"},R=m("code",null,"Documentation",-1),z=["src"],I={class:"app-container"},$={__name:"index",setup(b){const p=y(),t=x([]),u=L(()=>p.getErrorLogInfoList);function n(o){return{vue:"success",script:"",resource:"info",ajax:"danger",promise:"warning"}[o]}function d(){throw new Error("fire vue error!")}function _(){t.value.push(`${new Date().getTime()}.png`)}function s(){return g(this,null,function*(){yield B()})}return(o,i)=>{const f=D,E=S,r=V,k=A;return w(),h(v,null,[m("div",F,[R,(w(!0),h(v,null,C(t.value,l=>N((w(),h("img",{key:l,src:l,alt:""},null,8,z)),[[T,!1]])),128))]),m("div",I,[e(f,{onClick:d},{default:a(()=>[c("点击触发vue错误")]),_:1}),e(f,{onClick:_},{default:a(()=>[c("点击触发资源加载错误")]),_:1}),e(f,{onClick:s},{default:a(()=>[c("点击触发ajax错误")]),_:1}),e(k,{data:u.value,style:{width:"100%"}},{default:a(()=>[e(r,{prop:"type",label:"类型",width:"90"},{default:a(l=>[e(E,{type:n(l.row.type),"disable-transitions":""},{default:a(()=>[c(j(l.row.type),1)]),_:2},1032,["type"])]),_:1}),e(r,{prop:"url",label:"URL",width:"200","show-overflow-tooltip":""}),e(r,{prop:"time",label:"时间",width:"160"}),e(r,{prop:"file",label:"文件",width:"200","show-overflow-tooltip":""}),e(r,{prop:"name",label:"Name",width:"200","show-overflow-tooltip":""}),e(r,{prop:"message",label:"错误信息",width:"300","show-overflow-tooltip":""}),e(r,{prop:"stack",label:"stack信息","show-overflow-tooltip":""})]),_:1},8,["data"])])],64)}}};export{$ as default};
