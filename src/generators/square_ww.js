import base from "./base";

export default class Square extends base {
  constructor(data) {
    super(data);

    this.addDef(
      `<rect id="h" x="${-1 * this.cellSize / 2}" y="${-1 *
        this.cellSize /
        2}" width="${this.cellSize}" height="${this.cellSize}">`
    );
  }

  _chunk() {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * (this.cellSize + this.padding);
      var y = Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);

      var v = this.variance / 2 - Math.random() * this.variance;

      let col = `rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})`;

      let translate = `translate(${this.round(x)}, ${this.round(y)})`;
      let scale = "";

      switch (this.scaling) {
        case "additive":
          scale = `scale(${0.25 + 2.0 * this.brightness(r, g, b) / 196})`;
          break;
        case "multiply":
          scale = `scale(${2.0 * this.brightness(r, g, b) / 196})`;
          break;
        case "random":
          scale = `scale(${2.0 * Math.random()})`;
          break;
      }

      this.content += `<use xlink:href="#h" fill="${col}" transform="${translate} ${scale}" />`;
    }
  }
}
