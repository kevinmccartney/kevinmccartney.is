import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { throttle } from 'lodash-es';

import { Homepage } from './modules/homepage/containers';
import { configureStore } from 'modules/core/redux';
import { saveState } from 'modules/core/redux/utilities';
import { updateFavicon } from 'modules/shared/utilities';
import { initializeTheme, toggleTheme } from 'modules/core/redux/theme/theme';

const store: Store = configureStore();

const { theme } = store.getState();
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
  .matches;
const systemPreference = prefersDarkMode ? 'dark' : 'light';

updateFavicon(theme || systemPreference);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }),
);

store.dispatch(initializeTheme(theme || systemPreference));

export const App = () => (
  <Provider store={store}>
    <Homepage />
  </Provider>
);
