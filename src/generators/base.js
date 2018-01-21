export default class {
  constructor(data) {
    this.defs = [];

    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;

    this.width = this.imgSize * (this.cellSize + this.padding);
    this.height = Math.floor(
      this.aspect * this.imgSize * (this.cellSize + this.padding)
    );
  }
  round(n) {
    return Math.round(n * 100) / 100;
  }
  addDef(def) {
    this.defs.push(def);
  }
  svg(content) {
    let _defs = this.defs.join();
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this
      .width} ${this.height}" preserveAspectRatio="xMidYMid slice" width="${this
      .width}" height="${this.height}">
        <defs>${_defs}</defs>
        <rect width="100%" height="100%" fill="black"/>
        ${content}
      </svg>`;
  }
  render() {
    this._chunk(0, this.data.length);
    return this.svg(this.content);
  }
}
