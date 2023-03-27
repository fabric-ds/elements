import { i18n } from '@lingui/core';

/**
 * Load locale messages for specified component.
 * @param pkg The package/component you want to dynamic activate for.
 * @param locale The locale you want to activate, or undefined to detect from document.
 */
export async function initLocale(pkg, locale = undefined) {
  const resolvedLocale = locale ?? detectLocale();
  await dynamicActivateI18n(pkg, resolvedLocale);
}

function detectLocale() {
  try {
    return document.documentElement.lang;
  } catch (e) {
    console.warn('could not detect locale, falling back to source locale', e);
    return 'en';
  }
}

async function dynamicActivateI18n(pkg, locale) {
  const { messages } = await import(`../../locale/${locale}/${pkg}.mjs`);

  i18n.load(locale, messages);
  i18n.activate(locale);
}
