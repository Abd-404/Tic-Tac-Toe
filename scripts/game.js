function resetGameStatus() {
  isGameOver = false;
  activePlayer = 0;
  currentRound = 1;
  gameOverElement.firstElementChild.innerHTML =
    'You won! <span id="winner-name">PLAYER NAME</span>';
  gameOverElement.style.display = "none";
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItem = gameFieldElements[gameBoardIndex];
      gameBoardItem.textContent = " ";
      gameBoardItem.addEventListener("click", select);
      gameBoardItem.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === " " || players[1].name === " ") {
    alert("Please set player names");
    return;
  }

  resetGameStatus();

  activePlayerName.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}

function select(event) {
  if (isGameOver) {
    return;
  }

  const selectedField = event.target;

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");
  selectedField.removeEventListener("click", select);

  const selectedColumn = +selectedField.dataset.col - 1;
  const selectedRow = +selectedField.dataset.row - 1;

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }
  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    //checking for row winners
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
    //checking for column winners
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  //diagnoal: top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  //diagnoal: bottom left to top right
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  isGameOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    document.getElementById("winner-name").textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }

  gameAreaElement.children[1].textContent = "Game Over!";
}
