import{r as t,aS as d,b as m,o as n,h as p,c as i,w as u,s as f,t as _,a2 as v,dd as b}from"./index-i8YlNBdy.js";const h={class:"app-container"},x={__name:"refForm",setup(k){const r=[{field:"field1",component:"Input",label:"字段1",required:!0},{field:"field2",component:"Input",label:"字段2",componentProps:{disabled:!0}},{field:"field3",component:"Input",label:"字段3",slot:"f3"},{field:"field4",component:"ApiSelect",label:"字段4",componentProps:{api:b,params:123,resultField:"list",labelField:"name",valueField:"id"}}],l=t(!1),a=t(null),e=t({});return d(()=>{console.log(a),setTimeout(()=>{l.value=!0,e.value={}},300)}),(F,s)=>{const c=m("vc-form");return n(),p("div",h,[l.value?(n(),i(c,{key:0,ref_key:"formRef",ref:a,modelValue:e.value,"onUpdate:modelValue":s[0]||(s[0]=o=>e.value=o),schemas:r,baseColProps:{span:8}},{f3:u(o=>[f(_(o),1)]),_:1},8,["modelValue"])):v("",!0)])}}};export{x as default};
