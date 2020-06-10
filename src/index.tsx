import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ActionType } from './redux/reducer';
import { LOCAL_STORAGE_TOKEN_KEY } from './consts';

const store = createStore();

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
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
