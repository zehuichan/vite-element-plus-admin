import{_ as m,k as f,r as _,d as u,o as l,e as v,f as $,w as b,G as p,H as d}from"./index-3380c06d.js";import{u as k}from"./useForm-9a52a0d8.js";const h=[{field:"field1",component:"Input",label:"字段1",colProps:{span:8},defaultValue:123,required:!0},{field:"field2",component:"Input",label:"字段2",colProps:{span:8}},{field:"0",component:"Input",colProps:{span:8},slot:"add"}],C=f({setup(){const[,n,{appendSchemaByField:t,removeSchemaByField:s}]=k({schemas:h}),e=_(1);function r(){t({field:`field${e.value}a`,component:"Input",label:"字段"+e.value,required:!0},""),t({field:`field${e.value}b`,component:"Input",label:"字段"+e.value,required:!0},""),t({field:`${e.value}`,component:"Input",label:" ",slot:"add"},""),e.value++}function c(o){console.log(o),s([`field${o}a`,`field${o}b`,`${o}`]),e.value--}return{register:n,add:r,del:c}}}),I={class:"app-container"};function g(n,t,s,e,r,c){const o=u("el-button"),i=u("schema-form");return l(),v("div",I,[$(i,{onRegister:n.register},{add:b(({field:a})=>[Number(a)===0?(l(),p(o,{key:0,text:"",icon:"Plus",onClick:n.add},null,8,["onClick"])):d("",!0),a>0?(l(),p(o,{key:1,text:"",icon:"Minus",onClick:B=>n.del(a)},null,8,["onClick"])):d("",!0)]),_:1},8,["onRegister"])])}const P=m(C,[["render",g]]);export{P as default};
