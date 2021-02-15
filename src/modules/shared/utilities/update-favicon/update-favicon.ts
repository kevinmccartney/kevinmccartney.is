export const updateFavicon = (mode: string) => {
  const link = window.document.querySelector(
    "link[rel~='icon']",
  ) as HTMLLinkElement;

  if (mode === 'dark') {
    link.href = '/favicon_dark.ico';
  } else if (mode === 'light') {
    link.href = '/favicon_light.ico';
  }
};
