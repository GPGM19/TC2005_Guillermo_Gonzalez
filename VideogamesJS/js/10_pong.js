/*
 * Using sprites to draw more interesting objects
 *
 * Gilberto Echeverria
 * 2025-03-13
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;

let paddleSpeed = 0.5;
let ballSpeed = 0.5;


//Class for the ball
class Ball extends GameObject{
    constructor(position,width,height,color,sheetCols){
        super(position,width,height,color,"ball",sheetCols);
        this.directionX = 1;
        this.directionY = 1;
        this.velocity = new Vector(this.directionX,this.directionY);
    }

    update(deltaTime) {
        this.velocity = new Vector(this.directionX,this.directionY).normalize().times(ballSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));

    }
    reset(){
        this.position=new Vector(canvasWidth/2, canvasHeight/2);
        this.directionX = 0;
        this.directionY = 0;
    }
    serve(){
        let angle=Math.random() * (Math.PI/2) - (Math.PI/4);
        this.directionX=Math.cos(angle);
        this.directionY=Math.sin(angle);

        if(Math.random()>0.5){
            this.directionX *=-1;
        }

        ballSpeed = 0.3;
    }
}

// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(1, 1);

        this.motion = {
            up: {
                axis: "y",
                sign: -1,
            },
            down: {
                axis: "y",
                sign: 1,
            },
        }

        // Keys pressed to move the paddle
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // TODO: Normalize the velocity to avoid greater speed on diagonals

        this.velocity = this.velocity.normalize().times(paddleSpeed);

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();
    }

    clampWithinCanvas() {
        // Top border
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = this.halfSize.y;
        // Left border
        }
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        // Bottom border
        }
        if (this.position.y + this.halfSize.y > canvasHeight) {
            this.position.y = canvasHeight - this.halfSize.y;
        // Right border
        }
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        this.pointsLeft = 0;
        this.pointsRight = 0;
    }

    initObjects() {
        // Add another object to draw a background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("../assets/sprites/trak2_plate2b.png");

        this.paddleLeft = new Paddle(new Vector(50,canvasHeight/2), 20, 200, "red");
        this.paddleRight = new Paddle(new Vector(canvasWidth - 50,canvasHeight/2), 20, 200, "blue");
        //Generar los dos paddles de tamaño 50 pixeles ancho y 200 alto en puestos opuestos

        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight / 2),20,20,"white");
        //Generar la pelota en medio del mapa siendo un cuadrado 20x20
        
        this.left_wall = new GameObject(new Vector(1, canvasHeight/2), 10, canvasHeight, "green");
        this.right_wall = new GameObject(new Vector(canvasWidth - 1, canvasHeight/2), 10, canvasHeight, "green");
        this.top_wall = new GameObject(new Vector(canvasWidth / 2, 1), canvasWidth, 10, "gray");
        this.bottom_wall = new GameObject(new Vector(canvasWidth / 2, canvasHeight - 1), canvasWidth, 10, "gray");
        
        this.pointsTextLeft = new TextLabel(canvasWidth/4,80, "40px Ubuntu Mono", "white");
        this.pointsTextRight = new TextLabel(canvasWidth/4 * 3,80, "40px Ubuntu Mono", "white");
    }

    draw(ctx) {
        // Draw the background first, so everything else is drawn on top
        this.background.draw(ctx);

        this.paddleLeft.draw(ctx);
        this.paddleRight.draw(ctx);
        
        this.ball.draw(ctx);
        this.left_wall.draw(ctx);
        this.right_wall.draw(ctx);
        this.top_wall.draw(ctx);
        this.bottom_wall.draw(ctx);

        this.pointsTextLeft.draw(ctx,this.pointsLeft);
        this.pointsTextRight.draw(ctx,this.pointsRight);
    }

    update(deltaTime) {
        // Move the paddle
        this.paddleLeft.update(deltaTime);
        this.paddleRight.update(deltaTime);

        this.ball.update(deltaTime);
        if (boxOverlap(this.ball, this.top_wall)) {
                this.ball.directionY = 1;
        }
        if (boxOverlap(this.ball, this.bottom_wall)) {
                this.ball.directionY = -1;
        }
        if (boxOverlap(this.ball, this.paddleLeft)) {
                this.ball.directionX = 1;
                ballSpeed *= 1.05;
        }
        if (boxOverlap(this.ball, this.paddleRight)) {
                this.ball.directionX = -1;
                ballSpeed *= 1.05;
        }
        if (boxOverlap(this.ball, this.left_wall)) {
                this.ball.reset();
                this.pointsRight += 1;
        }
        if (boxOverlap(this.ball, this.right_wall)) {
                this.ball.reset();
                this.pointsLeft += 1
        }
        // Check collision against other objects
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'w') {
                this.addKey_Left('up');
            } else if (event.key == 's') {
                this.addKey_Left('down');
            }
            if(event.code=='Space'){
                this.ball.serve();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowUp') {
                this.addKey_Right('up');
            } else if (event.key == 'ArrowDown') {
                this.addKey_Right('down');
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'w') {
                this.delKey_Left('up');
            } 
            else if (event.key == 's') {
                this.delKey_Left('down');
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'ArrowUp') {
                this.delKey_Right('up');
            } 
            else if (event.key == 'ArrowDown') {
                this.delKey_Right('down');
            }
        });
    }

    addKey_Left(direction) {
        if (!this.paddleLeft.keys.includes(direction)) {
            this.paddleLeft.keys.push(direction);
        }
    }

    addKey_Right(direction) {
        if (!this.paddleRight.keys.includes(direction)) {
            this.paddleRight.keys.push(direction);
        }
    }

    delKey_Left(direction) {
        if (this.paddleLeft.keys.includes(direction)) {
            this.paddleLeft.keys.splice(this.paddleLeft.keys.indexOf(direction), 1);
        }
    }

    delKey_Right(direction) {
        if (this.paddleRight.keys.includes(direction)) {
            this.paddleRight.keys.splice(this.paddleRight.keys.indexOf(direction), 1);
        }
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
