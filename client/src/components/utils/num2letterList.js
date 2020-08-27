function toLetters(num) {
  "use strict";
  var mod = num % 26,
    pow = num / 26 | 0,
    out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
  return pow ? toLetters(pow) + out : out;
}

export default function num2letterList(num) {
  let res = []
  const arr = Array.from(Array(num), (_, i) => i + 1)
  for (let x in arr){
    res.push(toLetters(x))
  }
  return res
}
