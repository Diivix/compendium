
export const login = (state, {payload}) => ({
  ...state,
  token: payload.token
});

export const logout = (state) => ({
  ...state,
  token: null
});