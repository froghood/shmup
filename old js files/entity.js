class Entity {
  constructor({ parent, index, spread, constructFunc, behaviorFunc }) {
    if (parent) this.parent = parent;
    if (behaviorFunc) this.behavior = behaviorFunc;

    this.updateTimer = 0;
    this.toDelete = false;

    constructFunc.call(this, { parent, i: index, n: spread })
  }

  create({ type, parent, startTime = 0, frequency = 1, numTimes = 1, spread = 1, constructorFunc, behaviorFunc, thisFunc }) {

    const maxTime = startTime + frequency * (numTimes - 1);

    if (this.updateTimer <= maxTime && this.updateTimer >= startTime) {
      if (!((this.updateTimer - startTime) % frequency)) {
        for (let index = 0; index < spread; index++) {

          stage.add({ type, parent, index, spread, constructorFunc, behaviorFunc })

        }

        if (thisFunc) thisFunc.call(this);
      }
    }
  }

  update() {
    this.behavior();
    this.updateTimer++
  }
}

class Entity {
  constructor({ parent, index, spread, constructorFunc, behaviorFunc }) {
    if (parent) this.parent = parent;
    if (behaviorFunc) this.behavior = behaviorFunc;

    this.updateTimer = 0;
    this.toDelete = false;

    this.children = [];

    if (constructorFunc) constructFunc.call(this, { parent, i: index, n: spread })
  }

  create({ type, startTime = 0, frequency = 1, numTimes = 1, spread = 1, constructorFunc, behaviorFunc, thisFunc }) {
    const maxTime = startTime + frequency * (numTimes - 1);

    if (this.updateTimer <= maxTime && this.updateTimer >= startTime) {
      if (!((this.updateTimer - startTime) % frequency)) {
        for (let index = 0; index < spread; index++) {
          stage.add({})
        }
      }
    }
  }

  update() {
    this.behavior();
    this.updateTimer++;
  }
}