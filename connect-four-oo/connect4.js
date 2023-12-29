const boardElement = document.getElementById('board');
const info = document.getElementById('info');
const player1Form = document.getElementById('player1');
const player2Form = document.getElementById('player2');
const player1Color = document.getElementById('player1Color');
const player2Color = document.getElementById('player2Color');

const player1 = new Player(1);
const player2 = new Player(2);
let game = new Game(boardElement, player1, player2);


info.addEventListener('submit', handleStart);

function handleStart(evt) {
  evt.preventDefault()
  info.style.display = "none";
  player1.name = player1Form.value;
  player2.name = player2Form.value;
  player1.color = player1Color.value || 'red';
  player2.color = player2Color.value || 'blue';
  game.board = []
  boardElement.innerHTML = '';
  game.makeBoard();
  makeHtmlBoard();
};

function handleClick(evt) {


  // get x from ID of clicked cell
  if (game.gameOver) { return };
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  game.board[y][x] = game.currPlayer.number;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${game.currPlayer.name} won!`);
  }

  // check for tie
  if (game.board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // switch players
  game.switchPlayer();

};

function makeHtmlBoard() {

  // make column tops (clickable area for adding a piece to that column)
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (let x = 0; x < game.width; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  boardElement.append(top);

  // make main part of board
  for (let y = 0; y < game.height; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < game.width; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    boardElement.append(row);
  }
};

function findSpotForCol(x) {
  for (let y = game.height - 1; y >= 0; y--) {
    if (!game.board[y][x]) {
      return y;
    }
  }
  return null;
};

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${game.currPlayer.number}`);
  piece.style.top = -50 * (y + 2);

  piece.style.backgroundColor = game.currPlayer.color;

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
};

function endGame(msg) {
  alert(msg);
  game.gameOver = true;
  const btn = document.createElement('button');
  btn.addEventListener('click', restartGame);
  const gameElement = document.getElementById('game');
  gameElement.append(btn);
};

function restartGame() {
  game = new Game(boardElement, player1, player2);
};

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match game.currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < game.height &&
        x >= 0 &&
        x < game.width &&
        game.board[y][x] === game.currPlayer.number
    );
  }

  for (let y = 0; y < game.height; y++) {
    for (let x = 0; x < game.width; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};