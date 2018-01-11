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
        x: Math.sin(Math.PI * (x * 60 / 180)) * this.cellSize,
        y: Math.cos(Math.PI * (x * 60 / 180)) * this.cellSize
      });
    }

    this.svg = {
      width: 2 * (this.imgSize + 1) * (this.cellSize + this.padding),
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
      // let color = new Rune.Color(r + v, g + v, b + v);

      let p1 = { x: this.offsets[0].x, y: this.offsets[0].y };
      let p2 = { x: this.offsets[1].x, y: this.offsets[1].y };
      let p3 = { x: this.offsets[2].x, y: this.offsets[2].y };
      let p4 = { x: this.offsets[3].x, y: this.offsets[3].y };
      let p5 = { x: this.offsets[4].x, y: this.offsets[4].y };
      let p6 = { x: this.offsets[5].x, y: this.offsets[5].y };

      this.svg.content += `<path d="M ${x} ${y} `;

      this.svg.content += `l ${p1.x}, ${p1.y} `;
      this.svg.content += `l ${p2.x}, ${p2.y} `;
      this.svg.content += `l ${p3.x}, ${p3.y} `;
      this.svg.content += `l ${p4.x}, ${p4.y} `;
      this.svg.content += `l ${p5.x}, ${p5.y} `;
      this.svg.content += `l ${p6.x}, ${p6.y} `;

      this.svg.content += `Z" fill="rgb(${Math.floor(r + v)},${Math.floor(
        g + v
      )},${Math.floor(b + v)})"/>`;
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
