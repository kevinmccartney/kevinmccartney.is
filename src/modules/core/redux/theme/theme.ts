import { updateFavicon } from './../../../shared/utilities/update-favicon/update-favicon';
import { AppStoreState } from '../../models';
import { Action, AnyAction, Dispatch } from 'redux';

export type ThemeState = 'light' | 'dark';

const TOGGLE_THEME = 'TOGGLE_THEME';
const INITIALIZE_THEME = 'INITIALIZE_THEME';

export type ToggleThemeAction = {
  type: typeof TOGGLE_THEME;
  payload: 'dark' | 'light';
};

const handleUpdateFavicon = (theme: 'dark' | 'light') => {
  if (theme === 'light') {
    updateFavicon('dark');
  } else if (theme === 'dark') {
    updateFavicon('light');
  }
};

export const initializeTheme = (theme: 'dark' | 'light') => ({
  type: INITIALIZE_THEME,
  payload: theme,
});

export const toggleTheme = () => {
  return function (dispatch: Dispatch<any>, getState: () => AppStoreState) {
    const stateTheme = getState().theme;

    handleUpdateFavicon(stateTheme);

    return dispatch({
      type: TOGGLE_THEME,
    });
  };
};

const initialState = null;

const reducer: (
  state: ThemeState | null,
  action: Action,
) => ThemeState | null = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INITIALIZE_THEME:
      return action.payload;
    case TOGGLE_THEME:
      return state === 'dark' ? 'light' : 'dark';
    default:
      return state;
  }
};

export default reducer;
