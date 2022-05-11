/* eslint-disable no-undef */
import tap, { test, beforeEach, teardown } from 'tap';
import { chromium } from 'playwright';

tap.before(async () => {
  const browser = await chromium.launch({ headless: true });
  tap.context.browser = browser;
});

beforeEach(async (t) => {
  const { browser } = t.context;
  const context = await browser.newContext();
  t.context.page = await context.newPage();
});

teardown(async () => {
  const { browser } = tap.context;
  browser.close();
});

test('Card component with no attributes is rendered on the page', async (t) => {
  // GIVEN: A card component
  const component = `<f-attention></f-attention>`;

  // WHEN: the component is added to the page
  const { page } = t.context;
  await page.setContent(component);
  await page.addScriptTag({ path: './dist/index.js', type: 'module' });

  // THEN:
  const locator = await page.locator('body');
  t.match(await locator.innerHTML(), '<f-attention></f-attention>', 'HTML should be rendered');
});
