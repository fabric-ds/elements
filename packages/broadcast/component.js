import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { windowExists } from '../utils';

export class FabricBroadcast extends LitElement {
  static properties = {
    _messages: {
      state: true,
      hasChanged(newVal, oldVal) {
        if (!oldVal) return true;
        const newIds = newVal.map(({ id }) => id).sort();
        const oldIds = oldVal.map(({ id }) => id).sort();
        return JSON.stringify(newIds) !== JSON.stringify(oldIds);
      },
    },
    interval: { type: Number, attribute: true, reflect: true },
    url: { type: String, attribute: true, reflect: true },
    api: { type: String, attribute: true, reflect: true },
  };

  constructor() {
    super();
    this._messages = [];
    this.interval = 30000;
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

  get _broadcasts() {
    if (!windowExists) return this._messages;
    const ignoredBroadcasts = JSON.parse(window.localStorage.getItem('ignored-broadcasts')) || [];
    return this._messages.filter(({ id }) => !ignoredBroadcasts.includes(id));
  }

  async _del(id) {
    const el = this.renderRoot.querySelector(`#${id}`);
    await el.collapse();
    const ignoredBroadcasts = JSON.parse(window.localStorage.getItem('ignored-broadcasts')) || [];
    ignoredBroadcasts.push(id.split('-')[1]);
    window.localStorage.setItem('ignored-broadcasts', JSON.stringify(ignoredBroadcasts));
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        type="text/css"
        href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
      />
      <aside>
        ${repeat(
          this._broadcasts,
          ({ id }) => `broadcast-${id}`,
          ({ id, message }) => html`<f-toast
            class="w-full"
            id="broadcast-${id}"
            type="warning"
            text="${message}"
            canclose
            @close=${() => this._del(`broadcast-${id}`)}
          >
          </f-toast>`,
        )}
      </aside>
    `;
  }
}
