import { ICharacter, ICharacterBase } from '../models/ICharacter';

interface IGetCharactersProps {
  token: string
};

interface IGetCharacterProps {
  token: string;
  id: number;
};

interface IAddCharacter {
  token: string;
  character: ICharacterBase;
};

export const getAllCharacters = (props: IGetCharactersProps): Promise<ICharacter[]> => {
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

export const getCharacter = (props: IGetCharacterProps): Promise<ICharacter> => {
  let url = process.env.REACT_APP_APP_API + '/character/' + props.id;

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
    .then(character => {
      return character;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};

export const CreateCharacter = (props: IAddCharacter): Promise<ICharacter> => {
  let url = process.env.REACT_APP_APP_API + '/character';

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.token,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(props.character)
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status + ': ' + response.statusText);
      }
    })
    .then(character => {
      return character;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};


