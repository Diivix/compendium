import { IState } from '../../models/IState';
import { ADD_TOKEN_PAIR, REMOVE_TOKEN_PAIR, SET_SPELL_FILTERS, ActionTypes, SET_CHARACTERS, UPDATE_CHARACTERS } from '../types';

export const initialState: IState = {
  accessToken: null,
  refreshToken: null,
  spellFilters: [],
  characters: [],
  updateCharacterState: true,
};

export const reducer = (state = initialState, action: ActionTypes): IState => {
  switch (action.type) {
    case ADD_TOKEN_PAIR:
      return Object.assign({}, state, { accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken });
    case REMOVE_TOKEN_PAIR:
      return Object.assign({}, state, { accessToken: null, refreshToken: null, spellFilters: [], characters: [] });
    case SET_SPELL_FILTERS:
      return Object.assign({}, state, { spellFilters: action.payload });
    case SET_CHARACTERS:
      return Object.assign({}, state, { characters: action.payload });
    case UPDATE_CHARACTERS:
      return Object.assign({}, state, { updateCharacterState: action.payload });
    default:
      return state;
  }
};
