/*
 * First script to draw some figures on the Canvas
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
 *
 * Gilberto Echeverria
 * 2025-02-18
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;
const boxSize = 200;

// Context of the Canvas
let ctx;

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    draw();
}

function draw() {
    // Draw a square
    ctx.fillStyle = "red";
    ctx.fillRect(canvasWidth / 2, canvasHeight / 2, boxSize, boxSize);

    // Draw an ellipse
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "green";
    ctx.ellipse(400, 300, 60, 30, Math.PI/4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    house();
    happyFace();

    // TODO: Make different shapes using the canvas 2d functions

    requestAnimationFrame(draw);
}

function house() {
    // Set line width
    ctx.lineWidth = 10;

    ctx.fillStyle = "black";

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
}

function happyFace(){
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.ellipse(200, 400, 100, 100, 0, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.ellipse(170, 370, 10, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(230, 370, 10, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.ellipse(200, 400, 20, 10, 0, 0, Math.PI);
    ctx.fill();
    ctx.stroke();

}