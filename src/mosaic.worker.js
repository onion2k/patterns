import triangle from "./generators/triangle_ww";
import square from "./generators/square_ww";
import hexagon from "./generators/hex_ww";
import fans from "./generators/fans";
import flower from "./generators/flower_ww";
import circle from "./generators/circle_ww";
import heart from "./generators/heart";
import pentagon from "./generators/pentagon_ww";
import cross from "./generators/cross_ww";
import paint from "./generators/paint";
import puzzle from "./generators/puzzle";
import words from "./generators/words";
import crossstitch from "./generators/crossstitch";
import hilbert from "./generators/hilbert";

/**
 * SVG generator from shape generators
 * @constructor
 * @param {object} data - parameters for the SVG generator
 */
class Mosaic {
  constructor(data) {
    // Worker for building mosaics
    // Add some defaults?

    switch (data.shape) {
      case "triangle":
        this.mosaic = new triangle(data);
        break;
      case "square":
      case "bricks":
      case "tapestry":
        this.mosaic = new square(data);
        break;
      case "heart":
        this.mosaic = new heart(data);
        break;
      case "hex":
        this.mosaic = new hexagon(data);
        break;
      case "fans":
        this.mosaic = new fans(data);
        break;
      case "flower":
        this.mosaic = new flower(data);
        break;
      case "circle":
        this.mosaic = new circle(data);
        break;
      case "pentagon":
        this.mosaic = new pentagon(data);
        break;
      case "cross":
        this.mosaic = new cross(data);
        break;
      case "paint":
        this.mosaic = new paint(data);
        break;
      case "puzzle":
        this.mosaic = new puzzle(data);
        break;
      case "words":
        this.mosaic = new words(data);
        break;
      case "crossstitch":
        this.mosaic = new crossstitch(data);
        break;
      case "hilbert":
        this.mosaic = new hilbert(data);
        break;
      default:
        this.mosaic = new circle(data);
        break;
    }
    // this.mosaic.init(data);
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
      postMessage({
        type: "complete",
        svg: svg
      });
    }
  }
});
