import jwt from 'jsonwebtoken';
import { isNullOrUndefined, isString, isNull } from 'util';

export const isTokenValid = (token: string): boolean => {
  if (isNull(token)) return false;
  
  const decodedToken = jwt.decode(token);

  if (isString(decodedToken) || isNull(decodedToken)) return false;

  return isTokenExpired(decodedToken);
};

const isTokenExpired = (token: { [key: string]: any }): boolean => {
  let isValid = true;
  if (!isNullOrUndefined(token)) {
    const now = Math.floor(Date.now() / 1000);
    isValid = token.exp >= now;
  }

  return isValid;
};
