const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let isGameOver = false;

const players = [
  {
    name: " ",
    symbol: "X",
  },
  {
    name: " ",
    symbol: "O",
  },
];

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsElement = document.getElementById("errors");
const gameAreaElement = document.getElementById("active-game");
const activePlayerName = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const cancelConfigElement = document.getElementById("cancel-config");
const startNewGameElement = document.getElementById("startGameBtn");
const gameFieldElements = document.querySelectorAll("#game-board li");

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

cancelConfigElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerName);

startNewGameElement.addEventListener("click", startNewGame);

for (let liElement of gameFieldElements) {
  liElement.addEventListener("click", select);
}
