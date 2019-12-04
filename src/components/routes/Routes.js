import React from 'react';
import PropTypes from 'prop-types';
// import Character from 'components/characters/Character';
// import CharacterCompendium from 'components/characters/CharacterCompendium';
import { Route, Switch } from 'react-router-dom';
import Error404Page from '../error/ErrorNotFound';
import Login from '../login/Login';
// import Spell from '../components/spells/Spell';
import SpellCompendium from '../spells/SpellCompendium';
import AuthenticateRoute from './AuthenticateRoute';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';

// Paths
const ROOT_PATH = '/';
const LOGIN_PATH = '/login';
const HOME_PATH = '/home';
const CHARACTERS_PATH = '/characters';
const CHARACTERS_SINGLE_PATH = '/characters/:id';
const SPELLS_PATH = '/spells';
const SPELLS_SINGLE_PATH = '/spells/:id';

function Routes(props) {
  return (
    <Switch>
      {/* path: / */}
      <RedirectIfAuthenticated
        exact={true}
        path={ROOT_PATH}
        component={Login}
        redirectPath={HOME_PATH}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /signin */}
      <RedirectIfAuthenticated path={LOGIN_PATH} component={Login} redirectPath={HOME_PATH} isAuthenticated={props.isAuthenticated} />

      {/* Path: /home */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={LOGIN_PATH}
        path={HOME_PATH}
        component={SpellCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /characters */}
      {/* <AuthenticateRoute
        exact={true}
        authenticatePath={LOGIN_PATH}
        path={CHARACTERS_PATH}
        component={CharacterCompendium}
        isAuthenticated={props.isAuthenticated}
      /> */}

      {/* Path: /characters/:id */}
      {/* <AuthenticateRoute
        authenticatePath={LOGIN_PATH}
        path={CHARACTERS_SINGLE_PATH}
        component={Character}
        isAuthenticated={props.isAuthenticated}
      /> */}

      {/* Path: /spells */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={LOGIN_PATH}
        path={SPELLS_PATH}
        component={SpellCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /spell/:id */}
      {/* <AuthenticateRoute
        authenticatePath={LOGIN_PATH}
        path={SPELLS_SINGLE_PATH}
        component={Spell}
        isAuthenticated={props.isAuthenticated}
      /> */}

      <Route component={Error404Page} />
    </Switch>
  );
}

Routes.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default Routes;
