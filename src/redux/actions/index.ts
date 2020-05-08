import { ADD_TOKEN, REMOVE_TOKEN, SET_SPELL_FILTERS, SET_CHARACTERS, ActionTypes } from '../types';
import { ITagOption } from '../../models/ITagOptions';
import { ICharacter } from '../../models/ICharacter';

export const addToken = (token: string): ActionTypes => {
  return {
    type: ADD_TOKEN,
    payload: token
  };
}

export const removeToken = (): ActionTypes => {
  return {
    type: REMOVE_TOKEN
  };
}

export const setSpellFilters = (filters: ITagOption[]): ActionTypes => {
  return {
    type: SET_SPELL_FILTERS,
    payload: filters
  }
}

export const setCharacters = (characters: ICharacter[]): ActionTypes => {
  return {
    type: SET_CHARACTERS,
    payload: characters
  }
}