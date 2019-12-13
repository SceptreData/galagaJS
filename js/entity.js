import { Draw } from './draw.js';

function Entity(canvas, ctx, attrs) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.type = '';
  this.timeCreated = Date.now();
  this.width = 50;
  this.height = 50;
  this.position = [canvas.width / 2, canvas.height / 2];

  if (attrs) {
    Object.assign(this, attrs);
  }
}

Entity.prototype.render = function(boundRect = true) {
  let [x, y] = this.position;
  if (boundRect || this.type === 'projectile') {
    Draw.setStroke(this.ctx, '#eee');
    Draw.rect(this.ctx, x, y, this.width, this.height, false);
  }

  if (this.image) {
    Draw.image(this.image, x, y, this.width, this.height);
  }

  if (this.type === 'hero') {
    Draw.setStroke(this.ctx, '#eee');
    Draw.triangle(this.ctx, x, y, this.width, this.height);
  } else if (this.type === 'enemy') {
    // drawEnemyImage
  } else if (this.type === 'projectile') {
    Draw.setStroke(this.ctx, 'tomato');
    Draw.setFill(this.ctx, 'tomato');
    Draw.circle(this.ctx, this.x, this.y, 10);
    Draw.rect(this.ctx, x, y, this.width, this.height, true);
  }
};

Entity.prototype.update = function() {
  if (this.velocity) {
    let [x, y] = this.position;
    let [vx, vy] = this.velocity;

    if (this.type === 'projectile') {
    }

    // Clamp speeds here.
    x += vx;
    y += vy;

    // Make sure our ship cant go out of bounds
    if (this.screenLocked) {
      if (x + this.width >= this.canvas.width) {
        x = this.canvas.width - this.width - 1;
      }

      if (x <= 0) x = 1;

      if (y + this.height >= this.canvas.height) {
        y = this.canvas.height - this.height;
      }

      if (y <= 0) y = 1;
    }

    this.position = [x, y];
    this.velocity = [vx, vy];
  }
};

Entity.prototype.setVerticalSpeed = function(v) {
  this.velocity[1] = v;
};

Entity.prototype.setHorizontalSpeed = function(v) {
  this.velocity[0] = v;
};

Entity.prototype.takeDamage = function(dmg) {
  if (this.hp) {
    this.hp = this.hp - dmg;
  }
  if (this.hp <= 0) {
    this.isDead = true;
  }
};

Entity.prototype.collidesWith = function(other) {
  let [x, y] = this.position;
  let [otherX, otherY] = other.position;

  return (
    x < oxerX + other.width &&
    x + this.width > otherX &&
    y < otherY + other.height &&
    y + this.height > otherY
  );
};

export { Entity };
