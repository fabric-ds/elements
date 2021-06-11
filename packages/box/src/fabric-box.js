import { LitElement, html, css } from 'lit-element';
import { box } from '@finn-no/fabric-component-classes';
import { classes } from '../../utils/index.js';

export class FabricBox extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('tabindex') && this.clickable)
            this.setAttribute('tabindex', 0);
        console.log(this.onclick);
        this.addEventListener('keydown', this._handleKeyDown);
    }

    disconnectedCallback() {
        this.removeEventListener('keydown', this._handleKeyDown);
        super.disconnectedCallback();
    }

    _handleKeyDown(event) {
        if (!this.clickable) return;
        // Manually mapping Enter and Space keydown events to the click event (if there is one).
        // The browser doesn't do this automatically unless the element is a button or an a-element.
        // The Box element can't be a button or link in case someone puts an interactive element inside the box, which would result in invalid HTML and severe a11y issues.
        if (
            typeof this.onclick === 'function' &&
            (event.keyCode === 13 || event.keyCode === 32)
        ) {
            this.onclick(event);
        }
    }

    static get properties() {
        return {
            bleed: { type: Boolean, reflect: true },
            clickable: { type: Boolean, reflect: true },
            info: { type: Boolean, reflect: true },
            neutral: { type: Boolean, reflect: true },
            bordered: { type: Boolean, reflect: true },
        };
    }

    setup() {
        return {
            classes: classes({
                [box.box]: true,
                [box.bleed]: this.bleed,
                [box.clickable]: this.clickable,
                'bg-aqua-50': this.info,
                'hover:bg-aqua-100 active:bg-aqua-200':
                    this.info && this.clickable,
                'bg-bluegray-100': this.neutral,
                'hover:bg-bluegray-200 active:bg-bluegray-300':
                    this.neutral && this.clickable,
                'border-2 border-bluegray-300': this.bordered,
            }),
        };
    }

    render() {
        const { classes } = this.setup();
        return html`<link
                rel="stylesheet"
                type="text/css"
                href="https://assets.finn.no/pkg/@finn-no/fabric-css/v0/fabric.min.css"
            />
            <div class="${classes}">
                ${this.clickable
                    ? html`<div><slot></slot></div>
                          <span role="button" aria-label="Les mer"></span>`
                    : html`<slot></slot>`}
            </div>`;
    }
}
