import base from "./base";

class Circle extends base {
  constructor(data) {
    super(data);
  }
  render() {}
}

export default function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.t = new Circle(data);
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

      this.svg.content += `<use xlink:href="#h" fill="rgb(${Math.floor(
        r + v
      )},${Math.floor(g + v)},${Math.floor(
        b + v
      )})" transform="translate(${x}, ${y})" />`;
    }
  };

  let render = data => {
    _chunk(0, this.data.length);
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this
      .svg.width} ${this.svg
      .height}" preserveAspectRatio="xMidYMid meet"><svg><defs><circle id="h" cx="0" cy="0" r="${this
      .cellSize /
      2}"></path></defs><rect width="100%" height="100%" fill="black"/>${this
      .svg.content}</svg>`;
  };

  return {
    init: init,
    render: render
  };
}
