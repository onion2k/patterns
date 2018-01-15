/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mosaic_worker_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mosaic_worker_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mosaic_worker_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patterns_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patterns_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__patterns_css__);
// import Rune from "rune.js";



// import triangle from "./triangle";
// import square from "./square";
// import hexagon from "./hex";
// import circle from "./circle";

let mosaicWorker = new __WEBPACK_IMPORTED_MODULE_0__mosaic_worker_js___default.a();
mosaicWorker.addEventListener("message", e => {
  let svg = document.getElementById("svg");
  svg.innerHTML = e.data;
});

var getScaledImageData = function(imgSize, img) {
  var c = document.createElement("canvas");
  var aspect = img.height / img.width;
  c.width = imgSize;
  c.height = Math.floor(imgSize * aspect);

  var ctx = c.getContext("2d");

  ctx.drawImage(img, 1, 1, imgSize, Math.floor(imgSize * aspect));

  return ctx.getImageData(0, 0, c.width, c.height).data;
};

var holder = document.body;

holder.ondragover = function() {
  return false;
};
holder.ondragend = function() {
  return false;
};

holder.ondrop = function(e) {
  e.preventDefault();

  var file = e.dataTransfer.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var distortion = 1.5;
    let shapeSelect = document.getElementById("shape");
    let shape = shapeSelect.options[shapeSelect.selectedIndex].value;
    var cellSize = parseInt(document.getElementById("cellsize").value) || 5;
    var imgSize = parseInt(document.getElementById("size").value) || 48;
    var variance = parseInt(document.getElementById("variance").value) || 30;
    var padding = parseInt(document.getElementById("gap").value) || 0;

    var img = document.createElement("img");
    img.src = event.target.result;

    img.addEventListener("load", () => {
      var data = getScaledImageData(imgSize, img);

      if (window.Worker) {
        document.body.classList.remove("starry");
        document.body.classList.add("black");

        mosaicWorker.postMessage({
          type: "create",
          shape,
          imgSize,
          cellSize,
          padding,
          aspect: img.height / img.width,
          variance,
          data,
          img: img.src
        });
      } else {
        document.body.innerHTML = "";

        let mosaic;
        switch (shape) {
          case "triangle":
            mosaic = new triangle();
            break;
          case "square":
            mosaic = new square();
            break;
          case "hex":
            mosaic = new hexagon();
            break;
          case "circle":
            mosaic = new circle();
            break;
          default:
            mosaic = new triangle();
            break;
        }

        mosaic.init(
          imgSize,
          cellSize,
          padding,
          img.height / img.width,
          variance,
          data,
          img.src
        );
        mosaic.render(data);
      }
    });
  };

  reader.readAsDataURL(file);

  return false;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "a7d6bdf9cbe9a385927e.worker.js");
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);