export default function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding * 0.8 - 1;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.offsets = [
      {
        x: Math.sin(Math.PI * ((0 * 180 + 0 + 90) / 180)) * this.cellSize * 4,
        y: Math.cos(Math.PI * ((0 * 180 + 0 + 90) / 180)) * this.cellSize * 4
      },
      {
        x: Math.sin(Math.PI * ((0 * 180 + 120 + 90) / 180)) * this.cellSize * 4,
        y: Math.cos(Math.PI * ((0 * 180 + 120 + 90) / 180)) * this.cellSize * 4
      },
      {
        x: Math.sin(Math.PI * ((0 * 180 + 240 + 90) / 180)) * this.cellSize * 4,
        y: Math.cos(Math.PI * ((0 * 180 + 240 + 90) / 180)) * this.cellSize * 4
      },
      {
        x: Math.sin(Math.PI * ((1 * 180 + 0 + 90) / 180)) * this.cellSize * 4,
        y: Math.cos(Math.PI * ((1 * 180 + 0 + 90) / 180)) * this.cellSize * 4
      },
      {
        x: Math.sin(Math.PI * ((1 * 180 + 120 + 90) / 180)) * this.cellSize * 4,
        y: Math.cos(Math.PI * ((1 * 180 + 120 + 90) / 180)) * this.cellSize * 4
      },
      {
        x: Math.sin(Math.PI * ((1 * 180 + 240 + 90) / 180)) * this.cellSize * 4,
        y: Math.cos(Math.PI * ((1 * 180 + 240 + 90) / 180)) * this.cellSize * 4
      }
    ];

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

  let _chunk = (chunk, total) => {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = (i + chunk) / 4;

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);

      let xPos =
        x * (this.cellSize + this.padding) +
        (y % 4 === 2 || y % 4 === 0) * (this.cellSize + this.padding);
      let yPos =
        y * (this.cellSize + this.padding) +
        (y % 2) * (this.cellSize + this.padding);

      if (x % 2 === y % 2) {
        continue;
      }

      var r = this.data[i + chunk];
      var g = this.data[i + chunk + 1];
      var b = this.data[i + chunk + 2];
      var a = this.data[i + chunk + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      if (Math.floor(pos % this.imgSize) % 2 === 0) {
        var p1 = {
          x: this.offsets[0].x,
          y: this.offsets[0].y
        };
        var p2 = {
          x: this.offsets[1].x,
          y: this.offsets[1].y
        };
        var p3 = {
          x: this.offsets[2].x,
          y: this.offsets[2].y
        };
      } else {
        var p1 = {
          x: this.offsets[3].x,
          y: this.offsets[3].y
        };
        var p2 = {
          x: this.offsets[4].x,
          y: this.offsets[4].y
        };
        var p3 = {
          x: this.offsets[5].x,
          y: this.offsets[5].y
        };
      }

      this.svg.content += `<path d="M 0 0 `;

      this.svg.content += `l ${p1.x} ${p1.y} `;
      this.svg.content += `l ${p2.x} ${p2.y} `;
      this.svg.content += `l ${p3.x} ${p3.y} `;

      this.svg.content += `Z" fill="rgb(${Math.floor(r + v)},${Math.floor(
        g + v
      )},${Math.floor(b + v)})" transform="translate(${2 *
        (Math.round(xPos * 100) / 100)}, ${2 *
        (Math.round(yPos * 100) / 100)})" />`;
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
