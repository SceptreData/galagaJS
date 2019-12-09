
const bgColor = "#333333";
function clearCanvas(canvas, ctx){
    const {width, height} = canvas;
    ctx.clearRect(0, 0, width, height );

    setStroke(ctx, "#111111", 0);
    setFill(ctx, bgColor);
    rect(ctx, 0, 0, width, height);
}

function setStroke(ctx, color, width = 1){
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
}

function setFill(ctx, color){
    ctx.fillStyle = color;
}

function rect(ctx, x, y, width, height, fill = true){
    ctx.beginPath();
    ctx.rect(x, y, width, height);

    if (fill){
        ctx.fill();
    }
    ctx.stroke();
}


function circle(ctx, x, y, radius, fill = true){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (fill){
        ctx.fill();
    }
    ctx.stroke();
    ctx.closePath
}

function image(ctx, src, x, y, w, h){
    ctx.drawImage(src, x, y, w, h);
}

const Draw = {setStroke, setFill, rect, circle, clearCanvas, image}

export {Draw, clearCanvas}