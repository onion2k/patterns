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
      `<path id="h" d="M 0 0 L ${offsets[0].x} ${offsets[0].y} L ${offsets[1]
        .x} ${offsets[1].y} L ${offsets[2].x} ${offsets[2].y} L ${offsets[0]
        .x} ${offsets[0].y} Z" />`
    );
  }

  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);
      if (x % 2 === y % 2) {
        continue;
      }
      let xPos =
        x * (this.mY / 2 + this.padding) +
        (y % 4 === 0 || y % 4 === 3) * (this.mY / 2 + this.padding);
      let yPos = y * (this.mX / 2 + this.padding) + (y % 2) * this.padding / 2;

      if (xPos > maxXpos) {
        maxXpos = xPos;
      }
      if (yPos > maxYpos) {
        maxYpos = yPos;
      }

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

    this.cWidth = maxXpos + this.mX / 2 + this.padding;
    this.cHeight = maxYpos + this.mY / 2 + this.padding;
  }
}
