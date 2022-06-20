import { css, html } from 'lit';
import { FabricElement } from '../utils';
import { infoSvg, negativeSvg, positiveSvg, warningSvg } from './svgs';

class FabricAlert extends FabricElement {
  static properties = {
    negative: { type: Boolean },
    positive: { type: Boolean },
    warning: { type: Boolean },
    info: { type: Boolean },
    show: { type: Boolean, reflect: true },
    role: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.negative = false;
    this.positive = false;
    this.warning = false;
    this.info = false;
    this.show = false;
    this.role = 'alert';
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.negative && !this.positive && !this.warning && !this.info) {
      throw new Error(
        'Alert attribute missing. Set it to one of the following:\nnegative, positive, warning, info.',
      );
    }
  }

  // Slotted elements remain in lightDOM which allows for control of their style outside of shadowDOM.
  // ::slotted([Simple Selector]) confirms to Specificity rules, but (being simple) does not add weight to lightDOM skin selectors,
  // so never gets higher Specificity. Thus in order to overwrite style linked within shadowDOM, we need to use !important.
  // https://stackoverflow.com/a/61631668
  static styles = css`
    :host {
      display: block;
    }
    ::slotted(:last-child) {
      margin-bottom: 0px !important;
    }
  `;

  get _style() {
    if (this.negative) {
      return {
        color: 'red',
        icon: negativeSvg(),
      };
    }

    if (this.positive) {
      return {
        color: 'green',
        icon: positiveSvg(),
      };
    }

    if (this.warning) {
      return {
        color: 'yellow',
        icon: warningSvg(),
      };
    }
    if (this.info) {
      return {
        color: 'aqua',
        icon: infoSvg(),
      };
    }

    return {};
  }

  render() {
    const { color, icon } = this._style;

    return html`
      ${this._fabricStylesheet}
      <f-expand-transition ?show=${this.show}>
        <div
          role=${this.role}
          class="${`flex p-16 border rounded-4 border-l-4 bg-${color}-50 border-${color}-300`}"
          style="border-left-color:var(--f-${color}-600)"
        >
          <div class="mr-8 text-${color}-600">${icon}</div>
          <div class="text-14">
            <slot></slot>
          </div>
        </div>
      </f-expand-transition>
    `;
  }
}

if (!customElements.get('f-alert')) {
  customElements.define('f-alert', FabricAlert);
}

export { FabricAlert };
