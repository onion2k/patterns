import MosaicWorker from "./mosaic.worker.js";
import "./patterns.css";
import filesaver from "file-saver";
import default_image from "./default_gen.js";
import distortion from "./shapes.json";
import { getScaledImageData } from "./scaledData";
import { createSVG } from "./createSVG";
import attachDropTarget from "./droptarget";

/*
  Set some defaults
*/

let [shape, imgSize, cellSize, padding, variance, scaling, background] = [
  "fans",
  12,
  10,
  1,
  30,
  "none",
  "black"
];

let progress = 0;
let imgCache;

let elProgress = document.getElementById("progress");
let elSvg = document.getElementById("svg");
let elProgressCircle = document.getElementById("progressCircle");
let progressPath = document.querySelector("#progress > svg > path");
let progressPathLength = progressPath.getTotalLength();

progressPath.style.strokeDasharray = 50 + " " + progressPathLength;

let mosaicWorker = new MosaicWorker();
mosaicWorker.addEventListener("message", e => {
  if (e.data.type === "complete") {
    elSvg.innerHTML = e.data.svg;
    elProgress.style.display = "none";
    elSvg.style.display = "grid";
  }
});

elProgress.style.display = "none";

attachDropTarget(document.body, img => {
  imgCache = img;
  createSVG(mosaicWorker, shape, imgCache);
});

document.querySelectorAll("form.newui>ul.menu>li.option").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll("ul.menu>li.active").forEach(el => {
      el.classList.remove("active");
    });
    el.classList.add("active");
  });
});

document.querySelectorAll("form.newui>ul.menu>li.option").forEach(o => {
  o.addEventListener("click", () => {
    let op = o.getAttribute("rel");
    [].map.call(document.querySelectorAll("ul.options"), function(el) {
      el.classList.remove("active");
    });
    let el = document.querySelector('ul.options[rel="' + op + '"]');
    if (el) {
      el.classList.add("active");
    }
  });
});

[].map.call(document.querySelectorAll("form.newui>ul.options>li"), o => {
  o.addEventListener("click", () => {
    [].map.call(document.querySelectorAll("form.newui>ul.options>li"), o => {
      o.classList.remove("active");
    });
    if (o.getAttribute("rel")) {
      shape = o.getAttribute("rel");
    }
    o.classList.add("active");
    if (o.classList.contains("options")) {
      let so = document.querySelector("ul[rel=shapeoptions]");
      if (so) {
        so.classList.remove("active");
        so.setAttribute("rel", "");
      }
      document
        .querySelector("ul.options." + shape)
        .setAttribute("rel", "shapeoptions");
      document.querySelector("li[rel=shapeoptions]").classList.remove("hide");
    } else {
      document.querySelector("li[rel=shapeoptions]").classList.add("hide");
    }
  });
});

document.getElementById("regen").addEventListener("click", e => {
  e.preventDefault();
  createSVG(mosaicWorker, shape, imgCache);
});

document.getElementById("download").addEventListener("click", e => {
  e.preventDefault();
  let svg = new File([document.getElementById("svg").innerHTML], "imgsvg.svg", {
    type: "image/svg+xml"
  });
  filesaver.saveAs(svg);
});

document.getElementById("toggle").addEventListener("click", e => {
  e.preventDefault();
  document.querySelector("form.newui").classList.toggle("open");
});

if (window.location.hash !== "undefined" && window.location.hash) {
  [
    shape,
    imgSize,
    cellSize,
    padding,
    variance,
    scaling,
    background
  ] = window.location.hash.substr(1).split(",");
}

imgCache = default_image();
let data = getScaledImageData(
  imgCache,
  imgSize,
  distortion[shape].x,
  distortion[shape].y
);

setTimeout(() => {
  mosaicWorker.postMessage({
    type: "create",
    shape,
    imgSize: data.width,
    cellSize: cellSize,
    padding: padding,
    aspect: data.height / data.width,
    variance: variance,
    scaling: scaling,
    data: data.data,
    background: background,
    distortion: distortion[shape],
    meta: distortion[shape].meta
  });
}, 1500);
