import { useEffect, useState } from 'react';
import { updateFavicon } from '../../utilities';

export const useDarkMode: () => [string, (mode: string) => void] = () => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = (mode: string) => {
    if (mode === 'light') {
      window.localStorage.setItem('theme', 'light');
      window.document.body.style.backgroundColor = 'white';
      setTheme('light');
    } else {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
      window.document.body.style.backgroundColor = 'black';
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);

    if (localTheme === 'light') {
      updateFavicon('light');
      document.body.style.backgroundColor = 'white';
    }
  }, []);

  return [theme, toggleTheme];
};
