import {createStore as createReduxStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer } from './reducer'

export function createStore() {
    const logger = createLogger();
    const middleware = composeWithDevTools(applyMiddleware(logger, thunk));
    return createReduxStore(reducer, middleware)
}