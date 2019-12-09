const BG_COLOR = '#333333';
const NUM_STARS = 20;

function clearCanvas(canvas, ctx) {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  setStroke(ctx, '#111111', 0);
  setFill(ctx, BG_COLOR);
  rect(ctx, 0, 0, width, height);
}

function buildStars(width, height) {
  const starField = [];
  for (let i = 0; i < NUM_STARS; i++) {
    let star = {
      x: Math.floor(Math.random() * (width - 1)),
      y: Math.floor(Math.random() * (height - 1)),
      vy: Math.ceil(Math.random() * 5)
    };
    starField.push(star);
  }
  return starField;
}

function updateStarField(canvas, stars) {
  let ctx = canvas.getContext('2d');
  stars.forEach(star => {
    star.y = (star.y + star.vy + canvas.height) % canvas.height;
    setFill(ctx, '#eee');
    circle(ctx, star.x, star.y, 3);
  });
}

function setStroke(ctx, color, width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
}

function setFill(ctx, color) {
  ctx.fillStyle = color;
}

function rect(ctx, x, y, width, height, fill = true) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);

  if (fill) {
    ctx.fill();
  }
  ctx.stroke();
}

function circle(ctx, x, y, radius, fill = true) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  if (fill) {
    ctx.fill();
  }
  ctx.stroke();
  ctx.closePath;
}

function image(ctx, src, x, y, w, h) {
  ctx.drawImage(src, x, y, w, h);
}

const Draw = { setStroke, setFill, rect, circle, clearCanvas, image };

export { Draw, clearCanvas, buildStars, updateStarField };
