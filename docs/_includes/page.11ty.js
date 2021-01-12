const footer = require('./footer.11ty');
const nav = require('./nav.11ty');
const relative = require('./relative-path');

const elements = ['modal'];

module.exports = function (data) {
    const { title, page, content } = data;

    const pageTitle = title ? `${title} | Fabric Elements` : 'Fabric Elements';

    return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <link
    href="https://assets.finn.no/pkg/fabric-css/v0/fabric.min.css"
    rel="stylesheet"
    />
    <link rel="stylesheet" href="https://unpkg.com/prism-themes@1.5.0/themes/prism-ghcolors.css">
    <link rel="stylesheet" href="${relative(page.url, '/base.css')}">
    <link href="https://static.finncdn.no/_c/troika-css/v8.4.22/components/button.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js" defer></script>
    ${elements
        .map(
            (el) => `
    <script type="module" src="${relative(
        page.url,
        `/packages/${el}/dist/fabric-${el}.js`,
    )}"></script>
    `,
        )
        .join('\n')}
  </head>
  <body class="grid h-screen" style="grid-template-columns: 300px 1fr;">
    ${nav(data)}
    <div class="grid justify-center p-12" style="grid-template-rows: 1fr auto; grid-template-columns: minmax(auto,900px);">
      <main>
        ${content}
      </main>
      ${footer()}
    </div>
  </body>
</html>`;
};
