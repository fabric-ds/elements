/* eslint-disable no-undef */
import tap, { test, beforeEach, teardown } from 'tap';
import { chromium } from 'playwright';
import { addContentToPage } from '../../tests/utils/index.js';

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

test('Box component with no attributes is rendered on the page', async (t) => {
  // GIVEN: A box component
  const component = `
    <f-box>
      <p>This is a box</p>
    </f-box>
  `;

  // WHEN: the component is added to the page
  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  // THEN: the component is visible in the DOM
  const locator = await page.locator('f-box');
  t.equal((await locator.innerHTML()).trim(), '<p>This is a box</p>', 'HTML should be rendered');
  t.equal(await locator.getAttribute('bleed'), null, 'Bleed attribute should be null');
  t.equal(await locator.getAttribute('bordered'), null, 'Bordered attribute should be null');
  t.equal(await locator.getAttribute('info'), null, 'Info attribute should be null');
  t.equal(await locator.getAttribute('neutral'), null, 'Neutral attribute should be null');
});
