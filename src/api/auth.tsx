
interface ICredentials {
  email: string,
  password: string
};

export const login = async (credentials: ICredentials): Promise<{token: string}> => {
  const url: string = process.env.REACT_APP_AUTH_API + '/signin';

  return await fetch(url, {
    headers: {
      Authorization: 'BASIC ' + btoa(credentials.email + ':' + credentials.password)
    },
    method: 'POST'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    .then(data => data)
    .catch(ex => {
      console.log(ex);
      return null;
    });
};
