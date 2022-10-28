import { css, html } from 'lit';
import { fclasses, FabricElement } from '../utils';
import { box as boxClasses } from '@fabric-ds/css/component-classes';

class FabricBox extends FabricElement {
  static properties = {
    bleed: { type: Boolean },
    bordered: { type: Boolean },
    info: { type: Boolean },
    neutral: { type: Boolean },
  };

  // Slotted elements remain in lightDOM which allows for control of their style outside of shadowDOM.
  // ::slotted([Simple Selector]) confirms to Specificity rules, but (being simple) does not add weight to lightDOM skin selectors,
  // so never gets higher Specificity. Thus in order to overwrite style linked within shadowDOM, we need to use !important.
  // https://stackoverflow.com/a/61631668
  static styles = [super.styles, css`
    :host {
      display: block;
    }
    ::slotted(:last-child) {
      margin-bottom: 0px !important;
    }
  `];

  get _class() {
    return fclasses({
      [boxClasses.box]: true,
      [boxClasses.bleed]: this.bleed,
      'bg-aqua-50': this.info,
      'bg-bluegray-100': this.neutral,
      'border-2 border-bluegray-300': this.bordered,
    });
  }

  render() {
    return html`
      ${this._fabricStylesheet}
      <div class="${this._class}">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('f-box')) {
  customElements.define('f-box', FabricBox);
}

export { FabricBox };
