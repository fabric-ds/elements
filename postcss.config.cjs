// module.exports = {
//   plugins: {
//     "postcss-import": {},
//     tailwindcss: {},
//     autoprefixer: {},
//     cssnano: {}
//   }
// }


const path = require('path');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const atImport = require('postcss-import');
// const presetEnv = require('postcss-preset-env');
const importSvg = require('postcss-import-svg');
// const tailwindConfig = (await import('./tailwind.config.cjs')).default;
const tailwindConfig = require('./tailwind.config.cjs');
// const { breakpoints: customMedia } = require('./node_modules/@fabric-ds/css/src/utils/tailwind/colors.js');

module.exports = {
  plugins: [
    atImport,
    // For some reason, hot reloading the tailwind config only works in vite when we don't specify a config.
    // But if we don't specify a config, PostCSS doens't load it when building for prod.
    // ctx.env === 'production' ? tailwind(tailwindConfig) : tailwind,
    tailwind(tailwindConfig),
    // presetEnv({
    //   stage: 0,
    //   browsers: 'extends @finn-no/browserslist-config',
    //   importFrom: { customMedia },
    //   features: {
    //     'focus-visible-pseudo-class': false,
    //   },
    // }),
    importSvg({
      paths: [path.resolve(path.dirname(require.resolve('@fabric-ds/icons/package.json')), 'dist')],
    }),
    autoprefixer,
    cssnano({ preset: 'default' }),
  ],

  // Autoprefixer and cssnano slows down the build, so only do it if we're building for production
  // if (ctx.env === 'production') {
    // plugins.push();
  // }

  // return { plugins };
};
