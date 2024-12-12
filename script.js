const gameBoard = document.querySelector("#gameBoard");
const  ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "green";
const snakeBorder = "black"
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randomnumber = Math.round((Math.random() *(max - min) + min) / unitSize) * unitSize; //random number will now be divisible by 25
        return randomnumber;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
    console.log(foodX, foodY);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = { x: snake[0].x + xVelocity,
                   y: snake[0].y + yVelocity};

    snake.unshift(head);
    //if food is eaten (head collides with food)
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const A = 65;
    const W = 87;
    const D = 68;
    const S = 83;
    const SPACEBAR = 32;
    console.log(keyPressed);
    
    const goingUP = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case ((keyPressed == LEFT || keyPressed == A) && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case ((keyPressed == UP || keyPressed == W) && !goingDown):
                xVelocity = 0;
                yVelocity = -unitSize;
                break;
        case ((keyPressed == RIGHT || keyPressed == D) && !goingLeft):
                    xVelocity = unitSize;
                    yVelocity = 0;
                    break;
        case ((keyPressed == DOWN || keyPressed == S) && !goingUP):
                    xVelocity = 0;
                    yVelocity = unitSize;
                    break;
        case (keyPressed == SPACEBAR &&  !running):
            resetGame(); 
            break;
        }           
       
};
function checkGameOver(event){
    switch(true){
        case (snake[0].x < 0): //Left border
            running = false;
            break;
        case (snake[0].x >= gameWidth): //Right border
            running = false;
            break;
        case (snake[0].y < 0): //Top border
            running = false;
            break;
        case (snake[0].y >= gameHeight): //Bottom border
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){ //i = 1 because snake[0] is the head
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ // if head collides with body
            running = false;
        }
    }
    //displayGameOver();
};
function displayGameOver(event){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};