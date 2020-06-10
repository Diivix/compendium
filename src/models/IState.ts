import { ITagOption } from "./ITagOptions";
import { ICharacter } from "./ICharacter";

export interface IState {
  accessToken: string | null,
  refreshToken: string | null,
  // loggedIn: boolean;
  spellFilters: ITagOption[],
  characters: ICharacter[],
  updateCharacterState: boolean
}