var s=(i,o,c)=>new Promise((e,d)=>{var a=r=>{try{n(c.next(r))}catch(l){d(l)}},t=r=>{try{n(c.throw(r))}catch(l){d(l)}},n=r=>r.done?e(r.value):Promise.resolve(r.value).then(a,t);n((c=c.apply(i,o)).next())});import{r as h,bd as m,as as w}from"./index-71307c3b.js";const p=i=>{const o=h(null),c=a=>{o.value=a,a.setProps(i)},e=()=>s(void 0,null,function*(){const a=m(o);if(!a)throw new Error("The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!");return yield w(),a});return[c,{setProps:(...a)=>s(void 0,null,function*(){return(yield e()).setProps(...a)}),setSchema:a=>s(void 0,null,function*(){const t=yield e();t==null||t.setSchema(a)}),addSchema:(a,t)=>s(void 0,null,function*(){const n=yield e();n==null||n.addSchema(a,t)}),delSchema:a=>s(void 0,null,function*(){const t=yield e();t==null||t.delSchema(a)}),validate:(...a)=>s(void 0,null,function*(){return(yield e()).validate(...a)}),validateField:(...a)=>s(void 0,null,function*(){return(yield e()).validateField(...a)}),resetFields:(...a)=>s(void 0,null,function*(){return(yield e()).resetFields(...a)}),scrollToField:(...a)=>s(void 0,null,function*(){return(yield e()).scrollToField(...a)}),clearValidate:(...a)=>s(void 0,null,function*(){return(yield e()).clearValidate(...a)})}]};export{p as u};
