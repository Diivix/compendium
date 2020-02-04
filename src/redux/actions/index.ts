import { ADD_TOKEN, REMOVE_TOKEN, ActionTypes } from '../types';

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