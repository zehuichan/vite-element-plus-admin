import{d as v}from"./index-392494f5.js";import{_ as V,k as g,r as k,d as i,o as P,e as F,f as o,w as t,i as a}from"./index-226f3333.js";import{u as _}from"./useForm-0c485b98.js";const $=[{field:"field1",component:"Input",label:"字段1",colProps:{span:8},defaultValue:123,required:!0},{field:"field2",component:"Input",label:"字段2",colProps:{span:8}},{field:"field3",component:"Input",label:"字段3",slot:"f3",colProps:{span:8}},{field:"field34",component:"ApiSelect",label:"ApiSelect",componentProps:{api:v,params:"abc",resultField:"list",labelField:"name",valueField:"id"},colProps:{span:8},defaultValue:"1",required:!0},{field:"field35",component:"ApiSelect",label:"本地下拉选择",componentProps:{options:[{label:"黄金糕",value:1},{label:"双皮奶",value:2},{label:"蚵仔煎",value:3},{label:"龙须面",value:4},{label:"北京烤鸭",value:5}]},colProps:{span:8}}],A=g({setup(){const l=k({}),[,e,{setProps:d,setFieldsValue:r,getFieldsValue:p}]=_({schemas:$});function u(){l.value={field2:123123}}return{modelRef:l,register:e,setProps:d,setFieldsValue:r,getFieldsValue(){console.log(p())},handleChange:u}}}),R={class:"app-container"};function z(l,e,d,r,p,u){const n=i("el-button"),m=i("el-form-item"),c=i("el-input"),b=i("schema-form");return P(),F("div",R,[o(m,{label:"配置"},{default:t(()=>[o(n,{onClick:e[0]||(e[0]=s=>l.setProps({size:"small"}))},{default:t(()=>[a("small")]),_:1}),o(n,{onClick:e[1]||(e[1]=s=>l.setProps({size:"default"}))},{default:t(()=>[a("default")]),_:1}),o(n,{onClick:e[2]||(e[2]=s=>l.setProps({size:"large"}))},{default:t(()=>[a("large")]),_:1}),o(n,{onClick:e[3]||(e[3]=s=>l.setProps({disabled:!0}))},{default:t(()=>[a("禁用表单")]),_:1}),o(n,{onClick:e[4]||(e[4]=s=>l.setProps({disabled:!1}))},{default:t(()=>[a("解除禁用")]),_:1}),o(n,{onClick:e[5]||(e[5]=s=>l.setFieldsValue({field1:123123}))},{default:t(()=>[a(" setFieldsValue ")]),_:1}),o(n,{onClick:l.getFieldsValue},{default:t(()=>[a(" getFieldsValue")]),_:1},8,["onClick"]),o(n,{onClick:l.handleChange},{default:t(()=>[a("handleChange")]),_:1},8,["onClick"])]),_:1}),o(b,{model:l.modelRef,onRegister:l.register},{f3:t(({model:s,field:f})=>[o(c,{modelValue:s[f],"onUpdate:modelValue":C=>s[f]=C,placeholder:"自定义slot"},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["model","onRegister"])])}const w=V(A,[["render",z]]);export{w as default};
