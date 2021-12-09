const data = require('fs').readFileSync('input.txt', 'utf-8').split('\n');
const numbers = 'abcefg|cf|acdeg|acdfg|bcdf|abdfg|abdefg|acf|abcdefg|abcdfg';
const numbersArray = numbers.split('|');
const numbersRegex = new RegExp(`^(\\b(${numbers})\\b\\s?)+$`);

function getRandomLetters() {
  return 'abcdefg'
    .split('')
    .map(v => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
}

function translatePattern(pattern, letters) {
  return pattern.replace(/[a-g]/g, (match) => {
      return letters[match.charCodeAt(0)-97];
  }).split(' ').map(word => word.split('').sort().join('')).join(' ');
}

let sum = 0;
data.forEach(line => {
  if (!line) return;
  const [pattern, value] = line.split(' | ');
  let translated = pattern;
  let letters;
  while(!translated.match(numbersRegex)) {
    letters = getRandomLetters();
    translated = translatePattern(pattern, letters);
  }
  const translatedValue = translatePattern(value, letters);
  sum += Number(translatedValue.split(' ').map(l => numbersArray.indexOf(l)).join(''));
});

console.log(sum);
