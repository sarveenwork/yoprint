import { createStore, applyMiddleware, compose, Store } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/index';
import { RootState } from './types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store<RootState> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) as any
);

