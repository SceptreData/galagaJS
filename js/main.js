import {Draw, clearCanvas} from "./draw.js";
import {Entity} from "./entity"

const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d")

const FPS = 60

const entities = [];

const hero = new Entity(canvas, ctx);


function gameLoop(){
    clearCanvas(canvas, ctx);
    // update();
    render();
}
// If our canvas exists, start the game loop @ 60 Frames Per Second
// (This isn't technically the best way to do a game loop but it will serve for now)
if (typeof canvas.getContext !== undefined){
    setInterval(gameLoop, 1000 / FPS);
}

function update(){
    hero.update();
}

function render(){
    hero.render();
}

// setStroke("#333");
// setFill("tomato")
// rect(10, 10, 50, 50, true)

// setStroke("white", width = 0);
// setFill("green");
// circle(200, 200, 100)
