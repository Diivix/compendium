import { ISpell } from "./ISpell";

export interface ICharacterBase {
  name: string,
  classType: string,
  level: number,
  description?: string,
  spells?: ISpell[]
};

export interface ICharacter extends ICharacterBase {
  id: number
};