import { ICharacter, ICharacterBase } from "../models/ICharacter";

export const getCharacterClassTypes = (): string[] => {
  return ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer" , "Warlock", "Wizard"];
};

export const getCharacterRaces = (): string[] => {
  return ["fake", "fake2"];
};

export const decodeCharacter = (character: ICharacter): ICharacter => {
  return {
    id: character.id,
    name: decodeURIComponent(character.name),
    level: character.level,
    race: character.race,
    classType: decodeURIComponent(character.classType),
    description: decodeURIComponent(character.description),
    spells: character.spells
  }
}

export const encodeCharacter = (character: ICharacter | ICharacterBase): ICharacter | ICharacterBase => {
  const encodedCharacterBase = encodeCharacterBase(character);

  if(isFullCharacter(character)) {
    return Object.assign({}, { id: character.id }, encodedCharacterBase);
  }
  
  return encodedCharacterBase;
}

const encodeCharacterBase = (character: ICharacterBase): ICharacterBase => {
  return {
    name: encodeURIComponent(character.name),
    level: character.level,
    race: character.race,
    classType: encodeURIComponent(character.classType),
    description: encodeURIComponent(character.description),
  }
}

const isFullCharacter = (character: ICharacter | ICharacterBase): character is ICharacter => {
  if((character as ICharacter).id){
    return true
  }
  return false
}

