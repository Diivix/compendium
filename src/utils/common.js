// @ts-check

/**
 * @param {string} value 
 */
export const upperFirst = (value) => {
  const values = String(value).split(' ');
  const upperCasedValues = [];
  values.forEach(x => upperCasedValues.push(x.charAt(0).toUpperCase() + String(x).slice(1)));
  return upperCasedValues.join(' ');
}

/**
 * @param {string} value 
 * @param {number} length
 */
export const truncate = (value, length) => {
  return value.slice(0, length);
};
