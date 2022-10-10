/* eslint-disable no-undef */
import { expect } from '@open-wc/testing';
import '../../dist/index.js';
import { updateToast, removeToast, toast } from '../../dist/api.js';

const test = it;
const wait = (duration = 0) => new Promise((resolve) => setTimeout(resolve, duration));

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
    document.querySelector('f-toast-container').renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(1);
});

test('API: toast method: options: duration is set correctly', async () => {
  toast('This is a toast', { duration: 50 });
  await wait();
  expect(
    document.querySelector('f-toast-container').renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(1);
  await wait(1000);
  expect(
    document.querySelector('f-toast-container').renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(0);
});

test('API: toast method: options: canclose creates close button', async () => {
  toast('This is a toast', { canclose: true });
  await wait();
  expect(
    !!document
      .querySelector('f-toast-container')
      .renderRoot.querySelector('f-toast')
      .renderRoot.querySelector('button'),
  ).to.equal(true);
});

test('API: toast method: options: type changes visual appearance', async () => {
  toast('This is a toast', { type: 'error' });
  await wait();
  const classes = document
    .querySelector('f-toast-container')
    .renderRoot.querySelector('f-toast')
    .renderRoot.querySelector('section > div').classList;
  expect(classes.contains('bg-red-50')).to.equal(true);
  expect(classes.contains('border-red-200')).to.equal(true);
  expect(classes.contains('text-red-800')).to.equal(true);
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
      .renderRoot.querySelector('f-toast')
      .getAttribute('text'),
  ).to.equal('This is an updated toast');
});

test('API: remove toast removes existing toast', async () => {
  const el = toast('This is a toast');
  expect(!!el.id).to.equal(true);
  await wait();
  expect(
    document.querySelector('f-toast-container').renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(1);
  removeToast(el.id);
  await wait();
  expect(
    document.querySelector('f-toast-container').renderRoot.querySelectorAll('f-toast').length,
  ).to.equal(0);
});
