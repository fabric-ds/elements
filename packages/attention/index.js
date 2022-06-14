import { css, html } from 'lit';
import { FabricElement, fclasses } from '../utils';

class FabricAttention extends FabricElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    actualDirection: { type: String, state: true },

    // Render Attention element without arrow
    noArrow: { type: Boolean },

    // Whether Attention element is shown, used for tooltip
    isShowing: { type: Boolean },

    // Placement according to the target element
    // Arrow would be on the opposite side of this position
    placement: { type: String },

    // Container the Attention component is rendered relatively to
    targetEl: { type: String },

    // Arrow props

    // Opposite direction of which the arrow should point
    direction: { type: String },

    // Render tooltip
    tooltip: { type: Boolean },

    // Render callout
    callout: { type: Boolean },

    // Render popover
    popover: { type: Boolean },

    // Forward arrow ref so Attention element can use it
    ref: { type: String },
  };

  constructor() {
    super();

    this.isShowing = {};

    this.attentionState = {
      get isShowing() {
        return this.isShowing;
      },
    };

    console.log(this.attentionState);
  }

  get _attentionArrow() {
    return html`<f-attention-arrow direction="${this.actualDirection}"></f-attention-arrow>`;
  }

  render() {
    console.log('render called');

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
