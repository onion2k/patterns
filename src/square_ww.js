export default function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding * 0.8 - 1;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.svg = {
      width: this.imgSize * (this.cellSize + this.padding),
      height: Math.floor(
        this.aspect * this.imgSize * (this.cellSize + this.padding)
      ),
      content: ""
    };

    return r;
  };

  // var _chunk = function(chunk, total) {
  //   for (var i = 0, n = this.data.length; i < n; i += 4) {
  //     var r = this.data[i];
  //     var g = this.data[i + 1];
  //     var b = this.data[i + 2];
  //     var a = this.data[i + 3];

  //     var pos = i / 4;

  //     var x = Math.floor(pos % this.imgSize) * (this.cellSize + this.padding);
  //     var y = Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);

  //     var v = this.variance / 2 - Math.random() * this.variance;
  //     let color = new Rune.Color(r + v, g + v, b + v);

  //     this.r
  //       .rect(x, y, this.cellSize, this.cellSize)
  //       .fill(color)
  //       .stroke(false);
  //   }

  //   this.r.draw();
  // };

  let _chunk = (chunk, total) => {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * (this.cellSize + this.padding);
      var y = Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);

      var v = this.variance / 2 - Math.random() * this.variance;

      this.svg.content += `<rect x="${-1 * this.cellSize / 2}" y="${-1 *
        this.cellSize /
        2}" width="${this.cellSize}" height="${
        this.cellSize
      }" fill="rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})" transform="translate(${x}, ${y})" />`;
    }
  };

  let render = data => {
    _chunk(0, this.data.length);
    return `<svg width="${this.svg.width}" height="${this.svg.height}">${
      this.svg.content
    }</svg>`;
  };

  return {
    init: init,
    render: render
  };
}
