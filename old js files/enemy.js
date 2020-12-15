// class EnemyHandler {
//   constructor() {
//     this.enemyList = [];
//     this.patternList = [];
//     this.projectileList = [];
//   }

//   updateEnemies() {
//     for (let index = this.enemyList.length; index--;) {
//       const enemy = this.enemyList[index];
//       if (enemy.toDelete) this.enemyList.splice(index, 1);
//     }

//     for (let enemy of this.enemyList) {
//       enemy.update();
//     }
//   }

//   updatePatterns() {
//     for (let index = this.patternList.length; index--;) {
//       const pattern = this.patternList[index];
//       if (pattern.toDelete) this.patternList.splice(index, 1);
//     }

//     for (let pattern of this.patternList) {
//       pattern.update();
//     }
//   }

//   updateProjectiles() {
//     for (let index = this.projectileList.length; index--;) {
//       const projectile = this.projectileList[index];
//       if (projectile.toDelete) this.projectileList.splice(index, 1);
//     }

//     for (let projectile of this.projectileList) {
//       projectile.update();
//     }
//   }

//   renderEnemies() {
//     for (let enemy of this.enemyList) {
//       enemy.render();
//     }
//   }

//   renderProjectiles() {
//     for (let projectile of this.projectileList) {
//       projectile.render();
//     }
//   }

//   addEnemy(enemy) {
//     this.enemyList.push(enemy);
//   }

//   addPattern(enemy, constructorFunc, behaviorFunc) {
//     this.patternList.push(new Pattern(enemy, constructorFunc, behaviorFunc));
//   }

//   //pushes projectile to projectile list
//   addProjectile(pattern, index, constructorFunc, behaviorFunc) {
//     this.projectileList.push(new Projectile(pattern, index, constructorFunc, behaviorFunc));
//   }

//   add(type, owner, index, spread, constructorFunc, behaviorFunc) {
//     console.log(`${type.name.toLowerCase()}List`)
//     this[`${type.name.toLowerCase()}List`].push(new type(
//       owner, index, spread, constructorFunc, behaviorFunc
//     ))
//   }
// }

// const enemyHandler = new EnemyHandler();



class Enemy {
  constructor(x, y) {
    this.pos = Vec2(x, y);

    this.updateTimer = 0;
    this.toDelete = false;
  }

  create({ type, startTime = 0, frequency = 1, numTimes = 1, spread = 1,
    constructorFunc,
    behaviorFunc,
    thisFunc,
    projectileType
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

  update() {
    this.behavior();
    this.updateTimer++
  }

  render() {
    c.fillStyle = `rgb(${100}, ${100}, ${100})`
    c.fillRect(...this.pos.copy().floor().sub(5).get(), 10, 10);
  }
}




// class BasicEnemyA extends Enemy {
//   constructor(x, y) {
//     super(x, y);
//   }

//   behavior() {
//     this.createPattern(30, 1, 1,
//       function con(enemy) {
//         this.pos = enemy.pos.copy();
//         this.angle = player.pos.copy().sub(this.pos).angle();
//       },

//       function beh() {
//         this.createProjectile(0, 16, 5, 5,

//           function con(pattern, i) {
//             this.pos = pattern.pos.copy();
//             this.angle = pattern.angle + 0.1 * i - 0.2;
//             this.speed = 2;
//             this.vel = Vec2(Math.sin(this.angle), Math.cos(this.angle)).mul(this.speed);
//           },

//           function beh() {
//             this.pos.add(this.vel);
//           });

//         this.createProjectile(8, 16, 4, 6,

//           function con(pattern, i) {
//             this.pos = pattern.pos.copy();
//             this.angle = pattern.angle + 0.1 * i - 0.25;
//             this.speed = 2;
//             this.vel = Vec2(Math.sin(this.angle), Math.cos(this.angle)).mul(this.speed);
//           },

//           function beh() { this.pos.add(this.vel); });

//         this.timeDelete(64);
//       });

//     this.pos.add(1, 0.2)
//   }
// }

// class BasicEnemyB extends Enemy {
//   constructor(x, y) {
//     super(x, y)
//   }

//   behavior() {
//     this.createPattern(60, 1, 1,
//       function c(enemy) {
//         this.pos = enemy.pos.copy();
//       },

//       function b() {
//         const n = 32;
//         this.createProjectile(0, 60, 3, n,
//           function c(pattern, i) {
//             this.pos = pattern.pos.copy();
//             this.angle = Math.PI * 2 / n * i;
//             this.speed = 16;
//           },

//           function b() {
//             if (this.updateTimer < 40) {
//               this.speed *= 0.9;
//               this.vel = Vec2().fromAngle(this.angle).mul(this.speed);
//             }

//             if (this.updateTimer == 40) {
//               this.angle = player.pos.copy().sub(this.pos).angle();
//               this.speed = 3;
//               this.vel = Vec2().fromAngle(this.angle).mul(this.speed);
//             }

//             this.pos.add(this.vel);
//           });
//         this.timeDelete(120);
//       });
//     this.pos.add(2, 1);
//   }
// }

// class BasicEnemyC extends Enemy {
//   constructor(x, y) {
//     super(x, y);
//   }

//   behavior() {
//     this.createPattern(120, 60, 3,
//       function constructorFunc(enemy) {
//         this.pos = enemy.pos.copy();
//         this.angle = player.pos.copy().sub(enemy.pos).angle();
//         this.speed = 1;
//       },

//       function behaviorFunc() {
//         this.createProjectile(0, 5, 10, 3,
//           function constructorFunc(pattern, i) {
//             this.pos = pattern.pos.copy();
//             this.angle = pattern.angle + 0.3 * i - 0.3;
//             this.speed = pattern.speed;
//             this.vel = Vec2().fromAngle(this.angle).mul(this.speed);
//           },

//           function behaviorFunc() {
//             this.pos.add(this.vel);
//           },

//           function selfFunc() {
//             this.speed *= 1.15;
//           });
//         this.timeDelete(120);
//       });
//   }
// }

// class BasicEnemyD extends Enemy {
//   constructor(x, y) {
//     super(x, y);
//   }

//   behavior() {
//     this.createPattern(60, 1, 1,

//       function c(enemy) {
//         this.pos = enemy.pos.copy();
//       },

//       function b() {
//         this.createProjectile(0, 2, 60, 1,

//           function c(pattern) {
//             this.pos = Vec2().rand().mul(100).add(pattern.pos).sub(50);
//             this.vel = Vec2();
//           },

//           function b() {
//             if (this.updateTimer === 60) {
//               this.speed = 4;
//               this.angle = player.pos.copy().sub(this.pos).angle();
//               this.vel.fromAngle(this.angle).mul(this.speed);
//             }
//             this.pos.add(this.vel);
//           });

//       });
//   }
// }

// class EnemyE extends Enemy {
//   constructor(x, y) {
//     super(x, y);
//   }

//   behavior() {
//     this.createPattern(60, 60, 3,

//       function c(enemy) {
//         this.pos = enemy.pos.copy();
//       },

//       function b() {
//         const n = 5;
//         this.createProjectile(0, 1, 1, n,

//           function c(pattern, i) {
//             this.pos = pattern.pos.copy();
//             this.angle = Math.PI * 2 / n * i;
//             this.speed = 4;
//             this.vel = Vec2().fromAngle(this.angle).mul(this.speed);
//           },

//           function b() {
//             const n = 10;
//             this.pos.add(this.vel);

//             this.createProjectile(30, 1, 1, n,

//               function c(projectile, i) {
//                 this.pos = projectile.pos.copy();
//                 this.angle = Math.PI * 2 / n * i;
//                 this.speed = 2;
//                 this.vel = Vec2().fromAngle(this.angle).mul(this.speed);
//               },

//               function b() {
//                 this.pos.add(this.vel);
//               });
//             this.timeDelete(30);
//           });

//       });
//   }
// }

class EnemyA extends Enemy {
  constructor(x, y) {
    super(x, y);
  }

  behavior() {
    this.create({
      type: Pattern, startTime: 60, spread: 6,
      constructorFunc: function (enemy, i) {
        this.angle = player.pos.copy().sub(enemy.pos.copy()).angle() + 1.0472 * i - Math.PI;
        this.pos = enemy.pos.copy().add(Vec2().fromAngle(this.angle).mul(40))
        this.speed = i / 4 * 2 + 2;
      },

      behaviorFunc: function () {
        this.create({
          type: Projectile, spread: 5, frequency: 20, numTimes: 10,
          constructorFunc: function (pattern, i) {
            this.pos = pattern.pos.copy();
            this.angle = player.pos.copy().sub(this.pos).angle() + 0.3 * i - 0.6;
            this.speed = pattern.speed;
            this.vel = Vec2().fromAngle(this.angle).mul(this.speed);
          },

          behaviorFunc: function () {
            this.pos.add(this.vel);
          }

        });
      }
    });
  }
}

// class MercuryPoisonEnemy extends Enemy {
//   constructor(x, y) {
//     super(x, y);
//   }

//   behavior() {
//     this.createPattern(60, 60, 10,

//       function c(enemy) {
//         this.pos = enemy.pos.copy();
//       },

//       function b() {
//         this.createProjectile(0, 1, 1)
//       });
//   }
// }
