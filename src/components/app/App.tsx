import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router';
import Routes from '../routes/Routes';
import {isTokenValid} from '../../utils/auth'
import Navbar from '../navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../models/IState';
import { isNullOrUndefined, isNull } from 'util';
import { REMOVE_TOKEN, SET_CHARACTERS, UPDATE_CHARACTERS } from '../../redux/types';
import * as charactersApi from '../../api/characters';
import Loader from '../common/Loader';
import ErrorComponent from '../common/ErrorComponent';
import { decodeCharacter } from '../../utils/characters';

export default function App() {
  const dispatch = useDispatch();
  let token = useSelector((state: IState) => state.token);
  let isAuthenticated = false;
  const charactersRequireUpdate = useSelector((state: IState) => state.updateCharacterState)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInError, setIsInError] = useState<boolean>(false);

  if (!isNullOrUndefined(token) && isTokenValid(token)) {
    isAuthenticated = true;
  } else if (!isNullOrUndefined(token) && !isTokenValid(token)) {
    // If the token exists but isn't valid, remove it form the store.
    dispatch({ type: REMOVE_TOKEN });
  }

  useEffect(() => {
    if (!isNull(token) && charactersRequireUpdate) {
      fetchData(token);
    };

    async function fetchData(token: string) {
      const characters = await charactersApi.getAllCharacters({ token })
      if (isNull(characters)) {
        setIsInError(true);
      } else {
        const decodedCharacter = characters.map(x => decodeCharacter(x));
        dispatch({ type: SET_CHARACTERS, payload: decodedCharacter });
        dispatch({ type: UPDATE_CHARACTERS, payload: false });
        setIsLoading(false);
      }
    }
  });

  if (isInError) {
    return <ErrorComponent title="The Compendium is not available" message="" />
  }

  if (isLoading) {
    return (<Loader />)
  }

  return (
    <div>
      {isAuthenticated && (
        <Navbar />
      )}
      <div className="content">
        <Switch>
          <Routes isAuthenticated={isAuthenticated} />
        </Switch>
      </div>
    </div>
  );
};
