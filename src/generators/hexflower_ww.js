import base from "./base";

export default class Hex extends base {
  constructor(data) {
    super(data);

    this.w = Math.sqrt(3) / 2 * this.cellSize + this.padding;
    this.h = this.cellSize + this.padding;

    let path = "M 0 0 ";
    for (var x = 0; x < 18; x++) {
      let r = Math.PI / 180 * (x * (360 / 18));
      let c = x % 3 ? this.cellSize / 2 : this.cellSize / 2 * 0.74;
      path += "L ";
      path += this.round(Math.cos(r) * c) + " ";
      path += this.round(Math.sin(r) * c) + " ";
    }
    let r = Math.PI / 180 * (0 * (360 / 18));
    let c = 0 % 3 ? this.cellSize / 2 : this.cellSize / 2 * 0.74;
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
      var y = Math.floor(pos / this.imgSize) * this.h; // why 5.6
      // const o = 3;
      // console.log(this.w / o);
      // console.log(this.h / 5.6);
      // switch (Math.floor(pos / this.imgSize) % 4) {
      //   case 0:
      //     break;
      //   case 1:
      //     x += this.w / o;
      //     break;
      //   case 2:
      //     x += 2 * this.w / o;
      //     break;
      //   case 3:
      //     x += 3 * this.w / o;
      //     break;
      // }

      // switch (Math.floor(pos % this.imgSize) % 4) {
      //   case 0:
      //     break;
      //   case 1:
      //     y += this.h / 5.6;
      //     break;
      //   case 2:
      //     y += 2 * this.h / 5.6;
      //     break;
      //   case 3:
      //     y += 3 * this.h / 5.6;
      //     break;
      // }

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

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
