import{d as c}from"./index-87ff8df6.js";import{_ as b}from"./_plugin-vue_export-helper-c27b6911.js";import{j as _,b as P,u as i,r,o as V,l as $,a as o,w as t,z as n}from"./runtime-core.esm-bundler-b39fbec2.js";import"./index-827ea655.js";import"./index-2fbc70ff.js";import"./vue-router-f2ae8227.js";const v=[{field:"field1",component:"Input",label:"字段1",colProps:{span:8},defaultValue:123,required:!0},{field:"field2",component:"Input",label:"字段2",colProps:{span:8}},{field:"field3",component:"Input",label:"字段3",slot:"f3",colProps:{span:8}},{field:"field4",component:"ApiSelect",label:"字段4",colProps:{span:8},componentProps:{api:c,params:123,resultField:"list",labelField:"name",valueField:"id"}}],C=_({setup(){const l=P(null);return{formRef:l,schemas:v,setProps(e){i(l).setProps(e)},setFieldsValue(e){i(l).setFieldsValue(e)}}}}),k={class:"app-container"};function F(l,e,z,I,g,w){const a=r("el-button"),d=r("el-form-item"),m=r("el-input"),f=r("schema-form");return V(),$("div",k,[o(d,{label:"配置"},{default:t(()=>[o(a,{onClick:e[0]||(e[0]=s=>l.setProps({size:"small"}))},{default:t(()=>[n("small")]),_:1}),o(a,{onClick:e[1]||(e[1]=s=>l.setProps({size:"default"}))},{default:t(()=>[n("default")]),_:1}),o(a,{onClick:e[2]||(e[2]=s=>l.setProps({size:"large"}))},{default:t(()=>[n("large")]),_:1}),o(a,{onClick:e[3]||(e[3]=s=>l.setProps({disabled:!0}))},{default:t(()=>[n("禁用表单")]),_:1}),o(a,{onClick:e[4]||(e[4]=s=>l.setProps({disabled:!1}))},{default:t(()=>[n("解除禁用")]),_:1}),o(a,{onClick:e[5]||(e[5]=s=>l.setFieldsValue({field1:123123}))},{default:t(()=>[n(" setFieldsValue ")]),_:1})]),_:1}),o(f,{ref:"formRef",schemas:l.schemas},{"form-field1-label":t(()=>[n("custom label")]),f3:t(({model:s,field:p})=>[o(m,{modelValue:s[p],"onUpdate:modelValue":u=>s[p]=u,placeholder:"自定义slot"},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["schemas"])])}const q=b(C,[["render",F]]);export{q as default};
