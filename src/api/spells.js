// GET
// Gets a spell (full spell), from an id
export function getSpell(id) {
  const url = process.env.REACT_APP_APP_API + '/spell/' + id;

  return fetch(url, {
    credentials: 'include',
    method: 'GET'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status, response.statusText);
      }
    })
    .then(spell => {
      return spell;
    });
}

// GET
// Gets spells from query
export function getSpellByQuery(query, lightlyload) {
  let url = process.env.REACT_APP_APP_API + '/spell/query';

  if (lightlyload) url += 'lightyload=true';

  return fetch(url, {
    body: JSON.stringify(query),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status, response.statusText);
      }
    })
    .then(spell => {
      return spell;
    });
}
