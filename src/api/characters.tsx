import { ICharacter } from '../models/ICharacter';

interface IGetCharacterProps {
  token: string
};

export const getCharacters = (props: IGetCharacterProps): Promise<ICharacter[]> => {
  let url = process.env.REACT_APP_APP_API + '/character';

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
    .then(characters => {
      return characters;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};


