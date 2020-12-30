import { LitElement, html, customElement, css } from 'lit-element';
// @ts-ignore
import focusLock from 'dom-focus-lock';

@customElement('fabric-modal')
export class FabricModal extends LitElement {
    static styles = css`
        @tailwind utilities;

        .max-height {
            max-height: 80vh;
        }

        .width {
            width: 300px;
        }
    `;

    firstUpdated() {
        if (!this.hidden) {
            focusLock.on(this);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        focusLock.off(this);
    }

    /**
     * Open the modal dialog.
     */
    open() {
        if (this.hidden) {
            this.removeAttribute('hidden');
        }
    }

    /**
     * Close the modal dialog.
     */
    close() {
        if (!this.hidden) {
            this.setAttribute('hidden', '');
        }
    }

    private handleMouseDown(event: MouseEvent) {
        console.log(event.currentTarget);
        console.log(event.target);
        console.log(event);
    }

    render() {
        return html`<div
            @click="${this.handleMouseDown}"
            class="fixed inset-0 grid place-content-center bg-gray-700 bg-opacity-30"
        >
            <div
                role="dialog"
                aria-modal="true"
                class="max-height width rounded bg-white px-2 py-3"
            >
                <slot></slot>
            </div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fabric-modal': FabricModal;
    }
}
