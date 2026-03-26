/*
 * Diseño del Videojuego Breakout con un extra
 *
 * Guillermo Gonzalez
 * 2026-03-25
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

//Variable to control the speed of both the ball and the paddle
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
        /*Everytime the ball is updated the velocity is updated by creating a new vector
        that overrides the previous one based on the current direction of the ball in both axis*/
        this.velocity = new Vector(this.directionX,this.directionY).normalize().times(ballSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));

    }
    reset(){
        //Everytime the ball goes under the paddle this method resets it to its original position and freezes it momentarily
        this.position=new Vector(canvasWidth/2, canvasHeight - 50);
        this.directionX = 0;
        this.directionY = 0;
    }
    serve(){
        //Generate a random angle upwards from the paddle and give the ball that direction
        let angle=-Math.PI / 4 - (Math.random() * Math.PI / 2);
        this.directionX=Math.cos(angle);
        this.directionY=Math.sin(angle);
        //reset ball speed after progresive increase
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
        //Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(paddleSpeed);
        //update the position of the paddle
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
        //Select an audio to play after hitting a brick or the paddle
        this.ping = document.createElement("audio");
        this.ping.src = "./assets/audio/4387__noisecollector__pongblipe4.wav";
        //Variables for the number of points and flags to check whether its game over or if you won
        this.points = 0;
        this.zero_lives = false;
        this.winner = false;
    }

    initObjects() {
        // Add another object to draw a background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("./assets/sprites/back.png");

        this.paddle = new Paddle(new Vector(canvasWidth/2,canvasHeight-30), 150, 20, "red");
        this.paddle.setSprite("./assets/sprites/paddle.png")
        //Create the paddle in the bottom of the screen with a length of 150 pixels and 20 width

        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight - 40),20,20,"white");
        this.ball.setSprite("./assets/sprites/breakout_spritesheet.png",new Rect(64,0,32,32))
        //Create the ball on top of the paddle
        
        this.left_wall = new GameObject(new Vector(1, canvasHeight/2), 10, canvasHeight, "gray");
        this.right_wall = new GameObject(new Vector(canvasWidth - 1, canvasHeight/2), 10, canvasHeight, "gray");
        this.top_wall = new GameObject(new Vector(canvasWidth / 2, 1), canvasWidth, 10, "gray");
        this.bottom_wall = new GameObject(new Vector(canvasWidth / 2, canvasHeight - 1), canvasWidth, 10, "gray");
        //Create tha walls that limit the screen

        this.pointsText = new TextLabel(canvasWidth/2,30, "20px Ubuntu Mono", "white");
        this.ending_text = new TextLabel(canvasWidth/3,canvasHeight/2, "60px Ubuntu Mono", "red");
        this.winning_text = new TextLabel(canvasWidth/3,canvasHeight/2, "60px Ubuntu Mono", "gold");
        this.inversion_text = new TextLabel(canvasWidth/3,(canvasHeight/4) * 3, "30px Ubuntu Mono", "gold");
        //Create all the texts that are shown on screen
        
        this.lives = [];
        for (let i=30; i<=50; i += 10){
            this.addLife(i,20);
        }
        //Create the lives on top of the screen

        this.actors = [];
        for (let i=75; i<=285; i += 30) {
            for(let j=75; j<=725; j += 80){
                this.addBox(j,i);
            }
        }
        //Create all the boxes on screen
    }

    draw(ctx) {
        // Draw the background first, so everything else is drawn on top
        this.background.draw(ctx);
        /*Draw literally everything else that is shown on screen.
        Check whether or not there are lives or boxes remaining in order
        to draw the game over or the winning screen*/
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
        if(this.winner){
            this.win_screen = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight, "black");
            this.win_screen.draw(ctx);
            this.winning_text.draw(ctx, "You Win!");
        }
        if(this.points == 16 || this.points == 46){
            //Notify the user the controls are being invertes
            this.inversion_text.draw(ctx, "Controls Inverted");
        }
        if(this.points == 31 || this.points == 61){
            //Notify the user the controls are back to normal
            this.inversion_text.draw(ctx, "Back to Normal");
        }
    }

    update(deltaTime) {
        // if there are zero lives stop updating the game
        if(this.zero_lives){
            return;
        }
        //if there are zero boxes remaining stop updating the game
        if(this.winner){
            return;
        }
        this.paddle.update(deltaTime);

        this.ball.update(deltaTime);
        /*Review every possible case scenario in which the ball 
        bounces with another object in order to change its directio*/
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
                /*If the ball bounces with the paddle increase 
                the speed of the ball and play the sound*/
                this.ball.directionY = -1;
                this.ping.play();
                ballSpeed += 0.002 ;
        }
         if (boxOverlap(this.ball, this.bottom_wall)) {
            //reset the position of the ball and remove a life
                this.ball.reset();
                this.lives.pop();
                if(this.lives.length == 0){
                    //activate the game over flag
                    this.zero_lives = true;
                }
        }
        for (let i = 0; i < this.actors.length; i++){
            if (boxOverlap(this.ball, this.actors[i])) {
                /*colitionType is a function declared in the game_functions
                js in the libs folder. It basically gets the distance between
                both the objects used as parameters in both the X and Y axis.
                It then adds up both the half sizes of the objects to check what would
                be the closest they can get before colission. It then subtracts
                the distance in X to the sum of half sizes in X and does the same
                for the Y axis. After that it compares them and determines whether 
                the colission happens on the side (The substraction between
                the halfsizes in X is smaller than the one on Y), on top or bottom
                (the exact opposite) or on the exact corner. With this knowledge it inverts
                the direction in X, Y or in both in case of a corner bounce.*/
                const colition = colitionType(this.ball,this.actors[i]);
                if(colition == 'side'){
                    this.ball.directionX *= -1;
                }
                else if(colition == 'top'){
                    this.ball.directionY *= -1;
                }
                else{
                    this.ball.directionY *= -1;
                    this.ball.directionX *= -1;
                }
                //Remove the box from the actors array, therefore erasing it
                this.actors.splice(i,1);
                if(this.actors.length == 0){
                    //check whether or not there are boxes left to trigger the winning flag
                    this.winner = true;
                }
                //Increase the number of points and play the ping sound
                this.points += 1;
                this.ping.play();
                //Increase ball speed very slightly
                ballSpeed += 0.003;
                if(this.points == 16 || this.points == 46){
                    /*Between the points 16 and 30, as well as 46 and 60 the padel changes
                    indicating the controls have been reversed*/
                    this.paddle.setSprite("./assets/sprites/glasspaddle2.png")
                }
                if(this.points == 31 || this.points == 61){
                    //returns the paddle to its original sprite indicating the controls are back to normal
                    this.paddle.setSprite("./assets/sprites/paddle.png")
                }
                break;
            }
    }
        // Check collision against other objects
    }

    addBox(posX,posY) {
        //create boxes and add them to the actors array
    const box = new GameObject(new Vector(posX, posY), 70, 30, "grey");
    box.setSprite("./assets/sprites/breakout_spritesheet.png",new Rect(0,256,128,32))
    // Set a property to indicate if the box should be destroyed or not
    box.destroy = false;
    this.actors.push(box);
    }

    addLife(posX,posY) {
        //create the lives and add them to the lives array
    const life = new GameObject(new Vector(posX, posY), 20, 20, "red");
    life.setSprite("./assets/sprites/breakout_spritesheet.png",new Rect(32,0,32,32))
    // Set a property to indicate if the box should be destroyed or not
    life.destroy = false;
    this.lives.push(life);
    }

    createEventListeners() {
        //Determine what movement each key involves
        window.addEventListener('keydown', (event) => {
            if (event.key == 'a' || event.key == 'ArrowLeft') {
                /*The controls invert every 16th point, so these ifs are checking how many point
                the player currently has in order to invert them at the correct time*/
                if(this.points <=15 || (this.points>30 && this.points <= 45) || this.points > 60){
                this.addKey('left');
                }
                else if(this.points > 15 || (this.points > 45 && this.points<=60)){
                this.addKey('right');
                }
            } else if (event.key == 'd' || event.key == 'ArrowRight') {
                if(this.points <=15 || (this.points>30 && this.points <= 45) || this.points > 60){
                this.addKey('right');
                }
                else if(this.points > 15 || (this.points > 45 && this.points<=60)){
                this.addKey('left');
                }
            }
            if(event.code=='Space'){
                if(this.ball.directionX == 0 && this.ball.directionY == 0){
                this.ball.serve();
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'a' || event.key == 'ArrowLeft') {
                if(this.points <=15 || (this.points>30 && this.points <= 45) || this.points > 60){
                this.delKey('left');
                }
                else if(this.points > 15 || (this.points > 45 && this.points<=60)){
                this.delKey('right');
                }
            } 
            else if (event.key == 'd' || event.key == 'ArrowRight') {
                if(this.points <=15 || (this.points>30 && this.points <= 45) || this.points > 60){
                this.delKey('right');
                }
                else if(this.points > 15 || (this.points > 45 && this.points<=60)){
                this.delKey('left');
                }
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
