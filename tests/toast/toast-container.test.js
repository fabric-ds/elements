/* eslint-disable no-undef */
import { html, fixture, expect } from '@open-wc/testing';
import { FabricToastContainer } from '../../dist/index.js';

const test = it;
const wait = (duration = 0) =>
  new Promise((resolve) => setTimeout(resolve, duration));

afterEach(() => {
  document.body.innerHTML = '';
});

test('Custom Element: Initially no toasts are present', async () => {
  const el = await fixture(html`<f-toast-container></f-toast-container>`);
  expect(el._toasts.size).to.equal(0);
});

test('API: Initialization adds toast container to the dom', async () => {
  const before = document.querySelector('f-toast-container');
  const el = await FabricToastContainer.init();
  const after = document.querySelector('f-toast-container');
  expect(before).to.equal(null);
  expect(el).to.equal(after);
});

test('API: Multiple initializations adds only one toast container to the dom', async () => {
  const before = document.querySelector('f-toast-container');
  const el = await FabricToastContainer.init();
  const after = document.querySelector('f-toast-container');
  const el2 = await FabricToastContainer.init();
  expect(before).to.equal(null);
  expect(el).to.equal(after);
  expect(el2).to.equal(after);
});

test('API: set method: throws when no id provided', async () => {
  const container = await FabricToastContainer.init();
  expect(() => container.set()).to.throw();
  expect(() => container.set({})).to.throw();
  expect(() => container.set({ id: 'abc' })).not.to.throw();
});

test('API: set method: toast element created from given data', async () => {
  const container = await FabricToastContainer.init();
  container.set({ id: 'abc', text: 'This is a toast' });
  await wait();
  expect(
    !!document
      .querySelector('f-toast-container')
      .renderRoot.querySelector('#abc'),
  ).to.equal(true);
  expect(
    document
      .querySelector('f-toast-container')
      .renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(1);
});

test('API: get method: throws when invalid id provided', async () => {
  const container = await FabricToastContainer.init();
  expect(() => container.get()).to.throw();
  expect(() => container.get({})).to.throw();
  expect(() => container.get('abc')).not.to.throw();
  expect(() => container.get(123)).not.to.throw();
});

test('API: get method: toast element retrieved by id', async () => {
  const container = await FabricToastContainer.init();
  container.set({ id: 'abc', text: 'This is a toast' });
  expect(container.get('abc').id).to.equal('abc');
});

test('API: del method: throws when invalid id provided', async () => {
  const container = await FabricToastContainer.init();
  try {
    await container.del();
  } catch (err) {
    expect(!!err.message).to.equal(true);
  }
  try {
    await container.del({});
  } catch (err) {
    expect(!!err.message).to.equal(true);
  }
  try {
    const result = await container.del('abc');
    expect(result).to.equal(false);
  } catch (err) {
    // noop
  }
  try {
    const result = await container.del(123);
    expect(result).to.equal(false);
  } catch (err) {
    // noop
  }
});

test('API: del method: toast element deleted and removed from dom by given id', async () => {
  const container = await FabricToastContainer.init();
  container.set({ id: 'abc', text: 'This is a toast' });
  await wait();
  const result = await container.del('abc');
  expect(result).to.equal(true);
  expect(
    !!document
      .querySelector('f-toast-container')
      .renderRoot.querySelector('#abc'),
  ).to.equal(false);
});

test('API: scheduling: toasts automatically deleted after duration', async () => {
  const container = await FabricToastContainer.init();
  container.set({ id: 'aaa', text: 'This is a toast', duration: 50 });
  container.set({ id: 'bbb', text: 'This is a toast', duration: 50 });
  container.set({ id: 'ccc', text: 'This is a toast', duration: 50 });
  container.set({ id: 'ddd', text: 'This is a toast' });
  await wait();
  expect(
    document
      .querySelector('f-toast-container')
      .renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(4);
  await wait(1000);
  expect(
    document
      .querySelector('f-toast-container')
      .renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(1);
});
