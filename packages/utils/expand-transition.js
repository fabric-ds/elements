import { css, html } from 'lit';
import { collapse, expand } from 'element-collapse';
import { FabricElement, fclasses } from '.';

class ExpandTransition extends FabricElement {
  static properties = {
    show: {
      type: Boolean,
      reflect: true,
    },
  };

  constructor() {
    super();

    // Initialise fields
    this.show = false;
    this._mounted = false;
  }

  willUpdate() {
    if (this._wrapper && !this.show) {
      collapse(this._wrapper);
    }
  }

  async update() {
    super.update();

    // If `this` does not yet exist or component has not yet mounted
    if (!this._wrapper || !this._mounted) return;

    // Expand if show is true (set by user)
    if (this.show) {
      expand(this._wrapper);
    }
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`${this._fabricStylesheet}
      <div
        class="${fclasses({
          'overflow-hidden': true,
        })}"
        aria-hidden="${!this.show}"
      >
        <slot></slot>
      </div>`;
  }

  updated() {
    this._mounted = true;
  }

  get _wrapper() {
    return this ?? null;
  }
}

if (!customElements.get('f-expand-transition')) {
  customElements.define('f-expand-transition', ExpandTransition);
}

export { ExpandTransition };
