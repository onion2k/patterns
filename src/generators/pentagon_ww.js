import base from "./base";

export default class Hex extends base {
  constructor(data) {
    super(data);

    this.w = this.cellSize + this.padding;
    this.h = this.cellSize + this.padding;

    // sqrt(3)-1,1,1,1,1
    let angles = [60, 75, 75, 75, 75];

    let path = "M 0 0 ";
    let ia = 0;
    for (var x = 0; x < 5; x++) {
      ia = ia + angles[x];
      let r = Math.PI / 180 * (ia + 240);
      path += "L ";
      path += this.round(Math.cos(r) * this.cellSize / 2) + " ";
      path += this.round(Math.sin(r) * this.cellSize / 2) + " ";
    }
    let r = Math.PI / 180 * (angles[0] + 240);
    let c = this.cellSize / 2;
    path += "L ";
    path += this.round(Math.cos(r) * c) + " ";
    path += this.round(Math.sin(r) * c) + " ";
    path += "Z";

    this.addDef(`<path id="h" d="${path}"></path>`);
  }
  _chunk() {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * this.w;
      var y = Math.floor(pos / this.imgSize) * this.h * 2;

      x += (Math.floor(pos / this.imgSize) % 2) * this.w * 2;

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      let col = `rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})`;

      let s = this.round(this.scale(r, g, b));
      let scale = "";
      if (s) {
        scale = `scale(${s})`;
      }

      let rotate = "";
      switch (Math.floor(pos % this.imgSize) % 4) {
        case 0:
          rotate = `rotate(270)`;
          // col = "rgb(255,0,0)";
          x += this.w / 2;
          break;
        case 1:
          rotate = `rotate(180)`;
          // col = "rgb(255,255,255)";
          x += this.w / 2;
          y -= this.h / 2;
          break;
        case 2:
          rotate = `rotate(0)`;
          // col = "rgb(255,255,0)";
          x -= this.w / 2;
          y += this.h / 2;
          break;
        case 3:
          rotate = `rotate(90)`;
          // col = "rgb(255,0,255)";
          x -= this.w / 2;
          //y += this.h;
          break;
      }
      let translate = `translate(${this.round(x)}, ${this.round(y)})`;

      this.add(
        s,
        `<use xlink:href="#h" fill="${col}" transform="${translate} ${scale} ${rotate}" />`
      );
    }
  }
}
