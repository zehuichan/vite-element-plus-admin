var _=(o,l,a)=>new Promise((p,s)=>{var t=e=>{try{n(a.next(e))}catch(r){s(r)}},c=e=>{try{n(a.throw(e))}catch(r){s(r)}},n=e=>e.done?p(e.value):Promise.resolve(e.value).then(t,c);n((a=a.apply(o,l)).next())});import{_ as i,b as h,o as u,h as m,e as d,f,t as k}from"./index-5cf31855.js";const B={methods:{goBack(){return _(this,null,function*(){this.$router.back()})}}},g={class:"app-header"},$={class:"app-container"};function v(o,l,a,p,s,t){const c=h("el-page-header");return u(),m("div",null,[d("div",g,[f(c,{onBack:t.goBack},null,8,["onBack"])]),d("div",$,[d("code",null,k(o.$route.meta),1)])])}const y=i(B,[["render",v]]);export{y as default};