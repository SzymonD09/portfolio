const holes = document.querySelectorAll(".hole");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const message = document.getElementById("message");
const startButton = document.getElementById("start");

let score = 0;
let timeLeft = 30;
let playing = false;
let currentHole = null;
let ghostTimer = null;
let clockTimer = null;

function start() {
  score = 0;
  timeLeft = 30;
  playing = true;
  scoreText.textContent = score;
  timeText.textContent = timeLeft;
  message.textContent = "";
  startButton.textContent = "OD NOWA";

  clearInterval(ghostTimer);
  clearInterval(clockTimer);
  ghostTimer = setInterval(showGhost, 700);
  clockTimer = setInterval(tick, 1000);
}

function hideGhost() {
  if (currentHole !== null) {
    currentHole.textContent = "";
    currentHole = null;
  }
}

function showGhost() {
  hideGhost();
  const number = Math.floor(Math.random() * holes.length);
  currentHole = holes[number];
  currentHole.textContent = "👻";
}

function tick() {
  timeLeft = timeLeft - 1;
  timeText.textContent = timeLeft;

  if (timeLeft === 0) {
    playing = false;
    clearInterval(ghostTimer);
    clearInterval(clockTimer);
    hideGhost();
    message.textContent = "Koniec! Wynik: " + score;
  }
}

holes.forEach(function (hole) {
  hole.addEventListener("click", function () {
    if (playing && hole === currentHole) {
      score = score + 10;
      scoreText.textContent = score;
      hideGhost();
    }
  });
});

startButton.addEventListener("click", start);