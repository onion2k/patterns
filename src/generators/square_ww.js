import base from "./base";

export default class Square extends base {
  constructor(data) {
    super(data);

    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;
    this.content = "";

    this.addDef(
      `<rect id="h" x="${-1 * this.cellSize / 2}" y="${-1 *
        this.cellSize /
        2}" width="${this.cellSize}" height="${this.cellSize}">`
    );
  }

  _chunk(chunk, total) {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var pos = i / 4;

      var x = Math.floor(pos % this.imgSize) * (this.cellSize + this.padding);
      var y = Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);

      var v = this.variance / 2 - Math.random() * this.variance;

      this.content += `<use xlink:href="#h" fill="rgb(${Math.floor(
        r + v
      )},${Math.floor(g + v)},${Math.floor(
        b + v
      )})" transform="translate(${x}, ${y})" />`;
    }
  }

  render() {
    this._chunk(0, this.data.length);
    return this.svg(this.content);
  }
}

// export default function() {
//   var r, imgSize, cellSize, padding, aspect;

//   let init = data => {
//     this.t = new Square(data);
//   };

//   let _chunk = (chunk, total) => {
//     for (var i = 0, n = this.data.length; i < n; i += 4) {
//       var r = this.data[i];
//       var g = this.data[i + 1];
//       var b = this.data[i + 2];
//       var a = this.data[i + 3];

//       var pos = i / 4;

//       var x = Math.floor(pos % this.imgSize) * (this.cellSize + this.padding);
//       var y = Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);

//       var v = this.variance / 2 - Math.random() * this.variance;

//       this.svg.content += `<use xlink:href="#h" fill="rgb(${Math.floor(
//         r + v
//       )},${Math.floor(g + v)},${Math.floor(
//         b + v
//       )})" transform="translate(${x}, ${y})" />`;
//     }
//   };

//   let render = data => {
//     return this.t.render();
//   };

//   return {
//     init: init,
//     render: render
//   };
// }