(function(e,n){typeof exports=="object"&&typeof module<"u"?module.exports=n(require("vue-demi")):typeof define=="function"&&define.amd?define(["vue-demi"],n):(e=typeof globalThis<"u"?globalThis:e||self,e["vue3-weather-consumer"]=n(e.vueDemi))})(this,function(e){"use strict";const n=e.defineComponent({props:{city:{type:String,default:"unknown"},temperature:Number},setup(o,{emit:r}){const i=e.computed(()=>`${o.temperature||"--"}℃`),u=e.isVue2?2:3,t=()=>{console.log("onClick",o.city),r("msg",o.city)};return()=>e.h("div",{class:"consumer",...e.isVue2?{on:{click:t}}:{onClick:t}},[e.h("h1",{style:"color: #336699",domProps:{innerHTML:"&lt;vue3-weather-consumer/&gt;"}}),`${o.city}: ${i.value}`,e.h("hr"),`i am running in Vue${u}`])},style:`
    .consumer {
      border: 1px solid var(--vue3-color, #336699);
      border-radius: 10px;
      width: 300px;
      box-sizing: border-box;
      padding: 20px;
    }
  `});return console.log("v3c",n),n});
