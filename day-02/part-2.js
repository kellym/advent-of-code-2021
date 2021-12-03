const fs = require('fs');
const data = fs.readFileSync('input.txt').toString();
const lines = data.split('\n');

const multiplyX = { forward: 1 };
const multiplyY = { forward: 1 };
const multiplyAim = { down: 1, up: -1 };
const coords = { x: 0, y: 0, aim: 0 };
lines.forEach(line => {
  if (!line) return;
  const [direction, amount] = line.split(' ');
  coords.x += (multiplyX[direction] || 0) * Number(amount);
  coords.y += (multiplyY[direction] || 0) * Number(amount) * coords.aim;
  coords.aim += (multiplyAim[direction] || 0) * Number(amount);
});
console.log(coords.x * coords.y);
