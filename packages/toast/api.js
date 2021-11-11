import { toaster as c } from '@fabric-ds/component-classes';
import { collapse } from 'element-collapse';

const windowExists = typeof window !== 'undefined';

export function initToasts() {
  if (!windowExists) return;
  if (!window.fabricToasts) window.fabricToasts = { toasts: [] };
  if (document && !document.querySelector('f-toast-container')) {
    class Container extends HTMLElement {
      constructor() {
        super();

        const fabricStylesTemplate = document.createElement('template');
        fabricStylesTemplate.innerHTML = `
                <style>:host { display: block; }</style>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://assets.finn.no/pkg/@fabric-ds/css/v0/fabric.min.css"
                />
            `;

        this.attachShadow({ mode: 'open' }).appendChild(
          fabricStylesTemplate.content,
        );
      }

      connectedCallback() {
        const container = document.createElement('aside');
        container.className = c.toasterContainer;

        const div = document.createElement('div');
        div.id = 'f-toast-container-list';
        div.className = `${c.toaster} relative`;

        container.appendChild(div);

        this.shadowRoot.appendChild(container);
      }
    }
    customElements.define('f-toast-container', Container);

    const container = document.createElement('f-toast-container');
    document.querySelector('body').appendChild(container);
  }
}

/**
 * Toast helper function options
 * @typedef    {Object}                               ToastOptions
 * @property   {(number|string)}                      [id]        Custom identifier
 * @property   {('success'|'error'|'warning'|'info')} [type]      Type of alert
 * @property   {String}                               [text]      The toast message. Only needed when updating text on existing toast
 * @property   {(number|string)}                      [duration]  Duration of toast in milliseconds Set to 0 to disable auto-removal
 * @property   {Boolean}                              [canClose]  Can toast be dismissed?
 * @property   {Function}                             [onClose]   Dismiss handler
 */

/**
 * Create a new toast
 * @param {String}       message Message
 * @param {ToastOptions} [options] Toast options
 * @returns {ToastOptions} Toast details
 */
export function toast(message, options) {
  if (!windowExists) return;
  const toasts = window.fabricToasts;
  const container = document.querySelector('f-toast-container');
  const list = container.shadowRoot.getElementById('f-toast-container-list');

  if (!container && customElements.get('f-toast') && toasts) {
    throw new Error(
      'No toast container found. Make sure to call initToasts() first.',
    );
  }

  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

  const toast = {
    id,
    programmatic: true,
    text: message,
    duration: 2400,
    type: 'success' || options.type,
    ...options,
  };

  const el = document.createElement('f-toast');
  el.className = 'w-full';
  Object.entries(toast).forEach((t) => {
    el.setAttribute(t[0], t[1]);
  });
  list.appendChild(el);

  toasts.toasts = [...toasts.toasts, toast];

  return toast;
}

/**
 * Remove an existing toast
 * @param {String} id Toast identifier
 * @return {Boolean} True if deleted, false if not found
 */
export function removeToast(id) {
  if (!windowExists) return;
  const toasts = window.fabricToasts;
  const container = document.querySelector('f-toast-container');
  if (!container && customElements.get('f-toast') && toasts) {
    throw new Error(
      'No toast container found. Make sure to call initToasts() first.',
    );
  }

  toasts.toasts = toasts.toasts.filter((toast) => toast.id !== id);

  const el = container.shadowRoot.getElementById(id);
  if (!el) return false;

  collapse(el);
  setTimeout(() => {
    el.remove();
  }, 1000);

  return true;
}

/**
 * Update an existing toast
 * @param {String}       id      Toast identifier
 * @param {ToastOptions} options Toast options
 * @returns {ToastOptions} Toast details
 */
export function updateToast(id, options) {
  if (!windowExists) return;
  const toasts = window.fabricToasts;
  const container = document.querySelector('f-toast-container');

  if (!container && customElements.get('f-toast') && toasts) {
    throw new Error(
      'No toast container found. Make sure to call initToasts() first.',
    );
  }

  const t = toasts.toasts.find((toast) => toast.id === id);

  const toast = {
    ...t,
    ...options,
  };

  const el = container.shadowRoot.getElementById(id);

  Object.entries(toast).forEach((t) => {
    el.setAttribute(t[0], t[1]);
  });

  toasts.toasts = toasts.toasts.map((t) => (t.id === toast.id ? toast : t));

  return toast;
}
