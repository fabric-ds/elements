import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { FabricElement } from '../utils';

class UnstyledHeading extends FabricElement {
  static properties = {
    level: { type: Number },
  };

  get _markup() {
    return `<h${this.level}
    style="margin: 0; font-weight: unset; font-size: unset; line-height: unset;"
  >
    <slot></slot>
  </h${this.level}>
`;
  }

  render() {
    return !this.level ? html`<slot></slot>` : unsafeHTML(this._markup);
  }
}

if (!customElements.get('f-unstyled-heading')) {
  customElements.define('f-unstyled-heading', UnstyledHeading);
}

export { UnstyledHeading };
