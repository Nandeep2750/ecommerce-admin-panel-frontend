import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';
import { loadState, saveState } from '../../helper/LocalstorageHelper';
import { APP_ENV_TYPE } from '../../config/constants';

const loggerMiddleware = createLogger();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middleware = [thunkMiddleware]

if (process.env.REACT_APP_ENV === APP_ENV_TYPE.LOCAL) {
    middleware.push(loggerMiddleware)
}

const peristedState = loadState();

export const store = createStore(
    rootReducer,
    peristedState,
    composeEnhancer(applyMiddleware(...middleware))
);

store.subscribe(() => {
    saveState(store.getState());
});