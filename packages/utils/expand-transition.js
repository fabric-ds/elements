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
    if (!this._wrapper) return;

    if (!this.show) {
      collapse(this._wrapper);
    }

    // If show is set to `true` by user, animate only after component is mount
    if (this._mounted && this.show) {
      expand(this._wrapper);
    }
  }

  updated() {
    this._mounted = true;
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
}

if (!customElements.get('f-expand-transition')) {
  customElements.define('f-expand-transition', ExpandTransition);
}

export { ExpandTransition };
