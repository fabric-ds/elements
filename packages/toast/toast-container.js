import { css, html } from 'lit';
import { toaster as c } from '@fabric-ds/css/component-classes';
import { repeat } from 'lit/directives/repeat.js';
import { FabricElement } from '../utils';

/**
 * Toast helper function options
 * @typedef    {Object}                               ToastOptions
 * @property   {(number|string)}                      [id]        Custom identifier
 * @property   {('success'|'error'|'warning'|'info')} [type]      Type of alert
 * @property   {String}                               [text]      The toast message. Only needed when updating text on existing toast
 * @property   {(number|string)}                      [duration]  Duration of toast in milliseconds. Defaults to 5000. For accessibility reasons, toasts should never be interactive and therefore need to auto remove. If you must disable auto remove, set duration to Number.POSITIVE_INFINITY.
 * @property   {Boolean}                              [canClose]  Whether the toast can be dismissed. Defaults to false. WARNING! For accessibility reasons, toasts should not be interactive and canclose should always be false. If the toast absolutely must be dismissble, set this to true.
 */

export class FabricToastContainer extends FabricElement {
  static styles = [super.styles, css`
    :host {
      display: block;
    }
  `];

  static properties = {
    _toasts: { state: true },
  };

  constructor() {
    super();
    this._toasts = new Map();
  }

  connectedCallback() {
    super.connectedCallback();

    // regularly check if any toasts have expired
    this._interval = setInterval(() => {
      // sort toasts into keep and remove
      const keep = [];
      const remove = [];
      for (const toast of this._toasts) {
        if (Date.now() <= toast[1].duration) keep.push(toast);
        else remove.push(toast);
      }
      // collapse toasts that will be removed
      const collapseTasks = [];
      for (const [id] of remove) {
        const el = this.renderRoot.querySelector(`#${id}`);
        collapseTasks.push(el.collapse());
      }
      // once all toasts that should be removed have been collapsed, remove them from the map
      Promise.all(collapseTasks).then(() => {
        if (keep.length != this._toasts.size) this._toasts = new Map(keep);
      });
    }, 500);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) clearTimeout(this._interval);
  }

  static init() {
    let el = document.querySelector('f-toast-container');
    if (!el) {
      el = document.createElement('f-toast-container');
      document.body.appendChild(el);
    }
    return el;
  }

  get _toastsArray() {
    return Array.from(this._toasts).map(([, toast]) => toast);
  }

  /**
   *
   * @param {String|Number} id
   * @returns {ToastOptions}
   */
  get(id) {
    if (!id) throw new Error('undefined "id" given when attempting to retrieve toast');
    if (typeof id !== 'string' && !Number.isInteger(id))
      throw new Error('"id" must be number or string when attempting to retrieve toast');
    return this._toasts.get(id);
  }

  /**
   *
   * @param {Object} toast
   * @returns {FabricToastContainer}
   */
  set(toast) {
    if (!toast.id) throw new Error('invalid or undefined "id" on toast object');
    const result = this._toasts.set(toast.id, {
      ...toast,
      duration: Date.now() + (toast.duration || 5000),
    });
    this._toasts = new Map(Array.from(this._toasts));
    return result;
  }

  /**
   *
   * @param {String|Number} id
   * @returns {ToastOptions}
   */
  async del(id) {
    if (!id) throw new Error('undefined "id" given when attempting to retrieve toast');
    if (typeof id !== 'string' && !Number.isInteger(id))
      throw new Error('"id" must be number or string when attempting to retrieve toast');
    const el = this.renderRoot.querySelector(`#${id}`);
    await el.collapse();
    const result = this._toasts.delete(id);
    this._toasts = new Map(Array.from(this._toasts));
    return result;
  }

  render() {
    return html`
      <aside class="${c.toasterContainer}">
        <div class="${c.toaster}" id="f-toast-container-list">
          ${repeat(
            this._toastsArray,
            (toast) => toast.id,
            (toast) => html` <f-toast
              class="w-full"
              id="${toast.id}"
              type="${toast.type}"
              text="${toast.text}"
              ?canclose=${toast.canclose}
              @close=${() => this.del(toast.id)}
            >
            </f-toast>`,
          )}
        </div>
      </aside>
    `;
  }
}

if (!customElements.get('f-toast-container')) {
  customElements.define('f-toast-container', FabricToastContainer);
}
