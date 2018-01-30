export default class {
  constructor(data) {
    this.defs = [];
    this.z = [];

    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.scaling = data.scaling;
    this.img = data.img;
    this.background = data.background;
    this.distortion = data.distortion;

    this.extents = { x: [], y: [] };

    this.mX = 0;
    this.mY = 0;

    this.cWidth = 0;
    this.cHeight = 0;

    this.w = this.cellSize + this.padding;
    this.h = this.cellSize + this.padding;
  }
  round(n) {
    return Math.round(n * 100) / 100;
  }
  addDef(def) {
    this.defs.push(def);
  }
  add(z, el) {
    if (this.z[z] !== undefined) {
      this.z[z].push(el);
    } else {
      this.z[z] = [el];
    }
  }
  svg() {
    let pos = Object.keys(this.z);
    pos.sort();
    let content = pos.reduce((s, z) => {
      return s + this.z[z].join("");
    }, "");

    let _defs = this.defs.join("");
    let width = this.cWidth; //this.imgSize * (this.mX + this.padding) * this.distortion.cx;
    let height = this.cHeight; // Math.floor(this.aspect * this.imgSize * (this.mY + this.padding) * this.distortion.cy);
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" width="${width}" height="${height}">
        <defs>${_defs}</defs>
        <rect width="100%" height="100%" fill="${this.background}"/>
        ${content}
      </svg>`;
  }
  brightness(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  scale(r, g, b) {
    let scale = "";
    switch (this.scaling) {
      case "additive":
        scale = 0.25 + 2.0 * this.brightness(r, g, b) / 196;
        break;
      case "multiply":
        scale = 2.0 * this.brightness(r, g, b) / 196;
        break;
      case "random":
        scale = 2.0 * Math.random();
        break;
    }
    return scale;
  }

  render() {
    this._chunk(0, this.data.length);
    return this.svg(this.z);
  }
}
