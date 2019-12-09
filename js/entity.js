import {Draw} from './draw.js'

function Entity(canvas, ctx, attrs){
    this.canvas = canvas;
    this.ctx = ctx;
    this.type = "";
    this.timeCreated = Date.now();
    this.width = 50;
    this.height = 50;
    this.position = [canvas.width /2, canvas.height / 2];

    if (attrs){
        Object.assign(this, attrs)
    }
}

Entity.prototype.render = function(boundRect = true) {
    let [x, y] = this.position;
    if (boundRect){
        Draw.setStroke(this.ctx, "#eee");
        Draw.rect(this.ctx, x, y, this.width, this.height);
    }

    if (this.image){
        Draw.image(this.image, x, y, this.width, this.height);
    }
}

Entity.prototype.update = function() {
   if (this.velocity) {
       const [x, y] = this.position;
       const [vx, vy] = this.velocity;

       // Clamp speeds here.
       x += vx;
       y += vy;

       this.position = [x, y];
   }
}

export {Entity}

