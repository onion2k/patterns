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

    this.offsets = [];
    for (var x = 0; x < 6; x++) {
      this.offsets.push({
        x: Math.sin(Math.PI * (x * 60 / 180)) * this.cellSize,
        y: Math.cos(Math.PI * (x * 60 / 180)) * this.cellSize
      });
    }

    this.r = new Rune({
      container: "body",
      width: this.imgSize * (this.cellSize + this.padding) * 2,
      height:
        Math.floor(
          this.aspect * this.imgSize * (this.cellSize + this.padding)
        ) * 2
    });

    return r;
  };

  var _chunk = function(chunk, total) {
    for (var i = 0; i < total; i += 4) {
      var pos = (i + chunk) / 4;

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);

      var r = this.data[i + chunk];
      var g = this.data[i + chunk + 1];
      var b = this.data[i + chunk + 2];
      var a = this.data[i + chunk + 3];

      var v = this.variance / 2 - Math.random() * this.variance;
      let color = new Rune.Color(r + v, g + v, b + v);

      let p1 = { x: this.offsets[0].x, y: this.offsets[0].y };
      let p2 = { x: this.offsets[1].x, y: this.offsets[1].y };
      let p3 = { x: this.offsets[2].x, y: this.offsets[2].y };
      let p4 = { x: this.offsets[3].x, y: this.offsets[3].y };
      let p5 = { x: this.offsets[4].x, y: this.offsets[4].y };
      let p6 = { x: this.offsets[5].x, y: this.offsets[5].y };

      this.r
        .polygon(0, 0)
        .lineTo(p1.x, p1.y)
        .lineTo(p2.x, p2.y)
        .lineTo(p3.x, p3.y)
        .lineTo(p4.x, p4.y)
        .lineTo(p5.x, p5.y)
        .lineTo(p6.x, p6.y)
        .fill(color)
        .stroke(false)
        .scale(0.5 + color.luminosity() * 2)
        .move(
          x * (2 * (this.cellSize + this.padding)) +
            (y % 2) * 2 * ((this.cellSize + this.padding) / 2),
          y * 2 * (this.cellSize + this.padding)
        );
    }

    this.r.draw();
  };

  var render = function(data) {
    // this.r.image(this.img, 0, 0, this.r.width, this.r.height);
    // this.r
    //   .rect(0, 0, this.r.width, this.r.height)
    //   .fill(0, 0, 0)
    //   .stroke(false);
    this._chunk(0, this.data.length);
  };

  return {
    _chunk: _chunk,
    init: init,
    render: render
  };
}
