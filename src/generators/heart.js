import base from "./base";

export default class Square extends base {
  constructor(data) {
    super(data);

    this.mX = this.cellSize + this.padding;
    this.mY = this.cellSize + this.padding;

    this.addDef(
      `<path id='h' d="M140,20C 73,20 20,74 20,140 20,275 156,310 248,443 336,311 477,270 477,140 477,74 423,20 357,20 309,20 267,48 248,89 229,48 188,20 140,20Z" transform="scale(0.025)" />`
    );
  }

  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x = Math.floor(pos % this.imgSize) * this.mX;
      var y = Math.floor(pos / this.imgSize) * this.mY;

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
    this.cWidth = maxXpos + this.mX / 2;
    this.cHeight = maxYpos + this.mY / 2;
  }
}
