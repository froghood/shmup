// //projectile handler manages all global projectiles (projectiles that are not owned by any specific enemy)
// class ProjectileHandler {
//   constructor() {
//     this.projectileList = [];
//     this.patternList = [];
//   }

//   updatePatterns() {
//     for (let [index, pattern] of this.patternList.entries()) {
//       if (pattern.toDelete) this.patternList.splice(index, 1);
//     }

//     for (let pattern of this.patternList) {
//       pattern.update();
//     }
//   }

//   //remove any projectiles marked for deletion (toDelete property)
//   //update remaining projectiles by calling their update methods
//   updateProjectiles() {
//     //remove projectiles
//     for (let index = this.projectileList.length - 1; index >= 0; index--) {
//       const projectile = this.projectileList[index];
//       if (projectile.toDelete) this.projectileList.splice(index, 1);
//     }

//     //update projectiles
//     for (let projectile of this.projectileList) {
//       projectile.update();
//     }
//   }

//   //render projectiles by calling their render methods
//   renderProjectiles() {
//     for (let projectile of this.projectileList) {
//       projectile.render();
//     }
//   }

//   //pushes projectile to projectile list
//   addProjectile(pattern, index, constructorFunc, behaviorFunc) {
//     this.projectileList.push(new Projectile(pattern, index, constructorFunc, behaviorFunc));
//   }

//   addPattern(enemy, constructorFunc, behaviorFunc) {
//     this.patternList.push(new Pattern(enemy, constructorFunc, behaviorFunc));
//   }
// }

// const projectileHandler = new ProjectileHandler();

class Projectile {
  constructor(owner, index, spread, constructorFunc, behaviorFunc) {
    this.owner = owner;
    this.constructorFunc = constructorFunc;
    this.behaviorFunc = behaviorFunc;

    this.updateTimer = 0;
    this.toDelete = false;
    this.boundsDelete = false;

    constructorFunc.call(this, owner, index, spread);
  }

  update() {
    this.behaviorFunc(this.pattern);
    this.updateTimer++;
  }

  render() {
    c.fillStyle = `rgb(${255}, ${0}, ${100})`
    c.beginPath();
    c.arc(...this.pos.copy().floor().get(), 8, 0, 360);
    c.fill();
  }

  timeDelete(time) {
    if (this.updateTimer != time) return;
    this.toDelete = true;
  }

  delete() { this.toDelete = true; }

  // createPattern(timeOffset, timeIncrement, numIncrements, constructorFunc, behaviorFunc) {
  //   const maxTime = timeOffset + timeIncrement * (numIncrements - 1);
  //   if (this.updateTimer <= maxTime && this.updateTimer >= timeOffset) {
  //     if (!((this.updateTimer - timeOffset) % timeIncrement)) {
  //       enemyHandler.addPattern(this, constructorFunc, behaviorFunc);
  //       console.log('pattern');
  //     }
  //   }
  // }

  // createProjectile(timeOffset, timeIncrement, numIncrements, numProjectiles, constructorFunc, behaviorFunc, thisFunc) {
  //   const maxTime = timeOffset + timeIncrement * (numIncrements - 1);
  //   if (this.updateTimer <= maxTime && this.updateTimer >= timeOffset) {
  //     if (!((this.updateTimer - timeOffset) % timeIncrement)) {
  //       for (let index = 0; index < numProjectiles; index++) {
  //         enemyHandler.addProjectile(this, index, constructorFunc, behaviorFunc)
  //       }
  //       if (thisFunc) thisFunc.call(this);
  //     }
  //   }
  // }

  create({ type, startTime = 0, frequency = 1, numTimes = 1, spread = 1,
    constructorFunc,
    behaviorFunc,
    thisFunc
  }) {
    const maxTime = startTime + frequency * (numTimes - 1);
    if (this.updateTimer <= maxTime && this.updateTimer >= startTime) {
      if (!((this.updateTimer - startTime) % frequency)) {
        for (let index = 0; index < spread; index++) {
          enemyHandler.add(type, this, index, spread, constructorFunc, behaviorFunc)
        }
        if (thisFunc) thisFunc.call(this);
      }
    }
  }
}