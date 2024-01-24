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

const generateCoordinates = (shipNum, alreadyAssigned = []) => {
  let coordinates = [];
  for (let i = 1; i < 3; i++) {
    coordinates.push(getRandomNumber(1, 4));
  }

  // recursion call to ensure the ships don't have the same coordinates
  if (
    shipNum === 2 &&
    alreadyAssigned[0] === shipOneCoordinates[0] &&
    alreadyAssigned[1] === shipTwoCoordinates[1]
  ) {
    generateCoordinates(2);
  }

  return coordinates;
};

let shipOneCoordinates = generateCoordinates(1);
let shipTwoCoordinates = generateCoordinates(2);

const init = () => {
  console.log("Press any key to start the game");
  readlineSync.keyIn();

  let gameBoard = generateBoard();

  let shipsRemaining = 2;

  console.log(`shipOneCoordinates: ${shipOneCoordinates}`);
  console.log(`shipTwoCoordinates: ${shipTwoCoordinates}`);

  while (shipsRemaining > 0) {
    console.log(displayBoard(gameBoard));

    const input = readlineSync
      .question('Enter a location to strike (e.g. "A2": ')
      .toUpperCase();

    const col = input.charCodeAt(0) - 64;
    const row = parseInt(input[1]);
    console.log(`row: ${row}, col: ${col}`);

    console.log(validateGuess(col, row));

    if (!validateGuess(row, col)) {
      console.log("Invalid input. Try again.");
      continue;
    }

    if (checkForHit(shipOneCoordinates, row, col)) {
      console.log(
        `Hit. You have sunk a battleship. ${--shipsRemaining} ship(s) remaining`
      );
      console.log(`gameboard row col: ${gameBoard[row][col]}`);
      gameBoard[row][col] = "X";
    } else if (
      !checkForHit(shipOneCoordinates, row, col) &&
      gameBoard[row][col] === "O"
    ) {
      console.log(`Missed. Try again!`);
      console.log(`gameboard row col: ${gameBoard[row][col]}`);
      gameBoard[row][col] = "M";
    } else {
      console.log(`gameboard row col: ${gameBoard[row][col]}`);
      console.log("You have already picked this location. Miss!");
    }

    if (checkForHit(shipTwoCoordinates, row, col)) {
      console.log(
        `Hit. You have sunk a battleship. ${--shipsRemaining} ship(s) remaining`
      );
      console.log(`gameboard row col: ${gameBoard[row][col]}`);
      gameBoard[row][col] = "X";
    } else if (
      !checkForHit(shipTwoCoordinates, row, col) &&
      gameBoard[row][col] === "O"
    ) {
      console.log(`Missed. Try again!`);
      console.log(`gameboard row col: ${gameBoard[row][col]}`);
      gameBoard[row][col] = "M";
    } else {
      console.log(`gameboard row col: ${gameBoard[row][col]}`);
      console.log("You have already picked this location. Miss!");
    }
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
