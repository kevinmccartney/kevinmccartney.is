import { updateFavicon } from './../../utilities';
import { useEffect } from 'react';

export const useFaviconSwitcher: (mode: string) => void = (mode: string) => {
  useEffect(() => {
    updateFavicon(mode);
  });
};
