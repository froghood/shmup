class EnemyShotA extends Entity {
  constructor(...args) {
    super(...args);

    this.hitboxes = {
      enemy_shot: Circle({ radius: 2 })
    };

    this.boundingBox = Rect({ width: 10, height: 10 })
  }

  render() {

  }
}