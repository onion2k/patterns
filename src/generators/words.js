import base from "./base";

export default class Words extends base {
  constructor(data) {
    super(data);

    this.mX = this.cellSize + this.padding;
    this.mY = this.cellSize + this.padding;

    this.addDef(`<style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono');
    </style>`);

    this.addDef(
      `<text id="m" font-family="Ubuntu Mono" font-size="15">M</text>`
    );
    this.addDef(
      `<text id="a" font-family="Ubuntu Mono" font-size="15">A</text>`
    );
    this.addDef(
      `<text id="r" font-family="Ubuntu Mono" font-size="15">R</text>`
    );
    this.addDef(
      `<text id="i" font-family="Ubuntu Mono" font-size="15">I</text>`
    );
    this.addDef(
      `<text id="o" font-family="Ubuntu Mono" font-size="15">O</text>`
    );
  }

  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    let letters = ["m", "a", "r", "i", "o"];
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

      let id = letters[pos % 5];

      this.add(
        s,
        `<use xlink:href="#${id}" fill="${col}" transform="${translate} ${scale}" />`
      );
    }
    this.cWidth = maxXpos + this.mX / 2;
    this.cHeight = maxYpos + this.mY / 2;
  }
}
