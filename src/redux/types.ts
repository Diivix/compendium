import { ITagOption } from "../models/ITagOptions";

export const ADD_TOKEN = 'ADD_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_SPELL_FILTERS = 'SET_SPELL_FILTERS';

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

export type ActionTypes = IAddToken | IRemoveToken | ISetSpellFilters