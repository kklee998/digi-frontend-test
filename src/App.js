/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import Login from './pages/login';
import SignUp from './pages/signup';
import NotFound from './pages/404';
import Users from './pages/users/users';
import { getToken } from './api';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { needsLogin: true } }} />)}
    />
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // For this I'll only be checking if a token exists, while
      // the Users page will actually check if the token is valid
      // In a production system, centralising the authN and authZ
      // check through Redux (and handling JWT refreshes as well)
      // is a much better practice. Since I only need to secure 1
      // route, this is much less time consuming
      authed: !!getToken(),
    };
  }

  render() {
    const { authed } = this.state;
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <PrivateRoute authed={authed} path="/users" component={Users} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
