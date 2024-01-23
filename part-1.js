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

  displayBoard(generateBoard());

  let shipOneCoordinates = generateCoordinates();
  let shipTwoCoordinates = generateCoordinates();

  console.log(shipOneCoordinates);
  console.log(shipTwoCoordinates);
};

init();
