const fs = require('fs');
const data = fs.readFileSync('input.txt').toString();
const lines = data.split('\n');
let depth = 0;
for (let i = 0; i < lines.length -1; i++) {
  if (lines[i+1] > lines[i]) {
    console.log(`${lines[i+1]} > ${lines[i]}`);
    depth++;
  }
}
console.log(depth);
