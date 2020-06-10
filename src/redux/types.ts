import { ITagOption } from "../models/ITagOptions";
import { ICharacter } from "../models/ICharacter";

export const ADD_ACCESS_TOKEN = 'ADD_ACCESS_TOKEN';
export const REMOVE_ACCESS_TOKEN = 'REMOVE_ACCESS_TOKEN';
export const SET_SPELL_FILTERS = 'SET_SPELL_FILTERS';
export const SET_CHARACTERS = 'SET_CHARACTERS';
export const UPDATE_CHARACTERS = 'UPDATE_CHARACTERS';


interface IAddAccessToken {
  type: typeof ADD_ACCESS_TOKEN,
  payload: string
}

interface IRemoveAccessToken {
  type: typeof REMOVE_ACCESS_TOKEN
}

interface ISetSpellFilters {
  type: typeof SET_SPELL_FILTERS,
  payload: ITagOption[]
}

interface ISetCharacters {
  type: typeof SET_CHARACTERS,
  payload: ICharacter[]
}

interface ISetCharactersState {
  type: typeof UPDATE_CHARACTERS,
  payload: boolean
}

export type ActionTypes = IAddAccessToken | IRemoveAccessToken | ISetSpellFilters | ISetCharacters | ISetCharactersState;