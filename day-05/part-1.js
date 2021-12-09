const fs = require('fs');
const data = fs.readFileSync('test.txt').toString();
const vents = data.split('\n');

const diagram = [];

vents.forEach(line => {
  if (!line) return;
  const [one, two] = line.split(' -> ');
  const [x1, y1] = one.split(',');
  const [x2, y2] = two.split(',');
  if (x1 == x2) {
    diagram[x1] = diagram[x1] || [];
    for(let y = Math.min(y1, y2); y < Math.max(y1, y2); y++) {
      diagram[y] = diagram[y] || [];
      diagram[y][x1] = diagram[y][x1] || 0;
      diagram[y][x1]++;
    }
  } else {
    diagram[y1] = diagram[y1] || [];
    for(let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
      diagram[y1][x] = diagram[y1][x] || 0;
      diagram[y1][x]++;
    }
  }
});
console.log(diagram);
console.log(diagram.flat().filter(v => v > 1).length);
