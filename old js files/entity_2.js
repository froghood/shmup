class Entity {
  constructor(index, spread, behaviorFunc, constructorFunc, parent) {
    this.updateTimer = 0;
    this.toDelete = false;

    this.children = [];

    this.parent = parent;
    this.index = index;
    this.spread = spread;

    if (behaviorFunc) {
      behaviorFunc.args = { parent, i: index, n: spread };
      this.behavior = behaviorFunc;
    }

    if (constructorFunc) constructorFunc.call(this, { parent, i: index, n: spread });
  }

  create(type, { child = false, startTime = 0, frequency = 1, numTimes = 1, spread = 1, behaviorFunc, constructorFunc, selfFunc }) {

    //return if update timer is less than start time; too soon to create
    if (this.updateTimer < startTime) return;

    //return if update timer is more than calculated end time; too late to create
    if (this.updateTimer > startTime + frequency * (numTimes - 1)) return;

    //return if update timer is within the range but not at the right time to create
    if ((this.updateTimer - startTime) % frequency) return;

    //call add function multiple times according to the spread value; pass the index into the function
    for (let index = 0; index < spread; index++) {

      //call stage add method to add the entity (type) into the equivalent stage entity list
      //if added entity (type) is a child of the creator entity (child); add it to the creator's children list
      if (child) this.children.push(stage.add(type, index, spread, behaviorFunc, constructorFunc, this));
      else stage.add(type, index, spread, behaviorFunc, constructorFunc, this);
    }

    //call function on creator entity if the function exists (selfFunc)
    if (selfFunc) selfFunc.call(selfFunc);
  }

  update() {
    this.behavior(this.behavior.args);
    this.updateTimer++;
  }

  delete(time = 0) {
    if (this.updateTimer >= time) this.toDelete = true;
  }
}

class EntityList extends Array {
  constructor() {
    super();
  }

  update() {
    for (let i = this.length; i--;) {
      const entity = this[i];
      if (entity.toDelete) this.splice(i, 1);
    }

    for (let entity of this) entity.update();
  }

  render() {
    for (let entity of this) entity.render();
  }
}