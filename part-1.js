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

const init = () => {
  let gameBoard = generateBoard();
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
    console.log(displayBoard(gameBoard));

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
