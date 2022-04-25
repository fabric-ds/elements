import { LitElement, html } from 'lit';

const separator = html`<span class="select-none" aria-hidden="true">/</span>`;
const interleave = (arr) =>
  [].concat(...arr.map((el) => [el, separator])).slice(0, -1);

class FabricBreadcrumbs extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Grab existing children at the point that the component is added to the page
    // Interleave "/" separator with breadcrumbs
    this._children = interleave(Array.from(this.children));
  }

  render() {
    return html`
      <style>
        @import "https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css";
      </style>
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
