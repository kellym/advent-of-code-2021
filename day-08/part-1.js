const data = require('fs').readFileSync('input.txt', 'utf-8');
const count = [...data.matchAll(/(?<=\|.*)\b(\w{2,4}|\w{7})\b/g)].length;
console.log(count);
