import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

function RedirectIfAuthenticated({ exact, path, component, redirectPath, isAuthenticated, ...rest }) {
  const Component = component;

  const render = renderProps => {
    let element = <Component {...renderProps} />;

    if (isAuthenticated) {
      element = (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: renderProps.location }
          }}
        />
      );
    }

    return element;
  };

  return <Route {...rest} render={render} />;
}

RedirectIfAuthenticated.propTypes = {
  isAuthenticated: PropTypes.bool,
  redirectPath: PropTypes.string,
  component: PropTypes.func
};

export default RedirectIfAuthenticated;
