const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");
const startButton = document.getElementById("start");

const tile = 20;
const size = canvas.width / tile;

let snake = [];
let direction = { x: 1, y: 0 };
let newDirection = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let timer = null;

function start() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  newDirection = { x: 1, y: 0 };
  score = 0;
  scoreText.textContent = score;
  placeFood();
  clearInterval(timer);
  timer = setInterval(update, 120);
  startButton.textContent = "OD NOWA";
  draw();
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size)
  };

  if (hitsSnake(food)) {
    placeFood();
  }
}

function hitsSnake(point) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === point.x && snake[i].y === point.y) {
      return true;
    }
  }
  return false;
}

function update() {
  direction = newDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  const hitsWall = head.x < 0 || head.y < 0 || head.x >= size || head.y >= size;

  if (hitsWall || hitsSnake(head)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score = score + 10;
    scoreText.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "#05051a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff8fd0";
  ctx.beginPath();
  ctx.arc(food.x * tile + tile / 2, food.y * tile + tile / 2, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffe600";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * tile + 1, snake[i].y * tile + 1, tile - 2, tile - 2);
  }
}

function gameOver() {
  clearInterval(timer);
  ctx.fillStyle = "rgba(5, 5, 26, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ff3b3b";
  ctx.font = "24px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
}

function setDirection(name) {
  if (name === "up" && direction.y !== 1) newDirection = { x: 0, y: -1 };
  if (name === "down" && direction.y !== -1) newDirection = { x: 0, y: 1 };
  if (name === "left" && direction.x !== 1) newDirection = { x: -1, y: 0 };
  if (name === "right" && direction.x !== -1) newDirection = { x: 1, y: 0 };
}

document.addEventListener("keydown", function (event) {
  const keys = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right"
  };

  if (keys[event.key]) {
    event.preventDefault();
    setDirection(keys[event.key]);
  }
});

const padButtons = document.querySelectorAll(".pad button");
padButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setDirection(button.dataset.dir);
  });
});

startButton.addEventListener("click", start);

draw();