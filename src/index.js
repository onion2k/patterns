import Rune from "rune.js";
import MosaicWorker from "./mosaic.worker.js";
import "./patterns.css";

let progress = 0;

let mosaicWorker = new MosaicWorker();
mosaicWorker.addEventListener("message", e => {
  if (e.data.type === "complete") {
    document.getElementById("progress").style.display = "none";
    let svg = document.getElementById("svg");
    svg.style.display = "grid";
    svg.innerHTML = e.data.svg;
  } else if (e.data.type === "progress") {
    document.getElementById("progress").style.display = "grid";
    document.getElementById("svg").style.display = "none";
    progress = e.data.progress;
    let progressCircle = document.getElementById("progressCircle");
    progressCircle.setAttribute(
      "transform",
      "translate(50,50) scale(" + progress / 2 + ")"
    );
  }
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
        document.body.innerHTML = "Sorry, you need web workers.";
      }
    });
  };

  reader.readAsDataURL(file);

  return false;
};

var c = document.createElement("canvas");
var aspect = 600 / 800;
c.width = 128;
c.height = Math.floor(128 * aspect);

var ctx = c.getContext("2d");

var linearGradient1 = ctx.createLinearGradient(128 / aspect, 0, 0, 128);
linearGradient1.addColorStop(0, "rgb(255, 255, 255)");
linearGradient1.addColorStop(1, "rgb(  0, 0, 0)");
ctx.fillStyle = linearGradient1;
ctx.fillRect(0, 0, 128, 128);

let data = ctx.getImageData(0, 0, c.width, c.height).data;

mosaicWorker.postMessage({
  type: "create",
  shape: "hex",
  imgSize: 128,
  cellSize: 6,
  padding: 3,
  aspect: 600 / 800,
  variance: 30,
  data: data
});
