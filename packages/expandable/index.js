import { css, html } from 'lit';
import { fclasses, kebabCaseAttributes, FabricElement } from '../utils';
import { box as boxClasses, buttonReset } from '@fabric-ds/css/component-classes';
import '@fabric-ds/icons/elements/chevron-down-16';

class FabricExpandable extends kebabCaseAttributes(FabricElement) {
  static properties = {
    expanded: { type: Boolean },
    title: { type: String },
    info: { type: Boolean },
    box: { type: Boolean },
    bleed: { type: Boolean },
    buttonClass: { type: String },
    contentClass: { type: String },
    chevron: { type: Boolean },
    animated: { type: Boolean },
    headingLevel: { type: Number },
    _stateExpanded: { type: Boolean, state: true },
  };

  constructor() {
    super();

    this.expanded = false;
    this.animated = false;
    this.title = '';
    this.info = false;
    this.box = false;
    this.bleed = false;
    this.buttonClass = '';
    this.contentClass = '';
    this.chevron = true;
    this._stateExpanded = false;
    this._mounted = false;
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

  get _expandableSlot() {
    return html`<div
      class=${fclasses({
        [this.contentClass || '']: true,
        [boxClasses.box + (this.title ? ' pt-0' : '')]: this.box,
      })}
    >
      <slot></slot>
    </div>`;
  }

  willUpdate() {
    // Initialise state property with public property value
    if (!this._mounted && this.expanded) {
      this._stateExpanded = this.expanded;
      this._mounted = true;
    }
  }

  toggleExpanded() {
    const newState = !this._stateExpanded;
    const event = new CustomEvent('change', {
      detail: {
        expanded: newState,
      },
    });

    this._stateExpanded = newState;
    this.dispatchEvent(event);
  }

  render() {
    return html`${this._fabricStylesheet}
      <div
        class=${fclasses({
          'bg-aqua-50': this.info,
          ['py-0 px-0 ' + boxClasses.box]: this.box,
          [boxClasses.bleed]: this.bleed,
        })}
      >
        <f-unstyled-heading level=${this.headingLevel}>
          <button
            type="button"
            aria-expanded="${this._stateExpanded}"
            class=${fclasses({
              [this.buttonClass || '']: true,
              [buttonReset + ' hover:underline focus:underline']: true,
              ['w-full text-left relative ' + boxClasses.box]: this.box,
              'hover:text-aqua-700 active:text-aqua-800': this.info,
            })}
            @click=${this.toggleExpanded}
          >
            <div class="flex justify-between align-center">
              <slot name="title"><span class="h4">${this.title}</span></slot>
              ${this.chevron &&
              html`<div
                class=${fclasses({
                  'self-center transform transition-transform': true,
                  '-rotate-180': this._stateExpanded,
                  'relative left-8': !this.box,
                  'box-chevron': this.box,
                })}
              >
                <f-icon-chevron-down16></f-icon-chevron-down16>
              </div>`}
            </div>
          </button>
        </f-unstyled-heading>
        ${this.animated
          ? html`<f-expand-transition ?show=${this._stateExpanded}>
              ${this._expandableSlot}
            </f-expand-transition>`
          : html`<div
              class=${fclasses({
                'overflow-hidden': true,
                'h-0 invisible': !this._stateExpanded,
              })}
              aria-hidden=${!this._stateExpanded ? true : undefined}
            >
              ${this._expandableSlot}
            </div>`}
      </div>`;
  }
}

if (!customElements.get('f-expandable')) {
  customElements.define('f-expandable', FabricExpandable);
}

export { FabricExpandable };
