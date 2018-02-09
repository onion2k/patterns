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
      `<text id="a" font-family="${this.meta.font}" font-size="15">A</text>`
    );
    this.addDef(
      `<text id="b" font-family="${this.meta.font}" font-size="15">B</text>`
    );
    this.addDef(
      `<text id="c" font-family="${this.meta.font}" font-size="15">C</text>`
    );
    this.addDef(
      `<text id="d" font-family="${this.meta.font}" font-size="15">D</text>`
    );
    this.addDef(
      `<text id="e" font-family="${this.meta.font}" font-size="15">E</text>`
    );
    this.addDef(
      `<text id="f" font-family="${this.meta.font}" font-size="15">F</text>`
    );
    this.addDef(
      `<text id="g" font-family="${this.meta.font}" font-size="15">G</text>`
    );
    this.addDef(
      `<text id="h" font-family="${this.meta.font}" font-size="15">H</text>`
    );
    this.addDef(
      `<text id="i" font-family="${this.meta.font}" font-size="15">I</text>`
    );
    this.addDef(
      `<text id="j" font-family="${this.meta.font}" font-size="15">J</text>`
    );
    this.addDef(
      `<text id="k" font-family="${this.meta.font}" font-size="15">K</text>`
    );
    this.addDef(
      `<text id="l" font-family="${this.meta.font}" font-size="15">L</text>`
    );
    this.addDef(
      `<text id="m" font-family="${this.meta.font}" font-size="15">M</text>`
    );
    this.addDef(
      `<text id="n" font-family="${this.meta.font}" font-size="15">N</text>`
    );
    this.addDef(
      `<text id="o" font-family="${this.meta.font}" font-size="15">O</text>`
    );
    this.addDef(
      `<text id="p" font-family="${this.meta.font}" font-size="15">P</text>`
    );
    this.addDef(
      `<text id="q" font-family="${this.meta.font}" font-size="15">Q</text>`
    );
    this.addDef(
      `<text id="r" font-family="${this.meta.font}" font-size="15">R</text>`
    );
    this.addDef(
      `<text id="s" font-family="${this.meta.font}" font-size="15">S</text>`
    );
    this.addDef(
      `<text id="t" font-family="${this.meta.font}" font-size="15">T</text>`
    );
    this.addDef(
      `<text id="u" font-family="${this.meta.font}" font-size="15">U</text>`
    );
    this.addDef(
      `<text id="v" font-family="${this.meta.font}" font-size="15">V</text>`
    );
    this.addDef(
      `<text id="w" font-family="${this.meta.font}" font-size="15">W</text>`
    );
    this.addDef(
      `<text id="x" font-family="${this.meta.font}" font-size="15">X</text>`
    );
    this.addDef(
      `<text id="y" font-family="${this.meta.font}" font-size="15">Y</text>`
    );
    this.addDef(
      `<text id="z" font-family="${this.meta.font}" font-size="15">Z</text>`
    );
    this.addDef(
      `<text id="0" font-family="${this.meta.font}" font-size="15">0</text>`
    );
    this.addDef(
      `<text id="1" font-family="${this.meta.font}" font-size="15">1</text>`
    );
    this.addDef(
      `<text id="2" font-family="${this.meta.font}" font-size="15">2</text>`
    );
    this.addDef(
      `<text id="3" font-family="${this.meta.font}" font-size="15">3</text>`
    );
    this.addDef(
      `<text id="4" font-family="${this.meta.font}" font-size="15">4</text>`
    );
    this.addDef(
      `<text id="5" font-family="${this.meta.font}" font-size="15">5</text>`
    );
    this.addDef(
      `<text id="6" font-family="${this.meta.font}" font-size="15">6</text>`
    );
    this.addDef(
      `<text id="7" font-family="${this.meta.font}" font-size="15">7</text>`
    );
    this.addDef(
      `<text id="8" font-family="${this.meta.font}" font-size="15">8</text>`
    );
    this.addDef(
      `<text id="9" font-family="${this.meta.font}" font-size="15">9</text>`
    );
  }

  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;

    let letters = this.meta.text
      .toLowerCase()
      .replace(/\W/g, "")
      .split("");

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

      let letter = letters[pos % letters.length];

      this.add(
        s,
        `<use xlink:href="#${letter}" fill="${col}" transform="${translate} ${scale}" />`
      );
    }
    this.cWidth = maxXpos + this.mX / 2;
    this.cHeight = maxYpos + this.mY / 2;
  }
}
