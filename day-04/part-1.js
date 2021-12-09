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

const boards = rowBoards.concat(colBoards);
const markedBoards = [];

function findWinner() {
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

const [winningBoard, winningNumber] = findWinner();
let sum = 0;
console.log(boards[winningBoard]);
console.log(markedBoards[winningBoard]);
boards[winningBoard].forEach((row, rowIndex) => {
  boards[winningBoard][rowIndex].forEach((col, colIndex) => {
    const found = (markedBoards[winningBoard][rowIndex] || [])[colIndex];
    if (found == -1 || found === undefined) {
      sum += Number(col);
    }
  });
});

console.log(sum, winningNumber, sum * winningNumber);
