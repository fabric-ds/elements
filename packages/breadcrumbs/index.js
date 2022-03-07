import { html } from 'lit';
import { FabricElement } from '../utils';

const separator = html`<span class="select-none" aria-hidden="true">/</span>`;
const interleave = (arr) =>
  [].concat(...arr.map((el) => [el, separator])).slice(0, -1);

class FabricBreadcrumbs extends FabricElement {
  connectedCallback() {
    super.connectedCallback();
    // Grab existing children at the point that the component is added to the page
    // Interleave "/" separator with breadcrumbs
    this._children = interleave(Array.from(this.children));
  }

  render() {
    return html`
      <nav aria-label="Her er du" class="flex space-x-8">
        <h2 class="sr-only">Her er du</h2>
        ${this._children}
      </nav>
    `;
  }
}

if (!customElements.get('f-breadcrumbs')) {
  customElements.define('f-breadcrumbs', FabricBreadcrumbs);
}

export { FabricBreadcrumbs };
