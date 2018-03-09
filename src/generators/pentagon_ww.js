import base from "./base";

export default class Hex extends base {
  constructor(data) {
    super(data);

    this.w = this.cellSize + this.padding;
    this.h = this.cellSize + this.padding;

    let dist = [
      this.cellSize * 1,
      this.cellSize * 1,
      this.cellSize * 1,
      this.cellSize * 1,
      this.cellSize * (Math.sqrt(3) - 1)
    ];
    let angles = [80, 80, 40, 80, 80];
    let ia = 0;

    let path = "M 0 0 ";
    for (var x = 0; x < 5; x++) {
      ia = ia + angles[x];
      let r = Math.PI / 180 * ia;
      this.extents.x.push(this.round(Math.cos(r) * dist[x] / 2));
      this.extents.y.push(this.round(Math.sin(r) * dist[x] / 2));
      path += "L ";
      path += this.round(Math.cos(r) * dist[x] / 2) + " ";
      path += this.round(Math.sin(r) * dist[x] / 2) + " ";
    }
    let r = Math.PI / 180 * angles[0];
    let c = dist[0] / 2;
    path += "L ";
    path += this.round(Math.cos(r) * c) + " ";
    path += this.round(Math.sin(r) * c) + " ";
    path += "Z";

    this.mX = 4 * Math.max(...this.extents.x);
    this.mY = 4 * Math.max(...this.extents.y);

    this.addDef(`<path id="h" d="${path}"></path>`);
  }
  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x = Math.floor(pos % this.imgSize) * this.mX;
      var y = Math.floor(pos / this.imgSize) * this.mY * 1.4;

      let p =
        (Math.floor(pos % this.imgSize) - Math.floor(pos % this.imgSize) % 4) /
        4;

      x = p * this.mX * 0.9;
      y += (p % 2) * this.mY * 0.7;

      let col = `rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})`;

      let s = this.round(this.scale(r, g, b));
      s = 1;
      let scale = "";
      if (s) {
        scale = `scale(${s})`;
      }

      let rotate = "";
      switch (Math.floor(pos % this.imgSize) % 4) {
        case 0:
          // bottom
          rotate = `rotate(270)`;
          // col = "rgb(255,0,0)";
          y += this.mY / 2.5;
          break;
        case 1:
          // left
          rotate = `rotate(180)`;
          // col = "rgb(255,255,255)";
          x -= this.mX / 2.5;
          break;
        case 2:
          // right
          rotate = `rotate(0)`;
          // col = "rgb(255,255,0)";
          x += this.mX / 2.5;
          break;
        case 3:
          // top
          rotate = `rotate(90)`;
          // col = "rgb(255,0,255)";
          y -= this.mY / 2.5;
          break;
      }

      if (x > maxXpos) {
        maxXpos = x;
      }
      if (y > maxYpos) {
        maxYpos = y;
      }
      let translate = `translate(${this.round(x)}, ${this.round(y)})`;

      this.add(
        s,
        `<use xlink:href="#h" fill="${col}" transform="${translate} ${scale} ${rotate}" />`
      );
    }

    this.cWidth = 200 + maxXpos + this.mX / 2 + this.padding;
    this.cHeight = 200 + maxYpos + this.mY / 2 + this.padding;
  }
}
