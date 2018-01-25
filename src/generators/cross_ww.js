import base from "./base";

export default class Hex extends base {
  constructor(data) {
    super(data);

    this.w = this.cellSize + this.padding;
    this.h = this.cellSize + this.padding;

    let path = "M 0 0 ";
    for (var x = 0; x < 12; x++) {
      let r = Math.PI / 180 * (x * 30 + 45);
      let c = x % 3 ? this.cellSize / 2 : this.cellSize / 5;
      path += "L ";
      path += this.round(Math.cos(r) * c) + " ";
      path += this.round(Math.sin(r) * c) + " ";
    }
    let r = Math.PI / 180 * (0 * 30 + 45);
    let c = 0 % 3 ? this.cellSize / 2 : this.cellSize / 5;
    path += "L ";
    path += this.round(Math.cos(r) * c) + " ";
    path += this.round(Math.sin(r) * c) + " ";
    path += "Z";

    this.addDef(`<path id="h" d="${path}"></path>`);
  }
  _chunk() {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * this.w;
      var y = Math.floor(pos / this.imgSize) * this.h;

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      let col = `rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})`;

      let translate = `translate(${this.round(x)}, ${this.round(y)})`;
      let s = this.round(this.scale(r, g, b));
      let scale = "";
      if (s) {
        scale = `scale(${s})`;
      }

      this.add(
        s,
        `<use xlink:href="#h" fill="${col}" transform="${translate} ${scale}" />`
      );
    }
  }
}
