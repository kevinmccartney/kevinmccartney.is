import { updateFavicon } from './../../../shared/utilities/update-favicon/update-favicon';
import { AppStoreState } from '../../models';
import { Action, Dispatch } from 'redux';

export type ThemeState = 'light' | 'dark';

const TOGGLE_THEME = 'TOGGLE_THEME';

export const toggleTheme = () => {
  return function (dispatch: Dispatch<any>, getState: () => AppStoreState) {
    const { theme } = getState();

    if (theme === 'light') {
      updateFavicon('dark');
    } else if (theme === 'dark') {
      updateFavicon('light');
    }

    return dispatch({
      type: TOGGLE_THEME,
    });
  };
};

const initialState = 'dark';

const reducer: (state: ThemeState | undefined, action: Action) => ThemeState = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return state === 'dark' ? 'light' : 'dark';
    default:
      return state;
  }
};

export default reducer;
