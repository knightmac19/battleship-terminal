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

console.log(displayBoard(generateBoard()));
