// @ts-check
import jwt from 'jsonwebtoken';

/**
 * @param {string}  token - The token as a base64 encoded string.
 */
export const setToken = token => {
  localStorage.setItem('jwt', token);
};

/**
 * @return {string}  The token.
 */
export const getToken = () => {
  return localStorage.getItem('jwt');
};

/**
 * @return {object}  The token as a decoded json object.
 */
export const getTokenDecoded = () => {
  return jwt.decode(localStorage.getItem('jwt'));
};

/**
 * @return {boolean}  Whether or not the  user has a valid token.
 */
export const hasValidToken = () => {
  const token = getTokenDecoded();
  return isTokenValid(token);
};

/**
 * @return {boolean}  Whether or not the token is valid.
 */
export const isTokenValid = token => {
  let isValid = false;
  if (token !== null && token !== undefined && token !== '' && token !== 'null') {
    const now = Math.floor(Date.now() / 1000);
    isValid = token.exp >= now;
  }

  return isValid;
};
