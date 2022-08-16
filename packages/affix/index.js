import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { suffix, prefix } from '@fabric-ds/css/component-classes';
import { search, clear } from './icons';
import { fclasses, FabricElement } from '../utils';

class FabricAffix extends FabricElement {
  static properties = {
    ariaLabel: { type: String, attribute: 'aria-label' },
    prefix: { type: Boolean, reflect: true },
    suffix: { type: Boolean, reflect: true },
    clear: { type: Boolean },
    search: { type: Boolean },
    label: { type: String },
  };

  get _classBase() {
    return this.prefix ? prefix : suffix;
  }

  get _classes() {
    return fclasses({
      [this._classBase.wrapper]: true,
      [this._classBase.wrapperWithLabel]: this.label,
      [this._classBase.wrapperWithIcon]: !this.label,
    });
  }

  get _searchButton() {
    return html`
      <button aria-label="${ifDefined(this.ariaLabel)}" class="${this._classes}" type="submit">
        ${search}
      </button>
    `;
  }

  get _clearButton() {
    return html`
      <button aria-label="${ifDefined(this.ariaLabel)}" class="${this._classes}" type="reset">
        ${clear}
      </button>
    `;
  }

  get _text() {
    return html`
      <div class="${this._classes}">
        <span class="${this._classBase.label}">${this.label}</span>
      </div>
    `;
  }

  get _markup() {
    if (this.label) {
      return this._text;
    } else if (this.search) {
      return this._searchButton;
    } else if (this.clear) {
      return this._clearButton;
    }
  }

  render() {
    return html`${this._fabricStylesheet}${this._markup}`;
  }
}

if (!customElements.get('f-affix')) {
  customElements.define('f-affix', FabricAffix);
}

export { FabricAffix };
