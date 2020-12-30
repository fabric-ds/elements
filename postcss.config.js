/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

// PostCSS setup to use Tailwind classes with lit-element
// Inspired by https://dev.to/43081j/using-tailwind-at-build-time-with-web-components-1bhm

module.exports = {
    syntax: require('@stylelint/postcss-css-in-js'),
    plugins: [
        require('tailwindcss')('../../tailwind.config.js'),
        require('postcss-discard-comments')(),
        require('postcss-discard-empty')(),
        require('autoprefixer')(),
    ],
};
