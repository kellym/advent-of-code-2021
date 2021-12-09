const fs = require('fs');
const data = fs.readFileSync('input.txt').toString();
const lines = data.split('\n');

// load drawn numbers
const drawnNumbers = lines.shift().split(',');

// load bingo boards
const rowBoards = [];
const colBoards = [];
let currentBoardIndex = -1;
let bingoLine;
while(lines.length) {
  const line = lines.shift().trim();
  if (!line) {
    currentBoardIndex++;
    if (lines.length) {
      rowBoards[currentBoardIndex] = [];
      colBoards[currentBoardIndex] = [];
    }
    continue;
  }
  bingoLine = line.split(/\s+/);
  rowBoards[currentBoardIndex].push(bingoLine);
  for (let i = 0; i < bingoLine.length; i++) {
    colBoards[currentBoardIndex][i] = colBoards[currentBoardIndex][i] || [];
    colBoards[currentBoardIndex][i][rowBoards[currentBoardIndex].length - 1] = bingoLine[i];
  }
}
const boardWidth = bingoLine.length;
const boardHeight = currentBoardIndex + 1;

const allBoards = rowBoards.concat(colBoards);
const boards = allBoards.slice();
let markedBoards = [];

function findLoser() {
  markedBoards = [];
  for(let i = 0; i < drawnNumbers.length; i++) {
    const drawnNumber = drawnNumbers[i];
    for(let index = 0; index < boards.length; index++) {
      const board = boards[index];
      for (let row = 0; row < board.length; row++) {
        const boardRow = board[row];
        const foundMatch = boardRow.indexOf(drawnNumber);
        if (foundMatch != -1) {
          markedBoards[index] = markedBoards[index] || [];
          markedBoards[index][row] = markedBoards[index][row] || Array(boardWidth).fill(-1);
          markedBoards[index][row][foundMatch] = drawnNumber;
          if (markedBoards[index][row].indexOf(-1) == -1) {
            // winner winner chicken dinner
            return [index, drawnNumber];
          }
        }
      }
    }
  }
  return [-1, -1];
}

let boardLength = rowBoards.length;
let winningBoard, winningNumber;
let winner;
while (boards.length > 0) {
  [winningBoard, winningNumber] = findLoser();
  console.log(winningBoard, winningNumber, boards[winningBoard], boards);
  if (winningBoard >= boardLength) {
    winner = boards.splice(winningBoard, 1)[0];
    boards.splice(winningBoard - boardLength, 1);
  } else {
    boards.splice(winningBoard + boardLength, 1);
    winner = boards.splice(winningBoard, 1)[0];
  }
  boardLength--;
}

let sum = 0;
console.log(boards, winningBoard, winningNumber, winner);
console.log(markedBoards[winningBoard]);
winner.forEach((row, rowIndex) => {
  winner[rowIndex].forEach((col, colIndex) => {
    const found = (markedBoards[winningBoard][rowIndex] || [])[colIndex];
    console.log(found);
    if (found == -1 || found === undefined) {
      sum += Number(col);
    }
  });
});

console.log(sum, winningNumber, sum * winningNumber);
