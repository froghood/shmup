const _vec2 = class Vec2 {
  constructor(x = 0, y = 0) { this.x = x; this.y = y };

  set(...args) {
    if (args.length === 1) {
      if (args[0] instanceof _vec2) { this.x = args[0].x; this.y = args[0].y; }
      else { this.x = args[0]; this.y = args[0]; }
    }
    else { this.x = args[0]; this.y = args[1]; }
    return this;
  }

  add(...args) {
    if (args.length === 1) {
      if (args[0] instanceof _vec2) { this.x += args[0].x; this.y += args[0].y; }
      else { this.x += args[0]; this.y += args[0]; }
    }
    else { this.x += args[0]; this.y += args[1]; }
    return this;
  }

  sub(...args) {
    if (args.length === 1) {
      if (args[0] instanceof _vec2) { this.x -= args[0].x; this.y -= args[0].y; }
      else { this.x -= args[0]; this.y -= args[0]; }
    }
    else { this.x -= args[0]; this.y -= args[1]; }
    return this;
  }

  mul(...args) {
    if (args.length === 1) {
      if (args[0] instanceof _vec2) { this.x *= args[0].x; this.y *= args[0].y; }
      else { this.x *= args[0]; this.y *= args[0]; }
    }
    else { this.x *= args[0]; this.y *= args[1]; }
    return this;
  }

  div(...args) {
    if (args.length === 1) {
      if (args[0] instanceof _vec2) { this.x /= args[0].x; this.y /= args[0].y; }
      else { this.x /= args[0]; this.y /= args[0]; }
    }
    else { this.x /= args[0]; this.y /= args[1]; }
    return this;
  }

  angle() { return Math.atan2(this.x, this.y) }
  fromAngle(angle) { this.x = Math.sin(angle); this.y = Math.cos(angle); return this; }

  pos() { this.x = Math.abs(this.x); this.y = Math.abs(this.y); return this; }
  neg() { this.x = -Math.abs(this.x); this.y = -Math.abs(this.y); return this; }
  round() { this.x = Math.round(this.x); this.y = Math.round(this.y); return this; }
  floor() { this.x = Math.floor(this.x); this.y = Math.floor(this.y); return this; }
  ceil() { this.x = Math.ceil(this.x); this.y = Math.ceil(this.y); return this; }

  clamp(...args) {
    this.x = Math.max(Math.min(this.x, args[1]), args[0]);
    if (args.length === 2) this.y = Math.max(Math.min(this.y, args[1]), args[0]);
    else this.y = Math.max(Math.min(this.y, args[3]), args[2]);
    return this;
  }

  wrap(...args) {
    const xMod = args[1] - args[0];
    this.x = (this.x + xMod - args[0]) % xMod + args[0];
    if (args.length === 2) this.y = (this.y + xMod - args[0]) % xMod + args[0];
    else {
      const yMod = args[3] - args[2];
      this.y = (this.y + yMod - args[2]) % yMod + args[2];
    }
    return this;
  }

  rand() { this.x = Math.random(); this.y = Math.random(); return this; }

  get() { return [this.x, this.y]; }
  copy() { return new _vec2(this.x, this.y); }
}

const Vec2 = (...args) => new _vec2(...args);