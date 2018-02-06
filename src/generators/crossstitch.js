import base from "./base";

export default class Square extends base {
  constructor(data) {
    super(data);

    this.mX = this.cellSize + this.padding;
    this.mY = this.cellSize + this.padding;

    // this.addDef(
    //   `<rect id="h" x="${-1 * this.cellSize / 2}" y="${-1 *
    //     this.cellSize /
    //     2}" width="${this.cellSize}" height="${this.cellSize}"
    //   }">`
    // );

    this.addDef(
      `<g id='h'>
        <rect x="${-1 * this.cellSize / 2}" y="${-1 *
        this.cellSize /
        2}" width="${this.cellSize}" height="${this.cellSize / 4}" rx="${this
        .cellSize / 8}" ry="${this.cellSize / 8}"
          }" transform="rotate(45) translate(${this.cellSize / 2 -
            this.cellSize / 2}, ${this.cellSize / 2 -
        this.cellSize / 4 / 2})" />
        <rect x="${-1 * this.cellSize / 2}" y="${-1 *
        this.cellSize /
        2}" width="${this.cellSize}" height="${this.cellSize / 4}" rx="${this
        .cellSize / 8}" ry="${this.cellSize / 8}"
            }" transform="rotate(135) translate(${this.cellSize / 2 -
              this.cellSize / 2}, ${this.cellSize / 2 -
        this.cellSize / 4 / 2})" />
      </g>`
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
