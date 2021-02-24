import themeReducer, { toggleTheme } from './theme';

describe('Theme ducks', () => {
  describe('toggleTheme', () => {
    test('returns a toggle theme action', () => {
      const toggleThemeAction = toggleTheme();

      expect(toggleThemeAction).toEqual({
        type: 'TOGGLE_THEME',
      });
    });
  });

  describe('themeReducer', () => {
    test('handles a toggle theme action', () => {
      const state = themeReducer(undefined, { type: 'TOGGLE_THEME' });

      expect(state).toEqual('light');
    });

    test('handles the default case', () => {
      const state = themeReducer(undefined, { type: '' });

      expect(state).toEqual('dark');
    });
  });
});
