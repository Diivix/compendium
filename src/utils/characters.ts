import { ICharacter, ICharacterBase } from "../models/ICharacter";

export const getCharacterClassTypes = (): string[] => {
  return ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer" , "Warlock", "Wizard"];
};


export const getCharacterRaces = (): string[] => {
  return ["aarakocra","aasimar","bugbear","changeling","dragonborn","dwarf","elf","firbolg","genasi","gith","gnome","goblin","half_elf","half_orc","halfling","human","kenku","kobold","leonin","lizard_folk","minotaur","satyr","tabaxi","tiefling","tortle","warforged","yuan-Ti_Pureblood"];
};

export const decodeCharacter = (character: ICharacter): ICharacter => {
  return {
    id: character.id,
    name: decodeURIComponent(character.name),
    level: character.level,
    race: character.race,
    classTypes: character.classTypes.map(x => decodeURIComponent(x)),
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
    classTypes: character.classTypes.map(x => encodeURIComponent(x)),
    description: encodeURIComponent(character.description),
  }
}

const isFullCharacter = (character: ICharacter | ICharacterBase): character is ICharacter => {
  if((character as ICharacter).id){
    return true
  }
  return false
}

