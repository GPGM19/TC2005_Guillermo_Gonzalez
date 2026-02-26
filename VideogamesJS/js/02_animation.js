/*
 * Simple animation on the HTML canvas
 *
 * Gilberto Echeverria
 * 2025-02-19
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// An object to represent the box to be displayed
const ball = {
    color: "blue",
    size: 100,
    x: 400,
    y: canvasHeight / 2,
    directionx: 1,
    directiony: 1,
    speed: 2.0,
}

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    drawScene();
}

function drawScene() {
    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw a square
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.ellipse(ball.x, ball.y, ball.size, ball.size, 0, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    // Update the properties of the object
    ball.x += ball.speed * ball.directionx;
    ball.y += ball.speed/4 * ball.directiony;

    if(ball.x + ball.size >= canvasWidth || ball.x - ball.size <= 0){
        ball.directionx *= -1;
    }

    if(ball.y + ball.size >= canvasHeight || ball.y - ball.size <= 0){
        ball.directiony *= -1;
    }

    // TODO: Make the box move in X and Y axis
    // TODO: Make the box bounce off the walls

    requestAnimationFrame(drawScene);
}
