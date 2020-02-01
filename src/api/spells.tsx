import {getToken} from '../utils/auth'
import { ISpell } from '../models/ISpell';

interface IGetSpellsProps {
  lightlyload: boolean,
  limit: number
};

export const getSpells = ({ lightlyload, limit }: IGetSpellsProps): Promise<ISpell[]> => {
  let url = process.env.REACT_APP_APP_API + '/spell';

  if (lightlyload) url += '?lightlyload=true';
  const delimiter = lightlyload ? '&' : '?';
  url += delimiter + 'limit=' + limit;

  const token =  getToken();

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + token
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
  query: IQuery,
  lightlyload: boolean,
};

export const getSpellsByQuery = ({ query, lightlyload }: IGetSpellsByQueryProps): Promise<ISpell[]> => {
  let url = process.env.REACT_APP_APP_API + '/spell/query';
  if (lightlyload) url += '?lightyload=true';
  const token =  getToken();

  return fetch(url, {
    body: JSON.stringify(query),
    credentials: 'include',
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + token,
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
