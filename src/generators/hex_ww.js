import base from "./base";

export default class Hex extends base {
  constructor(data) {
    super(data);

    this.w = this.cellSize + this.padding;
    this.h = Math.sqrt(3) / 2 * this.cellSize + this.padding;

    let path = "M 0 0 ";
    for (var x = 0; x < 6; x++) {
      let r = Math.PI / 180 * (x * 60 + 30);
      this.extents.x.push(this.round(Math.cos(r) * this.cellSize / 2));
      this.extents.y.push(this.round(Math.sin(r) * this.cellSize / 2));
      path += "l ";
      path += this.round(Math.cos(r) * this.cellSize / 2) + " ";
      path += this.round(Math.sin(r) * this.cellSize / 2) + " ";
    }
    path += "Z";

    this.mX =
      Math.max(...this.extents.x) + Math.abs(Math.min(...this.extents.x));
    this.mY =
      Math.max(...this.extents.y) + Math.abs(Math.min(...this.extents.y));

    this.addDef(`<path id="h" d="${path}"></path>`);
  }
  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x =
        Math.floor(pos % this.imgSize) * (this.mY + this.padding) +
        (Math.floor(pos / this.imgSize) % 2 === 0) *
          (this.mY + this.padding) /
          2;
      var y = Math.floor(pos / this.imgSize) * (this.mX + this.padding);

      if (x > maxXpos) {
        maxXpos = x;
      }
      if (y > maxYpos) {
        maxYpos = y;
      }

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
    this.cWidth = maxXpos + this.mX / 2 + this.padding;
    this.cHeight = maxYpos + this.mY / 2 + this.padding;
  }
}
