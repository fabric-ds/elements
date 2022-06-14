import { css, html } from 'lit';
import { collapse, expand } from 'element-collapse';
import { FabricElement, fclasses } from '.';

class ExpandTransition extends FabricElement {
  static properties = {
    show: {
      type: Boolean,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.show = false;
    this._mounted = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._expanded = this.show;
  }

  async willUpdate() {
    if (!this._mounted) {
      this._mounted = true;
      return;
    }

    if (this.show) {
      this._expanded = true;
    } else {
      if (this._wrapper) {
        console.log('collapsing');
        collapse(this._wrapper, this.setExpandedToFalse);
      }
    }
  }

  async update() {
    super.update();

    if (!this._wrapper) {
      return;
    }
    console.log('THIS._EXPANDED IN UPDATE', this._expanded);
    if (this._expanded) {
      console.log('expanding');

      this.shadowRoot.querySelector('div').classList.remove('h-0');
      this.shadowRoot.querySelector('div').classList.remove('invisible');
      expand(this._wrapper);
    }
  }

  get setExpandedToFalse() {
    console.log('SETTING EXPANDED');
    setTimeout(() => {
      this.shadowRoot.querySelector('div').classList.add('h-0');
      this.shadowRoot.querySelector('div').classList.add('invisible');
    }, 1000);

    return (this._expanded = false);
  }

  get initialClass() {
    if (!this.mounted && !this._expanded) {
      return { 'h-0 invisible': true };
    }
    return {};
  }

  get _wrapper() {
    return this ?? null;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`${this._fabricStylesheet}
      <div
        class="${fclasses({
          'overflow-hidden': true,
          ...this.initialClass,
        })}"
        aria-hidden="${!this._expanded}"
      >
        <slot></slot>
      </div>`;
  }
}

if (!customElements.get('f-expand-transition')) {
  customElements.define('f-expand-transition', ExpandTransition);
}

export { ExpandTransition };
