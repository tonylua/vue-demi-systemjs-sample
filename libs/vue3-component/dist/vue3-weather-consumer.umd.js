(function(e,s){typeof exports=="object"&&typeof module<"u"?module.exports=s(require("vue-demi")):typeof define=="function"&&define.amd?define(["vue-demi"],s):(e=typeof globalThis<"u"?globalThis:e||self,e["vue3-weather-consumer"]=s(e.vueDemi))})(this,function(e){"use strict";const s=o=>o?Object.entries(o).reduce((t,[n,r])=>(n=n.charAt(0).toUpperCase()+n.slice(1),n=`on${n}`,{...t,[n]:r}),{}):null,i=(o,t={},n)=>{if(e.isVue2)return e.h(o,t,n);const{props:r,domProps:u,on:l,...a}=t;return e.h(o,{...a,...r,...u,...s(l)},n)},d=`
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`,c=e.defineComponent({props:{city:{type:String,default:"unknown"},temperature:Number},setup(o,{emit:t}){const n=e.computed(()=>`${o.temperature||"--"}℃`),r=e.isVue2?2:3;window.globalVar1="vue3GlobalVar1",console.log("🇵🇸 setup 3",r,window.globalVar1,window.__CONTEXT_NAME__,window.__COMPONENT_HOST_VUE_VERSION__);const u=()=>{console.log("onClick",o.city),t("msg",o.city)};return()=>i("div",{class:"consumer",style:d,on:{click:u}},[i("h1",{style:"color: #336699",domProps:{innerHTML:"&lt;vue3-weather-consumer/&gt;"}}),`${o.city}: ${n.value}`,i("hr"),i("div",{class:"el-foo-bar custom-style"},`i am running in Vue${r}`)])}});return console.log("v3c",c),c});
