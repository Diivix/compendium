// @ts-check

/**
 * @param {string} value
 * @param {boolean} [firstWordOnly]
 */
export const upperFirst = (value, firstWordOnly = false) => {
  if (firstWordOnly) {
    return value.charAt(0).toUpperCase() + String(value).slice(1);
  } else {
    const values = String(value).split(' ');
    const upperCasedValues = [];
    values.forEach(x => upperCasedValues.push(x.charAt(0).toUpperCase() + String(x).slice(1)));
    return upperCasedValues.join(' ');
  }
};

/**
 * @param {string} value
 * @param {number} length
 */
export const truncate = (value, length) => {
  if (value.length > length) {
    return value.slice(0, length) + '...';
  }
  return value;
};

/**
 * @param {string} value
 */
export const isNullEmptyOrUndefined = value => {
  if (value === null || value === '' || value === undefined) {
    return true;
  }

  return false;
};
