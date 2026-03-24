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

let paddleSpeed = 0.6;
let ballSpeed = 0.3;


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
        this.position=new Vector(canvasWidth/2, canvasHeight - 50);
        this.directionX = 0;
        this.directionY = 0;
    }
    serve(){
        let angle=-Math.PI / 4 - (Math.random() * Math.PI / 2);;
        this.directionX=Math.cos(angle);
        this.directionY=Math.sin(angle);

        ballSpeed = 0.3;
    }
}

// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(1, 1);

        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
            right: {
                axis: "x",
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

        this.points = 0;
        this.zero_lives = false;
    }

    initObjects() {
        // Add another object to draw a background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("../assets/sprites/back.png");

        this.paddle = new Paddle(new Vector(canvasWidth/2,canvasHeight-30), 150, 20, "red");
        //Generar el paddle de 150 pixeles de largo y 50 de ancho en el fondo de la pantalla

        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight - 40),20,20,"white");
        this.ball.setSprite("../assets/sprites/breakout_spritesheet.png",new Rect(64,0,32,32))
        //Generar la pelota en medio del mapa siendo un cuadrado 20x20
        
        this.left_wall = new GameObject(new Vector(1, canvasHeight/2), 10, canvasHeight, "gray");
        this.right_wall = new GameObject(new Vector(canvasWidth - 1, canvasHeight/2), 10, canvasHeight, "gray");
        this.top_wall = new GameObject(new Vector(canvasWidth / 2, 1), canvasWidth, 10, "gray");
        this.bottom_wall = new GameObject(new Vector(canvasWidth / 2, canvasHeight - 1), canvasWidth, 10, "gray");
        
        this.pointsText = new TextLabel(canvasWidth/2,30, "20px Ubuntu Mono", "white");
        this.ending_text = new TextLabel(canvasWidth/3,canvasHeight/2, "60px Ubuntu Mono", "red");
        
        this.lives = [];
        for (let i=30; i<=50; i += 10){
            this.addLife(i,20);
        }
        this.actors = [];
        for (let i=75; i<=285; i += 30) {
            for(let j=75; j<=725; j += 50){
                         this.addBox(j,i);
            }
        }
    }

    draw(ctx) {
        // Draw the background first, so everything else is drawn on top
        this.background.draw(ctx);

        this.paddle.draw(ctx);
        
        this.ball.draw(ctx);
        this.left_wall.draw(ctx);
        this.right_wall.draw(ctx);
        this.top_wall.draw(ctx);
        this.bottom_wall.draw(ctx);

        this.pointsText.draw(ctx,this.points);

        for(let life of this.lives){
            life.draw(ctx);
        }

        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        if(this.zero_lives){
            this.end_screen = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight, "black");
            this.end_screen.draw(ctx);
            this.ending_text.draw(ctx, "Game Over");
        }
    }

    update(deltaTime) {
        // Move the paddle
        if(this.zero_lives){
            return;
        }
        this.paddle.update(deltaTime);

        this.ball.update(deltaTime);
        if (boxOverlap(this.ball, this.top_wall)) {
                this.ball.directionY = 1;
        }
        if (boxOverlap(this.ball, this.left_wall)) {
                this.ball.directionX = 1;
        }
        if (boxOverlap(this.ball, this.right_wall)) {
                this.ball.directionX = -1;
        }
        if (boxOverlap(this.ball, this.paddle)) {
                this.ball.directionY = -1;
                ballSpeed += 0.002 ;
        }
         if (boxOverlap(this.ball, this.bottom_wall)) {
                this.ball.reset();
                this.lives.pop();
                if(this.lives.length == 0){
                    this.zero_lives = true;
                }
        }
        for (let i = 0; i < this.actors.length; i++){
            if (boxOverlap(this.ball, this.actors[i])) {
                this.ball.directionY *= -1;
                this.actors.splice(i,1);
                this.points += 1;
                ballSpeed += 0.002;
                break;
        }
    }
        // Check collision against other objects
    }

    addBox(posX,posY) {
    const box = new GameObject(new Vector(posX, posY), 50, 30, "grey");
    box.setSprite("../assets/sprites/breakout_spritesheet.png",new Rect(0,256,128,32))
    // Set a property to indicate if the box should be destroyed or not
    box.destroy = false;
    this.actors.push(box);
    }

    addLife(posX,posY) {
    const life = new GameObject(new Vector(posX, posY), 20, 20, "red");
    life.setSprite("../assets/sprites/breakout_spritesheet.png",new Rect(32,0,32,32))
    // Set a property to indicate if the box should be destroyed or not
    life.destroy = false;
    this.lives.push(life);
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'a') {
                this.addKey('left');
            } else if (event.key == 'd') {
                this.addKey('right');
            }
            if(event.code=='Space'){
                if(this.ball.directionX == 0 && this.ball.directionY == 0){
                this.ball.serve();
                }
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowLeft') {
                this.addKey('left');
            } else if (event.key == 'ArrowRight') {
                this.addKey('right');
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'a') {
                this.delKey('left');
            } 
            else if (event.key == 'd') {
                this.delKey('right');
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'ArrowLeft') {
                this.delKey('left');
            } 
            else if (event.key == 'ArrowRight') {
                this.delKey('right');
            }
        });
    }

    addKey(direction) {
        if (!this.paddle.keys.includes(direction)) {
            this.paddle.keys.push(direction);
        }
    }

    delKey(direction) {
        if (this.paddle.keys.includes(direction)) {
            this.paddle.keys.splice(this.paddle.keys.indexOf(direction), 1);
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
