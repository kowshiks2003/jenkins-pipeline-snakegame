const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = 'right';
let food = { x: gridSize * 10, y: gridSize * 10 };
let score = 0;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (isGameOver()) {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
        return;
    }

    setTimeout(function () {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let part of snake) {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    }
}

function moveSnake() {
    let head = { ...snake[0] };

    switch (direction) {
        case 'up':
            head.y -= gridSize;
            break;
        case 'down':
            head.y += gridSize;
            break;
        case 'left':
            head.x -= gridSize;
            break;
        case 'right':
            head.x += gridSize;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;

    switch (keyPressed) {
        case 37:
            if (direction !== 'right') direction = 'left';
            break;
        case 38:
            if (direction !== 'down') direction = 'up';
            break;
        case 39:
            if (direction !== 'left') direction = 'right';
            break;
        case 40:
            if (direction !== 'up') direction = 'down';
            break;
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
    };

    for (let part of snake) {
        if (part.x === food.x && part.y === food.y) {
            placeFood();
        }
    }
}

function isGameOver() {
    let head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = 'right';
    score = 0;
    placeFood();
    gameLoop();
}

resetGame();

