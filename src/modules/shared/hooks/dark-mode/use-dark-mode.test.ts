import { act, renderHook } from '@testing-library/react-hooks';

import { useDarkMode } from './use-dark-mode';

describe('useDarkMode', () => {
  describe('toggleTheme', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('sets the theme light in local storage', () => {
      const { result } = renderHook(() => useDarkMode());

      act(() => {
        const [, toggleTheme] = result.current;

        toggleTheme('light');
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    test('sets the background body color to white', () => {
      const { result } = renderHook(() => useDarkMode());

      act(() => {
        const [, toggleTheme] = result.current;

        toggleTheme('light');
      });

      expect(document.body.style.backgroundColor).toBe('white');
    });

    test('sets the theme dark in local storage', () => {
      const { result } = renderHook(() => useDarkMode());

      act(() => {
        const [, toggleTheme] = result.current;

        toggleTheme('dark');
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    test('sets the background body color to black', () => {
      const { result } = renderHook(() => useDarkMode());

      act(() => {
        const [, toggleTheme] = result.current;

        toggleTheme('dark');
      });

      expect(document.body.style.backgroundColor).toBe('black');
    });

    test('does not set the theme if there is no local storage record', () => {
      const { result } = renderHook(() => useDarkMode());
      ((localStorage.getItem as unknown) as jest.SpyInstance).mockReturnValue(
        null,
      );

      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    test('sets the theme if there is a light local storage record', () => {
      // TODO: figure out how to trigger useEffect

      expect(true).toBe(true);
    });

    test('updates the favicon if there is a light local storage record', () => {
      // TODO: figure out how to trigger useEffect

      expect(true).toBe(true);
    });

    test('sets the document background color if there is a light local storage record', () => {
      // TODO: figure out how to trigger useEffect

      expect(true).toBe(true);
    });
  });
});
