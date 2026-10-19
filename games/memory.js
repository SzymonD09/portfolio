const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const message = document.getElementById("message");
const startButton = document.getElementById("start");

const symbols = ["👻", "🍒", "🍓", "🍊", "🍎", "🔔", "🔑", "⭐"];

let firstCard = null;
let locked = false;
let moves = 0;
let pairsFound = 0;

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
}

function newGame() {
  board.innerHTML = "";
  message.textContent = "";
  firstCard = null;
  locked = false;
  moves = 0;
  pairsFound = 0;
  movesText.textContent = moves;

  const cards = shuffle(symbols.concat(symbols));

  cards.forEach(function (symbol) {
    const card = document.createElement("button");
    card.classList.add("memory-card");
    card.dataset.symbol = symbol;
    card.textContent = "?";
    card.addEventListener("click", function () {
      flip(card);
    });
    board.appendChild(card);
  });
}

function flip(card) {
  if (locked || card.classList.contains("open")) {
    return;
  }

  card.classList.add("open");
  card.textContent = card.dataset.symbol;

  if (firstCard === null) {
    firstCard = card;
    return;
  }

  moves = moves + 1;
  movesText.textContent = moves;

  if (firstCard.dataset.symbol === card.dataset.symbol) {
    firstCard.classList.add("done");
    card.classList.add("done");
    firstCard = null;
    pairsFound = pairsFound + 1;

    if (pairsFound === symbols.length) {
      message.textContent = "Wygrana w " + moves + " ruchach!";
    }
  } else {
    locked = true;
    const secondCard = card;

    setTimeout(function () {
      firstCard.classList.remove("open");
      firstCard.textContent = "?";
      secondCard.classList.remove("open");
      secondCard.textContent = "?";
      firstCard = null;
      locked = false;
    }, 800);
  }
}

startButton.addEventListener("click", newGame);

newGame();