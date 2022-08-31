import { html, css } from 'lit';
import { fclasses, FabricElement } from '../utils';
import { modal as c } from '@fabric-ds/css/component-classes';
import { leftButtonSvg, rightButtonSvg } from './svgs';
import { setup, teardown } from 'scroll-doctor';

class FabricModal extends FabricElement {
  static properties = {
    open: { type: Boolean },
    left: { type: Boolean },
    right: { type: Boolean },
  };

  static styles = css`
    :host {
      --f-modal-width: 640px;
      --f-modal-max-height: 80%;
    }
    .modal {
      width: var(--f-modal-width);
    }
    ::backdrop {
      background-color: #00000059;
    }
  `;

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

  willUpdate() {
    if (!this.open && this._scrollDoctorEnabled) {
      // this.renderRoot.querySelector('dialog').close();
      // close dialog case
      this.renderRoot.querySelector('dialog').close();
      teardown();
      this._removeSafariDialogHack();
    }
  }

  updated() {
    if (this.open && !this._scrollDoctorEnabled) {
      // open dialog case
      setup(this);
      this._scrollDoctorEnabled = true;
      // take note of where the focus is for later
      this._activeEl = document.activeElement;
      this.renderRoot.querySelector('dialog').showModal();
      this._applySafariDialogHack();
    } else if (!this.open && this._scrollDoctorEnabled) {
      this._scrollDoctorEnabled = false;
      this._activeEl.focus();
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

  _applySafariDialogHack() {
    // Nasty workaround for Safari + VoiceOver to make sure surrounding content is not available for VoiceOver.
    // Super important that these aria-hidden attributes are removed when the dialog is closed.
    this._hiddenSurroundings = [];
    ['previousElementSibling', 'nextElementSibling'].forEach((direction) => {
      let el = this;
      while (el !== document.body) {
        if (el[direction]) {
          el = el[direction];
          if (el.getAttribute('aria-hidden') !== 'true') {
            this._hiddenSurroundings.push(el);
            el.setAttribute('aria-hidden', 'true');
          }
        } else el = el.parentNode;
      }
    });
  }

  _removeSafariDialogHack() {
    this._hiddenSurroundings.forEach(el => el.removeAttribute('aria-hidden'));
  }

  render() {
    if (!this.open) return html``;
    return html`
      ${this._fabricStylesheet}
      <dialog @click="${this._dismiss}" class="overflow-hidden inset-0 bg-transparent">
        <div
          class="${c.modal}"
          tabindex="-1"
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
      </dialog>
    `;
  }
}

if (!customElements.get('f-modal')) {
  customElements.define('f-modal', FabricModal);
}

export { FabricModal };
