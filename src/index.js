import Rune from "rune.js";
import MosaicWorker from "./mosaic.worker.js";
import "./patterns.css";

import triangle from "./triangle";
import square from "./square";
import hexagon from "./hex";
import circle from "./circle";

let mosaicWorker = new MosaicWorker();
mosaicWorker.addEventListener("message", e => {
  document.body.innerHTML = e.data;
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

      document.body.innerHTML = "";
      document.body.classList.remove("starry");
      document.body.classList.add("black");

      if (window.Worker) {
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
