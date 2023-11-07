(function(e,n){typeof exports=="object"&&typeof module<"u"?module.exports=n(require("vue-demi")):typeof define=="function"&&define.amd?define(["vue-demi"],n):(e=typeof globalThis<"u"?globalThis:e||self,e["vue3-weather-consumer"]=n(e.vueDemi))})(this,function(e){"use strict";const n=`
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`,o=e.defineComponent({props:{city:{type:String,default:"unknown"},temperature:Number},setup(t,{emit:i}){const s=e.computed(()=>`${t.temperature||"--"}℃`),u=e.isVue2?2:3,r=()=>{console.log("onClick",t.city),i("msg",t.city)};return()=>e.h("div",{class:"consumer",style:n,...e.isVue2?{on:{click:r}}:{onClick:r}},[e.h("h1",{style:"color: #336699",domProps:{innerHTML:"&lt;vue3-weather-consumer/&gt;"}}),`${t.city}: ${s.value}`,e.h("hr"),`i am running in Vue${u}`])}});return console.log("v3c",o),o});
