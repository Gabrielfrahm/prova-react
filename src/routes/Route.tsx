import React from 'react';
import {
  RouteProps as ReactDomRouterProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import {auth} from '../hooks/auth';

interface RouteProps extends ReactDomRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!auth() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
