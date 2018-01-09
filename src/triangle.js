import Rune from "rune.js";

export default function() {
  var r, imgSize, cellSize, padding, aspect;

  var init = function(imgSize, cellSize, padding, aspect, variance, data, img) {
    this.imgSize = imgSize;
    this.cellSize = cellSize;
    this.padding = padding * 0.8 - 1;
    this.aspect = aspect;
    this.variance = variance;
    this.data = data;
    this.img = img;

    this.p = [
      {
        x: Math.sin(Math.PI * ((0 * 180 + 0) / 180)) * this.cellSize,
        y: Math.cos(Math.PI * ((0 * 180 + 0) / 180)) * this.cellSize
      },
      {
        x: Math.sin(Math.PI * ((0 * 180 + 120) / 180)) * this.cellSize,
        y: Math.cos(Math.PI * ((0 * 180 + 120) / 180)) * this.cellSize
      },
      {
        x: Math.sin(Math.PI * ((0 * 180 + 240) / 180)) * this.cellSize,
        y: Math.cos(Math.PI * ((0 * 180 + 240) / 180)) * this.cellSize
      },
      {
        x: Math.sin(Math.PI * ((1 * 180 + 0) / 180)) * this.cellSize,
        y: Math.cos(Math.PI * ((1 * 180 + 0) / 180)) * this.cellSize
      },
      {
        x: Math.sin(Math.PI * ((1 * 180 + 120) / 180)) * this.cellSize,
        y: Math.cos(Math.PI * ((1 * 180 + 120) / 180)) * this.cellSize
      },
      {
        x: Math.sin(Math.PI * ((1 * 180 + 240) / 180)) * this.cellSize,
        y: Math.cos(Math.PI * ((1 * 180 + 240) / 180)) * this.cellSize
      }
    ];

    this.r = new Rune({
      container: "body",
      width: this.imgSize * (this.cellSize + this.padding),
      height: Math.floor(
        this.aspect * this.imgSize * (this.cellSize + this.padding)
      )
    });

    return r;
  };

  var _chunk = function(chunk, total) {
    var self = this;
    var variance = this.variance;

    for (var i = 0; i < total; i += 4) {
      //ignore every other pixel alternatively

      var pos = (i + chunk) / 4;

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);

      if (x % 2 === y % 2) {
        continue;
      }

      var r = this.data[i + chunk];
      var g = this.data[i + chunk + 1];
      var b = this.data[i + chunk + 2];
      var a = this.data[i + chunk + 3];

      var c = {
        x:
          x * (this.cellSize + this.padding) +
          (y % 4 === 0 || y % 4 === 3) * (this.cellSize + this.padding),
        y:
          y * (this.cellSize + this.padding) +
          (y % 2) * (this.cellSize + this.padding - 1) * 0.25,
        a: x % 2,
        s: this.cellSize
      };

      if (c.a === 0) {
        var p1 = {
          x: c.x + this.p[0].x,
          y: c.y + this.p[0].y
        };
        var p2 = {
          x: c.x + this.p[1].x,
          y: c.y + this.p[1].y
        };
        var p3 = {
          x: c.x + this.p[2].x,
          y: c.y + this.p[2].y
        };
      } else {
        var p1 = {
          x: c.x + this.p[3].x,
          y: c.y + this.p[3].y
        };
        var p2 = {
          x: c.x + this.p[4].x,
          y: c.y + this.p[4].y
        };
        var p3 = {
          x: c.x + this.p[5].x,
          y: c.y + this.p[5].y
        };
      }

      var v = variance / 2 - Math.random() * variance;

      let color = new Rune.Color(r + v, g + v, b + v);

      this.r
        .triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
        .fill(color)
        .stroke(false)
        .scale(0.5 + color.luminosity());
    }

    self.r.draw();
  };

  var render = function(data) {
    // this.r.image(this.img, 0, 0, this.r.width, this.r.height);
    this.r
      .rect(0, 0, this.r.width, this.r.height)
      .fill(0, 0, 0)
      .stroke(false);
    this._chunk(0, this.data.length);
  };

  return {
    _chunk: _chunk,
    init: init,
    render: render
  };
}
