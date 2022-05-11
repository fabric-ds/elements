import { html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { attention as a } from '@fabric-ds/css/component-classes';
import { FabricElement, fclasses } from '../utils';

class FabricAttention extends FabricElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
  };

  constructor() {
    super();
  }

  get _classes() {
    return fclasses({});
  }

  render() {
    return html`
      ${this._fabricStylesheet}
      <div class="${this._classes}"></div>
    `;
  }
}

if (!customElements.get('f-attention')) {
  customElements.define('f-attention', FabricAttention);
}

export { FabricAttention };
