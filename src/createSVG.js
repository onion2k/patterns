import distortion from "./shapes.json";
import { getScaledImageData } from "./scaledData";

/**
 * SVG generator function to post data to worker
 * @external document - browser document to access form data 
 * @external window - browser window object to update hash 
 * @param {worker} mosaicWorker - initialised web worker to generate SVG data
 * @param {string} shape - shape string
 * @param {image} imgCache - scaled image data 
 */
export function createSVG(mosaicWorker, shape, imgCache) {
  let elProgress = document.getElementById("progress");
  let elSvg = document.getElementById("svg");
  let elProgressCircle = document.getElementById("progressCircle");

  elProgress.style.display = "grid";
  elSvg.style.display = "none";

  let imgSize = parseInt(document.getElementById("size").value) || 48;
  let cellSize = parseInt(document.getElementById("cellsize").value) || 5;
  let padding = parseInt(document.getElementById("gap").value) || 0;
  let variance = parseInt(document.getElementById("variance").value) || 30;
  let scalingSelect = document.getElementById("scaling");
  let scaling = scalingSelect.options[scalingSelect.selectedIndex].value;
  let backgroundSelect = document.getElementById("background");
  let background =
    backgroundSelect.options[backgroundSelect.selectedIndex].value;

  let meta = distortion[shape].meta;

  window.location.hash = `#${shape},${imgSize},${cellSize},${padding},${variance},${scaling},${background}`;

  if (shape === "words") {
    let text = "IMGSVG";
    if (document.getElementById("text")) {
      text = document.getElementById("text").value || text;
    }

    let font = "Ubuntu Mono";
    if (document.getElementById("font")) {
      let fontSelect = document.getElementById("font");
      font = fontSelect.options[fontSelect.selectedIndex].value || font;
    }

    meta = {
      text,
      font
    };

    window.location.hash += `,font=${font},text=${text}`;
  }

  if (shape === "hilbert") {
    let factor = 7;
    if (document.getElementById("factor")) {
      factor = document.getElementById("factor").value || factor;
    }

    meta = {
      factor
    };

    window.location.hash += `,complexity=${factor}`;
  }

  let data = getScaledImageData(
    imgCache,
    imgSize,
    distortion[shape].x,
    distortion[shape].y
  );

  if (window.Worker) {
    document.body.classList.add("black");
    mosaicWorker.postMessage({
      type: "create",
      shape,
      imgSize: data.width,
      cellSize,
      padding,
      aspect: data.height / data.width,
      variance,
      scaling,
      data: data.data,
      background,
      distortion: distortion[shape],
      meta
    });
  } else {
    document.body.innerHTML = "Sorry, you need web workers.";
  }
}
