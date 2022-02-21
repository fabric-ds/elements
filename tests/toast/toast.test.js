/* eslint-disable no-undef */
import { html, fixture, expect } from '@open-wc/testing';
import '../../dist/index.js';

const test = it;

test('Setting all properties', async () => {
  const el = await fixture(html`
    <f-toast id="abc" type="success" canclose text="This is my toast"></f-toast>
  `);
  expect(el.getAttribute('id')).to.equal('abc');
  expect(el.getAttribute('type')).to.equal('success');
  expect(el.getAttribute('canclose')).to.equal('');
  expect(el.getAttribute('text')).to.equal('This is my toast');
});

test('Id assigned when not provided', async () => {
  const el = await fixture(html` <f-toast text="This is my toast"></f-toast> `);
  expect(typeof el.getAttribute('id')).to.equal('string');
  expect(el.getAttribute('id').length).to.equal(11);
});

test('Type defaults to success', async () => {
  const el = await fixture(html` <f-toast text="This is my toast"></f-toast> `);
  expect(el.getAttribute('type')).to.equal('success');
});

test('Setting type to warning', async () => {
  const el = await fixture(html`
    <f-toast text="This is my toast" type="warning"></f-toast>
  `);
  expect(el.getAttribute('type')).to.equal('warning');
});

test('Setting type to info', async () => {
  const el = await fixture(html`
    <f-toast text="This is my toast" type="info"></f-toast>
  `);
  expect(el.getAttribute('type')).to.equal('info');
});

test('Setting type to error', async () => {
  const el = await fixture(html`
    <f-toast text="This is my toast" type="error"></f-toast>
  `);
  expect(el.getAttribute('type')).to.equal('error');
});

test('Close button shows when canclose=true', async () => {
  const el = await fixture(html`
    <f-toast text="This is my toast" canclose></f-toast>
  `);
  expect(el.canclose).to.equal(true);
  expect(el.shadowRoot.innerHTML).to.contain('button');
});

test('Close button does not show when canclose is not applied', async () => {
  const el = await fixture(html` <f-toast text="This is my toast"></f-toast> `);
  expect(el.canclose).to.equal(false);
  expect(el.shadowRoot.innerHTML).to.not.contain('button');
});

test('Nothing shows when text not provided', async () => {
  const el = await fixture(html` <f-toast></f-toast> `);
  expect(el.shadowRoot.innerHTML).to.equal('<!----><!--?-->');
});

test('Collapse method collapses markup', async () => {
  const el = await fixture(html`
    <f-toast text="This is my toast" canclose></f-toast>
  `);

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  expect(el.renderRoot.querySelector('section').style.height).to.equal('auto');
  await el.collapse();
  expect(el.renderRoot.querySelector('section').style.height).to.equal('0px');
});

test('Emits close even when close button clicked', (done) => {
  fixture(html` <f-toast text="This is my toast" canclose></f-toast> `).then(
    (el) => {
      el.addEventListener('close', (event) => {
        expect(event.detail.id).to.equal(el.getAttribute('id'));
        done();
      });
      el.renderRoot.querySelector('button').click();
    },
  );
});
