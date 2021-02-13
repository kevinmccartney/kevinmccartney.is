const spacingValues = [
  0,
  4,
  8,
  12,
  16,
  20,
  24,
  32,
  40,
  48,
  64,
  80,
  104,
  128,
  168,
  208,
  272,
  336,
  720,
  896,
  1152,
  1440,
  1920,
];

const spacingMap = spacingValues
  .map((value) => {
    return {
      [value]: `${value / 10}rem`,
    };
  })
  .reduce((current, accumulator) => {
    return {
      ...accumulator,
      ...current,
    };
  }, {});

module.exports = {
  theme: {
    extend: {
      maxHeight: {
        ...spacingMap,
      },
      minWidth: {
        ...spacingMap,
      },
      width: {
        ...spacingMap,
      },
    },
    flexGrow: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      11: 11,
      12: 12,
    },
    maxWidth: (theme, { breakpoints }) => ({
      none: theme.none,
      min: theme.min,
      max: theme.max,
      ...breakpoints(theme('screens')),
      ...spacingMap,
    }),
    screens: {
      xs: '0px',
      sm: '720px',
      md: '1152px',
      lg: '1440px',
      xl: '1920px',
    },
    spacing: spacingMap,
  },
  important: true,
};
