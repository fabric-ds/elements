/* eslint-disable no-undef */
import { html, fixture, assert } from '@open-wc/testing';
import '../../dist/index.js';

const test = it;

test('Breadcrumb component renders on the page', async () => {
  // GIVEN: A component with 1 breadcrumb
  const component = html`<f-breadcrumbs
    ><a href="#/url/1">Eiendom</a></f-breadcrumbs
  >`;

  // WHEN: the component is added to the page
  const el = await fixture(component);

  // THEN: the component is visible in the DOM
  assert.match(el, 'f-breadcrumbs');
  assert.equal(el.querySelector('nav').children.length, 2);
});

test('Breadcrumb component interleaves / characters between breadcrumb items', async () => {
  // GIVEN: A component with 2 breadcrumbs
  const component = html`<f-breadcrumbs>
    <a href="#/url/1">Eiendom</a>
    <a href="#/url/2">Torget</a>
  </f-breadcrumbs>`;

  // WHEN: the component is added to the page AND spans are selected
  const el = await fixture(component);
  const dividers = el.querySelectorAll('span');

  // THEN: a single divider should have been interleaved with the breadcrumbs
  assert.equal(dividers.length, 1);
  assert.equal(dividers[0].innerText, '/');
});

test('Breadcrumb component includes child elements as given', async () => {
  // GIVEN: A component with 3 breadcrumbs
  const component = html`<f-breadcrumbs>
    <a href="#/url/1">Eiendom</a>
    <a href="#/url/2">Torget</a>
    <a href="#/url/3">Oslo</a>
  </f-breadcrumbs>`;

  // WHEN: the component is added to the page AND a elements are selected
  const el = await fixture(component);
  const breadcrumbs = el.querySelectorAll('a');

  // THEN: there should be three breadcrumbs in the DOM
  assert.equal(breadcrumbs.length, 3);
  assert.equal(breadcrumbs[0].innerText, 'Eiendom');
  assert.equal(breadcrumbs[1].innerText, 'Torget');
  assert.equal(breadcrumbs[2].innerText, 'Oslo');
});
