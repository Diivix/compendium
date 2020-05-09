import { ITagOption } from "../models/ITagOptions";

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

export const buildTags = (filters: string[]): ITagOption[] => {
  return filters.sort().map(filter => {
    return { id: filter, title: upperFirst(filter.replace('-', ': ').replace('_', ' ')) };
  });
};

export const getCharacterClassTypes = (): string[] => {
  return ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer" , "Warlock", "Wizard"];
};
