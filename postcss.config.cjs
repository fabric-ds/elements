/* eslint-env node */
module.exports = (ctx) => {
    const plugins = [
        require('postcss-discard-comments')(),
        require('postcss-discard-empty')(),
    ];

    // Add autoprefixer in production
    if (ctx.env !== 'development') {
        plugins.push(require('autoprefixer')());
    }

    return {
        plugins,
    };
};
