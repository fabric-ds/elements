/* eslint-env node */

module.exports = {
    presets: [require('@finn-no/fabric-tailwind-config')],
    purge: {
        // Always purge. So we don't add all of Tailwind in our custom elements.
        enabled: true,
        // Use the current working directory to determine files to look at to remove unused CSS.
        // This ensures we purge on a per element basis.
        content: [`${process.cwd()}/src/**/*.ts`],
    },
};
