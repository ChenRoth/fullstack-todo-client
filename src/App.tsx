import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute path="">hi</PrivateRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
