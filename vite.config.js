/* eslint-env node */
import html from 'vite-plugin-html';
import path from 'path';
import glob from 'glob';
// import postcss from 'postcss';
// import cssInJS from '@stylelint/postcss-css-in-js';

export default ({ mode }) => {
  let input = {};

  const isProduction = mode === 'production';

  // For production we need to specify all our entry points
  // See https://vitejs.dev/guide/build.html#multi-page-app
  if (isProduction) {
    input.main = path.resolve(__dirname, 'index.html');

    const componentPages = glob.sync('pages/components/**/*.html', {
      absolute: true,
    });
    const pages = glob.sync('pages/*.html', {
      absolute: true,
    });

    for (const page of pages.concat(componentPages)) {
      const fileName = path.parse(page).name;

      input[fileName] = page;
    }
  }

  return {
    // base: isProduction ? '/elements/' : '',
    plugins: [
      // litElementTailwindPlugin({ mode }),
      html({
        inject: {
          injectOptions: { views: ['pages/includes'] },
        },
        minify: false,
      }),
      isProduction && basePathFix(),
    ],
    build: {
      outDir: 'site',
      rollupOptions: {
        input,
      },
    },
  };
};

// Tiny plugin to to use Tailwind classes with lit-element
// See postcss.config.js
// function litElementTailwindPlugin({ mode }) {
//     // FIXME: This is to simple a check... if we start adding utility files etc that we import in our web components we'll process them as well
//     function shouldProcess(id) {
//         // try to match all JS files that follows this pattern ./packages/*/src/*.js
//         return id.match(/(.*)\/packages\/(.*)\/src\/(.*).js$/);
//         // return !id.includes('node_modules') && id.endsWith('.js');
//     }

//     return {
//         name: 'lit-element-tailwind-plugin',
//         async transform(code, id) {
//             if (shouldProcess(id)) {
//                 // postcss context
//                 const context = {
//                     env: mode,
//                     file: {
//                         extname: path.extname(id),
//                         dirname: path.dirname(id),
//                         basename: path.basename(id),
//                     },
//                 };

//                 const result = await postcss(
//                     require('./postcss.config')(context).plugins,
//                 ).process(code, {
//                     from: undefined,
//                     syntax: cssInJS,
//                 });

//                 return {
//                     code: result.css,
//                 };
//             }
//         },
//     };
// }
/**
 * Since we deploy the site to github pages we need to prefix all the interal links with a base path
 * We do this with a simple regex
 */
function basePathFix() {
  return {
    name: 'base-path-fix',
    transformIndexHtml(html) {
      // Regex matches href=", followed by a /, then any combination of \w, / or -, ending with .html
      return html.replace(/href="\/([\w/-]*)\.html/g, 'href="/$1.html');
    },
  };
}
