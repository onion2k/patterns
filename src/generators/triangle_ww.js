import base from "./base";

export default class Triangle extends base {
  constructor(data) {
    super(data);

    let offsets = [];
    for (var x = 0; x < 3; x++) {
      this.extents.x.push(this.cellSize * Math.sin(x * 120 * 0.0174533));
      this.extents.y.push(this.cellSize * Math.cos(x * 120 * 0.0174533));
      offsets.push({
        x: this.cellSize * Math.sin(x * 120 * 0.0174533),
        y: this.cellSize * Math.cos(x * 120 * 0.0174533)
      });
    }

    this.mX =
      Math.max(...this.extents.x) + Math.abs(Math.min(...this.extents.x));
    this.mY =
      Math.max(...this.extents.y) + Math.abs(Math.min(...this.extents.y));

    this.addDef(
      `<path id="h" d="M 0 0 L ${offsets[0].x} ${offsets[0].y} L ${
        offsets[1].x
      } ${offsets[1].y} L ${offsets[2].x} ${offsets[2].y} L ${offsets[0].x} ${
        offsets[0].y
      } Z" />`
    );
  }

  _chunk() {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);
      if (x % 2 === y % 2) {
        continue;
      }
      let xPos =
        x * (this.mX / 2 + this.padding) +
        (y % 4 === 0 || y % 4 === 3) * (this.mX / 2 + this.padding);
      let yPos = y * (this.mX / 2 + this.padding);

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      let col = `rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})`;

      let translate = `translate(${this.round(xPos)}, ${this.round(yPos)})`;

      let s = this.round(this.scale(r, g, b));
      let scale = "";
      if (s) {
        scale = `scale(${s})`;
      }

      let rotate = `rotate(${(x % 2) * 180})`;

      this.add(
        s,
        `<use xlink:href="#h" fill="${col}" transform="${translate} ${scale} ${rotate}" />`
      );
    }
  }
}
