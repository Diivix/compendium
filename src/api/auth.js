export function login(credentials) {
  const url = process.env.AUTH_API + '/signin';

  return fetch(url, {
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(response => {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.status, response.statusText);
    }
  });
}

export function validateToken(credentials) {
  const url = process.env.AUTH_API + '/user';

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
}