import React from 'react';
import FullCharacter from '../characters/FullCharacter';
import CharacterCompendium from '../characters/CharacterCompendium';
import CreateCharacter from '../characters/CreateCharacter';
import EditCharacter from '../characters/EditCharacter';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../error/NotFound';
import Login from '../login/Login';
import FullSpell from '../spells/FullSpell';
import SpellCompendium from '../spells/SpellCompendium';
import AuthenticateRoute from './AuthenticateRoute';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';
import {
  ROOT_PATH,
  HOME_PATH,
  LOGIN_PATH,
  CHARACTERS_PATH,
  CREATE_CHARACTER_PATH,
  SPELLS_PATH,
  EDIT_CHARACTER_PATH,
} from './PathConsts';

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
        path={CHARACTERS_PATH + '/:id'}
        component={FullCharacter}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /createcharacter */}
      <AuthenticateRoute
        authenticatePath={LOGIN_PATH}
        path={CREATE_CHARACTER_PATH}
        component={CreateCharacter}
        isAuthenticated={props.isAuthenticated}
      />

      {/* Path: /editcharacter/:id */}
      <AuthenticateRoute
        authenticatePath={LOGIN_PATH}
        path={EDIT_CHARACTER_PATH + '/:id'}
        component={EditCharacter}
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
        path={SPELLS_PATH + '/:id'}
        component={FullSpell}
        isAuthenticated={props.isAuthenticated}
      />

      <Route component={NotFound} />
    </Switch>
  );
};
