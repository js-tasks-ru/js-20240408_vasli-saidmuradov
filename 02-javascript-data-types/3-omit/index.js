/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const newObj = {};
  const fieldsSet = new Set(fields);

  for (const [prop, value] of Object.entries(obj)) {
    if (!fieldsSet.has(prop)) {
      newObj[prop] = value;
    }
  }

  return newObj;
};
