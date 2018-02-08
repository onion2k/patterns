import base from "./base";

export default class Paint extends base {
  constructor(data) {
    super(data);

    this.scaleOverride = 2;

    this.mX = this.cellSize * this.scaleOverride + this.padding;
    this.mY = this.cellSize * this.scaleOverride + this.padding;

    this.pieces = [
      "0000",
      "1000",
      "1100",
      "1110",
      "1111",
      "e000",
      "e00e",
      "e001",
      "e01e",
      "e010",
      "e10e",
      "e011",
      "e11e",
      "e100",
      "e101",
      "e111"
    ];

    this.addDef(require("../puzzle/0000.svg"));
    this.addDef(require("../puzzle/1000.svg"));
    this.addDef(require("../puzzle/1100.svg"));
    this.addDef(require("../puzzle/1110.svg"));
    this.addDef(require("../puzzle/1111.svg"));
    this.addDef(require("../puzzle/e000.svg"));
    this.addDef(require("../puzzle/e00e.svg"));
    this.addDef(require("../puzzle/e001.svg"));
    this.addDef(require("../puzzle/e01e.svg"));
    this.addDef(require("../puzzle/e010.svg"));
    this.addDef(require("../puzzle/e10e.svg"));
    this.addDef(require("../puzzle/e011.svg"));
    this.addDef(require("../puzzle/e11e.svg"));
    this.addDef(require("../puzzle/e100.svg"));
    this.addDef(require("../puzzle/e101.svg"));
    this.addDef(require("../puzzle/e111.svg"));
  }

  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x = Math.floor(pos % this.imgSize) * this.mX;
      var y = Math.floor(pos / this.imgSize) * this.mX;

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

      scale = `scale(${this.scaleOverride})`;

      let piece = this.pieces[Math.floor(Math.random() * this.pieces.length)];

      this.add(
        s,
        `<use xlink:href="#${piece}" fill="${col}" transform="${translate} ${scale}" />`
      );
    }
    this.cWidth = maxXpos + this.mX / 2;
    this.cHeight = maxYpos + this.mY / 2;
  }
}
