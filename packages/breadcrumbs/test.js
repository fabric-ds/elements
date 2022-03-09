/* eslint-disable no-undef */
import { test, teardown } from 'tap';
import { Server } from './server.js';
import { chromium } from 'playwright';

const server = new Server({ chromium });
await server.start();

teardown(() => server.stop());

test('Breadcrumb component renders on the page', async (t) => {
  // GIVEN: A component with 1 breadcrumb
  const component = `
    <f-breadcrumbs>
      <a href="#/url/1">Eiendom</a>
    </f-breadcrumbs>
  `;

  // WHEN: the component is added to the page
  const page = await server.fixture(component);

  // THEN: the component is visible in the DOM
  t.equal(await page.innerText('nav a'), 'Eiendom');
});

test('Breadcrumb component interleaves / characters between breadcrumb items', async (t) => {
  // GIVEN: A component with 2 breadcrumbs
  const component = `
    <f-breadcrumbs>
        <a href="#/url/1">Eiendom</a>
        <a href="#/url/2">Torget</a>
    </f-breadcrumbs>
  `;

  // WHEN: the component is added to the page AND spans are selected
  const page = await server.fixture(component);
  
  // THEN: a single divider should have been interleaved with the breadcrumbs
  t.equal(await page.innerText('f-breadcrumbs span'), '/');
});

test('Breadcrumb component with anchor child elements', async (t) => {
  // GIVEN: A component with 3 breadcrumbs
  const component = `
    <f-breadcrumbs>
      <a href="#/url/1">Eiendom</a>
      <a href="#/url/2">Torget</a>
      <a href="#/url/3">Oslo</a>
    </f-breadcrumbs>
  `;

  // WHEN: the component is added to the page AND a elements are selected
  const page = await server.fixture(component);

  // THEN: there should be three breadcrumbs in the DOM
  t.equal(await page.locator('f-breadcrumbs a').count(), 3);
  t.equal(await page.locator('f-breadcrumbs span').count(), 2);
  t.match(await page.innerText(':nth-match(f-breadcrumbs a, 1)'), 'Eiendom');
  t.match(await page.innerText(':nth-match(f-breadcrumbs a, 2)'), 'Torget');
  t.match(await page.innerText(':nth-match(f-breadcrumbs a, 3)'), 'Oslo');
});

test('Breadcrumb component with last element as a span', async (t) => {
  // GIVEN: A component with 3 breadcrumbs
  const component = `
    <f-breadcrumbs>
      <a href="#/url/1">Eiendom</a>
      <a href="#/url/2">Torget</a>
      <span aria-current="page">Oslo</span>
    </f-breadcrumbs>
  `;

  // WHEN: the component is added to the page AND a elements are selected
  const page = await server.fixture(component);

  // THEN: there should be three breadcrumbs in the DOM
  t.equal(await page.locator('f-breadcrumbs a').count(), 2);
  t.equal(await page.locator('f-breadcrumbs span').count(), 3);
});
