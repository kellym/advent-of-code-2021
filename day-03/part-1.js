const fs = require('fs');
const data = fs.readFileSync('input.txt').toString();
const lines = data.split('\n');

const maxBits = lines.length;
const bits = Array(lines[0].length).fill(0);
lines.forEach(binary => {
  binary.split('').forEach((bit, i) => bits[i] += Number(bit));
});

const gamma = parseInt(bits.map(b => ((b / maxBits) + 0.5) | 0).join(''), 2);
const epsilon = gamma ^ (2 ** bits.length - 1);

console.log(gamma * epsilon);
