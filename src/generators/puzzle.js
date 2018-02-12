import base from "./base";

export default class Paint extends base {
  constructor(data) {
    super(data);

    this.cellSize = 50;

    this.mX = 1 + this.cellSize + this.padding;
    this.mY = 1 + this.cellSize + this.padding;

    this.pieces = {
      "0001": { pieceID: "1000", rotate: 270, rx: 0, ry: 0 },
      "000e": { pieceID: "e000", rotate: 270, rx: 0, ry: 0 },
      "0010": { pieceID: "1000", rotate: 180, rx: 0, ry: 0 },
      "0011": { pieceID: "1100", rotate: 180, rx: 0, ry: 0 },
      "001e": { pieceID: "e001", rotate: 270, rx: 0, ry: 0 },
      "00e0": { pieceID: "e000", rotate: 180, rx: 0, ry: 0 },
      "00e1": { pieceID: "e100", rotate: 180, rx: 0, ry: 0 },
      "00ee": { pieceID: "e00e", rotate: 270, rx: 0, ry: 0 },
      "0100": { pieceID: "1000", rotate: 90, rx: 0, ry: 0 },
      "0101": { pieceID: "1010", rotate: 90, rx: 0, ry: 0 },
      "010e": { pieceID: "e010", rotate: 270, rx: 0, ry: 0 },
      "0110": { pieceID: "1100", rotate: 90, rx: 0, ry: 0 },
      "0111": { pieceID: "1110", rotate: 90, rx: 0, ry: 0 },
      "011e": { pieceID: "e011", rotate: 270, rx: 0, ry: 0 },
      "01e0": { pieceID: "e001", rotate: 180, rx: 0, ry: 0 },
      "01e1": { pieceID: "e101", rotate: 180, rx: 0, ry: 0 },
      "01ee": { pieceID: "e01e", rotate: 270, rx: 0, ry: 0 },
      "0e00": { pieceID: "e000", rotate: 90, rx: 0, ry: 0 },
      "0e01": { pieceID: "e010", rotate: 90, rx: 0, ry: 0 },
      "0e10": { pieceID: "e100", rotate: 90, rx: 0, ry: 0 },
      "0e11": { pieceID: "e110", rotate: 90, rx: 0, ry: 0 },
      "0ee0": { pieceID: "e00e", rotate: 180, rx: 0, ry: 0 },
      "0ee1": { pieceID: "e10e", rotate: 180, rx: 0, ry: 0 },
      "1001": { pieceID: "1100", rotate: 270, rx: 0, ry: 0 },
      "100e": { pieceID: "e100", rotate: 270, rx: 0, ry: 0 },
      "1011": { pieceID: "1110", rotate: 180, rx: 0, ry: 0 },
      "101e": { pieceID: "e101", rotate: 270, rx: 0, ry: 0 },
      "101e": { pieceID: "e101", rotate: 270, rx: 0, ry: 0 },
      "10e0": { pieceID: "e010", rotate: 180, rx: 0, ry: 0 },
      "10e1": { pieceID: "e110", rotate: 180, rx: 0, ry: 0 },
      "10ee": { pieceID: "e10e", rotate: 270, rx: 0, ry: 0 },
      "1101": { pieceID: "1110", rotate: 270, rx: 0, ry: 0 },
      "110e": { pieceID: "e110", rotate: 270, rx: 0, ry: 0 },
      "111e": { pieceID: "e111", rotate: 270, rx: 0, ry: 0 },
      "11e0": { pieceID: "e011", rotate: 180, rx: 0, ry: 0 },
      "11e1": { pieceID: "e111", rotate: 180, rx: 0, ry: 0 },
      "11ee": { pieceID: "e11e", rotate: 270, rx: 0, ry: 0 },
      "1e00": { pieceID: "e001", rotate: 90, rx: 0, ry: 0 },
      "1e01": { pieceID: "e011", rotate: 90, rx: 0, ry: 0 },
      "1e10": { pieceID: "e101", rotate: 90, rx: 0, ry: 0 },
      "1e11": { pieceID: "e111", rotate: 90, rx: 0, ry: 0 },
      "1ee0": { pieceID: "e01e", rotate: 180, rx: 0, ry: 0 },
      "1ee1": { pieceID: "e11e", rotate: 180, rx: 0, ry: 0 },
      ee00: { pieceID: "e00e", rotate: 90, rx: 0, ry: 0 },
      ee01: { pieceID: "e01e", rotate: 90, rx: 0, ry: 0 },
      ee10: { pieceID: "e10e", rotate: 90, rx: 0, ry: 0 },
      ee11: { pieceID: "e11e", rotate: 90, rx: 0, ry: 0 }
    };

    this.addDef(require("../puzzle/0000.svg"));
    this.addDef(require("../puzzle/1000.svg"));
    this.addDef(require("../puzzle/1100.svg"));
    this.addDef(require("../puzzle/1110.svg"));
    this.addDef(require("../puzzle/1111.svg"));
    this.addDef(require("../puzzle/1010.svg"));
    this.addDef(require("../puzzle/e000.svg"));
    this.addDef(require("../puzzle/e00e.svg"));
    this.addDef(require("../puzzle/e001.svg"));
    this.addDef(require("../puzzle/e01e.svg"));
    this.addDef(require("../puzzle/e010.svg"));
    this.addDef(require("../puzzle/e10e.svg"));
    this.addDef(require("../puzzle/e011.svg"));
    this.addDef(require("../puzzle/e11e.svg"));
    this.addDef(require("../puzzle/e100.svg"));
    this.addDef(require("../puzzle/e101.svg"));
    this.addDef(require("../puzzle/e110.svg"));
    this.addDef(require("../puzzle/e111.svg"));
  }

  _chunk() {
    let maxXpos = 0;
    let maxYpos = 0;
    let board = [];
    for (var i = 0, n = this.data.length; i < n; i += 4) {
      let { r, g, b, a, pos, v } = this.getPixel(i);

      var x = Math.floor(pos % this.imgSize) * this.mX;
      var y = Math.floor(pos / this.imgSize) * this.mX;

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
      s = this.cellSize / 10;
      if (s) {
        scale = `scale(${s})`;
      }

      let px = Math.floor(pos % this.imgSize);
      let py = Math.floor(pos / this.imgSize);

      let maxpx = this.imgSize;
      let maxpy = this.data.length / 4 / this.imgSize;

      let piece = [];

      if (py === 0) {
        board[px] = [];
        board[px][py] = [];
      }

      if (py === 0) {
        piece.push("e");
      } else {
        piece.push(!board[px][py - 1][2] * 1);
      }
      if (px === maxpx - 1) {
        piece.push("e");
      } else {
        piece.push(Math.round(Math.random()));
      }
      if (py === maxpy - 1) {
        piece.push("e");
      } else {
        piece.push(Math.round(Math.random()));
      }
      if (px === 0) {
        piece.push("e");
      } else {
        piece.push(!board[px - 1][py][1] * 1);
      }

      board[px][py] = piece;

      let pieceID = piece.join("");

      // if (px === 11 && py === 0) {
      //   pieceID = "0100";
      // } else {
      //   pieceID = "0000";
      // }

      let rotate = "";

      if (this.pieces[pieceID]) {
        let _pieceID = pieceID;
        pieceID = this.pieces[_pieceID].pieceID;
        rotate = `rotate(${this.pieces[_pieceID].rotate}, ${9 +
          this.pieces[_pieceID].rx}, ${9 + this.pieces[_pieceID].ry} )`;
      }

      this.add(
        s,
        `<use xlink:href="#${pieceID}" fill="${col}" transform="${translate} ${scale} ${rotate}" />`
      );
    }

    this.cWidth = maxXpos + this.mX * (this.cellSize / 10);
    this.cHeight = maxYpos + this.mY * (this.cellSize / 10);
  }
}
