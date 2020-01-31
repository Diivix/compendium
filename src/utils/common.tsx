export const upperFirst = (value: string, firstWordOnly: boolean = false) => {
  if (firstWordOnly) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else {
    const values: string[] = value.split(' ');
    const upperCasedValues: string[] = [];
    values.forEach(x => upperCasedValues.push(x.charAt(0).toUpperCase() + x.slice(1)));
    return upperCasedValues.join(' ');
  }
};

export const truncate = (value: string, length: number) => {
  if (value.length > length) {
    return value.slice(0, length) + '...';
  }
  return value;
};

export const isNullEmptyOrUndefined = (value: string) => {
  if (value === null || value === '' || value === undefined) {
    return true;
  }

  return false;
};
