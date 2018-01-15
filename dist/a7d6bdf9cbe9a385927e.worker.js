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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__triangle_ww__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__square_ww__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hex_ww__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__circle_ww__ = __webpack_require__(4);





class Mosaic {
  constructor(data) {
    // Worker for building mosaics
    // Add some defaults?
    switch (data.shape) {
      case "triangle":
        this.mosaic = new __WEBPACK_IMPORTED_MODULE_0__triangle_ww__["a" /* default */]();
        break;
      case "square":
        this.mosaic = new __WEBPACK_IMPORTED_MODULE_1__square_ww__["a" /* default */]();
        break;
      case "hex":
        this.mosaic = new __WEBPACK_IMPORTED_MODULE_2__hex_ww__["a" /* default */]();
        break;
      case "circle":
        this.mosaic = new __WEBPACK_IMPORTED_MODULE_3__circle_ww__["a" /* default */]();
        break;
      default:
        this.mosaic = new __WEBPACK_IMPORTED_MODULE_3__circle_ww__["a" /* default */]();
        break;
    }
    this.mosaic.init(data);
  }
  render() {
    return this.mosaic.render(this.data);
  }
}

self.addEventListener("message", event => {
  if (event.data.type === "create") {
    let mos = new Mosaic(event.data);
    if (!mos) {
      console.warn("No worker instance");
    } else {
      let svg = mos.render();
      postMessage(svg);
    }
  }
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.h = this.cellSize / Math.cos(60 * 0.0174533);

    this.offsets = [];
    for (var x = 0; x < 3; x++) {
      this.offsets.push({
        x: this.h * Math.sin((30 + x * 120) * 0.0174533),
        y: this.h * Math.cos((30 + x * 120) * 0.0174533)
      });
    }

    this.svg = {
      width: Math.floor(this.imgSize * (this.cellSize + this.padding)),
      height: Math.floor(
        this.aspect * this.imgSize * (this.cellSize + this.padding)
      ),
      content: "",
      debug: ""
    };

    return r;
  };

  let _chunk = (chunk, total) => {
    for (var i = 0, n = total; i < n; i += 4) {
      var pos = (i + chunk) / 4;

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);
      if (x % 2 === y % 2) {
        continue;
      }
      let xPos =
        x * (this.cellSize + this.padding) +
        (y % 4 === 0 || y % 4 === 3) * (this.cellSize + this.padding);
      let yPos =
        y * (this.cellSize + this.padding) + (y % 2) * this.padding / 2;

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      this.svg.content += `<path d="M  ${this.offsets[0].x} ${
        this.offsets[0].y
      } `;
      this.svg.content += `L ${this.offsets[1].x} ${this.offsets[1].y} `;
      this.svg.content += `L ${this.offsets[2].x} ${this.offsets[2].y} `;

      this.svg.content += `Z" fill="rgb(${r},${g},${b})" stroke="rgb(0,0,0)" transform="translate(${xPos}, ${yPos}) rotate(${30 +
        (x % 2) * 180})" />`;
      // this.svg.debug += `<circle x="${xPos}" y="${yPos}" r="2" fill="rgb(255,255,255)" transform="translate(${xPos}, ${yPos})" />`;
    }
  };

  let render = data => {
    _chunk(0, this.data.length);
    return `<svg width="${this.svg.width}" height="${this.svg.height}">${
      this.svg.content
    }${this.svg.debug}</svg>`;
  };

  return {
    init: init,
    render: render
  };
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding * 0.8 - 1;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.svg = {
      width: this.imgSize * (this.cellSize + this.padding),
      height: Math.floor(
        this.aspect * this.imgSize * (this.cellSize + this.padding)
      ),
      content: ""
    };

    return r;
  };

  let _chunk = (chunk, total) => {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * (this.cellSize + this.padding);
      var y = Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);

      var v = this.variance / 2 - Math.random() * this.variance;

      this.svg.content += `<rect x="${-1 * this.cellSize / 2}" y="${-1 *
        this.cellSize /
        2}" width="${this.cellSize}" height="${
        this.cellSize
      }" fill="rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})" transform="translate(${x}, ${y})" />`;
    }
  };

  let render = data => {
    _chunk(0, this.data.length);
    return `<svg width="${this.svg.width}" height="${this.svg.height}">${
      this.svg.content
    }</svg>`;
  };

  return {
    init: init,
    render: render
  };
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding * 0.8 - 1;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.offsets = [];
    for (var x = 0; x < 6; x++) {
      this.offsets.push({
        x:
          Math.round(Math.sin(Math.PI * (x * 60 / 180)) * this.cellSize * 100) /
          100,
        y:
          Math.round(Math.cos(Math.PI * (x * 60 / 180)) * this.cellSize * 100) /
          100
      });
    }

    this.svg = {
      width:
        2 * Math.floor((this.imgSize + 1) * (this.cellSize + this.padding)),
      height:
        2 *
        Math.floor(this.aspect * this.imgSize * (this.cellSize + this.padding)),
      content: ""
    };

    return r;
  };

  let _chunk = (chunk, total) => {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = (i + chunk) / 4;

      var y =
        2 * Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);
      var x =
        2 * Math.floor(pos % this.imgSize) * (this.cellSize + this.padding) +
        (Math.floor(pos / this.imgSize) % 2) * (this.cellSize + this.padding);

      var r = this.data[i + chunk];
      var g = this.data[i + chunk + 1];
      var b = this.data[i + chunk + 2];
      var a = this.data[i + chunk + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      this.svg.content += `<path d="M 0 0 `;

      this.svg.content += `l ${this.offsets[0].x} ${this.offsets[0].y} `;
      this.svg.content += `l ${this.offsets[1].x} ${this.offsets[1].y} `;
      this.svg.content += `l ${this.offsets[2].x} ${this.offsets[2].y} `;
      this.svg.content += `l ${this.offsets[3].x} ${this.offsets[3].y} `;
      this.svg.content += `l ${this.offsets[4].x} ${this.offsets[4].y} `;
      this.svg.content += `l ${this.offsets[5].x} ${this.offsets[5].y} `;

      this.svg.content += `Z" fill="rgb(${Math.floor(r + v)},${Math.floor(
        g + v
      )},${Math.floor(b + v)})" transform="translate(${Math.round(x * 100) /
        100}, ${Math.round(y * 100) / 100})" />`;
    }
  };

  let render = data => {
    _chunk(0, this.data.length);
    return `<svg width="${this.svg.width}" height="${this.svg.height}">${
      this.svg.content
    }</svg>`;
  };

  return {
    init: init,
    render: render
  };
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding * 0.8 - 1;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.svg = {
      width: this.imgSize * (this.cellSize + this.padding),
      height: Math.floor(
        this.aspect * this.imgSize * (this.cellSize + this.padding)
      ),
      content: ""
    };

    return r;
  };

  let _chunk = (chunk, total) => {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * (this.cellSize + this.padding);
      var y = Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);

      var v = this.variance / 2 - Math.random() * this.variance;

      this.svg.content += `<circle cx="${x}" cy="${y}" r="${this.cellSize /
        2}" fill="rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})" />`;
    }
  };

  let render = data => {
    _chunk(0, this.data.length);
    return `<svg width="${this.svg.width}" height="${this.svg.height}">${
      this.svg.content
    }</svg>`;
  };

  return {
    init: init,
    render: render
  };
});


/***/ })
/******/ ]);