export default function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding - 1;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.h = this.cellSize / Math.cos(60 / 180 * Math.PI);

    this.offsetsA = [];
    for (var x = 0; x < 3; x++) {
      this.offsetsA.push({
        x: this.h * Math.sin((90 + x * 120) / 180 * Math.PI),
        y: this.h * Math.cos((90 + x * 120) / 180 * Math.PI)
      });
    }

    this.offsetsB = [];
    for (var x = 0; x < 3; x++) {
      this.offsetsB.push({
        x: this.h * Math.sin((270 + x * 120) / 180 * Math.PI),
        y: this.h * Math.cos((270 + x * 120) / 180 * Math.PI)
      });
    }

    this.svg = {
      width: Math.floor((this.imgSize + 1) * (this.cellSize + this.padding)),
      height: Math.floor(
        this.aspect * this.imgSize * (this.cellSize + this.padding)
      ),
      content: ""
    };

    return r;
  };

  let _chunk = (chunk, total) => {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = (i + chunk) / 4;

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);

      let xPos = x * (this.cellSize + this.padding);
      let yPos = y * (this.cellSize + this.padding);

      if (x % 2 === y % 2) {
        continue;
      }

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      if (Math.floor(pos % this.imgSize) % 2 === 0) {
        var p1 = {
          x: this.offsetsA[0].x,
          y: this.offsetsA[0].y
        };
        var p2 = {
          x: this.offsetsA[1].x,
          y: this.offsetsA[1].y
        };
        var p3 = {
          x: this.offsetsA[2].x,
          y: this.offsetsA[2].y
        };
      } else {
        var p1 = {
          x: this.offsetsB[0].x,
          y: this.offsetsB[0].y
        };
        var p2 = {
          x: this.offsetsB[1].x,
          y: this.offsetsB[1].y
        };
        var p3 = {
          x: this.offsetsB[2].x,
          y: this.offsetsB[2].y
        };
      }

      this.svg.content += `<path d="M 0 0 l ${p1.x} ${p1.y} `;
      this.svg.content += `l ${p2.x} ${p2.y} `;
      this.svg.content += `l ${p3.x} ${p3.y} `;

      // ${Math.floor(r + v)},${Math.floor(
      //   g + v
      // )},${Math.floor(b + v)}

      this.svg.content += `Z" fill="rgb(255,255,255)" transform="translate(${xPos}, ${yPos})" />`;
    }
  };

  let render = data => {
    _chunk(0, this.data.length);
    return `<svg width="${this.svg.width}" height="${this.svg.height}">${
      this.svg.content
    }</svg>`;
  };

  return {
    init: init,
    render: render
  };
}
