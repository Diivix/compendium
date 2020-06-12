import { ITagOption } from "../models/ITagOptions";
import { ICharacter } from "../models/ICharacter";
import { ITokenPair } from "../models/ITokenPair";

export const ADD_TOKEN_PAIR = 'ADD_TOKEN_PAIR';
export const REMOVE_TOKEN_PAIR = 'REMOVE_TOKEN_PAIR';
export const SET_SPELL_FILTERS = 'SET_SPELL_FILTERS';
export const SET_CHARACTERS = 'SET_CHARACTERS';
export const UPDATE_CHARACTERS = 'UPDATE_CHARACTERS';


interface IAddTokenPair {
  type: typeof ADD_TOKEN_PAIR,
  payload: ITokenPair
}

interface IRemoveAccessToken {
  type: typeof REMOVE_TOKEN_PAIR
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

export type ActionTypes = IAddTokenPair | IRemoveAccessToken | ISetSpellFilters | ISetCharacters | ISetCharactersState;