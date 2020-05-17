import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps {
  readonly isAuthenticated: boolean;
  readonly redirectPath: string;
  readonly component: React.ComponentClass<any> | React.StatelessComponent<any>;
}

// Redirects user if they are authenticated.
export default function RedirectAuthenticated({ exact, path, component, redirectPath, isAuthenticated, ...rest }: IProps) {
  const Component = component;

  const render = (renderProps: RouteComponentProps) => {
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
};
