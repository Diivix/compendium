import { ITokenPair } from "../models/ITokenPair";

interface ICredentials {
  email: string,
  password: string
};

export const login = async (credentials: ICredentials): Promise<{tokenPair: ITokenPair}> => {
  const url: string = process.env.REACT_APP_AUTH_API + '/signin';

  return await fetch(url, {
    headers: {
      // Authorization: 'BASIC ' + btoa(credentials.email + ':' + credentials.password)
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    method: 'POST'
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return null;
      }
    })
    .then(data => {
      return data;
    })
    .catch(ex => {
      console.log(ex);
      return undefined;
    });
};
