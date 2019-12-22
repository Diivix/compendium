export async function login(credentials) {
  const url = process.env.REACT_APP_AUTH_API + '/signin';

  return await fetch(url, {
    headers: {
      Authorization: 'BASIC ' + btoa(credentials.email + ':' + credentials.password)
    },
    method: 'POST'
  })
    .then(response => {
      if (response.status === 200) {
        return response;
      } else {
        throw new Error(response.status, response.statusText);
      }
    })
    .then(response => response.json())
    .then(data => data);
  
}

export const validateToken = credentials => {
  const url = process.env.REACT_APP_AUTH_API + '/user';

  return fetch(url, {
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then(response => {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.status, response.statusText);
    }
  });
};
