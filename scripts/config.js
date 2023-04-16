function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
  document.getElementById("playername").focus();
  document.getElementById("playername").value = players[editedPlayer - 1].name;
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error-style");
  errorsElement.textContent = " ";
}

function savePlayerName(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("username").trim();
  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error-style");
    errorsElement.textContent = "Please entet a valid name";
    return;
  }
  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;

  players[editedPlayer - 1].name = enteredPlayername;
  closePlayerConfig();
}
