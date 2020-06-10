import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ActionType } from './redux/reducer';
import { createStore } from './redux/store';
import * as serviceWorker from './serviceWorker';
import { getToken } from './token';

const store = createStore();

const token = getToken();
if (token) {
  store.dispatch({
    type: ActionType.LoginSuccess,
    payload: {}
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
