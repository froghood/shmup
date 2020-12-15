class EnemyHandler {
  constructor() {
    this.enemyList = [];
  }

  addEnemy(enemy) { this.enemyList.push(enemy); }

  updateEnemies() {
    for (let [index, enemy] of this.enemyList.entries()) {
      if (enemy.toDelete) this.enemyList.splice(index, 1);
    }

    for (let enemy of this.enemyList) {
      enemy.update();
    }
  }

  renderEnemies() {
    for (let enemy of this.enemyList) {
      enemy.render();
    }
  }
}

const enemyHandler = new EnemyHandler();



class Enemy {
  constructor(x, y) {
    this.pos = Vec2(x, y);

    this.patternList = []

    this.updateTimer = 0;
    this.toDelete = false;
  }

  createPattern(time, num, patternFunction) {
    if (this.updateTimer === time) for (let i = 0; i < num; i++) patternFunction(i);
  }

  updateProjectiles() { for (let projectile of this.projectiles) projectile.update(); }

  addProjectile(projectile) {
    if (!this.projectiles) this.projectiles = [];
    this.projectiles.push(projectile);
  }
}



const _basicEnemyA = class BasicEnemyA extends Enemy {
  constructor(x, y) {
    super(x, y)
    this.health = 50;
  }

  update() {
    // const angle = player.pos.copy().sub(this.pos).angle()
    // this.createPattern(120, 5, (i) => {
    //   const pos = this.pos.copy();
    //   const angleA = angle + i * 0.1 - 0.2;
    //   const speed = 2;
    //   projectileHandler.addProjectile(BasicProjectileA(pos, angleA, speed));
    // });

    // this.createPattern(135, 6, (i) => {
    //   const pos = this.pos.copy();
    //   const angleB = angle + i * 0.1 - 0.25;
    //   const speed = 2;
    //   projectileHandler.addProjectile(BasicProjectileA(pos, angleB, speed));
    // });

    // this.createPattern(150, 7, (i) => {
    //   const pos = this.pos.copy();
    //   const angleC = angle + i * 0.1 - 0.3;
    //   const speed = 2;
    //   projectileHandler.addProjectile(BasicProjectileA(pos, angleC, speed));
    // });

    // this.createAttack(120, () => {

    // })

    this.createPattern(120, () => {
      this.createShot(0, 5, (i) => {
        projectileHandler.addProjectile(BasicProjectileA())
      })

      this.createShot(25, 6, (i) => {


      })

      this.createShot(50, 7, (i) => {


      })
    })

    this.updateTimer++
  }

  render() {
    c.fillStyle = `rgb(${100}, ${100}, ${100})`
    c.fillRect(...this.pos.copy().floor().sub(5).get(), 10, 10);
  }
}

const BasicEnemyA = (...args) => new _basicEnemyA(...args);