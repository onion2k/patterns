import base from "./base";

export default class Paint extends base {
  constructor(data) {
    super(data);

    this.oWidth = this.imgSize / 2;
    this.oHeight = this.imgSize * this.aspect / 2;

    this.mX = this.cellSize + this.padding;
    this.mY = this.cellSize + this.padding;

    this.addDef(
      `<path id="h" d="M 21.40625 21.40625 L 21.40625 42.71875 C 21.40625 44.710493 22.578291 46.102785 24.03125 45.71875 C 25.240444 45.399147 26.916359 42.211028 31.25 42.46875 C 35.58364 42.726471 37.8125 46.812924 37.8125 50 C 37.8125 53.187076 35.58364 57.273529 31.25 57.53125 C 26.916359 57.788972 25.240444 54.600853 24.03125 54.28125 C 22.578291 53.897215 21.40625 55.258257 21.40625 57.25 L 21.40625 78.59375 L 42.78125 78.59375 C 44.77299 78.59375 46.10279 77.421709 45.71875 75.96875 C 45.39915 74.759556 42.21103 73.083641 42.46875 68.75 C 42.72647 64.41636 46.81293 62.1875 50 62.1875 C 53.18708 62.1875 57.30478 64.41636 57.5625 68.75 C 57.82022 73.083641 54.6321 74.759556 54.3125 75.96875 C 53.92846 77.421709 55.2895 78.59375 57.28125 78.59375 L 78.59375 78.59375 L 78.59375 57.25 C 78.59375 55.25825 77.452959 53.89721 76 54.28125 C 74.790806 54.60085 73.114891 57.78897 68.78125 57.53125 C 64.44761 57.27353 62.21875 53.18708 62.21875 50 C 62.21875 46.81293 64.44761 42.726471 68.78125 42.46875 C 73.114891 42.211028 74.790806 45.39915 76 45.71875 C 77.452959 46.10279 78.59375 44.710489 78.59375 42.71875 L 78.59375 21.40625 L 57.28125 21.40625 C 55.289507 21.40625 53.897215 22.578291 54.28125 24.03125 C 54.600853 25.240444 57.788972 26.916359 57.53125 31.25 C 57.273529 35.58364 53.187076 37.8125 50 37.8125 C 46.812924 37.8125 42.726471 35.58364 42.46875 31.25 C 42.211028 26.916359 45.399147 25.240444 45.71875 24.03125 C 46.102785 22.578291 44.741743 21.40625 42.75 21.40625 L 21.40625 21.40625 z " transform="scale(0.18)" />`
    );
  }

  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x = Math.floor(pos % this.imgSize) * this.mX;
      var y = Math.floor(pos / this.imgSize) * this.mX;

      console.log(x, y);

      if (x > maxXpos) {
        maxXpos = x;
      }
      if (y > maxYpos) {
        maxYpos = y;
      }

      let col = `rgb(${Math.floor(r + v)},${Math.floor(g + v)},${Math.floor(
        b + v
      )})`;

      let translate = `translate(${this.round(x)}, ${this.round(y)})`;

      let s = this.round(this.scale(r, g, b));
      let scale = "";
      if (s) {
        scale = `scale(${s})`;
      }

      this.add(
        s,
        `<use xlink:href="#h" fill="${col}" transform="${translate} ${scale}" />`
      );
    }
    this.cWidth = maxXpos + this.mX / 2;
    this.cHeight = maxYpos + this.mY / 2;
  }
}
