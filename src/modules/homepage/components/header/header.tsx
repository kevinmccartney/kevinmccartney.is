import React from 'react';
import Toggle from 'react-toggle';

import { LightIcon, DarkIcon } from 'modules/homepage/components';

export const Header = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  const handleChange = () => {
    toggleTheme();
  };

  return (
    <header className="p-24 sm:px-48 flex justify-end">
      <Toggle
        aria-label="No label tag"
        icons={{
          unchecked: <LightIcon />,
          checked: <DarkIcon />,
        }}
        onChange={handleChange}
        checked={theme === 'dark'}
      />
    </header>
  );
};
