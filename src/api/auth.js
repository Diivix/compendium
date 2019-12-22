export const login = async credentials => {
  const url = process.env.REACT_APP_AUTH_API + '/signin';

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

export const validateToken = async credentials => {
  const url = process.env.REACT_APP_AUTH_API + '/user';

  return await fetch(url, {
    body: JSON.stringify(credentials),
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
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
