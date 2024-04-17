/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }

  if (!size) {
    return string;
  }
  
  let result = '';

  for (let i = 0 ; i < string.length;) {
    const stack = [];
    const ch = string[i];

    while (i < string.length && ch === string[i]) {
      stack.push(ch);
      i++;
    }

    result += stack.length < size
      ? ch.repeat(stack.length)
      : ch.repeat(size);
  }

  return result;
}
