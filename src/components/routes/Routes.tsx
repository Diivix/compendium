import React from 'react';
import FullCharacter from '../characters/FullCharacter';
import CharacterCompendium from '../characters/CharacterCompendium';
import CreateCharacter from '../characters/CreateCharacter';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../error/NotFound';
import Login from '../login/Login';
import FullSpell from '../spells/FullSpell';
import SpellCompendium from '../spells/SpellCompendium';
import AuthenticateRoute from './AuthenticateRoute';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';

// Paths
const ROOT_PATH = '/';
const LOGIN_PATH = '/login';
const HOME_PATH = '/home';
const CHARACTERS_PATH = '/characters';
const CHARACTERS_SINGLE_PATH = '/characters/:id';
const CREATE_CHARACTER = '/createcharacter';
const SPELLS_PATH = '/spells';
const SPELLS_SINGLE_PATH = '/spells/:id';

interface IProps {
  readonly isAuthenticated: boolean;
}

export default (props: IProps) => {
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

      {/* Path: /login */}
      <RedirectIfAuthenticated
        exact={true}
        path={LOGIN_PATH}
        component={Login}
        redirectPath={HOME_PATH}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /home */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={LOGIN_PATH}
        path={HOME_PATH}
        component={SpellCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /characters */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={LOGIN_PATH}
        path={CHARACTERS_PATH}
        component={CharacterCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /characters/:id */}
      <AuthenticateRoute
        authenticatePath={LOGIN_PATH}
        path={CHARACTERS_SINGLE_PATH}
        component={FullCharacter}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /createcharacter */}
      <AuthenticateRoute
        authenticatePath={LOGIN_PATH}
        path={CREATE_CHARACTER}
        component={CreateCharacter}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /spells */}
      <AuthenticateRoute
        exact={true}
        authenticatePath={LOGIN_PATH}
        path={SPELLS_PATH}
        component={SpellCompendium}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /spell/:id */}
      <AuthenticateRoute
        authenticatePath={LOGIN_PATH}
        path={SPELLS_SINGLE_PATH}
        component={FullSpell}
        isAuthenticated={props.isAuthenticated}
      />

      <Route component={NotFound} />
    </Switch>
  );
};
