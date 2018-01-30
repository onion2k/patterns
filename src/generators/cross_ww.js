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

      this.extents.x.push(this.round(Math.cos(r) * c));
      this.extents.y.push(this.round(Math.sin(r) * c));

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

    this.mX =
      Math.max(...this.extents.x) + Math.abs(Math.min(...this.extents.x));
    this.mY =
      Math.max(...this.extents.y) + Math.abs(Math.min(...this.extents.y));

    this.addDef(`<path id="h" d="${path}"></path>`);
  }
  _chunk() {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = i / 4;

      if (
        Math.floor(pos % this.imgSize) % 3 === 2 &&
        Math.floor(pos / this.imgSize) % 2 === 0
      ) {
        continue;
      }

      var x =
        Math.floor(pos % this.imgSize) * (this.mY + this.padding) / 3 * 2 +
        (Math.floor(pos / this.imgSize) % 2 === 0) *
          (this.mY + this.padding) /
          3 -
        Math.floor((pos % this.imgSize) / 3) * (this.mY + this.padding) / 3;

      var y =
        Math.floor(pos / this.imgSize) * (this.mX + this.padding) -
        (Math.floor(pos / this.imgSize) - Math.floor(pos / this.imgSize) % 2) /
          2 *
          ((this.mX + this.padding) / 3) -
        (Math.floor(pos % this.imgSize) % 3) * (this.mX + this.padding) / 3;

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
