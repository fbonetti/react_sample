import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import Patients from './containers/Patients';
import NoMatch from './containers/NoMatch';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Login} />
    <Route path="patients" component={Patients} />
    <Route path="*" component={NoMatch} />
  </Route>
);