import React from 'react';
import { Switch } from 'react-router';
import Routes from '../routes/Routes';
import { hasValidToken } from '../../utils/auth';
import { useStore } from '../../store';
import {getToken, setToken} from '../../utils/auth'
import Navbar from '../navbar/Navbar'
import { useHistory } from 'react-router-dom'

const isUserAuthenticated= (token) => {
  const localToken = getToken();

  if(!localToken || (token && localToken !== token)) {
      setToken(token); // Assumes "token" is always the more up to date version.
  } 

  return hasValidToken();
};

export default () => {
  const [{ token }] = useStore();
  const isAuthenticated = isUserAuthenticated(token);
  const history = useHistory();

  return (
    <div>
      {isAuthenticated && (
        // <Navbar activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} handleSignOut={this.handleSignOut} />
        <Navbar title="Hello" handleLogout={() => { setToken(); history.push('/login') }} />
      )}
      <div className="content">
        <Switch>
          <Routes isAuthenticated={isAuthenticated} />
        </Switch>
      </div>
    </div>
  );
};
