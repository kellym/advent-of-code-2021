const fs = require('fs');
const data = fs.readFileSync('input.txt').toString();
const lines = data.split('\n');

const multiplyX = { forward: 1 };
const multiplyY = { down: 1, up: -1 };
const coords = [0,0];
lines.forEach(line => {
  if (!line) return;
  const [direction, amount] = line.split(' ');
  coords[0] += (multiplyX[direction] || 0) * Number(amount);
  coords[1] += (multiplyY[direction] || 0) * Number(amount);
});
console.log(coords[0] * coords[1]);
