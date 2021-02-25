import React from 'react';

export const Hero = () => {
  const name = 'Kevin McCartney';
  const roles = ['engineer', 'mentor', 'teacher'];

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

  return (
    <div className="mt-64 sm:mt-104 flex flex-col justify-center items-center text-center">
      <h1 className="text-7xl pb-24">Hello, I am {name}</h1>
      <h2 className="text-5xl pb-32">{renderRoles(roles)}</h2>
    </div>
  );
};
