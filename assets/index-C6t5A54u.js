var p=(o,_,a)=>new Promise((l,s)=>{var t=e=>{try{n(a.next(e))}catch(r){s(r)}},c=e=>{try{n(a.throw(e))}catch(r){s(r)}},n=e=>e.done?l(e.value):Promise.resolve(e.value).then(t,c);n((a=a.apply(o,_)).next())});import{_ as i,o as u,h,e as d,f as k,t as f,dk as m}from"./index-i8YlNBdy.js";const B={methods:{goBack(){return p(this,null,function*(){this.$router.back()})}}},g={class:"app-header"},$={class:"app-container"};function v(o,_,a,l,s,t){const c=m;return u(),h("div",null,[d("div",g,[k(c,{onBack:t.goBack},null,8,["onBack"])]),d("div",$,[d("code",null,f(o.$route.meta),1)])])}const E=i(B,[["render",v]]);export{E as default};
