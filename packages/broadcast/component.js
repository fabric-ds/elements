import { LitElement, css, html } from 'lit-element';
import { windowExists } from '../utils';

export class FabricBroadcast extends LitElement {
  static styles = css`
    <style>:host { display: block; }</style>
    <link
        rel="stylesheet"
        type="text/css"
        href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
    />
  `;

  static properties = {
    messages: {
      type: Array,
      attribute: true,
      hasChanged(newVal, oldVal) {
        if (!oldVal) return true;
        const newIds = newVal.map(({ id }) => id).sort();
        const oldIds = oldVal.map(({ id }) => id).sort();
        return JSON.stringify(newIds) !== JSON.stringify(oldIds);
      },
    },
    interval: { type: Number, attribute: true },
    dev: { type: Boolean, attribute: true },
    url: { type: String, attribute: true },
    api: { type: String, attribute: true },
  };

  constructor() {
    super();
    this.messages = [];
    this.interval = 30000;
    this.dev = false;
    this.url = windowExists ? window.location.href : '';
    this.api = 'https://www.finn.no/broadcasts';
  }

  async connectedCallback() {
    super.connectedCallback();
    if (windowExists) {
      await this.fetchMessage();
      setInterval(() => this.fetchMessage(), this.interval);
    }
  }

  async fetchMessage() {
    const url = `${this.api}?path=${this.url}`;
    const res = await (await fetch(url)).json();
    this.messages = res.length ? res : [];
  }

  close(id) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }

  render() {
    return html`<div id="broadcast">
      ${this.messages.map(m => html`<f-toast id="${m.id}" type="warning" text="${m.message}"></f-toast>`)}
    </div>`;
  }
}
