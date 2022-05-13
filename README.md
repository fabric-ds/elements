# Fabric Elements

## Development

The project uses [Vite](https://vitejs.dev/) for "unbundled" local development. Start a local dev
server by running the following command:

```sh
npm run dev
```

Changes to either the custom elements or the HTML files should hot reload.

## Releases

This project uses [Semantic Release](https://github.com/semantic-release/semantic-release) to
automate package publishing when making changes to the `main` or `next` branch.

It is recommended to branch off the `next` branch and follow
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) when making changes.
When your changes are ready for pull request, this should be opened against the `next` branch.

[Read more in-depth about Fabric Releases here](https://github.com/fabric-ds/issues/blob/779d59723993c13d62374516259602d967da56ca/rfcs/0004-releases.md).

Please note that the version published will depend on your commit message structure. We use
[commitizen](https://github.com/commitizen/cz-cli) to help follow this structure:

```
npm install -g commitizen
```

When installed, you should be able to type `cz` or `git cz` in your terminal to commit your changes
(replacing `git commit`).

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

## Localization

Fabric Element components support localisation where applicable. Currently only Norwegian Bokmål is implemented.

### Adding new locales

1. Edit the `lit-localize.json` file to add new values to the `targetLocales` array 
2. Run `npm run localize:extract` to generate new xlif files in the localization/xliff folder. 
3. Edit these files to add translations
4. Commit these changes to source control.

### Editing locale files

Whenever you add new localization strings in the code using Lit's `msg` function, you should run the `npm run localize:extract` command again to regen new xliff values, make any edits for translations and commit these changes.

### Building

There are a number of locale files that should not be committed and are generated at build time. These are:
* localization/locales.js
* everything in the localization/locales folder

These are automatically build and published based on values in the xliff files and the lit-localize.json file.

### Setting up localization in your project when using Fabric Elements

You can write a small script to set the locale you want for your application using something like the following:

```js
import { configureLocalization } from '@lit/localize';
import { nb_NO, sourceLocale, targetLocales } from '@fabric-ds/elements';

const localizedTemplates = new Map([
  ['nb-NO', nb_NO],
]);

const { setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: async (locale) => localizedTemplates.get(locale),
});

setLocale('nb-NO');
```

If you want dynamic switching, listen for the users browser locale and switch if it changes like so

```js
setLocale(navigator.language);
window.addEventListener('languagechange', function() {
    setLocale(navigator.language);
});
```