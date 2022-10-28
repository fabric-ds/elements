import fs from 'node:fs';
const css = fs.readFileSync(new URL('./dist/tailwind.css', import.meta.url).pathname, { encoding: 'utf-8' });

const contents = `
    import { css } from 'lit';
    export const styles = css\`${css}\`;
`;

fs.writeFileSync(new URL('./dist/styles.js', import.meta.url).pathname, contents);