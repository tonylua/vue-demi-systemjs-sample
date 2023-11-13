(function(e,o){typeof exports=="object"&&typeof module<"u"?module.exports=o(require("vue-demi")):typeof define=="function"&&define.amd?define(["vue-demi"],o):(e=typeof globalThis<"u"?globalThis:e||self,e["vue3-weather-consumer"]=o(e.vueDemi))})(this,function(e){"use strict";const o=`
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`,t=e.defineComponent({props:{city:{type:String,default:"unknown"},temperature:Number},setup(n,{emit:s}){const u=e.computed(()=>`${n.temperature||"--"}℃`),i=e.isVue2?2:3;window.globalVar1="vue3GlobalVar1",console.log("🇵🇸 setup 3",i,window.globalVar1,window.__CONTEXT_NAME__,window.__COMPONENT_HOST_VUE_VERSION__);const r=()=>{console.log("onClick",n.city),s("msg",n.city)};return()=>e.h("div",{class:"consumer",style:o,...e.isVue2?{on:{click:r}}:{onClick:r}},[e.h("h1",{style:"color: #336699",domProps:{innerHTML:"&lt;vue3-weather-consumer/&gt;"}}),`${n.city}: ${u.value}`,e.h("hr"),`i am running in Vue${i}`])}});return console.log("v3c",t),t});
