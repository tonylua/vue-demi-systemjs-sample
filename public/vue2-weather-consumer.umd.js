(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue-demi"));
	else if(typeof define === 'function' && define.amd)
		define(["vue-demi"], factory);
	else if(typeof exports === 'object')
		exports["vue2-weather-consumer"] = factory(require("vue-demi"));
	else
		root["vue2-weather-consumer"] = factory(root["vue-demi"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE_f281__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "ad70");
/******/ })
/************************************************************************/
/******/ ({

/***/ "ad70":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/.pnpm/registry.npmmirror.com+@vue+cli-service@4.5.19_vue-template-compiler@2.7.15_vue@2.7.15/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external "vue-demi"
var external_vue_demi_ = __webpack_require__("f281");

// CONCATENATED MODULE: ./src/components/WeatherConsumer.js
// vue 2 component

/* harmony default export */ var WeatherConsumer = (Object(external_vue_demi_["defineComponent"])({
  props: {
    city: {
      type: String,
      default: "unknown"
    },
    temperature: Number
  },
  setup(props, {
    emit
  }) {
    const vueVer = external_vue_demi_["isVue2"] ? 2 : 3;
    console.log("setup", vueVer);
    const centigrade = Object(external_vue_demi_["computed"])(() => `${props.temperature || "--"}℃`);
    const onClick = () => {
      console.log("onClick", props.city);
      emit("msg", props.city);
    };
    return () => Object(external_vue_demi_["h"])("div", {
      class: "consumer",
      ...(external_vue_demi_["isVue2"] ? {
        on: {
          click: onClick
        }
      } : {
        onClick: onClick
      })
    }, [Object(external_vue_demi_["h"])("h1", {
      style: "color: #336699",
      domProps: {
        innerHTML: "&lt;vue2-weather-consumer/&gt;"
      }
    }), `${props.city}: ${centigrade.value}`, Object(external_vue_demi_["h"])("hr"), `i am running in Vue${vueVer}`]);
  },
  style: `
    .consumer {
      border: 1px solid var(--vue3-color, #336699);
      border-radius: 10px;
      width: 300px;
      box-sizing: border-box;
      padding: 20px;
    }
  `
}));
// CONCATENATED MODULE: ./src/main-lib.js

// const install = function (Vue) {
//   if (install.installed) return;
//   Vue.component(WeatherConsumer.name, WeatherConsumer);
//   if (typeof window !== "undefined" && window.Vue) install(window.Vue);
// };
//
// WeatherConsumer.install = install;
/* harmony default export */ var main_lib = (WeatherConsumer);
// CONCATENATED MODULE: ./node_modules/.pnpm/registry.npmmirror.com+@vue+cli-service@4.5.19_vue-template-compiler@2.7.15_vue@2.7.15/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (main_lib);



/***/ }),

/***/ "f281":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_f281__;

/***/ })

/******/ });
});
//# sourceMappingURL=vue2-weather-consumer.umd.js.map