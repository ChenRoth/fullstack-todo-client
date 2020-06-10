import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="">hi</Route>
        </Switch>
      </div>
    );
  }
}

export default App;
