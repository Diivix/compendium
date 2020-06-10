import jwt from 'jsonwebtoken';
import { isNullOrUndefined, isString, isNull } from 'util';

export const isTokenValid = (accessToken: string): boolean => {
  if (isNull(accessToken)) return false;
  
  const decodedToken = jwt.decode(accessToken);

  if (isString(decodedToken) || isNull(decodedToken)) return false;

  return isTokenExpired(decodedToken);
};

const isTokenExpired = (accessToken: { [key: string]: any }): boolean => {
  let isValid = true;
  if (!isNullOrUndefined(accessToken)) {
    const now = Math.floor(Date.now() / 1000);
    isValid = accessToken.exp >= now;
  }

  return isValid;
};
