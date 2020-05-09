import { ISpell } from "./ISpell";

export interface ICharacter {
  id: number,
  name: string,
  classType: string,
  level: number,
  description?: string,
  spells?: ISpell[]
};