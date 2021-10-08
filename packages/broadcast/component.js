import { FabricWebComponent } from '../utils';

export class FabricBroadcast extends FabricWebComponent {
  async connectedCallback() {
    // 300 000 ms is five minutes
    const REFETCH_INTERVAL = Number(this.getAttribute('interval')) || 300000;

    // Fetch broadcast on load and setup refetch
    await this.fetchMessage();
    setInterval(async () => await this.fetchMessage(), REFETCH_INTERVAL);
  }

  async fetchMessage() {
    if (!window) return;
    const existing = this.shadowRoot.querySelector('#broadcast-toast');

    // Generate url
    const dev = Boolean(this.getAttribute('dev'));
    const url = `https://${dev ? 'dev' : 'www'}.finn.no/broadcasts?path=${
      this.getAttribute('path') || window.location.href
    }`;

    // Fetch message
    const res = await (await fetch(url.toString())).json();

    // If response exists
    if (res.length) {
      this.message = res[0].message;

      // exists -> update text
      // no -> create container
      if (existing) {
        existing.setAttribute('text', this.message);
      } else {
        this.shadowRoot.innerHTML += `
          <div id="broadcast" role="alert" aria-atomic="false">
            <f-toast id="broadcast-toast" type="warning" text="${this.message}"></f-toast>
          </div>
        `;
      }

      this.message = res[0].message;
    } else {
      // no broadcast exists, remove container
      this.message = '';
      if (existing) existing.remove();
    }
  }
}
