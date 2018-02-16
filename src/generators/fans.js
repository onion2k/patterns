import base from "./base";

export default class Fans extends base {
  constructor(data) {
    super(data);

    this.w = this.cellSize + this.padding;
    this.h = Math.sqrt(3) / 2 * this.cellSize + this.padding;

    let c = this.cellSize;
    let cm1 = -1 * c;
    let c2 = 2 * c;

    let path = `M ${cm1},0 `;
    path += `a${c},${c} 0 0,1 ${c2},0 `;
    path += `a${c},${c} 0 0,0 ${cm1},${c} `;
    path += `a${c},${c} 0 0,0 ${cm1},${cm1} `;
    path += `Z`;

    this.mX = this.w * 2;
    this.mY = this.h * 1;

    this.addDef(`<path id="h" d="${path}"></path>`);
  }
  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x =
        Math.floor(pos % this.imgSize) * (this.mX + this.padding) +
        (Math.floor(pos / this.imgSize) % 2 === 0) *
          (this.mX + this.padding) /
          2;
      var y = Math.floor(pos / this.imgSize) * (this.mY + this.padding);

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

      scale = "";

      this.add(
        s,
        `<use xlink:href="#h" fill="${col}" transform="${translate} ${scale}" />`
      );
    }
    this.cWidth = maxXpos + this.mX / 2 + this.padding;
    this.cHeight = maxYpos + this.mY / 2 + this.padding;
  }
}
