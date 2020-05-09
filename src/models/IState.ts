import { ITagOption } from "./ITagOptions";

export interface IState {
  token: string | null,
  // loggedIn: boolean;
  spellFilters: ITagOption[],
  // characters: []
}