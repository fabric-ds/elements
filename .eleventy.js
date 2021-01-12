const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const elements = ['icon', 'modal'];

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy('docs/base.css');

    eleventyConfig.addPassthroughCopy('packages/modal/dist/fabric-modal.js');
    eleventyConfig.addPassthroughCopy('packages/icon/dist/fabric-icon.js');

    return {
        dir: {
            input: 'docs',
            output: 'site',
        },
    };
};
