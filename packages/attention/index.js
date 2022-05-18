import { html, css } from 'lit';
// import { ifDefined } from 'lit/directives/if-defined.js';
import { attention as a } from '@fabric-ds/css/component-classes';
import { useRecompute, directions } from '@fabric-ds/core/attention';
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
    show: { type: Boolean },
    top: { type: Boolean },
    right: { type: Boolean },
    bottom: { type: Boolean },
    left: { type: Boolean },
    attentionClass: { type: String },
    actualDirection: { type: String },

  };

  constructor() {
    super();

    this.top = false;
    this.right = false;
    this.bottom = false;
    this.left = false;

    this.attentionState = {
      isShowing: this.show,
      isCallout: this.callout,
      actualDirection: this.actualDirection,
      get directionName() {
        return directions.find(e => this[e]);
      },
      get arrowEl() { 
        return this.renderRoot.querySelector('f-attention-arrow') || null;
      },
      attentionEl: this,
      get targetEl() {
        return document.querySelector(this.targetEl) || null;
      },
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
      tooltip: this.tooltip,
      popover: this.popover,
      callout: this.callout,
      noArrow: this.noArrow,
      waitForDOM: () => new Promise(resolve => {
        resolve();
      }),
    };
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

  updated(changedProperties) {
    const top = changedProperties.get('top');
    const right = changedProperties.get('right');
    const bottom = changedProperties.get('bottom');
    const left = changedProperties.get('left');
    const targetEl = changedProperties.get('targetEl');
    if (top || right || bottom || left || targetEl) {
      useRecompute(this.attentionState);
    }
  }
}

if (!customElements.get('f-attention')) {
  customElements.define('f-attention', FabricAttention);
}

export { FabricAttention };
