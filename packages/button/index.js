import { html } from 'lit';
import { classNames } from '@chbphone55/classnames';
import { FabricElement } from '../utils';

const variantClassMap = {
  primary: 'button button--primary',
  secondary: 'button',
  negative: 'button button--destructive',
  utility: 'button button--utility',
  link: 'button button--link',
  pill: 'button button--pill',
};

class FabricButton extends FabricElement {
  static properties = {
    type: { type: 'button' | 'submit' | 'reset', reflect: true },
    variant: { type: String, reflect: true },
    quiet: { type: Boolean, reflect: true },
    small: { type: Boolean, reflect: true },
    loading: { type: Boolean, reflect: true },
    href: { type: String, reflect: true },
    target: { type: String, reflect: true },
    rel: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.variant = 'secondary';
  }

  connectedCallback() {
    super.connectedCallback();

    const availableVariants = Object.keys(variantClassMap);
    if (!availableVariants.includes(this.variant)) {
      throw new Error(
        `Invalid "variant" attribute. Set its value to one of the following:\n${availableVariants.join(
          ', ',
        )}.`,
      );
    }
  }

  get _classes() {
    return classNames(variantClassMap[this.variant], {
      // quiet
      'button--flat': this.variant === 'secondary' && this.quiet,
      'button--destructive-flat': this.variant === 'negative' && this.quiet,
      'button--utility-flat': this.variant === 'utility' && this.quiet,
      // others
      'button--small': this.small,
      'button--in-progress': this.loading,
    });
  }

  render() {
    return html`${this._fabricStylesheet}
    ${this.href
      ? html`<a
          href=${this.href}
          target=${this.target}
          rel=${this.target === '_blank' ? this.rel || 'noopener' : undefined}
          class=${this._classes}
        >
          <slot></slot>
        </a>`
      : html`<button type=${this.type || 'button'} class=${this._classes}>
          <slot></slot>
        </button>`}
    ${this.loading
      ? html`<span
          class="sr-only"
          role="progressbar"
          aria-valuenow="{0}"
          aria-valuetext="Laster..."
        />`
      : null}`;
  }
}

if (!customElements.get('f-button')) {
  customElements.define('f-button', FabricButton);
}

export { FabricButton };
