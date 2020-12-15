//init framerate, time, frame
const framerate = 60;
let time = 0;
let frame = 0;

//rAF; with fps cap
requestAnimationFrame(loop);
function loop(step) {
  requestAnimationFrame(loop);

  if (step >= time) {
    update();
    time += 1000 / framerate;
  }
}

//update game stuff
function update() {
  //clear screen
  c.clearRect(0, 0, canvasWidth, canvasHeight);

  //update
  // player.update();
  // stage.update();
  // camera.update();

  //render
  // player.render();
  // stage.render();
  grid = new Grid(resolution);

  grid.render();

  if (!(frame % 5)) resolution++;

  frame++;
}

//resets time variable to current time
function resetTimer() {
  time = performance.now();
}

//event that calls the time reset function
addEventListener('focus', resetTimer)