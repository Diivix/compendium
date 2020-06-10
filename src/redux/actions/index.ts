import { ADD_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN, SET_SPELL_FILTERS, ActionTypes, SET_CHARACTERS, UPDATE_CHARACTERS } from '../types';
import { ITagOption } from '../../models/ITagOptions';
import { ICharacter } from '../../models/ICharacter';

export const addAccessToken = (accessToken: string): ActionTypes => {
  return {
    type: ADD_ACCESS_TOKEN,
    payload: accessToken
  };
}

export const removeAccessToken = (): ActionTypes => {
  return {
    type: REMOVE_ACCESS_TOKEN
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

export const setCharacterState = (requiresUpdate: boolean): ActionTypes => {
  return {
    type: UPDATE_CHARACTERS,
    payload: requiresUpdate
  }
}