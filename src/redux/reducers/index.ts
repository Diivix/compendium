import { IState } from '../../models/IState';
import { ADD_TOKEN, REMOVE_TOKEN, ActionTypes } from '../types';

export const initialState: IState = {
  token: null,
}

export const reducer = (state = initialState, action: ActionTypes): IState => {
  switch(action.type) {
    case ADD_TOKEN:
      return Object.assign({}, state, { token: action.payload });
    case REMOVE_TOKEN:
      return Object.assign({}, state, { token: null });
    default:
      return state;
  }
}


