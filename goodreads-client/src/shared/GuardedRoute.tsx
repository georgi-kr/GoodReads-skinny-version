import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { PATHS } from '../constants/paths.constant';

const GuardedRoute = ({component, isLogged, ...rest}: any) => {
  const routeComponent = (props: any) => (
      isLogged
          ? React.createElement(component, props)
          : <Redirect to={{pathname: PATHS.HOME}}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};
export default GuardedRoute;