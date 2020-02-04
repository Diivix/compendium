import { ISpell } from '../models/ISpell';

interface IGetSpellsProps {
  token: string
  lightlyload: boolean,
  limit: number
};

export const getSpells = (props: IGetSpellsProps): Promise<ISpell[]> => {
  let url = process.env.REACT_APP_APP_API + '/spell';

  if (props.lightlyload) url += '?lightlyload=true';
  const delimiter = props.lightlyload ? '&' : '?';
  url += delimiter + 'limit=' + props.limit;

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.token
    },
    method: 'GET'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status + ': ' + response.statusText);
      }
    })
    .then(spells => {
      return spells;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};

interface IQuery {
  id?: number,
  tags?: string[],
  operatorAnd?: boolean
};

interface IGetSpellsByQueryProps {
  token: string
  query: IQuery,
  lightlyload: boolean,
};

export const getSpellsByQuery = (props: IGetSpellsByQueryProps): Promise<ISpell[]> => {
  let url = process.env.REACT_APP_APP_API + '/spell/query';
  if (props.lightlyload) url += '?lightyload=true';

  return fetch(url, {
    body: JSON.stringify(props.query),
    credentials: 'include',
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.token,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status + ': ' +response.statusText);
      }
    })
    .then(spells => {
      return spells;
    }).catch(ex => {
      console.log(ex);
      return null;
    });
};
