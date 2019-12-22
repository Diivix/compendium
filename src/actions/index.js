import * as types from './types';

export const login = (token) => ({ type: types.LOGIN, payload: { token } });
export const logout = () => ({ type: types.LOGOUT });

