import base from "./base";

export default class Hilbert extends base {
  constructor(data) {
    super(data);
    this.px = 0;
    this.py = 0;
  }

  hilbert(x, y, xi, xj, yi, yj, n) {
    /* x and y are the coordinates of the bottom left corner */
    /* xi & xj are the i & j components of the unit x vector of the frame */
    /* similarly yi and yj */
    if (n <= 0) {
      // LineTo(x + (xi + yi) / 2, y + (xj + yj) / 2);
      // this.add(1, `<line fill="${col}" />`);
      this.add(
        1,
        `<line x1="${this.px}" y1="${this.py}" x2="${x +
          (xi + yi) / 2}" y2="${y +
          (xj + yj) / 2}" stroke-width="2" stroke="white"/>`
      );
      this.px = x + (xi + yi) / 2;
      this.py = y + (xj + yj) / 2;
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
    let maxXpos = 0;
    let maxYpos = 0;

    this.hilbert(0, 0, 800, 0, 0, 800, 6);
    // for (var i = 0, n = this.data.length; i < n; i += 4) {
    //   let { r, g, b, a, pos, v } = this.getPixel(i);

    //   var x = Math.floor(pos % this.imgSize) * this.mX;
    //   var y = Math.floor(pos / this.imgSize) * this.mY;

    //   if (x > maxXpos) {
    //     maxXpos = x;
    //   }
    //   if (y > maxYpos) {
    //     maxYpos = y;
    //   }

    //   let col = `rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
    //     b + v
    //   )})`;

    //   let translate = `translate(${this.round(x)}, ${this.round(y)})`;
    //   let s = this.round(this.scale(r, g, b));
    //   let scale = "";
    //   if (s) {
    //     scale = `scale(${s})`;
    //   }

    //   this.add(
    //     s,
    //     `<use xlink:href="#h" fill="${col}" transform="${translate} ${scale}" />`
    //   );
    // }
    this.cWidth = 800; //maxXpos + this.mX / 2;
    this.cHeight = 800; //maxYpos + this.mY / 2;
  }
}
