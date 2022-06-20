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

test('Alert component with no attributes is rendered on the page', async (t) => {
  const component = `
    <f-alert>
      <p>This is an alert with no attributes</p>
    </f-alert>
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

  const locator = await page.locator('f-alert');
  t.equal(
    (await locator.innerHTML()).trim(),
    '<p>This is an alert with no attributes</p>',
    'HTML should be rendered',
  );
  t.equal(await locator.getAttribute('negative'), null, 'Negative attribute should be null');
  t.equal(await locator.getAttribute('positive'), null, 'Positive attribute should be null');
  t.equal(await locator.getAttribute('warning'), null, 'Warning attribute should be null');
  t.equal(await locator.getAttribute('info'), null, 'Info attribute should be null');
  t.equal(await locator.getAttribute('show'), null, 'Show attribute should be null');
  t.equal(await locator.evaluate((el) => el.show), false, 'Show property should default to false');
  t.equal(await locator.getAttribute('role'), 'alert', 'Role attribute should be null');
  t.equal(
    await locator.evaluate((el) => el.role),
    'alert',
    'Role property should default to alert',
  );

  t.equal(
    errorLogs[0].message,
    'Alert attribute missing. Set it to one of the following:\nnegative, positive, warning, info.',
    'Missing attribute error was thrown',
  );

  t.equal(
    await page.evaluate(
      'document.querySelector("f-alert").renderRoot.querySelector("f-expand-transition").renderRoot.querySelector("div").getAttribute("aria-hidden")',
    ),
    'true',
    'Aria-hidden attribute is `true`',
  );

  page.removeListener('pageerror', registerErrorLogs);
});

test('Negative alert component with show attribute is rendered on the page', async (t) => {
  const component = `
    <f-alert negative show>
      <p>This is a negative alert that should be visible</p>
    </f-alert>
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

  const locator = await page.locator('f-alert');
  t.equal(
    (await locator.innerHTML()).trim(),
    '<p>This is a negative alert that should be visible</p>',
    'HTML should be rendered',
  );
  t.equal(await locator.evaluate((el) => el.negative), true, 'Negative attribute should be true');
  t.equal(await locator.evaluate((el) => el.show), true, 'Show attribute should be true');

  t.equal(errorLogs.length, 0, 'No errors should be thrown in the console');

  t.equal(
    await page.evaluate(
      'document.querySelector("f-alert").renderRoot.querySelector("f-expand-transition").renderRoot.querySelector("div").getAttribute("aria-hidden")',
    ),
    'false',
    'Aria-hidden attribute is `false`',
  );

  page.removeListener('pageerror', registerErrorLogs);
});

test('Info alert component with `status` role attribute is rendered on the page', async (t) => {
  const component = `
    <f-alert info role="status">
      <p>This is an info alert that should be invisible</p>
    </f-alert>
  `;

  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  const locator = await page.locator('f-alert');
  t.equal(
    (await locator.innerHTML()).trim(),
    '<p>This is an info alert that should be invisible</p>',
    'HTML should be rendered',
  );
  t.equal(await locator.evaluate((el) => el.info), true, 'Info attribute should be true');
  t.equal(await locator.evaluate((el) => el.role), 'status', 'Role attribute should be `status`');
});

test('Positive alert component with `alert` role assigned to its child is rendered on the page', async (t) => {
  // Sometimes we might want that only a particular descendant of the alert component is asigned an "alert" role,
  // Which should result in accessibility tools only reading
  const component = `
    <f-alert positive show role="">
      <p role="alert">This is a positive alert that should have an "alert" role</p><p>This is less important text</p>
    </f-alert>
  `;

  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  const locator = await page.locator('f-alert');
  t.equal(
    (await locator.innerHTML()).trim(),
    '<p role="alert">This is a positive alert that should have an "alert" role</p><p>This is less important text</p>',
    'HTML should be rendered',
  );
  t.equal(await locator.evaluate((el) => el.positive), true, 'Positive attribute should be true');
  t.equal(
    await locator.evaluate((el) => el.role),
    '',
    'Role attribute of alert should be an empty string',
  );

  t.equal(
    await locator.evaluate((el) => el.querySelector("[role='alert']").innerHTML),
    'This is a positive alert that should have an "alert" role',
    'Role attribute should be set on child',
  );
});

test('Warning alert component with show-toggle button is rendered on the page', async (t) => {
  const component = `
    <button id="alertShowToggle" class="button button--primary button--small">
      Toggle show
    </button>
    <f-alert id="alert" warning show>
      <p role="alert">This is a positive alert that should have an "alert" role</p><p>This is less important text</p>
    </f-alert>

    <script>
      const alertEl = document.getElementById('alert');
      document.getElementById('alertShowToggle').addEventListener('click', () => {
        alertEl.show = !alertEl.show;
      });
    </script>
  `;

  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  const locator = await page.locator('f-alert');

  t.equal(await locator.evaluate((el) => el.warning), true, 'Warning attribute should be true');
  t.equal(await locator.evaluate((el) => el.show), true, 'Show attribute should be true');

  // CLICK "Toggle show" button to hide the alert
  await page.locator('button', { hasText: 'Toggle show' }).click();

  t.equal(await locator.evaluate((el) => el.show), false, 'Show attribute should be false');

  // CLICK "Toggle show" button to show the alert again
  await page.locator('button', { hasText: 'Toggle show' }).click();

  t.equal(await locator.evaluate((el) => el.show), true, 'Show attribute should be true');
});

test('Info Alert component with multiple paragraph child elements', async (t) => {
  const component = `
    <f-alert>
      <p>Paragraph 1</p>
      <p id="second">Paragraph 2</p>
      <p id="last">Paragraph 3</p>
    </f-alert>
  `;

  const page = await addContentToPage({
    page: t.context.page,
    content: component,
  });

  t.equal(await page.locator('f-alert p').count(), 3, '3 p tags should be present');
  t.match(
    await page.innerText(':nth-match(f-alert p, 1)'),
    'Paragraph 1',
    'The first text should be "Paragraph 1"',
  );
  t.match(
    await page.innerText(':nth-match(f-alert p, 3)'),
    'Paragraph 3',
    'The third text should be "Paragraph 3"',
  );

  const lastElement = await page.locator('#last');
  const secondElement = await page.locator('#second');

  t.match(
    await lastElement.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('margin-bottom');
    }),
    '0px',
    'Bottom margin of last paragraph should be 0px',
  );

  t.match(
    await secondElement.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('margin-bottom');
    }),
    '8px',
    'Bottom margin of second paragraph should be 8px',
  );
});
