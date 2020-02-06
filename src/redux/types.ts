
export const ADD_TOKEN = 'ADD_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

interface IAddToken {
  type: typeof ADD_TOKEN,
  payload: string
}

interface IRemoveToken {
  type: typeof REMOVE_TOKEN
}

export type ActionTypes = IAddToken | IRemoveToken