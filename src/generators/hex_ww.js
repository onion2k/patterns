import base from "./base";

class Hex extends base {
  constructor(data) {
    super(data);
  }
  render() {}
}

export default function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.t = new Hex(data);
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding * 0.8 - 1;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.offsets = [];
    for (var x = 0; x < 6; x++) {
      this.offsets.push({
        x:
          Math.round(Math.sin(Math.PI * (x * 60 / 180)) * this.cellSize * 100) /
          100,
        y:
          Math.round(Math.cos(Math.PI * (x * 60 / 180)) * this.cellSize * 100) /
          100
      });
    }

    this.svg = {
      width:
        2 * Math.floor((this.imgSize + 1) * (this.cellSize + this.padding)),
      height:
        2 *
        Math.floor(this.aspect * this.imgSize * (this.cellSize + this.padding)),
      content: ""
    };

    return r;
  };

  let _chunk = () => {
    let prog = 0;
    let pprog = 0;
    let total = this.data.length;
    for (var i = 0, n = total; i < n; i += 4) {
      var pos = i / 4;

      // prog = Math.floor(Math.floor(i / total * 100) / 10);
      // if (prog > pprog) {
      //   postMessage({
      //     type: "progress",
      //     progress: prog * 10
      //   });
      // }
      // pprog = prog;

      var y =
        2 * Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);
      var x =
        2 * Math.floor(pos % this.imgSize) * (this.cellSize + this.padding) +
        (Math.floor(pos / this.imgSize) % 2) * (this.cellSize + this.padding);

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      this.svg.content += `<use xlink:href="#h" fill="rgb(${Math.floor(
        r + v
      )},${Math.floor(g + v)},${Math.floor(
        b + v
      )})" transform="translate(${Math.round(x * 100) / 100}, ${Math.round(
        y * 100
      ) / 100})" />`;
    }
  };

  let render = data => {
    _chunk();
    let path = "M 0 0 ";
    for (var x = 0; x < 6; x++) {
      path += "l ";
      path +=
        Math.round(Math.sin(Math.PI * (x * 60 / 180)) * this.cellSize * 100) /
          100 +
        " ";
      path +=
        Math.round(Math.cos(Math.PI * (x * 60 / 180)) * this.cellSize * 100) /
          100 +
        " ";
    }
    path += "Z";

    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this
      .svg.width} ${this.svg
      .height}" preserveAspectRatio="xMidYMid meet"><svg><defs><path id="h" d="${path}"></path></defs><rect width="100%" height="100%" fill="black"/>${this
      .svg.content}</svg>`;
  };

  return {
    init: init,
    render: render
  };
}
