import { FabricWebComponent, windowExists } from '../utils';

export class FabricBroadcast extends FabricWebComponent {
  async connectedCallback() {
    const REFETCH_INTERVAL = Number(this.getAttribute('interval')) || 300000; // 300 000 ms = 5 minutes

    // Fetch broadcast on load and setup refetch
    await this.fetchMessage();
    setInterval(async () => await this.fetchMessage(), REFETCH_INTERVAL);
  }

  async fetchMessage() {
    if (!windowExists) return;
    const existing = this.shadowRoot.querySelector('#broadcast-toast');

    // Generate url
    const dev = Boolean(this.getAttribute('dev'));
    const broadcastUrl = `https://${dev ? 'dev' : 'www'}.finn.no/broadcasts`;
    const pageUrl = this.getAttribute('url') || window.location.href;
    const url = new URL(broadcastUrl);
    url.searchParams.set('path', pageUrl);

    // Fetch message
    const res = await (await fetch(url.href)).json();

    // If response exists
    if (res.length) {
      this.message = res[0].message;

      if (existing) {
        // Container exists, update toast message
        existing.setAttribute('text', this.message);
      } else {
        // Setup container with toast
        this.shadowRoot.innerHTML += `
          <div id="broadcast">
            <f-toast id="broadcast-toast" type="warning" text="${this.message}"></f-toast>
          </div>
        `;
      }
    } else {
      // No broadcast in response, remove container if broadcast previously existed
      this.message = '';
      if (existing) existing.remove();
    }
  }
}
