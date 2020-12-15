let resolution = 1;

class Grid extends Array {
  constructor(res) {
    super(res * 3);
    for (let i = this.length; i--;) { this[i] = [...Array(res * 4)]; }
  }

  getSize() {
    return Vec2(this.length, this[0].length);
  }

  render() {
    const size = this.getSize();

    for (let x = size.x; x--;) {
      for (let y = size.y; y--;) {
        c.strokeStyle = `rgb(${255}, ${0}, ${100})`;

        const size = this.getSize();
        const pos = Vec2(canvasWidth / size.x, canvasHeight / size.y);

        c.strokeRect(pos.x * x, pos.y * y, pos.x, pos.y);
      }
    }
  }
}

let grid = new Grid(resolution);