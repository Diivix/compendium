import React from 'react';
import { Switch } from 'react-router';
import Routes from '../routes/Routes';
import {isTokenValid} from '../../utils/auth'
import Navbar from '../navbar/Navbar'
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import { isNullOrUndefined, isNull } from 'util';


export default () => {

  const token = useSelector((state: IState) => { return state.token });

  if(!isNull(token)) console.log(!isNullOrUndefined(token) + ' : ' + isTokenValid(token));

  const isAuthenticated = !isNullOrUndefined(token) && isTokenValid(token);

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
