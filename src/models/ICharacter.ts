import { ISpell } from "./ISpell";

export interface ICharacterBase {
  name: string,
  classType: string,
  level: number,
  description: string,
};

export interface ICharacter extends ICharacterBase {
  id: number,
  spells?: ISpell[]
};