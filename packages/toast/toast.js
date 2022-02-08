import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { toast as c } from '@fabric-ds/component-classes';
import { expand, collapse } from 'element-collapse';
import { closeSVG, successSVG, failureSVG } from './svgs';

export class FabricToast extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    id: { type: String, attribute: true },
    type: { type: String, attribute: true },
    text: { type: String, attribute: true },
    duration: { type: Number, attribute: true },
    canclose: { type: Boolean, attribute: true },
  };

  constructor() {
    super();
    this.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    this.type = 'success';
    this.text = '';
    this.duration = Number.POSITIVE_INFINITY;
    this.canclose = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  updated() {
    if (!this._expanded) expand(this._wrapper, () => this._expanded = true);
  }

  get _primaryClasses() {
    return classMap({
      [c.toast]: true,
      [c.toastPositive]: this.type == 'success',
      [c.toastWarning]: this.type === 'warning',
      [c.toastNegative]: this.type === 'error',
      [c.toastNeutral]: this.type === 'info',
    });
  }

  get _iconClasses() {
    return classMap({
      [c.toastIcon]: true,
      [c.toastIconPositive]: this.type == 'success',
      [c.toastIconWarning]: this.type == 'warning',
      [c.toastIconNegative]: this.type == 'error',
      [c.toastIconNeutral]: this.type == 'info',
    });
  }

  get _wrapper() {
    return this.renderRoot?.querySelector(`section`) ?? null;
  }

  get _success() {
    return this.type === 'success';
  }

  get _warning() {
    return this.type === 'warning';
  }

  get _error() {
    return this.type === 'error';
  }

  get _info() {
    return this.type === 'info';
  }

  get _role() {
    return this._error || this._warning ? 'alert' : 'status';
  }

  get _typeLabel() {
    if (this._success) return 'Vellykket';
    if (this._error) return 'Feil';
    if (this._warning) return 'Varsel';
    return 'Info';
  }

  get _iconMarkup() {
    return this._success
      ? successSVG({ typeLabel: this._typeLabel })
      : failureSVG({ typeLabel: this.typeLabel, isInfo: this._info });
  }

  async collapse() {
    return new Promise((resolve) => collapse(this._wrapper, resolve));
  }

  close() {
    const event = new CustomEvent('close', {
      detail: { id: this.id },
      bubbles: true,
      composed: true,
    });
    this.updateComplete.then(() => this.dispatchEvent(event));
  }

  render() {
    return html`<link
        rel="stylesheet"
        type="text/css"
        href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
      />
      <section class="${c.toastWrapper}" aria-label="${this._typeLabel}">
        <div class="${this._primaryClasses}">
          <div class="${this._iconClasses}">${this._iconMarkup}</div>
          <div role="${this._role}" class="${c.toastContent}">
            <p>${this.text}</p>
          </div>
          ${when(
            this.canclose,
            () =>
              html`<button class="${c.toastClose}" @click="${this.close}">
                ${closeSVG()}
              </button>`,
            () => html``,
          )}
        </div>
      </section>`;
  }
}

if (!customElements.get('f-toast')) {
  customElements.define('f-toast', FabricToast);
}
