import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

function AuthenticateRoute({ component, authenticatePath, isAuthenticated, ...rest }) {
  const Component = component;

  const render = (renderProps) => {
    let element = (
      <Redirect
        to={{
          pathname: authenticatePath,
          state: { from: renderProps.location }
        }}
      />
    );

    if (isAuthenticated) {
      element = <Component {...renderProps} />;
    }

    return element;
  };

  return <Route {...rest} render={render} />;
}

AuthenticateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  authenticatePath: PropTypes.string,
  component: PropTypes.object
};

export default AuthenticateRoute;
