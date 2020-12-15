class Stage {
  constructor() {
    this.enemyList = new EntityList;
    this.spawnerList = new EntityList;
    this.projectileList = new EntityList;

    this.updateTimer = 0;
  }

  add(type, index, spread, constructorFunc, behaviorFunc, parent) {

    //create entity: pass index, spread, additional constructor function and behavior functions as well as a parent
    const entity = new type(index, spread, constructorFunc, behaviorFunc, parent);

    //check if created entity inherits Entity or inherits an entity which inherits Entity
    //determine entity type and push it to the corresponding stage entity list
    this[`${type.__proto__ == Entity ? type.name.toLowerCase() : type.__proto__.name.toLowerCase()}List`].push(entity);

    //return entity reference to be used as a child if applicable
    return entity;
  }

  create(type, { startTime = 0, frequency = 1, numTimes = 1, spread = 1, behaviorFunc, constructorFunc, selfFunc }) {
    //return if update timer is less than start time; too soon to create
    if (this.updateTimer < startTime) return;

    //return if update timer is more than calculated end time; too late to create
    if (this.updateTimer > startTime + frequency * (numTimes - 1)) return;

    //return if update timer is within the range but not at the right time to create
    if ((this.updateTimer - startTime) % frequency) return;

    //call add function multiple times according to the spread value; pass the index into the function
    for (let index = 0; index < spread; index++) {

      //call stage add method to add the entity (type) into the equivalent stage entity list
      this.add(type, index, spread, behaviorFunc, constructorFunc);
    }

    //call function on creator entity if the function exists (selfFunc)
    if (selfFunc) selfFunc.call(this);
  }

  update() {
    this.behavior();

    this.enemyList.update();
    this.spawnerList.update();
    this.projectileList.update();

    this.updateTimer++;
  }
}

class StageOne extends Stage {
  constructor() {
    super();

    this.size = Vec2(600, 800);
  }

  behavior() {
    this.create(Spawner, {
      spread: 5,

      constructorFunc: function ({ i }) {
        this.pos = Vec2(20 + i * 40, 60);
      },

      behaviorFunc: function ({ i }) {
        this.create(EnemyA, {
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