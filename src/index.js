import MosaicWorker from "./mosaic.worker.js";
import "./patterns.css";
import filesaver from "file-saver";
import default_image from "./default_gen.js";

let progress = 0;
let imgCache;

let elProgress = document.getElementById("progress");
let elSvg = document.getElementById("svg");
let elProgressCircle = document.getElementById("progressCircle");

let distortion = {
  hex: { x: 1, y: 1.25, meta: {} },
  fans: { x: 1, y: 2, meta: {} },
  triangle: { x: 1, y: 1, meta: {} },
  square: {
    x: 1,
    y: 1,
    meta: {
      length: [1, 1],
      offset: 0,
      rotation: 0,
      borderRadius: [0, 0],
      offsetMod: 1
    }
  },
  circle: { x: 1, y: 1, meta: {} },
  flower: { x: 1, y: 1, meta: {} },
  pentagon: { x: 8, y: 1, meta: {} },
  cross: { x: 1.5, y: 1, meta: {} },
  paint: { x: 1, y: 1, meta: {} },
  puzzle: { x: 1, y: 1, meta: {} },
  words: {
    x: 1,
    y: 1,
    meta: {
      text: "IMGSVG",
      font: "Ubuntu Mono"
    }
  },
  bricks: {
    x: 0.5,
    y: 1,
    meta: {
      length: [2, 1],
      offset: 0.5,
      rotation: 0,
      borderRadius: [0, 0],
      offsetMod: 2
    }
  },
  tapestry: {
    x: 0.75,
    y: 1,
    meta: {
      offset: 0.25,
      length: [1.6, 1],
      rotation: -45,
      borderRadius: [7, 3],
      offsetMod: 4
    }
  },
  crossstitch: {
    x: 1,
    y: 1,
    meta: {}
  },
  heart: {
    x: 1,
    y: 1,
    meta: {}
  },
  hilbert: {
    x: 1,
    y: 1,
    meta: {
      factor: 6
    }
  }
};

let progressPath = document.querySelector("#progress > svg > path");
let progressPathLength = progressPath.getTotalLength();

progressPath.style.strokeDasharray = 50 + " " + progressPathLength;
// progressPath.style.strokeDashoffset = 0;

let mosaicWorker = new MosaicWorker();
mosaicWorker.addEventListener("message", e => {
  if (e.data.type === "complete") {
    elSvg.innerHTML = e.data.svg;
    elProgress.style.display = "none";
    elSvg.style.display = "grid";
  }
});

elProgress.style.display = "none";

const getScaledImageData = function(imgSize, dX, dY) {
  const distX = dX || 1;
  const distY = dY || 1;
  const c = document.createElement("canvas");
  const aspect = imgCache.height / imgCache.width;

  c.width = imgSize * distX;
  c.height = Math.floor(imgSize * aspect * distY);

  const ctx = c.getContext("2d");

  ctx.drawImage(imgCache, 0, 0, c.width, c.height);

  return {
    data: ctx.getImageData(0, 0, c.width, c.height).data,
    width: c.width,
    height: c.height
  };
};

var holder = document.body;

holder.ondragenter = function() {
  document.body.classList.add("drophover");
  return false;
};
holder.ondragover = function() {
  return false;
};
holder.ondragend = function() {
  return false;
};
holder.ondragleave = function(e) {
  if (e.target.id !== "dropoverlay") {
    return;
  }
  document.body.classList.remove("drophover");
  return false;
};

holder.ondrop = function(e) {
  e.preventDefault();

  document.body.classList.remove("drophover");

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
    let text = document.getElementById("text").value || "IMGSVG";

    let fontSelect = document.getElementById("font");
    let font = fontSelect.options[fontSelect.selectedIndex].value;

    meta = {
      text,
      font
    };

    window.location.hash += `,font=${font},text=${text}`;
  }

  if (shape === "hilbert") {
    let factor = document.getElementById("factor").value || 6;

    meta = {
      factor
    };

    window.location.hash += `,complexity=${factor}`;
  }

  let data = getScaledImageData(
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
};

// document.querySelectorAll("form>ul.options>li").forEach(el => {
//   el.addEventListener("click", e => {
//     e.preventDefault();
//     console.log(el.getAttribute("rel"));
//   });
// });

document.querySelectorAll("form.newui>ul.menu>li.option").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll("ul.menu>li.active").forEach(el => {
      el.classList.remove("active");
    });
    el.classList.add("active");
  });
});

document.getElementById("regen").addEventListener("click", e => {
  e.preventDefault();
  createSVG();
});

document.getElementById("download").addEventListener("click", e => {
  e.preventDefault();
  let svg = new File([document.getElementById("svg").innerHTML], "imgsvg.svg", {
    type: "image/svg+xml"
  });
  filesaver.saveAs(svg);
});

// let shapeSelect = document.getElementById("shape");
// shapeSelect.addEventListener("change", () => {
//   let shape = shapeSelect.options[shapeSelect.selectedIndex].value;

//   [].map.call(document.querySelectorAll(".shape-option"), function(el) {
//     el.classList.remove("show-option");
//   });

//   [].map.call(document.querySelectorAll(".shape-option-for-" + shape), function(
//     el
//   ) {
//     el.classList.add("show-option");
//   });
// });

document.querySelectorAll("form.newui>ul.menu>li.option").forEach(o => {
  o.addEventListener("click", () => {
    let op = o.getAttribute("rel");
    [].map.call(document.querySelectorAll("ul.options"), function(el) {
      el.style.display = "none";
    });

    let el = document.querySelector('ul.options[rel="' + op + '"]');
    el.style.display = "grid";
  });
});

[].map.call(document.querySelectorAll("form.newui>ul.options>li"), o => {
  o.addEventListener("click", () => {
    [].map.call(document.querySelectorAll("form.newui>ul.options>li"), o => {
      o.classList.remove("active");
    });
    o.classList.add("active");
  });
});

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

// document.getElementById("shape").value = shape;
// document.getElementById("size").value = imgSize;
// document.getElementById("cellsize").value = cellSize;
// document.getElementById("gap").value = padding;
// document.getElementById("variance").value = variance;
// document.getElementById("scaling").value = scaling;
// document.getElementById("background").value = background;

imgCache = default_image();
let data = getScaledImageData(
  imgSize,
  distortion[shape].x,
  distortion[shape].y
);

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
