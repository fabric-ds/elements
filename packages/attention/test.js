/* eslint-disable no-undef */
import tap, { test, beforeEach, teardown } from 'tap';
import { chromium } from 'playwright';
import { addContentToPage } from '../../tests/utils/index.js';
import { opposites } from '@fabric-ds/core/attention';

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

test('Attention component with no attributes is rendered on the page', async (t) => {
  // GIVEN: An attention component
  const component = `<f-attention><p>This is an attention</p></f-attention>`;

  const errorLogs = [];
  const registerErrorLogs = (exception) => {
    errorLogs.push(exception);
  };

  // Before adding content to the page, subscribe to all uncaught errors emitted there
  t.context.page.on('pageerror', registerErrorLogs);

  // WHEN: the component is added to the page
  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  // THEN: the component is visible in the DOM
  const locator = await page.locator('f-attention');
  t.equal(
    (await locator.innerHTML()).trim(),
    '<p>This is an attention</p>',
    'HTML should be rendered',
  );
  t.equal(await locator.getAttribute('callout'), null, '"callout" attribute should be null');
  t.equal(
    await locator.evaluate((el) => el.callout),
    false,
    '"callout" property should default to false',
  );
  t.equal(await locator.getAttribute('popover'), null, '"popover" attribute should be null');
  t.equal(
    await locator.evaluate((el) => el.popover),
    false,
    '"popover" property should default to false',
  );
  t.equal(
    await locator.evaluate((el) => el.tooltip),
    false,
    '"tooltip" property should default to false',
  );
  t.equal(await locator.getAttribute('no-arrow'), null, '"no-arrow" attribute should be null');
  t.equal(
    await locator.evaluate((el) => el.noArrow),
    false,
    '"noArrow" property should default to false',
  );
  t.equal(
    await locator.evaluate((el) => el.show),
    false,
    '"show" property should default to false',
  );

  t.equal(
    errorLogs[0].message,
    `Invalid "placement" attribute. Set its value to one of the following:\n${JSON.stringify(
      Object.keys(opposites),
    )}`,
    'Invalid attribute error was thrown',
  );
  page.removeListener('pageerror', registerErrorLogs);
});

test('Attention component with invalid "position" attribute is rendered on the page', async (t) => {
  const component = `
    <f-attention position="hello">
      <p>This is an attention with invalid "position" attribute</p>
    </f-attention>
  `;

  const errorLogs = [];
  const registerErrorLogs = (exception) => {
    errorLogs.push(exception);
  };

  // Before adding content to the page, subscribe to all uncaught errors emitted there
  t.context.page.on('pageerror', registerErrorLogs);

  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  t.equal(
    errorLogs[0].message,
    `Invalid "placement" attribute. Set its value to one of the following:\n${JSON.stringify(
      Object.keys(opposites),
    )}`,
    'Invalid attribute error was thrown',
  );

  page.removeListener('pageerror', registerErrorLogs);
});

test('Bottom placed tooltip attention component with show attribute is rendered on the page', async (t) => {
  const component = `
    <div>
      <div
        id="tooltipTarget"
        class="p-16 rounded-8 bg-aqua-50"
      >
        Target element to tooltip attention
      </div>
      <f-attention placement="bottom" show tooltip target-selector="#tooltipTarget">
        <p>This is a tooltip that should be visible on bottom</p>
      </f-attention>
    </div>
  `;

  const errorLogs = [];
  const registerErrorLogs = (exception) => {
    errorLogs.push(exception);
  };

  t.context.page.on('pageerror', registerErrorLogs);

  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  const locator = await page.locator('f-attention');
  t.equal(
    (await locator.innerHTML()).trim(),
    '<p>This is a tooltip that should be visible on bottom</p>',
    'Attention element should be rendered',
  );
  t.equal(
    await locator.evaluate((el) => el.placement),
    'bottom',
    '"placement" property should be "bottom"',
  );
  t.equal(await locator.evaluate((el) => el.tooltip), true, '"tooltip" property should be true');
  t.equal(await locator.evaluate((el) => el.show), true, '"show" property should be true');
  t.equal(errorLogs.length, 0, 'No errors should be thrown in the console');

  page.removeListener('pageerror', registerErrorLogs);
});

test('Right placed callout attention component with show attribute is rendered on the page', async (t) => {
  const component = `
    <div class="flex items-center">
      <div
        id="calloutTarget"
        class="p-16 rounded-8 bg-aqua-50"
      >
        Target element to callout attention
      </div>
      <f-attention placement="right" show callout target-selector="#calloutTarget">
        <p>This is a callout that should be visible on right</p>
      </f-attention>
    </div>
  `;

  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  const locator = await page.locator('f-attention');
  t.equal(
    (await locator.innerHTML()).trim(),
    '<p>This is a callout that should be visible on right</p>',
    'Attention element should be rendered',
  );
  t.equal(
    await locator.evaluate((el) => el.placement),
    'right',
    '"placement" property should be "right"',
  );
  t.equal(await locator.evaluate((el) => el.callout), true, '"callout" property should be true');
  t.equal(
    await locator.evaluate((el) => window.getComputedStyle(el).getPropertyValue('display')),
    'block',
    '"display" should be "block"',
  );
});
