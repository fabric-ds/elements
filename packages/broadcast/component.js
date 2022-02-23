import { LitElement } from 'lit-element';
import { windowExists } from '../utils';
import { FabricToastContainer } from '../..';

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
    this._toastContainer = FabricToastContainer.init();
  }

  async connectedCallback() {
    super.connectedCallback();
    if (!this.api) {
      console.error('Broadcast "api" attribute invalid or undefined');
      return;
    }
    if (windowExists) {
      await this.fetchMessage();
      setInterval(() => this.fetchMessage(), this.interval);
    }
  }

  async fetchMessage() {
    const url = `${this.api}?path=${this.url}`;
    try {
      const res = await (await fetch(url)).json();
      this._messages = res.length ? res : [];
    } catch (err) {
      console.error(`failed to fetch broadcasts from given url (${url})`)
    }
  }

  render() {
    for (const { id, message: text } of this._messages) {
      this._toastContainer.set({ id: `broadcast-${id}`, text, type: 'warning', canclose: true });
    }
  }
}
