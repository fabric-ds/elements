import { LitElement, html, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import focusLock from 'dom-focus-lock';

/**
 * A modal dialog.
 *
 * @slot - Default content placed in the modal
 * @slot footer - Footer of the modal
 */
export class FabricModal extends LitElement {
    static styles = css`
        @tailwind utilities;

        :host {
            --padding: 32px;
            --max-height: 80vh;
            --width: 300px;
        }

        .backdrop {
            background-color: rgba(0, 0, 0, 0.35);
        }

        .modal {
            max-height: var(--max-height);
            width: var(--width);
        }

        slot {
            padding: var(--padding);
        }

        slot[name='footer'] {
            margin-top: calc(-1 * var(--padding));
        }
    `;

    static get properties() {
        return {
            hidden: { type: Boolean, reflect: true },
            ariaLabel: { type: String, attribute: 'aria-label' },
            ariaLabelledby: { type: String, attribute: 'aria-labelledby' },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        document.addEventListener(
            'keydown',
            this.handleDocumentKeydown.bind(this),
        );
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        document.removeEventListener('keydown', this.handleDocumentKeydown);
        focusLock.off(this);
    }

    updated(changedProperties) {
        if (changedProperties.has('hidden')) {
            if (this.hidden) {
                focusLock.off(this);
            } else {
                focusLock.on(this);
            }
        }
    }

    /**
     * @private
     * @param {KeyboardEvent} e
     */
    handleDocumentKeydown(e) {
        if (!e.defaultPrevented && !this.hidden) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                this.requestDismiss();
            }
        }
    }

    /**
     * @private
     * @param {MouseEvent} e
     */
    handleBackdropMousedown(e) {
        if (
            !e.defaultPrevented &&
            // the first child is the backdrop
            this.shadowRoot.firstElementChild === e.target
        ) {
            this.requestDismiss();
        }
    }

    /** @private */
    requestDismiss() {
        const cancelled = !this.dispatchEvent(
            new CustomEvent('dismiss', {
                cancelable: true,
                bubbles: true,
                composed: true,
            }),
        );

        if (!cancelled) {
            this.hide();
        }
    }

    /**
     * Show the modal dialog.
     * @public
     */
    show() {
        this.hidden = false;
    }

    /**
     * Hides the modal dialog.
     * @public
     */
    hide() {
        this.hidden = true;
    }

    render() {
        return html`<div
            @click="${this.handleBackdropMousedown}"
            class="fixed inset-0 grid place-content-center backdrop"
        >
            <div
                aria-label="${ifDefined(this.ariaLabel)}"
                aria-labelledby="${ifDefined(this.ariaLabelledby)}"
                aria-modal="true"
                class="modal rounded-8 bg-white flex flex-col overflow-hidden outline-none"
                role="dialog"
                tabindex="-1"
            >
                <slot
                    class="block overflow-y-auto overflow-x-hidden last-child:mb-0"
                ></slot>
                <slot class="flex justify-end" name="footer"></slot>
            </div>
        </div>`;
    }
}

customElements.define('fabric-modal', FabricModal);
