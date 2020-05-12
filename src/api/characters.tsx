import { ICharacter, ICharacterBase } from '../models/ICharacter';

interface IProps {
  token: string
};

interface ICharacterIdProps {
  token: string;
  id: number;
};

interface ICharacterProps {
  token: string;
  character: ICharacterBase | ICharacter;
};

export const getAllCharacters = (props: IProps): Promise<ICharacter[]> => {
  let url = process.env.REACT_APP_APP_API + '/character';

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.token
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
    .then(characters => {
      return characters;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};

export const getCharacter = (props: ICharacterIdProps): Promise<ICharacter> => {
  let url = process.env.REACT_APP_APP_API + '/character/' + props.id;

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.token
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
    .then(character => {
      return character;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};

export const createCharacter = (props: ICharacterProps): Promise<ICharacter> => {
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
      if (response.ok) {
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

export const editCharacter = (props: ICharacterProps): Promise<ICharacter> => {
  let url = process.env.REACT_APP_APP_API + '/character';

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.token,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(props.character)
  })
    .then(response => {
      if (response.ok) {
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

export const deleteCharacter = (props: ICharacterIdProps): Promise<boolean> => {
  let url = process.env.REACT_APP_APP_API + '/character/' + props.id;

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.token,
    },
    method: 'DELETE',
  })
    .then(response => {
      return response.ok;
    })
    .catch(ex => {
      console.log(ex);
      return false;
    });
};


