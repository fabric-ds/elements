import { LitElement, css, html } from 'lit-element';
import { toaster as c } from '@fabric-ds/component-classes';

/**
 * Toast helper function options
 * @typedef    {Object}                               ToastOptions
 * @property   {(number|string)}                      [id]        Custom identifier
 * @property   {('success'|'error'|'warning'|'info')} [type]      Type of alert
 * @property   {String}                               [text]      The toast message. Only needed when updating text on existing toast
 * @property   {(number|string)}                      [duration]  Duration of toast in milliseconds Set to 0 to disable auto-removal
 * @property   {Boolean}                              [canClose]  Can toast be dismissed?
 */

export class FabricToastContainer extends LitElement {
    static styles = css`:host { display: block; }`;
  
    static properties = {
        _toasts: { state: true },
    };

    constructor() {
        super();
        this._toasts = new Map();
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.duration !== Number.POSITIVE_INFINITY) {
          this._interval = setInterval(() => {
            const toasts = Array.from(this._toasts).filter(([,toast]) => Date.now() <= toast.duration);
            if (toasts.length != this._toasts.size) this._toasts = new Map(toasts);
          }, 500);
        }
    }
    
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._interval) clearTimeout(this._interval);
    }

    static init() {
        let el = document.querySelector('f-toast-container');
        if (!el) {
            el = document.createElement('f-toast-container');
            document.body.appendChild(el);
        }
        return el;
    }

    /**
     * 
     * @param {String|Number} id 
     * @returns {ToastOptions}
     */
    get(id) {
        if (!id) throw new Error('invalid or undefined "id" giving when attempting to retrieve toast');
        return this._toasts.get(id);
    }

    /**
     * 
     * @param {Object} toast 
     * @returns {FabricToastContainer}
     */
    set(toast) {
        if (!toast.id) throw new Error('invalid or undefined "id" on toast object');
        const result = this._toasts.set(toast.id, {
            ...toast,
            duration: Date.now() + toast.duration || Number.POSITIVE_INFINITY,
        });
        this._toasts = new Map(Array.from(this._toasts));
        return result;
    }

    /**
     * 
     * @param {String|Number} id
     * @returns {ToastOptions}
     */
    del(id) {
        if (!id) throw new Error('invalid or undefined "id" given when attempting to remove toast');
        const result = this._toasts.delete(id);
        this._toasts = new Map(Array.from(this._toasts));
        return result;
    }

    render() {
        return html`
            <link
                rel="stylesheet"
                type="text/css"
                href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
            />
            <aside class="${c.toasterContainer}">
                <div class="${c.toaster}" id="f-toast-container-list"> 
                    ${Array.from(this._toasts).map(([,toast]) => html`
                    <f-toast
                        class="w-full"
                        id="${toast.id}"
                        type="${toast.type}"
                        text="${toast.text}"
                        ?canclose=${toast.canclose === false ? false : true }
                        @close=${() => this.del(toast.id)}>
                    </f-toast>`)}
                </div>
            </aside>
        `;
    }
}

if (!customElements.get('f-toast-container')) {
    customElements.define('f-toast-container', FabricToastContainer);
}
