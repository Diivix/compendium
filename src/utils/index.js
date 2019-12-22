import jwt from 'jsonwebtoken';

export const setToken = token => {
  localStorage.setItem('jwt', token);
};

export const getToken = () => {
  return jwt.decode(localStorage.getItem('jwt'));
};

export const hasValidToken = () => {
  const token = getToken();
  return isTokenValid(token);
};

export const isTokenValid = token => {
  let isValid = false;
  if (token !== null && token !== undefined && token !== '' && token !== 'null') {
    const now = Math.floor(Date.now() / 1000);
    isValid = token.exp >= now;
  }

  return isValid;
};
