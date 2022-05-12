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
    tooltip: { type: Boolean },
    callout: { type: Boolean },
    popover: { type: Boolean },
    noArrow: { type: Boolean },
    attentionClass: {},
    actualDirection: {},
  };

  constructor() {
    super();
  }

  get _wrapperClasses() {
    return fclasses({
      [a.base]: true,
      [a.tooltip]: this.tooltip,
      [a.callout]: this.callout,
      [a.popover]: this.popover,
    });
  }

  get _attentionArrow() {
    return html`<f-attention-arrow direction="${this.actualDirection}"></f-attention-arrow>`;
  }

  render() {
    return html`
      ${this._fabricStylesheet}
      <div class="${fclasses({ 'absolute z-50': !this.callout, [this.attentionClass]: true })}">
        <div class="${this._wrapperClasses}">
          ${this.noArrow ? '' : this._attentionArrow}
          <div class="last-child:mb-0">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('f-attention')) {
  customElements.define('f-attention', FabricAttention);
}

export { FabricAttention };
