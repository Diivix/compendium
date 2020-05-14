import React, { useEffect } from 'react';
import { Switch } from 'react-router';
import Routes from '../routes/Routes';
import {isTokenValid} from '../../utils/auth'
import Navbar from '../navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../models/IState';
import { isNullOrUndefined, isNull } from 'util';
import { REMOVE_TOKEN, SET_CHARACTERS } from '../../redux/types';
import * as charactersApi from '../../api/characters';

export default () => {
  let token = useSelector((state: IState) => { return state.token });
  const dispatch = useDispatch();

  let isAuthenticated = false;
  if(!isNullOrUndefined(token) && isTokenValid(token)) {
    isAuthenticated = true;
  } else if(!isNullOrUndefined(token) && !isTokenValid(token)) {
    // If the token exists but isn't valid, remove it form the store.
    dispatch({ type: REMOVE_TOKEN });
    token = null;
  }

  useEffect(() => {
    if (!isNull(token)) {
      fetchData(token);
    };

    async function fetchData(token: string) {
      const characters = await charactersApi.getAllCharacters({ token })
      dispatch({ type: SET_CHARACTERS, payload: characters });
    }
  });

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
