import base from "./base";

export default class Square extends base {
  constructor(data) {
    super(data);

    this.mX = this.cellSize * this.shapeData.length[0] + this.padding;
    this.mY = this.cellSize * this.shapeData.length[1] + this.padding;

    let rotate = `rotate(${this.shapeData.rotation})`;

    this.addDef(
      `<rect id="h" x="${-1 *
        (this.cellSize * this.shapeData.length[0]) /
        2}" y="${-1 *
        (this.cellSize * this.shapeData.length[1]) /
        2}" width="${this.cellSize * this.shapeData.length[0]}" height="${this
        .cellSize * this.shapeData.length[1]}" rx="${this.shapeData
        .borderRadius[0]}" ry="${this.shapeData
        .borderRadius[1]}" transform="${rotate}">`
    );
  }

  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x =
        Math.floor(pos % this.imgSize) * this.mX +
        (Math.floor(pos / this.imgSize) % 2) * this.mX * this.shapeData.offset;
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
