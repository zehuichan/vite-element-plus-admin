var h=(t,c,s)=>new Promise((d,p)=>{var m=e=>{try{a(s.next(e))}catch(n){p(n)}},o=e=>{try{a(s.throw(e))}catch(n){p(n)}},a=e=>e.done?d(e.value):Promise.resolve(e.value).then(m,o);a((s=s.apply(t,c)).next())});import{_ as F,d as P,u as R,r as y,a as L,l as q,b as _,o as g,c as S,w as f,n as C,e as i,f as u,F as z,t as E,h as x,i as N,j as A,k as V,m as K,p as T,q as j,s as D,v as M}from"./index--irwSdLZ.js";function O(t){return["admin","editor"].indexOf(t.trim())>=0}const G=P({name:"AppLocalePicker",props:{reload:Boolean},setup(t){const{changeLocale:c,getLocale:s}=R(),d=y(L(s));function p(o){return h(this,null,function*(){yield c(o),d.value=o,t.reload&&location.reload()})}function m(o){L(s)!==o&&p(o)}return{localeList:q,selected:d,handleCommand:m}}}),H=["onClick"];function I(t,c,s,d,p,m){const o=_("icon-park"),a=_("el-popover");return g(),S(a,{"popper-class":"app-locale-picker"},{reference:f(()=>[u("div",{class:C(t.$attrs.class)},[i(o,{name:"translate"})],2)]),default:f(()=>[(g(!0),x(z,null,N(t.localeList,e=>(g(),x("div",{class:C(["app-locale-picker-item",{"is-active":t.selected==e.event}]),onClick:n=>t.handleCommand(e.event)},E(e.text),11,H))),256))]),_:1})}const J=F(G,[["render",I]]),Q={class:"login-container relative"},W={class:"flex items-center absolute right-4 top-4 text-16px text-#fff"},X=u("div",{class:"title-container"},[u("h3",{class:"title"},"System Login")],-1),Y=u("div",{class:"tips"},[u("span",{style:{"margin-right":"20px"}},"username: admin"),u("span",null,"password: any")],-1),oe={__name:"index",setup(t){const c=A(),{currentRoute:s,replace:d}=M(),p=(v,r,l)=>{O(r)?l():l(new Error("Please enter the correct user name"))},m=(v,r,l)=>{r.length<6?l(new Error("The password can not be less than 6 digits")):l()},o=y(),a=V({username:"admin",password:"111111"}),e=V({username:[{required:!0,validator:p}],password:[{required:!0,validator:m}]}),n=y(!1),$=K(()=>s.value.query.redirect);function k(){return h(this,null,function*(){try{n.value=!0,(yield o.value.validate())&&(console.log("submit!"),yield c.login(a),yield d({path:$.value||"/"}),n.value=!1)}catch(v){console.log("error submit!",v),n.value=!1}})}return(v,r)=>{const l=_("el-input"),b=_("el-form-item"),U=_("el-button"),B=_("el-form");return g(),x("div",Q,[u("div",W,[i(J)]),i(B,{ref_key:"loginFormRef",ref:o,model:a,rules:e,class:"login-form","auto-complete":"on","label-position":"left",size:"large"},{default:f(()=>[X,i(b,{prop:"username"},{default:f(()=>[i(l,{modelValue:a.username,"onUpdate:modelValue":r[0]||(r[0]=w=>a.username=w),placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on",clearable:""},null,8,["modelValue"])]),_:1}),i(b,{prop:"password"},{default:f(()=>[i(l,{modelValue:a.password,"onUpdate:modelValue":r[1]||(r[1]=w=>a.password=w),type:"password",placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on","show-password":"",clearable:"",onKeyup:T(k,["enter"])},null,8,["modelValue"])]),_:1}),i(U,{loading:n.value,type:"primary",size:"large",style:{width:"100%","margin-bottom":"30px"},onClick:j(k,["prevent"])},{default:f(()=>[D(" Login ")]),_:1},8,["loading"]),Y]),_:1},8,["model","rules"])])}}};export{oe as default};
