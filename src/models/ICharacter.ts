import { ISpell } from "./ISpell";

export interface ICharacterBase {
  name: string,
  classTypes: string[],
  race: string,
  level: number,
  description: string,
};

export interface ICharacter extends ICharacterBase {
  id: number,
  spells?: ISpell[]
};