import { configureLocalization } from '@lit/localize';
import '../../index.js';
import {
  toast,
  updateToast,
  removeToast,
  nb_NO,
  sourceLocale,
  targetLocales,
} from '../../index.js';
import { FabricToastContainer } from '../../packages/toast/toast-container.js';

window.FabricToastContainer = FabricToastContainer;
window.toast = toast;
window.updateToast = updateToast;
window.removeToast = removeToast;

const localizedTemplates = new Map([['nb-NO', nb_NO]]);

const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale) => localizedTemplates.get(locale),
});
window.getLocale = getLocale;
window.setLocale = setLocale;

setLocale(navigator.language);
window.addEventListener('languagechange', function () {
  setLocale(navigator.language);
});
