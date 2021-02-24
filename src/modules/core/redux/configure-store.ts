import { loadState } from './utilities';
import { createStore, combineReducers, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import themeReducer from './theme';

const hydratedState = loadState();

const reducer = combineReducers({
  theme: themeReducer,
});

export const configureStore: () => Store = () =>
  createStore(
    reducer,
    hydratedState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
