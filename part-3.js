const rs = require("readline-sync");

const previouslyUsed = [];

const arrayIncludes = (arr, guess) => {
  if (arr.length === 0) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === guess[0] && arr[i][1] === guess[1]) {
      return true;
    }
  }
  return false;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isUnique = (previous, newCoords) => {
  for (let i = 0; i < newCoords.length; i++) {
    for (let j = 0; j < previous.length; j++) {
      if (
        newCoords[i][0] === previous[j][0] &&
        newCoords[i][1] === previous[j][1]
      ) {
        return false;
      }
    }
  }

  return true;
};

const generateBoard = (num) => {
  const board = [];
  for (let i = 0; i < num; i++) {
    board.push(Array(num).fill("  |"));
  }
  return board;
};

const displayBoard = (board, num) => {
  let letters = [
    " A ",
    " B ",
    " C ",
    " D ",
    " E ",
    " F ",
    " G ",
    " H ",
    " I ",
    " J ",
  ];

  letters = letters.slice(0, num);

  console.log(`\n   ${letters.join(" ")}`);

  for (let i = 0; i < board.length; i++) {
    if (i < 9) {
      console.log(` ${i + 1}| ${board[i].join(" ")}`);
    } else {
      console.log(`${i + 1}| ${board[i].join(" ")}`);
    }
  }
  return "";
};

const setShips = (arr, boardSize) => {
  for (let i = 0; i < arr.length; i++) {
    generateLocation(boardSize, arr[i].length, arr[i].name, arr);
  }
};

const generateLocation = (boardSize, shipLength, shipName, ships) => {
  let placed = false;
  let max = boardSize;

  while (!placed) {
    let randLoc = [getRandomNumber(0, max - 1), getRandomNumber(0, max - 1)];

    let valid = generateShipCoords(
      randLoc,
      shipLength,
      previouslyUsed,
      ships,
      shipName,
      max
    );

    if (valid) {
      placed = true;
    }
  }
};

const updateShipsCoords = (ships, shipCoords, shipName) => {
  return ships
    .filter((ship) => ship.name === shipName)
    .map((ship) => (ship.coords = shipCoords));
};

const updatePreviouslyUsed = (newCoords) => {
  for (let i = 0; i < newCoords.length; i++) {
    previouslyUsed.push(newCoords[i]);
  }
};

const generateShipCoords = (
  randomLocation,
  shipLength,
  previouslyUsed,
  ships,
  shipName,
  max
) => {
  let valid = false;
  // generate random num 0-3 to determine direction from random location
  let startingDir = Math.floor(Math.random() * 4);

  // check to the right
  if (startingDir === 0) {
    if (randomLocation[1] + shipLength <= max) {
      let shipCoordsArray = [];
      shipCoordsArray.push(randomLocation);
      for (let i = 1; i < shipLength; i++) {
        shipCoordsArray.push([randomLocation[0], randomLocation[1] + i]);
      }

      if (!isUnique(previouslyUsed, shipCoordsArray)) {
        return valid;
      } else {
        updateShipsCoords(ships, shipCoordsArray, shipName);

        updatePreviouslyUsed(shipCoordsArray);

        return (valid = true);
      }
    } else {
      return valid;
    }
  } else if (startingDir === 1) {
    // check down
    if (randomLocation[0] + shipLength <= max) {
      let shipCoordsArray = [];
      shipCoordsArray.push(randomLocation);
      for (let i = 1; i < shipLength; i++) {
        shipCoordsArray.push([randomLocation[0] + i, randomLocation[1]]);
      }

      if (!isUnique(previouslyUsed, shipCoordsArray)) {
        return valid;
      } else {
        updateShipsCoords(ships, shipCoordsArray, shipName);

        updatePreviouslyUsed(shipCoordsArray);

        return (valid = true);
      }
    } else {
      return valid;
    }
  } else if (startingDir === 2) {
    // check to the left
    if (randomLocation[1] - shipLength >= 0) {
      let shipCoordsArray = [];
      shipCoordsArray.push(randomLocation);
      for (let i = 1; i < shipLength; i++) {
        shipCoordsArray.push([randomLocation[0], randomLocation[1] - i]);
      }

      if (!isUnique(previouslyUsed, shipCoordsArray)) {
        return valid;
      } else {
        updateShipsCoords(ships, shipCoordsArray, shipName);

        updatePreviouslyUsed(shipCoordsArray);

        return (valid = true);
      }
    } else {
      return valid;
    }
  } else {
    // check up (and startingDir === 3)
    if (randomLocation[0] - shipLength >= 0) {
      let shipCoordsArray = [];

      shipCoordsArray.push(randomLocation);
      for (let i = 1; i < shipLength; i++) {
        shipCoordsArray.push([randomLocation[0] - i, randomLocation[1]]);
      }

      if (!isUnique(previouslyUsed, shipCoordsArray)) {
        return valid;
      } else {
        updateShipsCoords(ships, shipCoordsArray, shipName);

        updatePreviouslyUsed(shipCoordsArray);

        return (valid = true);
      }
    } else {
      return valid;
    }
  }
};

const setBoardSize = () => {
  let num;

  while (true) {
    num = rs.question(
      "Enter a number between 6 & 10 (inclusive) to create the size of your grid. "
    );

    num = parseInt(num);

    if (!isNaN(num) && num >= 6 && num <= 10) {
      break;
    } else {
      console.log("Invalid input. Please enter a number between 6 & 10");
    }
  }

  return num;
};

const init = () => {
  const ships = [
    { name: "destroyer", length: 2, coords: [] },
    { name: "corvette1", length: 3, coords: [] },
    { name: "corvette2", length: 3, coords: [] },
    { name: "battleship", length: 4, coords: [] },
    { name: "carrier", length: 5, coords: [] },
  ];
  let shipsRemaining = 5;

  let boardSize = setBoardSize();

  let gameBoard = generateBoard(boardSize);
  setShips(ships, boardSize);

  // reset arrays to empty for each new game
  let prevHits = [];
  let prevMisses = [];

  const validateGuess = (col, row, max) => {
    if (col >= 0 && col < max && row >= 0 && row < max) {
      return "valid input";
    } else {
      return false;
    }
  };

  const checkForHit = (ships, guess) => {
    if (arrayIncludes(prevHits, guess)) {
      console.log(`You already hit a battleship at this location!`);
      return;
    }

    if (arrayIncludes(prevMisses, guess)) {
      console.log(`You have already picked this location. Miss!`);
      return;
    }

    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i].coords.length; j++) {
        if (
          ships[i].coords[j][0] === guess[0] &&
          ships[i].coords[j][1] === guess[1]
        ) {
          if (ships[i].length === 1) {
            shipsRemaining--;

            console.log(
              `Hit! You have sunk the ${ships[i].name}. ${shipsRemaining} ship(s) remaining.`
            );
          } else {
            console.log(`Hit! You have hit the ${ships[i].name}.`);
          }
          gameBoard[guess[0]][guess[1]] = "X |";
          ships[i].length--;
          prevHits.push(guess);
          return true;
        }
      }
    }
    gameBoard[guess[0]][guess[1]] = "O |";
    prevMisses.push(guess);
    console.log("You have missed!");
    return false;
  };

  console.log("Press any key to start the game");
  rs.keyIn();

  while (shipsRemaining > 0) {
    console.log(displayBoard(gameBoard, boardSize));

    const input = rs
      .question('Enter a location to strike (e.g. "A2": ')
      .toUpperCase();
    console.log(input);

    let row = 0;
    let col = 0;

    if (input.length == 3) {
      col = input.charCodeAt(0) - 65;
      row = parseInt([input[1], input[2]].join("")) - 1;
    } else {
      col = input.charCodeAt(0) - 65;
      row = parseInt(input[1] - 1);
    }

    let guess = [row, col];

    if (!validateGuess(row, col, boardSize)) {
      console.log("Invalid input. Try again.");
      continue;
    }

    checkForHit(ships, guess);
  }

  const restart = rs.keyInYN(
    "You have destroyed all battleships. Would you like to play again? Y/N"
  );

  if (restart) {
    init();
  } else {
    process.exit();
  }
};

init();
