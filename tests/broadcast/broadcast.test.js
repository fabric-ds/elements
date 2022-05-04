/* eslint-disable no-undef */
import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/index.js';

const test = it;
const wait = (duration = 0) => new Promise((resolve) => setTimeout(resolve, duration));

test('Basic broadcast with defaults', async () => {
  await fixture(html`<f-broadcast api="http://localhost:4053/single-broadcast"></f-broadcast>`);
  await wait(500);
  const broadcasts = document.querySelector('f-broadcast').renderRoot.querySelectorAll('f-toast');
  expect(broadcasts.length).to.equal(1);
});

test('Basic broadcast accessibility', async () => {
  const el = await fixture(
    html`<f-broadcast api="http://localhost:4053/single-broadcast"></f-broadcast>`,
  );
  await wait(500);
  await expect(el).to.be.accessible();
});

test('Basic broadcast with defined URL and interval', async () => {
  const el = await fixture(
    html`<f-broadcast
      api="http://localhost:4053/single-broadcast"
      url="http://test"
      interval="5000"
    ></f-broadcast>`,
  );
  await wait(50);
  expect(el.url).to.equal('http://test');
  expect(el.interval).to.equal(5000);
});

test('Multiple broadcasts', async () => {
  await fixture(html`<f-broadcast api="http://localhost:4053/multiple-broadcasts"></f-broadcast>`);
  await wait(50);
  const broadcasts = document.querySelector('f-broadcast').renderRoot.querySelectorAll('f-toast');
  expect(broadcasts.length).to.equal(2);
});
