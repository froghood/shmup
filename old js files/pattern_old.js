const _pattern = class Pattern {
  constructor(x, y) {
    this.pos = Vec2(x, y);
    this.updateTimer = 0;
    this.toDelete = false;
  }
}

const Pattern = (...args) => new _pattern(...args);