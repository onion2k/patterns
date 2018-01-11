import triangle from "./triangle_ww";
// import square from "./square";
import hexagon from "./hex_ww";
import circle from "./circle_ww";

class Mosaic {
  constructor(data) {
    // Worker for building mosaics
    switch (data.shape) {
      case "triangle":
        this.mosaic = new triangle();
        break;
      case "square":
      // this.mosaic = new square();
      // break;
      case "hex":
        this.mosaic = new hexagon();
        break;
      case "circle":
        this.mosaic = new circle();
        break;
      default:
        this.mosaic = new circle();
        break;
    }
    this.mosaic.init(data);
  }
  render() {
    return this.mosaic.render(this.data);
  }
}

self.addEventListener("message", event => {
  if (event.data.type === "create") {
    let mos = new Mosaic(event.data);
    if (!mos) {
      console.warn("No worker instance");
    } else {
      let svg = mos.render();
      postMessage(svg);
    }
  }
});
