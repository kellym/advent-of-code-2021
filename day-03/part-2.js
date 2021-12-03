const fs = require('fs');
const data = fs.readFileSync('input.txt').toString();
const lines = data.split('\n').filter(line => line);

function calculate(invert = true) {
  let i = 0;
  let round = lines;
  while (round.length > 1) {
    const bit = (round.reduce((s, bits) => {
      return s + Number(bits[i] || 0);
    }, 0) / round.length) + 0.5 | 0;
    round = round.filter(bits => bits[i] == (invert ? bit : (bit ? 0 : 1)));
    i++;
  }
  return parseInt(round[0], 2);
}

console.log(calculate() * calculate(false));
