import{r as c,d as u,o as l,e as k,f as C,w as $,G as p,H as d,bd as I}from"./index-872f8f89.js";import{u as V}from"./useForm-188419ce.js";const h={class:"app-container"},g={__name:"appendForm",setup(x){const m=[{field:"field1",component:"Input",label:"字段1",defaultValue:123,required:!0},{field:"field2",component:"Input",label:"字段2"},{field:"0",component:"Input",colSlot:"add"}],[i,{appendSchemaByField:t,removeSchemaByField:f}]=V({schemas:m,baseColProps:{span:8}}),e=c(1),a=c({});function v(){t({field:`field${e.value}a`,component:"Input",label:"字段"+e.value,required:!0,colProps:{span:8}}),t({field:`field${e.value}b`,component:"Input",label:"字段"+e.value,required:!0,colProps:{span:8}}),t({field:`${e.value}`,component:"Input",colSlot:"add",colProps:{span:8}}),e.value++}function _(o){console.log(o),f([`field${o}a`,`field${o}b`,`${o}`]),e.value--}return(o,s)=>{const r=u("el-button"),b=u("vc-form");return l(),k("div",h,[C(b,{modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=n=>a.value=n),onRegister:I(i)},{add:$(({field:n})=>[Number(n)===0?(l(),p(r,{key:0,text:"",icon:"Plus",onClick:v})):d("",!0),n>0?(l(),p(r,{key:1,text:"",icon:"Minus",onClick:B=>_(n)},null,8,["onClick"])):d("",!0)]),_:1},8,["modelValue","onRegister"])])}}};export{g as default};
