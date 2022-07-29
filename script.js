let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio("./img/foodEat.wav");
const gameOverSound = new Audio("./img/bumpSound.wav");
const musicSound = new Audio("./img/bgMusic.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 12, y: 13 }];
let food = { x: 6, y: 5 };

// Game functions

function main(currentTime) {
    window.requestAnimationFrame(main);
    // console.log(currentTime);
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function isCollide(snake) {
    //if snake bump itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            // if (snakeArr[i] === snakeArr[0]) {
            return true;
        }
    }
    // if snake bump in boundary
    if (
        snake[0].x >= 20 ||
        snake[0].x <= 0 ||
        snake[0].y >= 20 ||
        snake[0].y <= 0
    ) {
        return true;
    }
}

function gameEngine() {
    // Part 1
    if (isCollide(snakeArr)) {
        musicSound.pause();
        gameOverSound.play();
        inputDirection = { x: 0, y: 0 };
        score = 0;
        alert("Game over! Press ok to play again");
        snakeArr = [{ x: 12, y: 13 }];
        musicSound.play();
    }

    // If snake have eaten food. Increment score and regenerate the food

    scoreBox.innerHTML = "Score: " + score;

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score++;
        snakeArr.push({
            x: snakeArr[0].x + inputDirection.x,
            y: snakeArr[0].y + inputDirection.y,
        });
        let a = 1;
        let b = 18;
        food = {
            x: Math.round(a + b * Math.random()),
            y: Math.round(a + b * Math.random()),
        };
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // Part 2
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((element, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.id = "snakeHead";
        } else {
            snakeElement.id = "snake";
        }
        board.appendChild(snakeElement);
    });

    //Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.id = "food";
    board.appendChild(foodElement);
}

// Game logics
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDirection = { x: 0, y: 1 }; // game started
    musicSound.play();
    switch (e.key) {
        case "ArrowDown":
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowUp":
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowRight":
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        case "ArrowLeft":
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }
});