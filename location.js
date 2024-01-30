// const util = require("util");
// console.log(util.inspect(errors, true, 10));

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
// const previouslyUsed = [
//   [4, 2],
//   [5, 2],
//   [6, 2],
//   [7, 2],
//   [8, 2],
//   [5, 3],
//   [5, 4],
//   [5, 5],
// ];
// const newCoordinatesFalse = [
//   [3, 4],
//   [4, 4],
//   [5, 4],
// ];
// const newCoordinatesTrue = [
//   [0, 9],
//   [1, 9],
//   [2, 9],
// ];

const previouslyUsed = [];

const ships = [
  { name: "destroyer", length: 2, coords: [] },
  { name: "cruiser1", length: 3, coords: [] },
  { name: "cruiser2", length: 3, coords: [] },
  { name: "battleship", length: 4, coords: [] },
  { name: "carrier", length: 5, coords: [] },
];

const logShips = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
};
// console.log(previouslyUsed);
// console.log("\n");

logShips(ships);
console.log("\n");

// updateShipsCoords(ships, newCoordinatesTrue, "cruiser1");
// updatePreviouslyUsed(newCoordinatesTrue);

// logShips(ships);
// console.log("\n");
// console.log(previouslyUsed);
// console.log("\n");

let shipsRemaining = 5;

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

const setShips = (arr, boardSize) => {
  for (let i = 0; i < arr.length; i++) {
    generateLocation(boardSize, arr[i].length, arr[i].name);
  }
};

const generateLocation = (boardSize, shipLength, shipName) => {
  let placed = false;
  let max = boardSize - 1;

  while (!placed) {
    let randLoc = [getRandomNumber(0, max), getRandomNumber(0, max)];

    let valid = generateShipCoords(
      randLoc,
      shipLength,
      previouslyUsed,
      ships,
      shipName
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
  shipName
) => {
  let valid = false;
  // generate random num 0-3 to determine direction from random location
  let startingDir = Math.floor(Math.random() * 4);

  // check to the right
  if (startingDir === 0) {
    if (randomLocation[1] + shipLength <= 9) {
      let shipCoordsArray = [];
      shipCoordsArray.push(randomLocation);
      for (let i = 1; i < shipLength; i++) {
        shipCoordsArray.push([randomLocation[0], randomLocation[1] + i]);
      }

      // now check if ANY of ship's coordinates have already been used
      if (!isUnique(previouslyUsed, shipCoordsArray)) {
        return valid;
      } else {
        // set the shipCoordsArray inside the 'ship.coords' array
        updateShipsCoords(ships, shipCoordsArray, shipName);
        // update previouslyUsed to include the new coordinates
        updatePreviouslyUsed(shipCoordsArray);
        // return valid = true;
        return (valid = true);
      }
    } else {
      return valid;
    }
  } else if (startingDir === 1) {
    // check down
    if (randomLocation[0] + shipLength <= 9) {
      let shipCoordsArray = [];
      shipCoordsArray.push(randomLocation);
      for (let i = 1; i < shipLength; i++) {
        shipCoordsArray.push([randomLocation[0] + i, randomLocation[1]]);
      }

      // now check if ANY of ship's coordinates have already been used
      if (!isUnique(previouslyUsed, shipCoordsArray)) {
        return valid;
      } else {
        // set the shipCoordsArray inside the 'ship.coords' array
        updateShipsCoords(ships, shipCoordsArray, shipName);
        // update previouslyUsed to include the new coordinates
        updatePreviouslyUsed(shipCoordsArray);
        // return valid = true;
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

      // now check if ANY of ship's coordinates have already been used
      if (!isUnique(previouslyUsed, shipCoordsArray)) {
        return valid;
      } else {
        // set the shipCoordsArray inside the 'ship.coords' array
        updateShipsCoords(ships, shipCoordsArray, shipName);
        // update previouslyUsed to include the new coordinates
        updatePreviouslyUsed(shipCoordsArray);
        // return valid = true;
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

      // now check if ANY of ship's coordinates have already been used
      if (!isUnique(previouslyUsed, shipCoordsArray)) {
        return valid;
      } else {
        // set the shipCoordsArray inside the 'ship.coords' array
        updateShipsCoords(ships, shipCoordsArray, shipName);
        // update previouslyUsed to include the new coordinates
        updatePreviouslyUsed(shipCoordsArray);
        // return valid = true;
        return (valid = true);
      }
    } else {
      return valid;
    }
  }
};

setShips(ships, 10);

logShips(ships);
console.log("\n");

const checkForHit = (ships, guess) => {
  if (!isUnique(prevHits, guess)) {
    console.log(`You already hit a battleship at this location!`);
    return;
  }

  if (!isUnique(prevMisses, guess)) {
    console.log(`You have already picked this location. Miss!`);
    return;
  }

  for (let i = 0; i < ships.length; i++) {
    if (ships[i].coords.includes(guess)) {
      if ((ships[i].length = 1)) {
        shipsRemaining--;

        console.log(
          `Hit! You have sunk a battleship. ${shipsRemaining} ship(s) remaining.`
        );
      } else {
        console.log(`Hit! You have hit the ${ships[i].name}.`);
      }
      ships[i].length--;
      prevHits.push(guess);
      return true;
    } else {
      prevMisses.push(guess);
      console.log("You have missed!");
      return false;
    }
  }
};

// choose a random location in the grid
// const randomLocation = [getRandomNumber(0, 5), getRandomNumber(0, 5)];

// for (let i = 0; i < ships.length; i++) {
//   for (let j = 0; j < ships[i].length; j++) {
//     ships[i].coords.push([getRandomNumber(0, 5), getRandomNumber(0, 5)]);
//   }
//   console.log(ships[i]);
// }

// need function that takes in an array of previous

// console.log(isUnique(previouslyUsed, newCoordinatesFalse));
// console.log(isUnique(previouslyUsed, newCoordinatesTrue));
