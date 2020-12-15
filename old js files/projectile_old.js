//projectile handler manages all global projectiles (projectiles that are not owned by any specific enemy)
class ProjectileHandler {
  constructor() { this.projectileList = []; }

  //remove any projectiles marked for deletion (toDelete property)
  //update remaining projectiles by calling their update methods
  updateProjectiles() {
    //remvoe projectiles
    for (let [index, projectile] of this.projectileList.entries()) {
      if (projectile.toDelete) this.projectileList.splice(index, 1);
    }

    //update projectiles
    for (let projectile of this.projectileList) {
      projectile.update();
    }
  }

  //render projectiles by calling their render methods
  renderProjectiles() {
    for (let projectile of this.projectileList) {
      projectile.render();
    }
  }

  //pushes projectile to projectile list
  addProjectile(projectile) { this.projectileList.push(projectile); }
}

const projectileHandler = new ProjectileHandler();



//base projectile
class Projectile {
  constructor(x, y) {
    this.pos = Vec2(x, y);
    this.updateTimer = 0;
    this.toDelete = false;
  }
}


//main player projectile
// const _playerProjectile = class PlayerProjectile {
//   constructor(x, y) {
//     this.pos = Vec2(x, y);
//     this.speed = 20;
//     this.hitbox = Rect(0, 0, 20, 50);
//     this.bounds = Rect(0, 0, 20, 50);
//   }

//   update() { this.pos.add(0, -this.speed); }

//   render() {

//   }
// }

//enemy projectile
const _basicProjectileA = class BasicProjectileA extends Projectile {
  constructor(...args) {
    if (args[0] instanceof _vec2) {
      super(args[0].x, args[0].y);
      this.angle = args[1];
      this.speed = args[2];
    }
    else {
      super(args[0], args[1]);
      this.angle = args[2];
      this.speed = args[3];
    }
  }

  update() {
    this.pos.add(Vec2(Math.sin(this.angle), Math.cos(this.angle)).mul(this.speed));
  }

  render() {
    c.fillStyle = `rgb(${255}, ${0}, ${100})`;
    c.beginPath();
    c.arc(...this.pos.copy().floor().get(), 8, 0, 360);
    c.fill();
  }
}

const BasicProjectileA = (...args) => new _basicProjectileA(...args);

