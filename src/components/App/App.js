import React from 'react';
import { Switch } from 'react-router';
import Routes from '../routes/Routes';
import { hasValidToken } from '../../utils/auth';
import { useStore } from '../../store';
import {getTokenDecoded, setToken} from '../../utils/auth'
import Navbar from '../navbar/Navbar'

const isUserAuthenticated= (token) => {
  const localToken = getTokenDecoded();

  if(!localToken || (token && localToken !== token)) {
      setToken(token); // Assumes "token" is always the more up to date version.
  } 

  return hasValidToken();
};

export default () => {
  const [{ token }] = useStore();
  const isAuthenticated = isUserAuthenticated(token);

  return (
    <div>
      {isAuthenticated && (
        <Navbar setToken={setToken} />
      )}
      <div className="content">
        <Switch>
          <Routes isAuthenticated={isAuthenticated} />
        </Switch>
      </div>
    </div>
  );
};
