/* eslint-disable no-undef */
import { expect } from '@open-wc/testing';
import { updateToast, removeToast, toast } from '../../dist/index.js';

const test = it;
const wait = (duration = 0) =>
  new Promise((resolve) => setTimeout(resolve, duration));

afterEach(() => {
  document.body.innerHTML = '';
});

test('API: first call to toast adds toast container to the dom', async () => {
  const before = document.querySelector('f-toast-container');
  const el = toast('This is a toast');
  const after = document.querySelector('f-toast-container');
  expect(before).to.equal(null);
  expect(!!after).to.equal(true);
  expect(!!el.id).to.equal(true);
  expect(el.text).to.equal('This is a toast');
  await wait();
  expect(
    document
      .querySelector('f-toast-container')
      .renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(1);
});

test('API: update toast modifies existing toast', async () => {
  const el = toast('This is a toast');
  expect(!!el.id).to.equal(true);
  await wait();
  updateToast(el.id, { text: 'This is an updated toast' });
  await wait();
  expect(
    document
      .querySelector('f-toast-container')
      .renderRoot.querySelector('f-toast').getAttribute('text'),
  ).to.equal('This is an updated toast');
});

test('API: remove toast removes existing toast', async () => {
  const el = toast('This is a toast');
  expect(!!el.id).to.equal(true);
  await wait();
  expect(
    document
      .querySelector('f-toast-container')
      .renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(1);
  removeToast(el.id);
  await wait();
  expect(
    document
      .querySelector('f-toast-container')
      .renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(0);
});

