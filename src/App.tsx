import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';

const LightIcon = () => <i className="fas fa-sun text-white"></i>;
const DarkIcon = () => <i className="fas fa-moon"></i>;

const updateFavicon = (mode: string) => {
  const link = window.document.querySelector(
    "link[rel~='icon']",
  ) as HTMLLinkElement;

  if (mode === 'dark') {
    link.href = '/favicon_dark.ico';
  } else if (mode === 'light') {
    link.href = '/favicon_light.ico';
  }
};

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

export const useFaviconSwitcher: (mode: string) => void = (mode: string) => {
  useEffect(() => {
    updateFavicon(mode);
  });
};

function App() {
  const socialLinks = {
    linkedIn: 'https://www.linkedin.com/in/kevinmccartney2',
    twitter: 'https://twitter.com/kmccartneydev',
    github: 'https://github.com/kevinmccartney',
  };
  const howIWasMadeLink = 'https://github.com/kevinmccartney/kevinmccartney.is';
  const name = 'Kevin McCartney';
  const roles = ['engineer', 'mentor', 'teacher'];
  const [theme, toggleTheme]: [
    string,
    (newTheme: string) => void,
  ] = useDarkMode();

  useFaviconSwitcher(theme);

  const renderRoles = (rolesToRender: string[]) =>
    rolesToRender.reduce((prev: string, current: string, index: number) => {
      let role: string;

      if (index === 0) {
        role = `${current.charAt(0).toUpperCase()}${current.slice(1)}, `;
      } else if (index === roles.length - 1) {
        role = `& ${current}`;
      } else {
        role = `${current}, `;
      }

      return `${prev}${role}`;
    }, '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTheme(event.target.checked ? 'dark' : 'light');
  };

  return (
    <main
      className={classNames({
        'h-screen': true,
        'w-screen': true,
        'font-mono': true,
        dark: theme === 'dark',
      })}
    >
      <div
        className={classNames({
          'dark:bg-black': true,
          'h-full': true,
          'flex-col': true,
          flex: true,
          'flex-column': true,
        })}
      >
        <div className="p-24 sm:px-48 flex justify-end">
          <Toggle
            defaultChecked={true}
            aria-label="No label tag"
            icons={{
              unchecked: <LightIcon />,
              checked: <DarkIcon />,
            }}
            onChange={handleChange}
            checked={theme === 'dark'}
          />
        </div>
        <div className="dark:text-white flex-grow-1 flex flex-col justify-center items-center text-center px-24 sm:px-48">
          <h1 className="text-7xl pb-24">Hello, I am {name}</h1>
          <h2 className="text-5xl pb-32">{renderRoles(roles)}</h2>
          <div className="flex dark:text-green-300 text-blue-500 text-6xl underline">
            <a
              href={socialLinks.linkedIn}
              rel="noreferrer"
              className="mr-24"
              data-testid="linkedin-link"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              className="mr-24"
              data-testid="twitter-link"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              data-testid="github-link"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        <div className="text-white p-24 sm:px-48 flex justify-center dark:text-green-300 text-blue-500 text-2xl underline font-extrabold">
          <a
            target="_blank"
            href={howIWasMadeLink}
            rel="noreferrer"
            data-testid="how-i-was-made-link"
          >
            How I was made
          </a>
        </div>
      </div>
    </main>
  );
}

export default App;
