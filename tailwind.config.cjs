/* eslint-env node */

module.exports = {
  presets: [require('@fabric-ds/tailwind-config')],
  purge: {
    enabled: true,
    content: ['./packages/**/*.js', './component-classes.html'],
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
