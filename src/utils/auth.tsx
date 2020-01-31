import jwt from 'jsonwebtoken';
import { isNullOrUndefined, isString, isNull } from 'util';

/**
 * @param {string}  token - The token as a base64 encoded string.
 */
export const setToken = (token: string) => {
  localStorage.setItem('jwt', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('jwt');
};

export const getTokenDecoded = (): string | { [key: string]: any } | null => {
  const token: string | null = localStorage.getItem('jwt');

  return token ? jwt.decode(token) : null;
};

export const hasValidToken = (): boolean => {
  const token = getTokenDecoded();

  if (isString(token) || isNull(token)) return false;

  return isTokenValid(token);
};

export const isTokenValid = (token: { [key: string]: any }): boolean => {
  let isValid = false;
  if (!isNullOrUndefined(token)) {
    const now = Math.floor(Date.now() / 1000);
    isValid = token.exp >= now;
  }

  return isValid;
};
