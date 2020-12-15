class Enemy extends Entity {
  constructor(...args) {
    super(...args);
  }
}

class EnemyA extends Enemy {
  constructor(...args) {
    super(...args)
  }

  behavior() {
    this.create(Spawner, {

      constructorFunc: function ({ parent }) {
        this.pos = parent.pos.copy();
        this.speed = 2;
      },

      behaviorFunc: function () {
        this.create(Projectile, {
          startTime: 60, frequency: 20, numTimes: 5, spread: 5,

          constructorFunc: function ({ parent, i }) {
            this.pos = parent.pos.copy();
            this.speed = parent.speed;
            this.angle = player.pos.copy().sub(this.pos).angle() + 10 * i - 20;
            this.vel = Vec2().fromAngle(this.angle);
          },

          behaviorFunc: function () {
            this.pos.add(this.vel);
          },

          thisFunc: function () {
            this.speed += 0.5;
          }
        })
      }
    })
  }
}