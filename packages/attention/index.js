import { css, html } from 'lit';
import { FabricElement, classes } from '../utils';
import { attention as c } from '@fabric-ds/css/component-classes';
import { opposites, rotation, useRecompute as recompute } from '@fabric-ds/core/attention';

class FabricAttention extends FabricElement {
  static properties = {
    // Whether Attention element is shown
    isShowing: { type: Boolean, reflect: true },
    // Placement according to the target element
    // Arrow would be on the opposite side of this position
    placement: { type: String },
    // The id of element that the Attention component is rendered relatively to
    targetElId: { type: String },
    // Whether Attention element is rendered as a tooltip
    tooltip: { type: Boolean, reflect: true },
    // Whether Attention element is rendered as an inline callout
    callout: { type: Boolean, reflect: true },
    // Whether Attention element is rendered as a popover
    popover: { type: Boolean, reflect: true },
    // Render Attention element without an arrow
    noArrow: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      position: absolute;
      z-index: 50;
      visibility: var(--attention-visibility);
      display: var(--attention-display);
    }

    #arrow {
      border-top-left-radius: 4px;
      z-index: 1;
    }

    ::slotted(:last-child) {
      margin-bottom: 0px !important;
    }
  `;

  constructor() {
    super();

    this.isShowing = false;
    this.tooltip = false;
    this.callout = false;
    this.popover = false;
    this.noArrow = false;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.placement || !Object.keys(opposites).includes(this.placement)) {
      throw new Error(
        `Invalid "placement" attribute. Set its value to one of the following:\n${JSON.stringify(
          Object.keys(opposites),
        )}`,
      );
    }

    // Fix FOUC effect issues
    setTimeout(() => this.requestUpdate(), 0);

    // Attention of "callout" type should always be used inline
    if (this._isCallout) {
      this.style.position = 'relative';
    }
  }

  get _isShowing() {
    return this.isShowing;
  }

  get _isCallout() {
    return this.callout;
  }

  get _actualDirection() {
    return this.placement;
  }

  set _actualDirection(v) {
    this.placement = v;
  }

  get _directionName() {
    return this.placement;
  }

  get _arrowEl() {
    return this.renderRoot.querySelector('#arrow');
  }

  get _attentionEl() {
    return this;
  }

  get _targetEl() {
    return document.querySelector(this.targetElId);
  }

  get _noArrow() {
    return this.noArrow;
  }

  get _arrowDirection() {
    return opposites[this.placement];
  }

  updated() {
    if (!this._isCallout) {
      this.style.setProperty('--attention-visibility', this._isShowing ? '' : 'hidden');
    }

    if (!this.tooltip) {
      this.style.setProperty('--attention-display', this._isShowing ? 'block' : 'none');
    }

    this.attentionState = {
      isShowing: this._isShowing,
      isCallout: this._isCallout,
      actualDirection: this._actualDirection,
      directionName: this._directionName,
      arrowEl: this._arrowEl,
      attentionEl: this._attentionEl,
      targetEl: this._targetEl,
      noArrow: this._noArrow,
    };

    // Recompute attention element position on property changes
    recompute(this.attentionState);
  }

  get _wrapperClasses() {
    return classes({
      [c.base]: true,
      [c.tooltip]: this.tooltip,
      [c.callout]: this.callout,
      [c.popover]: this.popover,
    });
  }

  get _arrowClasses() {
    return classes({
      [c.arrowBase]: true,
      [`-${this._arrowDirection}-8`]: true,
      [c.arrowTooltip]: this.tooltip,
      [c.arrowCallout]: this.callout,
      [c.arrowPopover]: this.popover,
    });
  }

  render() {
    return html`
      ${this._fabricStylesheet}
      <div class="">
        <div class="${this._wrapperClasses}">
          ${this._noArrow
            ? ''
            : html` <div
                id="arrow"
                class="${this._arrowClasses}"
                style="transform:rotate(${rotation[this._arrowDirection]}deg); 
                margin-${
                  // border alignment is off by a fraction of a pixel, this fixes it
                  this._arrowDirection.charAt(0).toLowerCase() + this._arrowDirection.slice(1)
                }:-0.5px;"
              />`}
          <slot></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('f-attention')) {
  customElements.define('f-attention', FabricAttention);
}

export { FabricAttention };
