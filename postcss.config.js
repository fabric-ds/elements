/* eslint-env node */
const path = require('path');
const tailwindConfig = require('./tailwind.config');

// PostCSS setup to use Tailwind classes with lit-element
// Inspired by https://dev.to/43081j/using-tailwind-at-build-time-with-web-components-1bhm

module.exports = (ctx) => {
    const filePath = path.join(ctx.file.dirname, ctx.file.basename);

    const plugins = [
        require('tailwindcss')({
            ...tailwindConfig,
            // Always purge. So we don't add all of Tailwind in our custom elements.
            // We do this on a per file basis, as we need to include the utilities in the shadow dom
            purge: { enabled: true, content: [filePath] },
        }),
        require('postcss-discard-comments')(),
        require('postcss-discard-empty')(),
    ];

    // Add autoprefixer in production
    if (ctx.env !== 'development') {
        plugins.push(require('autoprefixer')());
    }

    return {
        syntax: require('@stylelint/postcss-css-in-js'),
        plugins,
    };
};
