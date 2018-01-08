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
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * (this.cellSize + this.padding);
      var y = Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);

      var v = this.variance / 2 - Math.random() * this.variance;

      this.r
        .rect(x, y, this.cellSize, this.cellSize)
        .fill(r + v, g + v, b + v)
        .stroke(false);
    }

    this.r.draw();
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
