export default class {
  constructor(data) {
    console.log("base", data);
    this.width = 0;
    this.height = 0;

    this.imgSize = data.imgSize;
    this.cellSize = data.cellSize;
    this.padding = data.padding;
    this.aspect = data.aspect;
    this.variance = data.variance;
    this.data = data.data;
    this.img = data.img;
  }
  svg(defs, content) {
    let defs = defs.join();
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this
      .width} ${this.height}" preserveAspectRatio="xMidYMid slice">
      <svg>
        <defs>${defs}</defs>
        <rect width="100%" height="100%" fill="black"/>
        ${content}
      </svg>`;
  }
}
