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

  let _chunk = (chunk, total) => {
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      var pos = (i + chunk) / 4;

      var y =
        2 * Math.floor(pos / this.imgSize) * (this.cellSize + this.padding);
      var x =
        2 * Math.floor(pos % this.imgSize) * (this.cellSize + this.padding) +
        (Math.floor(pos / this.imgSize) % 2) * (this.cellSize + this.padding);

      var r = this.data[i + chunk];
      var g = this.data[i + chunk + 1];
      var b = this.data[i + chunk + 2];
      var a = this.data[i + chunk + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      this.svg.content += `<path d="M 0 0 `;

      this.svg.content += `l ${this.offsets[0].x} ${this.offsets[0].y} `;
      this.svg.content += `l ${this.offsets[1].x} ${this.offsets[1].y} `;
      this.svg.content += `l ${this.offsets[2].x} ${this.offsets[2].y} `;
      this.svg.content += `l ${this.offsets[3].x} ${this.offsets[3].y} `;
      this.svg.content += `l ${this.offsets[4].x} ${this.offsets[4].y} `;
      this.svg.content += `l ${this.offsets[5].x} ${this.offsets[5].y} `;

      this.svg.content += `Z" fill="rgb(${Math.floor(r + v)},${Math.floor(
        g + v
      )},${Math.floor(b + v)})" transform="translate(${Math.round(x * 100) /
        100}, ${Math.round(y * 100) / 100})" />`;
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
