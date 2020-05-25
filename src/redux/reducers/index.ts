import { IState } from '../../models/IState';
import { ADD_TOKEN, REMOVE_TOKEN, SET_SPELL_FILTERS, ActionTypes, SET_CHARACTERS, UPDATE_CHARACTERS } from '../types';

export const initialState: IState = {
  token: null,
  spellFilters: [],
  characters: [],
  updateCharacterState: true,
};

export const reducer = (state = initialState, action: ActionTypes): IState => {
  switch (action.type) {
    case ADD_TOKEN:
      return Object.assign({}, state, { token: action.payload });
    case REMOVE_TOKEN:
      return Object.assign({}, state, { token: null, spellFilters: [], characters: [] });
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
