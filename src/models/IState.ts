import { ITagOption } from "./ITagOptions";
import { ICharacter } from "./ICharacter";

export interface IState {
  token: string | null,
  // loggedIn: boolean;
  spellFilters: ITagOption[],
  characters: ICharacter[],
  updateCharacterState: boolean
}