import { ISpell } from '../models/ISpell';
import { ISpellFilters } from '../models/ISpellFilters';
import { isNullOrUndefined } from 'util';

interface IQuery {
  id?: number,
  tags?: string[],
  operatorAnd?: boolean
};

interface IGetSpellsProps {
  accessToken: string
  lightlyload: boolean,
  limit: number
};

interface IGetSpellsByQueryProps {
  accessToken: string
  query: IQuery,
  lightlyload: boolean,
  limit?: number
};

interface IGetFiltersProps {
  accessToken: string
};

export const getSpells = (props: IGetSpellsProps): Promise<ISpell[]> => {
  let url = process.env.REACT_APP_APP_API + '/spell';

  if (props.lightlyload) url += '?lightlyload=true';
  const delimiter = props.lightlyload ? '&' : '?';
  url += delimiter + 'limit=' + props.limit;

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.accessToken
    },
    method: 'GET'
  })
    .then(response => {
      if (response.ok) {
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

export const getSpellsByQuery = (props: IGetSpellsByQueryProps): Promise<ISpell[]> => {
  let url = process.env.REACT_APP_APP_API + '/spell/query';
  if (props.lightlyload && !isNullOrUndefined(props.lightlyload)) url += '?lightlyload=true';
  const delimiter = props.lightlyload && !isNullOrUndefined(props.lightlyload) ? '&' : '?';
  url = (props.limit && !isNullOrUndefined(props.limit)) ? url +  delimiter + 'limit=' + props.limit : url;

  return fetch(url, {
    body: JSON.stringify(props.query),
    credentials: 'include',
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.accessToken,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => {
      if (response.ok) {
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

export const getFilters = (props: IGetFiltersProps): Promise<ISpellFilters> => {
  let url = process.env.REACT_APP_APP_API + '/Spell/Filters';

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.accessToken
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
    .then(filters => {
      return filters;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};
