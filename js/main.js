import { Draw, clearCanvas, buildStars, updateStarField } from './draw.js';
import { Entity } from './entity';

const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

const FPS = 1000 / 60;

let lastTime = new Date().getTime(),
  curTime = 0,
  delta = 0;

const entities = [];
const starField = buildStars(canvas.width, canvas.height);
console.log(starField);

const hero = new Entity(canvas, ctx, { velocity: [10, 0] });

function gameLoop() {
  // Fancy browser animation magic
  window.requestAnimationFrame(gameLoop);

  curTime = new Date().getTime();
  delta = curTime - lastTime;

  if (delta > FPS) {
    clearCanvas(canvas, ctx);
    update();
    render();
  }
}
gameLoop();

function update() {
  updateStarField(canvas, starField);
  hero.update();
}

function render() {
  hero.render();
}
