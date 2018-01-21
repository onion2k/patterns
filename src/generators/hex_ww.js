import base from "./base";

export default class Hex extends base {
  constructor(data) {
    super(data);

    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding - 2;
    this.variance = data.variance;
    this.data = data.data;

    this.content = "";

    this.w = this.cellSize + this.padding;
    this.h = Math.sqrt(3) / 2 * this.cellSize + this.padding;

    let path = "M 0 0 ";
    for (var x = 0; x < 6; x++) {
      let r = Math.PI / 180 * (x * 60 + 30);
      path += "l ";
      path += this.round(Math.cos(r) * this.cellSize / 2) + " ";
      path += this.round(Math.sin(r) * this.cellSize / 2) + " ";
    }
    path += "Z";

    this.addDef(`<path id="h" d="${path}"></path>`);
  }
  _chunk() {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = i / 4;

      var x =
        Math.floor(pos % this.imgSize) * this.w +
        (Math.floor(pos / this.imgSize) % 2 === 0) * this.w / 2;
      var y = Math.floor(pos / this.imgSize) * this.h;

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      this.content += `<use xlink:href="#h" fill="rgb(${Math.floor(
        r + v
      )},${Math.floor(g + v)},${Math.floor(
        b + v
      )})" transform="translate(${this.round(x)}, ${this.round(y)})" />`;
    }
  }
}
