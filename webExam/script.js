const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => {
  cell.addEventListener("click", cellClicked);
});

function cellClicked() {
  const index = this.getAttribute("data-index");
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  checkWinner();
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "Y" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}
