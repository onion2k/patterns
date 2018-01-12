export default function() {
  var r, imgSize, cellSize, padding, aspect;

  let init = data => {
    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.h = this.cellSize / Math.cos(60 * 0.0174533);

    this.offsets = [];
    for (var x = 0; x < 3; x++) {
      this.offsets.push({
        x: this.h * Math.sin((30 + x * 120) * 0.0174533),
        y: this.h * Math.cos((30 + x * 120) * 0.0174533)
      });
    }

    this.svg = {
      width: Math.floor(this.imgSize * (this.cellSize + this.padding)),
      height: Math.floor(
        this.aspect * this.imgSize * (this.cellSize + this.padding)
      ),
      content: "",
      debug: ""
    };

    return r;
  };

  let _chunk = (chunk, total) => {
    for (var i = 0, n = total; i < n; i += 4) {
      var pos = (i + chunk) / 4;

      var x = Math.floor(pos % this.imgSize);
      var y = Math.floor(pos / this.imgSize);
      if (x % 2 === y % 2) {
        continue;
      }
      let xPos = x * (this.cellSize + this.padding);
      let yPos =
        y * (this.cellSize + this.padding) + (y % 2) * this.padding / 2;

      var r = this.data[i];
      var g = this.data[i + 1];
      var b = this.data[i + 2];
      var a = this.data[i + 3];

      var v = this.variance / 2 - Math.random() * this.variance;

      this.svg.content += `<path d="M  ${this.offsets[0].x} ${
        this.offsets[0].y
      } `;
      this.svg.content += `L ${this.offsets[1].x} ${this.offsets[1].y} `;
      this.svg.content += `L ${this.offsets[2].x} ${this.offsets[2].y} `;

      this.svg.content += `Z" fill="rgb(${r},${g},${b})" stroke="rgb(0,0,0)" transform="translate(${xPos}, ${yPos}) rotate(${30 +
        (x % 2) * 180})" />`;
      // this.svg.debug += `<circle x="${xPos}" y="${yPos}" r="2" fill="rgb(255,255,255)" transform="translate(${xPos}, ${yPos})" />`;
    }
  };

  let render = data => {
    _chunk(0, this.data.length);
    return `<svg width="${this.svg.width}" height="${this.svg.height}">${
      this.svg.content
    }${this.svg.debug}</svg>`;
  };

  return {
    init: init,
    render: render
  };
}
