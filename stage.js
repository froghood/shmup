class Stage {
  constructor() {
    this.entityList = [];
    this.collisionGrids = {};

    this.frame = 0;
  }

  update() {
    this.behavior();
    this.frame++;

    for (let index = 0; index < entityList.length; index++) {

      let deleteCount = 0;
      for (; this.entityList[index + deleteCount].toDelete;) { deleteCount++ }
      this.entityList.splice(index, deleteCount);

      this.entityList[index].update();
    }
  }

  render() {
    for (let entity of this.entityList) { entity.render(); }
  }

  add(type, { parent, index, spread, constructorFunc, behaviorFunc }) {
    let entity = new type({ parent, index, spread, constructorFunc, behaviorFunc });

    this.entityList.push(entity);

    return entity;
  }

  create(type = Entity, { startFrame = 0, frequency = 1, numTimes = 1, spread = 1, behaviorFunc, constructorFunc, selfFunc }) {

    //return if update timer is less than start time; too soon to create
    if (this.frame < startFrame) return;

    //return if update timer is more than calculated end time; too late to create
    if (this.frame > startFrame + frequency * (numTimes - 1)) return;

    //return if update timer is within the range but not at the right time to create
    if ((this.frame - startFrame) % frequency) return;

    //call add function multiple times according to the spread value; pass the index into the function
    for (let index = 0; index < spread; index++) {

      //call stage add method to add the entity to the entity list
      this.add(type, { index, spread, behaviorFunc, constructorFunc });
    }

    //call function on creator entity if the function exists (selfFunc)
    if (selfFunc) selfFunc.call(this);
  }
}

class StageOne extends Stage {
  constructor() {
    this.collisionGrids[`enemy_body`] = new Grid(5);
    this.collisionGrids[`enemy_proj`] = new Grid(20);
  }

  behavior() {
    this.create({ //spawner
      spread: 5,

      constructorFunc: function ({ i }) {
        this.pos = Vec2(20 + i * 40, 60);
      },

      behaviorFunc: function ({ i }) {
        this.create(EnemyA, { //enemy
          startTime: i * 20,

          constructorFunc: function ({ parent }) {
            this.pos = parent.pos.copy();
          }
        })

        this.timeDelete(i * 20);
      }
    })
  }
}