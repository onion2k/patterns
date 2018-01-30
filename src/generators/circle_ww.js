import base from "./base";

export default class Circle extends base {
  constructor(data) {
    super(data);

    this.mX = this.cellSize + this.padding;
    this.mY = this.cellSize + this.padding;

    this.addDef(
      `<circle id="h" x="${-1 * this.cellSize / 2}" y="${-1 *
        this.cellSize /
        2}" r="${this.cellSize / 2}" />`
    );
  }

  _chunk() {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * this.mX;
      var y = Math.floor(pos / this.imgSize) * this.mY;

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
