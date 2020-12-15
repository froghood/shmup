class Player {
  constructor(x, y) {
    this.pos = Vec2(x, y);
    this.vel = Vec2(0, 0);
    this.speed = 3;
  }

  keyPressed(key) {
    this.vel.add((key == 'd') - (key == 'a'), (key == 's') - (key == 'w'))
  }

  keyReleased(key) {
    this.vel.sub((key == 'd') - (key == 'a'), (key == 's') - (key == 'w'))
  }

  update() {
    const angle = this.vel.angle();

    this.pos.add(this.vel.copy().pos().mul(this.speed).mul(Math.sin(angle), Math.cos(angle))).clamp(0, canvasWidth, 0, canvasHeight);
  }

  render() {
    c.fillStyle = `rgb(${255}, ${255}, ${255})`;
    c.fillRect(...this.pos.copy().floor().sub(10).get(), 20, 20);
  }
}

const player = new Player(canvasWidth / 2, canvasHeight / 2, 10);