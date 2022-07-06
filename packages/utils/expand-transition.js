import { css, html } from 'lit';
import { collapse, expand } from 'element-collapse';
import { FabricElement } from '.';

class ExpandTransition extends FabricElement {
  static properties = {
    show: {
      type: Boolean,
      reflect: true,
    },
    _removeElement: { type: Boolean, state: true },
  };

  constructor() {
    super();

    // Initialise fields
    this.show = false;
    this._mounted = false;
    this._removeElement = this.show ? false : true;
  }

  willUpdate() {
    if (this.show && this._removeElement) {
      this._removeElement = false;
    }
  }

  updated() {
    if (!this._wrapper) return;

    // If show is set to `true` by user, animate only after component is mount
    if (this._mounted && this.show) {
      expand(this._wrapper);
    }

    if (this._mounted && !this.show && !this._removeElement) {
      collapse(this._wrapper, () => (this._removeElement = true));
    }

    if (!this._mounted) {
      this._mounted = true;
    }
  }

  get _wrapper() {
    return this ?? null;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<div aria-hidden=${!this.show}>
      ${this._removeElement ? html`` : html`<slot></slot>`}
    </div>`;
  }
}

if (!customElements.get('f-expand-transition')) {
  customElements.define('f-expand-transition', ExpandTransition);
}

export { ExpandTransition };
