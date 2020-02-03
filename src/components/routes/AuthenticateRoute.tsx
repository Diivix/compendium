import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps {
  readonly isAuthenticated: boolean;
  readonly authenticatePath: string;
  readonly component: React.ComponentClass<any> | React.StatelessComponent<any>;
}

export default ({ component, authenticatePath, isAuthenticated, ...rest }: IProps) => {
  const Component = component;

  const render = (renderProps: RouteComponentProps<any>) => {
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
};
