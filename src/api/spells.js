import {getToken} from '../utils/auth'

/**
 * Query object
 * @typedef {Object} Query
 * @prop {number} [id] - A spell ID
 * @prop {string[]} tags - Spell tags
 * @prop {boolean} operatorAnd - Is operator of tags using And or OR.
 */

/**
 * GET
 * Gets all spells
 * @typedef {object} props
 * @prop {boolean} lightlyload - Should the spells be lightly loaded from the server.
 */
/** @param {props} */
export const getSpells = ({ lightlyload }) => {
  let url = process.env.REACT_APP_APP_API + '/spell';
  if (lightlyload) url += '?lightlyload=true';

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
        throw new Error(response.status, response.statusText);
      }
    })
    .then(spell => {
      return spell;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};


/**
 * GET
 * Gets spells from query
 *
 * @typedef {object} props
 * @prop {Query} query - The query object to send to the server.
 * @prop {bool} lightlyload - Should the spells be lightly loaded from the server.
 */
/** @param {props} */
export const getSpellByQuery = ({ query, lightlyload }) => {
  let url = process.env.REACT_APP_APP_API + '/spell/query';

  if (lightlyload) url += '?lightyload=true';

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
};
