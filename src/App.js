import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import HomePage from './features/Home/HomePage'
import ChatPage from './features/Chat/ChatPage'
import LoginPage from './features/Login/LoginPage'
import SignupPage from './features/Signup/SignupPage'

function PublicRoute ({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated
          ? <Component {...props} />
          : <Redirect to="/chat" />
      }
    />
  )
}

function PrivateRoute ({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  )
}

function App () {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const render = () => {
    return loading
      ? <h2>...Loading</h2>
      : (
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <PrivateRoute path="/chat" authenticated={authenticated} component={ChatPage}></PrivateRoute>
            <PublicRoute path="/signup" authenticated={authenticated} component={SignupPage}></PublicRoute>
            <PublicRoute path="/login" authenticated={authenticated} component={LoginPage}></PublicRoute>
          </Switch>
        </Router>
      )
  }

  return (
    { render }
  );
}

export default App;
