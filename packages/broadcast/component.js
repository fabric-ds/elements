import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { windowExists } from '../utils';

export class FabricBroadcast extends LitElement {
  static properties = {
    _messages: {
      state: true,
      hasChanged(newVal, oldVal) {
        if (!oldVal || oldVal.length === 0) return true;
        const newIds = newVal.map(({ id }) => id).sort();
        const oldIds = oldVal.map(({ id }) => id).sort();
        return JSON.stringify(newIds) !== JSON.stringify(oldIds);
      },
    },
    hiddenMessageIds: {
      state: true,
      type: Array,
    },
    interval: { type: Number, attribute: true, reflect: true },
    url: { type: String, attribute: true, reflect: true },
    api: { type: String, attribute: true, reflect: true },
  };

  constructor() {
    super();
    this._messages = [];
    this.interval = 30000;
    this.hiddenMessageIds = [];
    this.url = windowExists ? window.location.href : '';
  }

  async connectedCallback() {
    super.connectedCallback();
    if (!this.api) {
      console.error('Broadcast "api" attribute invalid or undefined');
      return;
    }
    if (windowExists) {
      await this._fetchMessage();
      setInterval(() => this._fetchMessage(), this.interval);
    }
  }

  async _fetchMessage() {
    const url = `${this.api}?path=${this.url}`;
    try {
      const res = await (await fetch(url)).json();
      this._messages = res.length ? res : [];
    } catch (err) {
      console.error(`failed to fetch broadcasts from given url (${url})`);
    }
  }

  async _del(id) {
    const el = this.renderRoot.querySelector(`#broadcast-${id}`);
    await el.collapse();
    this.hiddenMessageIds = [...this.hiddenMessageIds, id];
  }

  render() {
    const messages =
      this.hiddenMessageIds.length > 0
        ? this._messages.filter((item) => !this.hiddenMessageIds.includes(item.id))
        : this._messages;

    return html`
      <link
        rel="stylesheet"
        type="text/css"
        href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
      />
      <aside class=${`${messages.length === 0 ? 'hidden' : 'mb-16'}`}>
        ${repeat(
          messages,
          ({ id }) => `broadcast-${id}`,
          ({ id, message }) =>
            html`<f-toast
              class="w-full"
              id="broadcast-${id}"
              type="warning"
              text="${message}"
              canclose
              @close=${() => this._del(id)}
            >
            </f-toast>`,
        )}
      </aside>
    `;
  }
}
