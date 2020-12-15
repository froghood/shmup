class _circle {
  constructor({ x = 0, y = 0, radius }) {
    this.offset = Vec2(x, y);
    this.radius = radius;
  }
}

class _rect {
  constructor({ x = 0, y = 0, width, height }) {
    this.offset = Vec2(x, y);
    this.width = width;
    this.height = height;
  }
}

const Circle = (...args) => new _circle(...args);
const Rect = (...args) => new _rect(...args);

