import base from "./base";

export default class Hilbert extends base {
  constructor(data) {
    super(data);
    this.w = this.cellSize * this.imgSize;
    this.h = this.cellSize * this.imgSize;
    this.px = 0;
    this.py = 0;
    this.pc = this.getPixelColor(0, 0);
    this.gradientCounter = 0;
  }

  hilbert(x, y, xi, xj, yi, yj, n) {
    if (n <= 0) {
      let cx = Math.floor(x + (xi + yi) / 2);
      let cy = Math.floor(y + (xj + yj) / 2);
      let color = this.getPixelColor(cx / this.w, cy / this.h);

      this.add(
        1,
        `<line x1="${this.px}" y1="${
          this.py
        }" x2="${cx}" y2="${cy}" stroke-width="1" stroke="rgb(${color.r},${
          color.g
        },${color.b})"/>`
      );
      this.px = cx;
      this.py = cy;
    } else {
      this.hilbert(x, y, yi / 2, yj / 2, xi / 2, xj / 2, n - 1);
      this.hilbert(
        x + xi / 2,
        y + xj / 2,
        xi / 2,
        xj / 2,
        yi / 2,
        yj / 2,
        n - 1
      );
      this.hilbert(
        x + xi / 2 + yi / 2,
        y + xj / 2 + yj / 2,
        xi / 2,
        xj / 2,
        yi / 2,
        yj / 2,
        n - 1
      );
      this.hilbert(
        x + xi / 2 + yi,
        y + xj / 2 + yj,
        -yi / 2,
        -yj / 2,
        -xi / 2,
        -xj / 2,
        n - 1
      );
    }
  }

  _chunk() {
    this.hilbert(0, 0, this.w, 0, 0, this.h, this.meta.factor || 8);
    this.cWidth = this.w;
    this.cHeight = this.h;
  }
}
