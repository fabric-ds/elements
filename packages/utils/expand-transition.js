import { LitElement, css, html } from 'lit';
import { collapse, expand } from 'element-collapse';
import { fclasses } from '.';

class ExpandTransition extends LitElement {
  static properties = {
    show: { type: Boolean },
    _isExpanded: {
      state: true,
      type: Boolean,
      /*  hasChanged(newVal, oldVal) {
        if (!oldVal !== newVal) return newVal;
      }, */
    },
  };

  connectedCallback() {
    super.connectedCallback();
    this._isExpanded = this.show;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  async collapseElement() {
    await new Promise((resolve) => {
      collapse(this, resolve);
    });
    this._isExpanded = false;
  }

  expandElement() {
    expand(this);
    this._isExpanded = true;
  }

  /*   useEffect(() => {
    // Don't do anything at first render
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (show) {
      expandElement();
    } else {
      collapseElement();
    }
  }, [show]); */

  render() {
    return html` <div
      class="${fclasses({
        'overflow-hidden': true,
        'h-0 invisible': !this._isExpanded,
      })}"
      aria-hidden="${!this._isExpanded}"
    >
      ${this.children}
    </div>`;
  }

  createRenderRoot() {
    return this;
  }
}

if (!customElements.get('f-expand-transition')) {
  customElements.define('f-expand-transition', ExpandTransition);
}

export { ExpandTransition };
