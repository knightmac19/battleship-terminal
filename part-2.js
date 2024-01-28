const readlineSync = require("readline-sync");

const generateBoard = (num) => {
  const board = [];
  for (let i = 0; i < num; i++) {
    board.push(Array(num).fill("O"));
  }
  return board;
};

const displayBoard = (board, num) => {
  let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  letters = letters.slice(0, num);

  console.log(`\n   ${letters.join(" ")}`);
  for (let i = 0; i < board.length; i++) {
    if (i < 9) {
      console.log(` ${i + 1} ${board[i].join(" ")}`);
    } else {
      console.log(`${i + 1} ${board[i].join(" ")}`);
    }
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

const checkPrevious = (arr, guess) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === guess[0] && arr[i][1] === guess[1]) {
      return true;
    }
  }
  return false;
};

const validateGuess = (col, row) => {
  if (col >= 0 && col < 3 && row >= 0 && row < 3) {
    return "valid input";
  } else {
    return false;
  }
};

const setBoardSize = () => {
  let num;

  while (true) {
    // using 5 as the minimum size since 5 ships need to be placed on the grid
    // total num of cells occupied by 5 ships = 17
    num = readlineSync.question(
      "Enter a number between 5 & 10 (inclusive) to create the size of your grid. "
    );

    num = parseInt(num);

    if (!isNaN(num) && num >= 5 && num <= 10) {
      break;
    } else {
      console.log("Invalid input. Please enter a number between 5 & 10");
    }
  }

  return num;
};

const init = () => {
  const boardSize = setBoardSize();
  console.log("boardSize: " + boardSize);

  let gameBoard = generateBoard(boardSize);
  let shipsRemaining = 2;

  const [shipOneCoords, shipTwoCoords] = generateCoordinates();

  // reset arrays to empty for each new game
  let prevHits = [];
  let prevMisses = [];

  const checkForHit = (coordsArr, row, col) => {
    if (checkPrevious(prevHits, [row, col])) {
      console.log(`You already hit a battleship at this location!`);
      return;
    }

    if (checkPrevious(prevMisses, [row, col])) {
      console.log(`You have already picked this location. Miss!`);
      return;
    }

    if (coordsArr[0][0] === row && coordsArr[0][1] === col) {
      shipsRemaining--;
      prevHits.push([row, col]);

      console.log(
        `Hit. You have sunk a battleship. ${shipsRemaining} ship(s) remaining.`
      );
      return true;
    } else if (coordsArr[1][0] === row && coordsArr[1][1] === col) {
      shipsRemaining--;
      prevHits.push([row, col]);

      console.log(
        `Hit. You have sunk a battleship. ${shipsRemaining} ship(s) remaining.`
      );
      return true;
    } else {
      prevMisses.push([row, col]);
      console.log("You have missed!");
      return false;
    }
  };

  console.log("Press any key to start the game");
  readlineSync.keyIn();

  while (shipsRemaining > 0) {
    console.log(displayBoard(gameBoard, boardSize));

    const input = readlineSync
      .question('Enter a location to strike (e.g. "A2": ')
      .toUpperCase();
    console.log(input);

    const col = input.charCodeAt(0) - 65;
    const row = parseInt(input[1] - 1);

    if (!validateGuess(row, col)) {
      console.log("Invalid input. Try again.");
      continue;
    }

    // check to see if it's a hit or a miss
    checkForHit([shipOneCoords, shipTwoCoords], row, col);
  }

  const restart = readlineSync.keyInYN(
    "You have destroyed all battleships. Would you like to play again? Y/N"
  );

  if (restart) {
    init();
  } else {
    process.exit();
  }
};

init();
