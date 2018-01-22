export default class {
  constructor(data) {
    this.defs = [];

    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.scaling = data.scaling;
    this.img = data.img;
    this.background = data.background;

    this.w = this.cellSize + this.padding;
    this.h = this.cellSize + this.padding;
  }
  round(n) {
    return Math.round(n * 100) / 100;
  }
  addDef(def) {
    this.defs.push(def);
  }
  svg(content) {
    let _defs = this.defs.join();
    let width = this.imgSize * this.w;
    let height = Math.floor(this.aspect * this.imgSize * this.h);
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" width="${width}" height="${height}">
        <defs>${_defs}</defs>
        <rect width="100%" height="100%" fill="${this.background}"/>
        ${content}
      </svg>`;
  }
  brightness(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  render() {
    this._chunk(0, this.data.length);
    return this.svg(this.content);
  }
}
