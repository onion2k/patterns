export default class {
  constructor() {
    console.log("base");
    this.width = 0;
    this.height = 0;
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
