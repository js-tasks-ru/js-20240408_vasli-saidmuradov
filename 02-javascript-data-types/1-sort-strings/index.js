/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */


const defaultOptions = {
  sensitivity: 'case',
  caseFirst: 'upper'
};

const compareByLocale = (a, b) => a.localeCompare(b, ['ru', 'en'], defaultOptions);

export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];
  return param !== 'asc'
    ? newArr.sort((a, b) => compareByLocale(b, a))
    : newArr.sort((a, b) => compareByLocale(a, b));
}
