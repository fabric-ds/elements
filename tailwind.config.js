/* eslint-env node */

// TODO: Use fabric's Tailwind config here
module.exports = {
    purge: {
        // Always purge. So we don't add all of Tailwind in our custom elements.
        enabled: true,
        // Use the current working directory to determine files to look at to remove unused CSS.
        // This ensures we purge on a per element basis.
        content: [`${process.cwd()}/src/**/*.ts`],
    },
};
