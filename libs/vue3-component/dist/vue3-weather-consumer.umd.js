(function(e,o){typeof exports=="object"&&typeof module<"u"?module.exports=o(require("vue-demi")):typeof define=="function"&&define.amd?define(["vue-demi"],o):(e=typeof globalThis<"u"?globalThis:e||self,e["vue3-weather-consumer"]=o(e.vueDemi))})(this,function(e){"use strict";const o=`
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`,t=e.defineComponent({props:{city:{type:String,default:"unknown"},temperature:Number},setup(n,{emit:u}){var s;const d=e.computed(()=>`${n.temperature||"--"}℃`),r=e.isVue2?2:3;window.globalVar1="vue3GlobalVar1",(s=window.__RAW_WINDOW__)==null||s.console.log("setup3",r,window.globalVar1);const i=()=>{console.log("onClick",n.city),u("msg",n.city)};return()=>e.h("div",{class:"consumer",style:o,...e.isVue2?{on:{click:i}}:{onClick:i}},[e.h("h1",{style:"color: #336699",domProps:{innerHTML:"&lt;vue3-weather-consumer/&gt;"}}),`${n.city}: ${d.value}`,e.h("hr"),`i am running in Vue${r}`])}});return console.log("v3c",t),t});
