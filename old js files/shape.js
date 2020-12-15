const _circle = class Circle {
  constructor(x, y, r) {
    this.offset = Vec2(x, y);
    this.radius = r;
  }
}

const _rect = class Rect {
  constructor(x, y, w, h) {
    this.offset = Vec2(x, y);
    this.size = Vec2(w, h);
  }
}

const Circle = (...args) => new _circle(...args);
const Rect = (...args) => new _rect(...args);