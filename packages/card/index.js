import { html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { card as c } from '@fabric-ds/css/component-classes';
import { FabricElement, fclasses } from '../utils';

const keys = {
  ENTER: 'Enter',
  SPACE: ' ',
};

class FabricCard extends FabricElement {
  static styles = [super.styles, css`
    a::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    :host {
      display: block;
    }
  `];

  static properties = {
    selected: { type: Boolean, reflect: true },
    flat: { type: Boolean },
    clickable: { type: Boolean },
  };

  constructor() {
    super();
    this.selected = false;
    this.flat = false;
    this.clickable = false;
  }

  get _outerClasses() {
    return fclasses({
      [c.card]: true,
      [c.cardShadow]: !this.flat,
      [c.cardSelected]: this.selected,
      [c.cardFlat]: this.flat,
      [this.selected ? c.cardFlatSelected : c.cardFlatUnselected]: this.flat,
    });
  }

  get _innerClasses() {
    return fclasses({
      [c.cardOutline]: true,
      [this.selected ? c.cardOutlineSelected : c.cardOutlineUnselected]: true,
    });
  }

  get uuButton() {
    return html`<button class="sr-only" aria-pressed="${this.selected}" tabindex="-1">
      Velg
    </button>`;
  }

  get uuSpan() {
    return html`<span role="checkbox" aria-checked="true" aria-disabled="true"></span>`;
  }

  keypressed(e) {
    if (!this.clickable || e.altKey || e.ctrlKey) return;
    if (e.key === keys.ENTER || e.key === keys.SPACE) {
      e.preventDefault();
      this.click();
    }
  }

  render() {
    return html`
      ${this._fabricStylesheet}
      <div
        tabindex=${ifDefined(this.clickable ? '0' : undefined)}
        class="${this._outerClasses}"
        @keydown=${this.keypressed}
      >
        ${this.clickable ? this.uuButton : ''}
        ${!this.clickable && this.selected ? this.uuSpan : ''}
        <div class="${this._innerClasses}"></div>
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('f-card')) {
  customElements.define('f-card', FabricCard);
}

export { FabricCard };
