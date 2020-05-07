import { ADD_TOKEN, REMOVE_TOKEN, SET_SPELL_FILTERS, ActionTypes } from '../types';
import { ITagOption } from '../../models/ITagOptions';

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