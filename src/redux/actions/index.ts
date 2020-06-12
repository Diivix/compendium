import {
  ADD_TOKEN_PAIR,
  REMOVE_TOKEN_PAIR,
  SET_SPELL_FILTERS,
  ActionTypes,
  SET_CHARACTERS,
  UPDATE_CHARACTERS,
} from '../types';
import { ITagOption } from '../../models/ITagOptions';
import { ICharacter } from '../../models/ICharacter';
import { ITokenPair } from '../../models/ITokenPair';

export const addTokenPair = (tokenPair: ITokenPair): ActionTypes => {
  return {
    type: ADD_TOKEN_PAIR,
    payload: tokenPair,
  };
};

export const removeTokenPair = (): ActionTypes => {
  return {
    type: REMOVE_TOKEN_PAIR,
  };
};

export const setSpellFilters = (filters: ITagOption[]): ActionTypes => {
  return {
    type: SET_SPELL_FILTERS,
    payload: filters,
  };
};

export const setCharacters = (characters: ICharacter[]): ActionTypes => {
  return {
    type: SET_CHARACTERS,
    payload: characters,
  };
};

export const setCharacterState = (requiresUpdate: boolean): ActionTypes => {
  return {
    type: UPDATE_CHARACTERS,
    payload: requiresUpdate,
  };
};
