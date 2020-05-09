import { ITagOption } from "../models/ITagOptions";
import { ICharacter } from "../models/ICharacter";

export const ADD_TOKEN = 'ADD_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_SPELL_FILTERS = 'SET_SPELL_FILTERS';
// export const SET_CHARACTERS = 'SET_CHARACTERS'

interface IAddToken {
  type: typeof ADD_TOKEN,
  payload: string
}

interface IRemoveToken {
  type: typeof REMOVE_TOKEN
}

interface ISetSpellFilters {
  type: typeof SET_SPELL_FILTERS,
  payload: ITagOption[]
}

// interface ISetCharacters {
//   type: typeof SET_CHARACTERS,
//   payload: ICharacter[]
// }

export type ActionTypes = IAddToken | IRemoveToken | ISetSpellFilters;