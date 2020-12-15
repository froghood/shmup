class Pattern {
  constructor(owner, index, spread, constructorFunc, behaviorFunc) {
    this.owner = owner;
    this.constructorFunc = constructorFunc;
    this.behaviorFunc = behaviorFunc;

    this.updateTimer = 0;
    this.toDelete = false;

    this.constructorFunc(owner, index, spread);
  }

  createPattern(timeOffset, timeIncrement, numIncrements, constructorFunc, behaviorFunc) {
    const maxTime = timeOffset + timeIncrement * (numIncrements - 1);
    if (this.updateTimer <= maxTime && this.updateTimer >= timeOffset) {
      if (!((this.updateTimer - timeOffset) % timeIncrement)) {
        enemyHandler.addPattern(this, constructorFunc, behaviorFunc);
      }
    }
  }

  createProjectile(timeOffset, timeIncrement, numIncrements, numProjectiles, constructorFunc, behaviorFunc, thisFunc) {
    const maxTime = timeOffset + timeIncrement * (numIncrements - 1);
    if (this.updateTimer <= maxTime && this.updateTimer >= timeOffset) {
      if (!((this.updateTimer - timeOffset) % timeIncrement)) {
        for (let index = 0; index < numProjectiles; index++) {
          enemyHandler.addProjectile(this, index, constructorFunc, behaviorFunc)
        }
        if (thisFunc) thisFunc.call(this);
      }
    }
  }

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

  update() {
    this.behaviorFunc(this.enemy);
    this.updateTimer++;
  }

  timeDelete(time) {
    if (this.updateTimer != time) return;
    this.toDelete = true;
  }

  delete(time) { this.toDelete = true; }
}