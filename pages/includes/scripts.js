import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from '../../locales/locales.js';
import '../../index.js';
import { toast, updateToast, removeToast } from '../../index.js';
import { FabricToastContainer } from '../../packages/toast/toast-container.js';

import * as templates_nb_NO from '../../locales/nb-NO.js';

const localizedTemplates = new Map([
  ['nb-NO', templates_nb_NO],
]);

window.FabricToastContainer = FabricToastContainer;
window.toast = toast;
window.updateToast = updateToast;
window.removeToast = removeToast;

const { getLocale, setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    // loadLocale: (locale) => import(`/locales/${locale}.js`),
    loadLocale: async (locale) => {
        console.log(locale);
        return localizedTemplates.get(locale);
    }
});
window.getLocale = getLocale;
window.setLocale = setLocale;

setLocale(navigator.language);
window.addEventListener('languagechange', function() {
    setLocale(navigator.language);
});

// function getBrowserLocales(options = {}) {
//     const defaultOptions = {
//       languageCodeOnly: false,
//     };
//     const opt = {
//       ...defaultOptions,
//       ...options,
//     };
//     const browserLocales =
//       navigator.languages === undefined
//         ? [navigator.language]
//         : navigator.languages;
//     if (!browserLocales) {
//       return undefined;
//     }
//     return browserLocales.map(locale => {
//       const trimmedLocale = locale.trim();
//       return opt.languageCodeOnly
//         ? trimmedLocale.split(/-|_/)[0]
//         : trimmedLocale;
//     });
// }

// window.addEventListener('lit-localize-status', (event) => {
//     if (event.detail.status === 'loading') {
//       console.log(`Loading new locale: ${event.detail.loadingLocale}`);
//     } else if (event.detail.status === 'ready') {
//       console.log(`Loaded new locale: ${event.detail.readyLocale}`);
//     } else if (event.detail.status === 'error') {
//       console.error(
//         `Error loading locale ${event.detail.errorLocale}: ` +
//           event.detail.errorMessage
//       );
//     }
// });