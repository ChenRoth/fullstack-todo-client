import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { TodosPage } from './pages/todos/TodosPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { Header } from './components/Header/Header';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute path="" component={TodosPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
