class Stage {
  constructor() {
    this.enemyList = [];
    this.patternList = [];
    this.projectileList = [];
    this.particleList = [];

    this.updateTimer = 0;
  }

  updateList(listName) {
    const list = this[`${listName}List`];
    for (let index = list.length; index--;) {
      const entity = list[index];
      if (entity.toDelete) list.splice(index, 1);
    }
    for (const entity of list) { entity.update(); }
  }

  // updateEnemies() {
  //   for (let index = this.enemyList.length; index--;) {
  //     const enemy = this.enemyList[index];
  //     if (enemy.toDelete) this.enemyList.splice(index, 1);
  //   }
  //   for (let enemy of this.enemyList) { enemy.update(); }
  // }

  // updatePatterns() {
  //   for (let index = this.patternList.length; index--;) {
  //     const pattern = this.patternList[index];
  //     if (pattern.toDelete) this.patternList.splice(index, 1);
  //   }
  //   for (let pattern of this.patternList) { pattern.update(); }
  // }

  // updateProjectiles() {
  //   for (let index = this.projectileList.length; index--;) {
  //     const projectile = this.projectileList[index];
  //     if (projectile.toDelete) this.projectileList.splice(index, 1);
  //   }
  //   for (let projectile of this.projectileList) { projectile.update(); }
  // }

  // renderEnemies() {
  //   for (let enemy of this.enemyList) { enemy.render(); }
  // }

  // renderProjectiles() {
  //   for (let projectile of this.projectileList) { projectile.render(); }
  // }

  renderList(listName) {
    const list = this[`${listName}List`];
    for (let entity of list) { list.render(); }
  }

  add(type, index, spread, constructorFunc, behaviorFunc) {

    const entity = new type({ index, spread, constructorFunc, behaviorFunc })
    this[`${type.__proto__ == Entity ? type.name.toLowerCase() : type.__proto__.name.toLowerCase()}List`].push(
      new type({ index, spread, constructorFunc, behaviorFunc })
    )
  }

  create({
    type, parent, spread = 1, constructorFunc, behaviorFunc,
    startTime = 0, frequency = 1, numTimes = 1,
  }) {
    const maxTime = startTime + frequency * (numTimes - 1);
    if (this.updateTimer <= maxTime && this.updateTimer >= startTime) {
      if (!((this.updateTimer - startTime) % frequency)) {
        for (let index = 0; index < spread; index++) {
          this.add({ type, parent, index, spread, constructorFunc, behaviorFunc })
        }
        if (thisFunc) thisFunc.call(this);
      }
    }
  }

  update() {
    this.behavior();
    this.updateTimer++

    this.updateList(`enemy`);
    this.updateList(`pattern`);
    this.updateList(`projectile`);
  }

  render() {
    this.renderList(`enemy`);
    this.renderList(`projectile`);
  }
}

class StageOne extends Stage {
  constructor() {
    this.size = Vec2(600, 800);
  }

  behavior() {
    this.create({
      type: EnemyA, startTime: 120, frequency: 30, numTimes: 5,

      constructorFunc: function (o, i) {
        this.pos = Vec2()
      }
    })
  }
}

let stage = new StageOne();