class EnemyA extends Entity {
  constructor(...args) {
    super(...args);

    this.hitboxes = {
      enemy_body: Circle({ r: 16 })
    };

  }

  behavior() {

  }
}