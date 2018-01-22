import Rune from "rune.js";
import MosaicWorker from "./mosaic.worker.js";
import "./patterns.css";

import filesaver from "file-saver";

let progress = 0;
let imgCache;

let elProgress = document.getElementById("progress");
let elSvg = document.getElementById("svg");
let elProgressCircle = document.getElementById("progressCircle");

let mosaicWorker = new MosaicWorker();
mosaicWorker.addEventListener("message", e => {
  if (e.data.type === "complete") {
    elProgress.style.display = "none";
    elSvg.innerHTML = e.data.svg;
    elSvg.style.display = "grid";
  } else if (e.data.type === "progress") {
    // progress = e.data.progress;
    // elProgressCircle.setAttribute(
    //   "transform",
    //   "translate(50,50) scale(" + progress / 2 + ")"
    // );
  }
});

var getScaledImageData = function(imgSize) {
  var c = document.createElement("canvas");
  var aspect = imgCache.height / imgCache.width;
  c.width = imgSize;
  c.height = Math.floor(imgSize * aspect);

  var ctx = c.getContext("2d");

  ctx.drawImage(imgCache, 1, 1, imgSize, Math.floor(imgSize * aspect));

  return {
    data: ctx.getImageData(0, 0, c.width, c.height).data,
    width: c.width,
    height: c.height
  };
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
    var img = document.createElement("img");
    img.src = event.target.result;

    img.addEventListener("load", function() {
      imgCache = img;
      createSVG();
    });
  };

  reader.readAsDataURL(file);

  return false;
};

let createSVG = function() {
  elProgress.style.display = "grid";
  elSvg.style.display = "none";

  let shapeSelect = document.getElementById("shape");
  let shape = shapeSelect.options[shapeSelect.selectedIndex].value;
  var cellSize = parseInt(document.getElementById("cellsize").value) || 5;
  var imgSize = parseInt(document.getElementById("size").value) || 48;
  var padding = parseInt(document.getElementById("gap").value) || 0;
  var variance = parseInt(document.getElementById("variance").value) || 30;
  var data = getScaledImageData(imgSize);

  if (window.Worker) {
    document.body.classList.add("black");
    mosaicWorker.postMessage({
      type: "create",
      shape,
      imgSize,
      cellSize,
      padding,
      aspect: data.height / data.width,
      variance,
      data: data.data
    });
  } else {
    document.body.innerHTML = "Sorry, you need web workers.";
  }
};

const w = document.body.clientWidth;
const h = document.body.clientHeight;

var c = document.createElement("canvas");
var aspect = h / w;
c.width = 128;
c.height = Math.floor(128 * aspect);

var ctx = c.getContext("2d");

var linearGradient1 = ctx.createLinearGradient(128 / aspect, 0, 0, 128);
linearGradient1.addColorStop(0, "rgb(255, 255, 255)");
linearGradient1.addColorStop(1, "rgb(  0, 0, 0)");
ctx.fillStyle = linearGradient1;
ctx.fillRect(0, 0, 128, 128);

imgCache = c;

let data = getScaledImageData(128);

mosaicWorker.postMessage({
  type: "create",
  shape: "hex",
  imgSize: 128,
  cellSize: 12,
  padding: 1,
  aspect: data.height / data.width,
  variance: 30,
  data: data.data
});

document.getElementById("regen").addEventListener("click", e => {
  e.preventDefault();
  createSVG();
});

document.getElementById("download").addEventListener("click", e => {
  e.preventDefault();
  let svg = new File(
    [document.getElementById("svg").innerHTML],
    "pictato.svg",
    { type: "image/svg+xml" }
  );
  filesaver.saveAs(svg);
});
