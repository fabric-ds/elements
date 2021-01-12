const htm = require('htm');
const vhtml = require('vhtml');

const html = htm.bind(vhtml);

module.exports = function ({ collections }) {
    const elements = collections.all.filter((i) => i.data.element);

    elements.sort((a, b) => a.data.element.localeCompare(b.data.element));

    return html`<nav class="bg-blueGray-100 px-10">
        <${Link} href="/">Home</${Link}>
        ${elements.map(
            (el) => html`<${Link} href=${el.url}>${el.data.element}</${Link}>`,
        )}
    </nav>`;
};

const Link = ({ children, ...props }) =>
    html`<a ...${props} class="py-4 block link link--dark link--block"
        >${children}</a
    >`;
