import React from 'react';

export const Footer = () => {
  const socialLinks = {
    linkedIn: 'https://www.linkedin.com/in/kevinmccartney2',
    twitter: 'https://twitter.com/kmccartneydev',
    github: 'https://github.com/kevinmccartney',
  };
  const howIWasMadeLink = 'https://github.com/kevinmccartney/kevinmccartney.is';

  return (
    <footer className="text-white p-24 sm:px-48 flex flex-col justify-center items-center dark:text-green-300 text-blue-500 text-2xl underline font-extrabold">
      <div className="flex dark:text-green-300 text-blue-500 text-5xl underline self-end">
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
      <a
        target="_blank"
        href={howIWasMadeLink}
        rel="noreferrer"
        data-testid="how-i-was-made-link"
      >
        How I was made
      </a>
    </footer>
  );
};
