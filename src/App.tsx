import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { TodosPage } from './pages/todos/TodosPage';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute path="" component={TodosPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
