const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

statusDisplay.innerHTML = currentPlayerTurn();

let box = 3;
let squares = box * 2 + 2;
let hoz = 0;
let ver = 0
let diaLeft = 0;
let diaRight = box - 1;
let winningConditions = [];

for (let i = 0; i < box * 2 + 2; i++) {
  winningConditions.push(new Array);
  if (i < box) {
    for (let j = 0; j < box; j++) {
      winningConditions[i].push(new Array);
      winningConditions[i][j] = hoz;
      hoz++;
    }
  } else if (i >= box && i < box * 2) {
    winningConditions[i].push(new Array);
    if (ver < box) {
      let count = 0
      for (let j = 0; j < box; j++) {
        winningConditions[i][j] = ver + count;
        count += box;
      }
    }
    ver++;
  } else if (i == squares - 2) {
    for (let j = 0; j < box; j++) {
      winningConditions[i][j] = diaLeft;
      diaLeft += box + 1;
    }
  } else if (i == squares - 1) {
    for (let j = 0; j < box; j++) {
      winningConditions[i][j] = diaRight;
      diaRight += box - 1;
    }
  }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}