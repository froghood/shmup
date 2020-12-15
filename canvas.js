//reference body and config it's styles
const body = document.body;
body.style.margin = 0;
body.style.backgroundColor = `rgb(${20}, ${20}, ${30})`;

//create canvas then append it
const canvas = document.createElement('canvas');
body.appendChild(canvas);

//config canvas properties and styles
const [canvasWidth, canvasHeight] = [480, 640];
canvas.width = `${canvasWidth}`;
canvas.height = `${canvasHeight}`;
canvas.style.position = "absolute";
canvas.style.backgroundColor = `rgb(${0}, ${0}, ${0})`;
canvas.style.border = `${1}px solid rgb(${255}, ${255}, ${255})`;

//get canvas context
const c = canvas.getContext('2d');

//init center function and call it
canvas.center = function () {   //recenters canvas
  this.style.left = `${(innerWidth - this.width) / 2 - 1}px`;
  this.style.top = `${(innerHeight - this.height) / 2 - 1}px`;
}
canvas.center();

//event to call center canvas function
addEventListener('resize', _ => canvas.center());



Number.prototype.includes = function (n) {
  return this == n;
}