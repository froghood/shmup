addEventListener('keydown', (event) => input.keyPressed(event.key));
addEventListener('keyup', (event) => input.keyReleased(event.key));

//addEventListener('gamepadconnected', () => console.log('controller connected'))

class Input {
  keyPressed(key) {
    if (!this[key]) this[key] = true; else return;
    player.keyPressed(key);
  }

  keyReleased(key) {
    if (this[key]) this[key] = false; else return;
    player.keyReleased(key);
  }
}

const input = new Input();