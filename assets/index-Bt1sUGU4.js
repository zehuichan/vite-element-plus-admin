var i=(o,_,a)=>new Promise((l,s)=>{var c=e=>{try{n(a.next(e))}catch(r){s(r)}},t=e=>{try{n(a.throw(e))}catch(r){s(r)}},n=e=>e.done?l(e.value):Promise.resolve(e.value).then(c,t);n((a=a.apply(o,_)).next())});import{_ as p,o as u,c as h,h as d,i as k,J as m,by as B}from"./index-D3J4LNDq.js";const f={methods:{goBack(){return i(this,null,function*(){this.$router.back()})}}},g={class:"app-header"},$={class:"app-container"};function v(o,_,a,l,s,c){const t=B;return u(),h("div",null,[d("div",g,[k(t,{onBack:c.goBack},null,8,["onBack"])]),d("div",$,[d("code",null,m(o.$route.meta),1)])])}const b=p(f,[["render",v]]);export{b as default};