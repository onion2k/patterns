import Rune from "rune.js";

var triangle = function() {
  var r, imgSize, cellSize, padding, aspect;

  var _chunk = function(chunk, total) {
    var self = this;
    var variance = this.variance;

    var progress = document.getElementById("progress");
    progress.value = Math.floor(chunk / total * 100);

    if (chunk + 40 < total) {
      for (var i = 0; i < 40; i += 4) {
        var r = this.data[i + chunk];
        var g = this.data[i + chunk + 1];
        var b = this.data[i + chunk + 2];
        var a = this.data[i + chunk + 3];

        var pos = (i + chunk) / 4;

        var x = Math.floor(pos % this.imgSize);
        var y = Math.floor(pos / this.imgSize);

        var c = {
          x:
            x * (this.cellSize * this.padding) +
            (y % 2) * this.cellSize * this.padding,
          y:
            y * (this.cellSize * (1 + this.padding) - this.cellSize / 3) +
            (x % 2) * this.cellSize / 2,
          a: (x % 2) * 180,
          s: this.cellSize
        };

        var p1 = {
          x: c.x + Math.sin(Math.PI * ((c.a + 0) / 180)) * c.s,
          y: c.y + Math.cos(Math.PI * ((c.a + 0) / 180)) * c.s
        };
        var p2 = {
          x: c.x + Math.sin(Math.PI * ((c.a + 120) / 180)) * c.s,
          y: c.y + Math.cos(Math.PI * ((c.a + 120) / 180)) * c.s
        };
        var p3 = {
          x: c.x + Math.sin(Math.PI * ((c.a + 240) / 180)) * c.s,
          y: c.y + Math.cos(Math.PI * ((c.a + 240) / 180)) * c.s
        };

        var brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

        var v = variance / 2 - Math.random() * variance;

        // this.r.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
        //     .fill(r + v, g + v, b + v)
        //     .stroke(false);
      }

      setTimeout(function() {
        self._chunk(chunk + 40, total);
      }, 0);
    } else {
      // self.r.draw();
      document.body.removeChild(progress);
    }
  };

  var init = function(imgSize, cellSize, padding, aspect, variance, data) {
    this.imgSize = imgSize;
    this.cellSize = cellSize;
    this.padding = padding;
    this.aspect = aspect;
    this.variance = variance;
    this.data = data;

    this.r = new Rune({
      container: "body",
      width: this.imgSize * this.cellSize * this.padding * 1.5,
      height: Math.floor(
        this.imgSize *
          this.aspect *
          (this.cellSize * (1 + this.padding) - this.cellSize / 2)
      )
    });

    return r;
  };

  var render = function(data) {
    var total = this.data.length;

    console.log("Total: ", total / 4);

    this._chunk(0, total);
  };

  return {
    _chunk: _chunk,
    init: init,
    render: render
  };
};

var square = function() {
  var r, imgSize, cellSize, padding, aspect;

  var init = function(imgSize, cellSize, padding, aspect, variance) {
    this.imgSize = imgSize;
    this.cellSize = cellSize;
    this.padding = padding;
    this.aspect = aspect;
    this.variance = variance;

    this.r = new Rune({
      container: "body",
      width: this.imgSize * this.cellSize * this.padding,
      height: Math.floor(
        this.imgSize * this.cellSize * this.padding * this.aspect
      )
    });

    return r;
  };
  var render = function(data) {
    var variance = this.variance;
    var progress = document.getElementById("progress");
    var total = data.length;

    for (var i = 0, n = data.length; i < n; i += 4) {
      progress.value = Math.floor(i / total * 100);

      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      var a = data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * (this.cellSize * this.padding);
      var y = Math.floor(pos / this.imgSize) * (this.cellSize * this.padding);

      var v = variance / 2 - Math.random() * variance;

      this.r
        .rect(x, y, this.cellSize, this.cellSize)
        .fill(r + v, g + v, b + v)
        .stroke(false);
    }

    this.r.draw();

    document.body.removeChild(progress);
  };

  return {
    init: init,
    render: render
  };
};

var hex = function() {
  var r, imgSize, cellSize, padding, aspect, offsets;

  var init = function(imgSize, cellSize, padding, aspect, variance) {
    this.imgSize = imgSize;
    this.cellSize = cellSize;
    this.padding = padding;
    this.aspect = aspect;
    this.offsets = [];
    this.variance = variance;

    this.r = new Rune({
      container: "body",
      width: this.imgSize * this.cellSize * this.padding * 2,
      height:
        Math.floor(this.imgSize * this.cellSize * this.padding * this.aspect) *
        2
    });

    for (var x = 0; x < 6; x++) {
      this.offsets.push({
        x: Math.sin(Math.PI * (x * 60 / 180)) * this.cellSize,
        y: Math.cos(Math.PI * (x * 60 / 180)) * this.cellSize
      });
    }
  };
  var render = function(data) {
    var total = data.length;
    var progress = document.getElementById("progress");

    for (var i = 0, n = data.length; i < n; i += 4) {
      progress.value = Math.floor(i / total * 100);

      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      var a = data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);

      var c = {
        x:
          x * (this.cellSize * this.padding) +
          (y % 2) * (this.cellSize * this.padding / 2),
        y: y * (this.cellSize * this.padding),
        s: this.cellSize
      };

      var v = this.variance / 2 - Math.random() * this.variance;

      let p1 = { x: c.x + this.offsets[0].x, y: c.y + this.offsets[0].y };
      let p2 = { x: c.x + this.offsets[1].x, y: c.y + this.offsets[1].y };
      let p3 = { x: c.x + this.offsets[2].x, y: c.y + this.offsets[2].y };
      let p4 = { x: c.x + this.offsets[3].x, y: c.y + this.offsets[3].y };
      let p5 = { x: c.x + this.offsets[4].x, y: c.y + this.offsets[4].y };
      let p6 = { x: c.x + this.offsets[5].x, y: c.y + this.offsets[5].y };

      this.r
        .path(c.x, c.y)
        .moveTo(p1.x, p1.y)
        .lineTo(p2.x, p2.y)
        .lineTo(p3.x, p3.y)
        .lineTo(p4.x, p4.y)
        .lineTo(p5.x, p5.y)
        .lineTo(p6.x, p6.y)
        .closePath()
        .fill(r + v, g + v, b + v)
        .stroke(false);
    }

    this.r.draw();

    document.body.removeChild(progress);
  };

  return {
    init: init,
    render: render
  };
};

var circle = {
  init: function() {},
  render: function() {}
};

var getScaledImageData = function(imgSize, img, distortion) {
  var c = document.createElement("canvas");
  var aspect = img.height / img.width;
  c.width = imgSize * distortion;
  c.height = Math.floor(imgSize * aspect);

  var ctx = c.getContext("2d");

  ctx.drawImage(img, 1, 1, imgSize * distortion, Math.floor(imgSize * aspect));

  return ctx.getImageData(0, 0, c.width, c.height).data;
};

var holder = document.body;

holder.ondragover = function() {
  this.className = "hover";
  return false;
};
holder.ondragend = function() {
  this.className = "";
  return false;
};
holder.ondrop = function(e) {
  e.preventDefault();

  document.body.innerHTML = "";

  var progress = document.createElement("progress");
  progress.id = "progress";
  progress.max = 100;
  progress.value = 1;

  document.body.appendChild(progress);

  var file = e.dataTransfer.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var cellSize = 9;
    var padding = 1.0;
    var imgSize = 96;
    var distortion = 1.5;
    var variance = 30;

    var img = document.createElement("img");
    img.src = event.target.result;

    img.addEventListener("load", () => {
      var data = getScaledImageData(imgSize, img, distortion);

      var mosaic = new triangle();
      mosaic.init(
        imgSize * distortion,
        cellSize,
        padding,
        img.height / img.width,
        variance,
        data
      );
      mosaic.render(data);
    });
  };

  reader.readAsDataURL(file);
  return false;
};
