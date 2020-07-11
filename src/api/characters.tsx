import { ICharacter, ICharacterBase } from '../models/ICharacter';

interface IProps {
  accessToken: string
};

interface ICharacterIdProps {
  accessToken: string;
  id: number;
};

interface ICharacterProps {
  accessToken: string;
  character: ICharacterBase | ICharacter;
};

interface ICharacterIdAndSpellIdProps {
  accessToken: string
  characterAndSpellId: {
    characterId: number,
    spellId: number
  }
}

export const getAllCharacters = (props: IProps): Promise<ICharacter[]> => {
  const url = process.env.REACT_APP_APP_API + '/Character/All';

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
    .then(characters => {
      // const decodedCharacters = characters.map(x => decodeCharacter(x));
      return characters;
    })
    .catch(ex => {
      console.log(ex);
      return null;
    });
};

export const createCharacter = (props: ICharacterProps): Promise<ICharacter> => {
  const url = process.env.REACT_APP_APP_API + '/Character/Create';
  const encodedCharacter = JSON.stringify(props.character);

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.accessToken,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: encodedCharacter
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

export const updateCharacter = (props: ICharacterProps): Promise<boolean> => {
  const url = process.env.REACT_APP_APP_API + '/Character/Update';
  const encodedCharacter = JSON.stringify(props.character);

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.accessToken,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: encodedCharacter
  })
    .then(response => {
      return response.ok;
    })
    .catch(ex => {
      console.log(ex);
      return false;
    });
};

export const deleteCharacter = (props: ICharacterIdProps): Promise<boolean> => {
  const url = process.env.REACT_APP_APP_API + '/Character/Delete/' + props.id;

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.accessToken,
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

export const addSpellToCharacter = (props: ICharacterIdAndSpellIdProps): Promise<boolean> => {
  const url = process.env.REACT_APP_APP_API + '/Character/AddSpell'

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.accessToken,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(props.characterAndSpellId)
  })
    .then(response => {
      return response.ok;
    })
    .catch(ex => {
      console.log(ex);
      return false;
    });
};

export const removeSpellFromCharacter = (props: ICharacterIdAndSpellIdProps): Promise<boolean> => {
  let url = process.env.REACT_APP_APP_API + '/Character/RemoveSpell'

  return fetch(url, {
    headers: {
      credentials: 'include',
      Authorization: 'BEARER ' + props.accessToken,
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify(props.characterAndSpellId)
  })
    .then(response => {
      return response.ok;
    })
    .catch(ex => {
      console.log(ex);
      return false;
    });
};


