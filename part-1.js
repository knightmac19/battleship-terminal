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
  let shipOne = [getRandomNumber(0, 2), getRandomNumber(0, 2)];
  let shipTwo = [getRandomNumber(0, 2), getRandomNumber(0, 2)];

  // make sure ships don't have the same coordinates
  while (shipOne[0] === shipTwo[0] && shipOne[1] === shipTwo[1]) {
    shipTwo = [getRandomNumber(0, 2), getRandomNumber(0, 2)];
  }

  return [shipOne, shipTwo];
};

const init = () => {
  console.log("Press any key to start the game");
  readlineSync.keyIn();

  let gameBoard = generateBoard();

  let shipsRemaining = 2;
  const [shipOneCoords, shipTwoCoords] = generateCoordinates();

  console.log(`shipOneCoords: ${shipOneCoords}`);
  console.log(`shipTwoCoords: ${shipTwoCoords}`);

  // while (shipsRemaining > 0) {
  //   console.log(displayBoard(gameBoard));

  //   const input = readlineSync
  //     .question('Enter a location to strike (e.g. "A2": ')
  //     .toUpperCase();
  //   console.log(input);

  //   const col = input.charCodeAt(0) - 65;
  //   const row = parseInt(input[1] - 1);
  //   console.log(`row: ${row}, col: ${col}`);

  //   console.log(validateGuess(row, col));

  //   if (!validateGuess(row, col)) {
  //     console.log("Invalid input. Try again.");
  //     continue;
  //   }

  //   checkForHit(shipOneCoords, row, col);
  // }
};

const validateGuess = (col, row) => {
  if (col >= 0 && col < 3 && row >= 0 && row < 3) {
    return "valid input";
  } else {
    return false;
  }
};

const checkForHit = (shipCoords, row, col) => {
  console.log(
    `shipCoords: ${shipCoords[0]}, ${shipCoords[1]} \n guessCoords: ${row}, ${col}`
  );

  // if (shipCoords[0] === row && shipCoords[1] === col) {
  //   return true;
  // }
  // return false;
};

init();
