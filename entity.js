class Entity {
  constructor({ parent, index, spread, constructorFunc, behaviorFunc }) {
    Object.assign(this, { parent, index, spread })

    this.frame = 0;

    if (constructorFunc) constructorFunc.call(this, { parent: this.parent, i: this.index, n: this.spread });
    if (behaviorFunc) this.behavior = behaviorFunc;

    this.toDelete = false;
  }

  update() {
    this.behavior({ parent: this.parent, i: this.index, n: this.spread });

    this.frame++;
  }

  create(type = Entity, { child = false, startFrame = 0, frequency = 1, numTimes = 1, spread = 1, behaviorFunc, constructorFunc, selfFunc }) {

    //return if update timer is less than start time; too soon to create
    if (this.frame < startFrame) return;

    //return if update timer is more than calculated end time; too late to create
    if (this.frame > startFrame + frequency * (numTimes - 1)) return;

    //return if update timer is within the range but not at the right time to create
    if ((this.frame - startFrame) % frequency) return;

    //call add function multiple times according to the spread value; pass the index into the function
    for (let index = 0; index < spread; index++) {

      //call stage add method to add the entity to the entity list
      //if added entity is a child of the creator entity (child); add it to the creator's children list
      if (child) this.children.push(stage.add(type, { parent: this, index, spread, behaviorFunc, constructorFunc }));
      else stage.add(type, { parent: this, index, spread, behaviorFunc, constructorFunc });
    }

    //call function on creator entity if the function exists (selfFunc)
    if (selfFunc) selfFunc.call(this);
  }

  delete() {
    this.toDelete = true;
  }
}