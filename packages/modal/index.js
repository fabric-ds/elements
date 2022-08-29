import { html } from 'lit';
import { fclasses, FabricElement } from '../utils';
import { modal as c } from '@fabric-ds/css/component-classes';
import { leftButtonSvg, rightButtonSvg } from './svgs';
import { setup, teardown } from 'scroll-doctor';
import '@a11y/focus-trap';

class FabricModal extends FabricElement {
  static properties = {
    open: { type: Boolean },
    left: { type: Boolean },
    right: { type: Boolean },
  };

  get _leftButtonClasses() {
    return fclasses({
      [c.transitionTitle]: true,
      [c.titleButton]: true,
      [c.titleButtonLeft]: true,
      'justify-self-start': true,
    });
  }

  get _rightButtonClasses() {
    return fclasses({
      [c.transitionTitle]: true,
      [c.titleButton]: true,
      [c.titleButtonRight]: true,
      'justify-self-end': true,
    });
  }

  get _titleClasses() {
    return fclasses({
      [c.transitionTitle]: true,
      'justify-self-center': !!this.left,
      'col-span-2': !this.left,
    });
  }

  updated() {
    super.updated();
    if (this.open) {
      if (!this._scrollDoctorEnabled) {
        setup(this);
        this._scrollDoctorEnabled = true;
        // // take note of where the focus is for later
        this._activeEl = document.activeElement;
        // // set focus inside the modal
        this.shadowRoot.querySelector('focus-trap').focusFirstElement();
      }
    } else {
      if (this._scrollDoctorEnabled) {
        teardown();
        this._scrollDoctorEnabled = false;
        this._activeEl.focus();
      }
    }
  }

  _containerKeyDown(event) {
    if (event.key === 'Escape') this._dismiss();
  }

  _containerClick(event) {
    event.stopPropagation();
  }

  _dismiss(event) {
    this.dispatchEvent(new CustomEvent('close'));
  }

  get _leftButton() {
    return html`<button
      type="button"
      aria-label="Tilbake"
      class="${this._leftButtonClasses}"
      @click="${this._dismiss}"
    >
      ${leftButtonSvg}
    </button>`;
  }

  get _rightButton() {
    return html`<button
      type="button"
      aria-label="Lukk"
      class="${this._rightButtonClasses}"
      @click="${this._dismiss}"
    >
      ${rightButtonSvg}
    </button>`;
  }

  render() {
    if (!this.open) return html``;
    return html`
      ${this._fabricStylesheet}
      <focus-trap>
        <div @click="${this._dismiss}" class="${c.backdrop}">
          <div
            class="${c.modal}"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fabric_modal_id"
            @click="${this._containerClick}"
            @keydown="${this._containerKeyDown}"
          >
            <div class="${c.title}">
              ${this.left ? this._leftButton : ''}
              <div id="fabric_modal_id" class="${this._titleClasses}">
                <p class="${c.titleText}">
                  <slot name="title"></slot>
                </p>
              </div>
              ${this.right ? this._rightButton : ''}
            </div>
            <div class="${c.content}">
              <slot></slot>
            </div>
            <div class="${c.footer}">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </focus-trap>
    `;
  }
}

if (!customElements.get('f-modal')) {
  customElements.define('f-modal', FabricModal);
}

export { FabricModal };
