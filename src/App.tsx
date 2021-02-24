import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { throttle } from 'lodash-es';

import { Homepage } from './modules/homepage/containers';
import { configureStore } from 'modules/core/redux';
import { saveState } from 'modules/core/redux/utilities';
import { updateFavicon } from 'modules/shared/utilities';

const store: Store = configureStore();

const { theme } = store.getState();

updateFavicon(theme);

store.subscribe(
  throttle(() => {
    saveState({
      theme,
    });
  }),
);

export const App = () => (
  <Provider store={store}>
    <Homepage />
  </Provider>
);
