export function isUserAuthenticated() {
  // TODO: Implement this.
  return false;
}

export function setToken(token) {
  localStorage.setItem('jwt', token);
}

export function getToken() {
  localStorage.getItem('jwt');
}
