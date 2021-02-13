import React from 'react';

function App() {
  const socialLinks = {
    linkedIn: 'https://www.linkedin.com/in/kevinmccartney2',
    twitter: 'https://twitter.com/kmccartneydev',
    github: 'https://github.com/kevinmccartney',
  };
  const howIWasMadeLink = 'https://github.com/kevinmccartney/kevinmccartney.is';
  const name = 'Kevin McCartney';
  const roles = ['engineer', 'mentor', 'teacher'];

  const renderRoles = (rolesToRender: string[]) =>
    rolesToRender.reduce((prev: string, current: string, index: number) => {
      let role: string;

      if (index === 0) {
        role = `${current.charAt(0).toUpperCase()}${current.slice(1)}, `;
      } else if (index == roles.length - 1) {
        role = `& ${current}`;
      } else {
        role = `${current}, `;
      }

      return `${prev}${role}`;
    }, '');

  return (
    <main className="App flex-col flex flex-column h-screen w-screen bg-black font-mono">
      <div className="text-white flex-grow-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-8xl pb-24">Hello, I am {name}</h1>
        <h2 className="text-6xl pb-32">{renderRoles(roles)}</h2>
        <div className="flex text-green-300 text-6xl underline">
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
      <div className="text-white p-16 flex justify-center text-green-300 text-2xl underline font-extrabold">
        <a
          target="_blank"
          href={howIWasMadeLink}
          rel="noreferrer"
          data-testid="how-i-was-made-link"
        >
          How I was made
        </a>
      </div>
    </main>
  );
}

export default App;
