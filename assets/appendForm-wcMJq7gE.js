import{r,b6 as b,o as a,f as k,b as $,w as B,c as u,a2 as p,a as C,z as I}from"./index-A1Q-xROe.js";import{u as V}from"./useForm-nKPEmbYL.js";const h={class:"app-container"},P={__name:"appendForm",setup(x){const d=[{field:"field1",component:"Input",label:"字段1",defaultValue:123,required:!0},{field:"field2",component:"Input",label:"字段2"},{field:"0",component:"Input",colSlot:"add"}],[m,{appendSchemaByField:t,removeSchemaByField:i}]=V(),e=r(1),l=r({});function f(){t({field:`field${e.value}a`,component:"Input",label:"字段"+e.value,required:!0,colProps:{span:8}}),t({field:`field${e.value}b`,component:"Input",label:"字段"+e.value,required:!0,colProps:{span:8}}),t({field:`${e.value}`,component:"Input",colSlot:"add",colProps:{span:8}}),e.value++}function v(o){console.log(o),i([`field${o}a`,`field${o}b`,`${o}`]),e.value--}return(o,s)=>{const c=I,_=b("vc-form");return a(),k("div",h,[$(_,{modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=n=>l.value=n),schemas:d,"base-col-props":{span:8},onRegister:C(m)},{add:B(({field:n})=>[Number(n)===0?(a(),u(c,{key:0,text:"",icon:"Plus",onClick:f})):p("",!0),n>0?(a(),u(c,{key:1,text:"",icon:"Minus",onClick:F=>v(n)},null,8,["onClick"])):p("",!0)]),_:1},8,["modelValue","onRegister"])])}}};export{P as default};
