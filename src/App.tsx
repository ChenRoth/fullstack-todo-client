import React from 'react';
import './App.css';
import { Counter } from './components/Counter/Counter';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Counter/>
        <p>Add your components here...</p>
      </div>
    );
  }
}

export default App;
