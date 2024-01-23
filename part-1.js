const readlineSync = require("readline-sync");

const generateBoard = () => {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board.push(Array(3).fill("O"));
  }
  return board;
};

const displayBoard = (board) => {
  console.log("\n  A B C");
  for (let i = 0; i < board.length; i++) {
    console.log(i + 1, board[i].join(" "));
  }
  return "";
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateCoordinates = () => {
  let coordinates = [];
  for (let i = 0; i < 2; i++) {
    coordinates.push(getRandomNumber(0, 3));
  }

  return coordinates;
};

const init = () => {
  console.log("Press any key to start the game");
  readlineSync.keyIn();

  let gameBoard = generateBoard();

  let shipsRemaining = 2;

  let shipOneCoordinates = generateCoordinates();
  let shipTwoCoordinates = generateCoordinates();

  console.log(shipOneCoordinates);
  console.log(shipTwoCoordinates);

  while (shipsRemaining > 0) {
    console.log(displayBoard(gameBoard));

    const input = readlineSync
      .question('Enter a location to strike (e.g. "A2": ')
      .toUpperCase();

    const col = input.charCodeAt(0) - 64;
    const row = parseInt(input[1]);
    console.log(`col: ${col}, row: ${row}`);

    console.log(validateGuess(col, row));

    checkForHit(shipOneCoordinates, col, row);
    checkForHit(shipTwoCoordinates, col, row);
  }
};

const validateGuess = (col, row) => {
  return col > 0 && col <= 3 && row > 0 && row <= 3;
};

const checkForHit = (shipCoords, col, row) => {
  if (shipCoords[0] === col && shipCoords[1] === row) {
    return true;
  }
  return false;
};

init();
