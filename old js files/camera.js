class Camera {
  constructor(w, h) {
    this.pos = Vec2(x, y);
    this.size = Vec2(w, h);
  }

  update() {
    this.pos.set(player.pos.copy().div(stage.size).mul(stage.size.copy().sub(this.size)));
  }

  render() {
    c.fillStyle = `rgb(${100}, ${100}, ${100})`
    c.fillRect(...this.pos.get(), ...this.size.get())
  }
}

const camera = new Camera(canvasWidth, canvasHeight);