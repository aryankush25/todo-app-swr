import React from 'react';
import _ from 'lodash';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';
import { isPresentLocalStorageTokens } from '../utils/tokensHelper';
import {
  ROOT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  HOME_ROUTE
} from '../utils/routesConstants';
import Root from './Root';
import PageNotFound from './PageNotFound';
import Login from './Login';
import Register from './Register';
import Home from './Home';

const routesConfig = {
  Root: {
    path: ROOT_ROUTE,
    component: Root,
    exact: true,
    privateRoute: false
  },
  login: {
    path: LOGIN_ROUTE,
    component: Login,
    exact: true,
    privateRoute: false
  },
  register: {
    path: REGISTER_ROUTE,
    component: Register,
    exact: true,
    privateRoute: false
  },
  home: {
    path: HOME_ROUTE,
    component: Home,
    exact: true,
    privateRoute: true
  }
};

const ProtectedRoutes = (props) => {
  const { component: Component, privateRoute, ...rest } = props;
  const isUserPresent = isPresentLocalStorageTokens();

  const isValidRoute =
    (privateRoute && isUserPresent) || !(privateRoute || isUserPresent);

  if (isValidRoute) {
    return <Component {...rest} />;
  }

  return <Redirect to={privateRoute ? LOGIN_ROUTE : HOME_ROUTE} />;
};

const AppRoutes = () => {
  const routes = _.keys(routesConfig);

  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          const config = routesConfig[route];

          return (
            <Route
              exact={config.exact}
              key={`${route}`}
              path={config.path}
              render={(props) => (
                <ProtectedRoutes
                  component={config.component}
                  privateRoute={config.privateRoute}
                  {...props}
                />
              )}
            />
          );
        })}

        <Route path="*" render={() => <PageNotFound />} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
