import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router';
import Routes from '../routes/Routes';
import {isTokenValid} from '../../utils/auth'
import Navbar from '../navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../models/IState';
import { isNullOrUndefined, isNull } from 'util';
import { SET_CHARACTERS, UPDATE_CHARACTERS } from '../../redux/types';
import * as charactersApi from '../../api/characters';
import Loader from '../common/Loader';
import ErrorComponent from '../common/ErrorComponent';
import { decodeCharacter } from '../../utils/characters';

export default function App() {
  const dispatch = useDispatch();
  let accessToken = useSelector((state: IState) => state.accessToken);
  let isAuthenticated = false;
  const charactersRequireUpdate = useSelector((state: IState) => state.updateCharacterState)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInError, setIsInError] = useState<boolean>(false);

  if (!isNullOrUndefined(accessToken) && isTokenValid(accessToken)) {
    isAuthenticated = true;
  } else if (!isNullOrUndefined(accessToken) && !isTokenValid(accessToken)) {
    // TODO: Do not remove token, instead use the refresh token (and access token) to get a new token pair from the server.
    // If the response is bad, clear out both tokens and log the user out.

    // OLD COMMENT - If the accessToken exists but isn't valid, remove it form the store.
    //dispatch({ type: REMOVE_TOKEN_PAIR });
  }

  useEffect(() => {
    if (!isNull(accessToken) && charactersRequireUpdate) {
      fetchData(accessToken);
    };

    // FIXME: fetchData gets called twice when creating a new character, but should only be called once.
    async function fetchData(accessToken: string) {
      // TODO: consider not setting loading here as it causes the whole app to show a loading component.
      setIsLoading(true);
      const characters = await charactersApi.getAllCharacters({ accessToken })
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
