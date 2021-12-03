const fs = require('fs');
const data = fs.readFileSync('input.txt').toString();
const lines = data.split('\n');
let depth = 0;
const set = [lines.shift()];
let previousSum = 0;
let currentSum = 0;
function sum(array) {
  return array.reduce((a, b) => Number(a) + Number(b), 0);
}

lines.forEach(line => {
  previousSum = sum(set);
  set.push(line);
  if (set.length > 3) {
    set.shift();
  } else {
    return;
  }
  currentSum = sum(set);
  if (currentSum > previousSum) {
    depth++;
    console.log(`${currentSum} > ${previousSum}`);
    console.log(set);
  }
});
console.log(depth);
