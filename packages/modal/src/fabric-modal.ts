import { LitElement, html, customElement } from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('fabric-modal')
export class FabricModal extends LitElement {
    render() {
        return html`<div>Empty</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fabric-modal': FabricModal;
    }
}
