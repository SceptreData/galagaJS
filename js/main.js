import { Draw, clearCanvas, buildStars, updateStarField } from './draw.js';
import { Entity } from './entity';

const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

const FPS = 1000 / 60;

let lastTime = new Date().getTime(),
  curTime = 0,
  delta = 0;

let entities = [];
const starField = buildStars(canvas.width, canvas.height);

const hero = new Entity(canvas, ctx, {
  position: [canvas.width / 2, canvas.height / 2 + 150],
  velocity: [0, 0],
  screenLocked: true,
  type: 'hero'
});
entities.push(hero);

registerInputEvents();

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
  // hero.update();
  entities.forEach(e => e.update());

  // Clear the bodies
  entities = entities.filter(e => !e.isDead);
}

function render() {
  // hero.render(false);
  entities.forEach(e => e.render(false));
}

function registerInputEvents() {
  document.addEventListener('keydown', e => {
    if (e.key == 'w' || e.key == 'ArrowUp') {
      hero.setVerticalSpeed(-5);
    } else if (e.key == 's' || e.key == 'ArrowDown') {
      hero.setVerticalSpeed(5);
    } else if (e.key == 'd' || e.key == 'ArrowRight') {
      hero.setHorizontalSpeed(5);
    } else if (e.key == 'a' || e.key == 'ArrowLeft') {
      hero.setHorizontalSpeed(-5);
    } else if (e.key == ' ') {
      fireProjectile(hero, [0, -5]);
    }
  });

  document.addEventListener('keyup', e => {
    const k = e.key;
    if (k == 'w' || k == 'ArrowUp' || k == 's' || k == 'ArrowDown') {
      hero.setVerticalSpeed(0);
    } else if (
      k == 'd' ||
      e.key == 'ArrowRight' ||
      k == 'a' ||
      k == 'ArrowLeft'
    ) {
      hero.setHorizontalSpeed(0);
    }
  });
}

function fireProjectile(ent, vel) {
  let [x0, y0] = ent.position;
  let originX = x0 + ent.width / 2;
  let originY = y0 + ent.height / 2;

  let p = new Entity(canvas, ctx, {
    position: [originX, originY],
    width: 3,
    height: 3,
    velocity: vel,
    type: 'projectile'
  });

  entities.push(p);
}
