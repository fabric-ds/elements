import { FabricWebComponent } from '../utils';
import { classNames } from '@chbphone55/classnames';
import { toast as c } from '@fabric-ds/component-classes';
import { expand, collapse } from 'element-collapse';
import { removeToast } from './api';

const ALLOWED_TYPES = ['success', 'warning', 'error', 'info'];
export class FabricToast extends FabricWebComponent {
  static get observedAttributes() {
    return ['type', 'text', 'duration', 'canclose', 'onclose'];
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'onclose':
        this[name] = new Function('return ' + newValue)();
        break;
      case 'canclose':
        this[name] = newValue == 'false' ? false : true;
        break;
      default:
        this[name] = newValue;
    }

    this.id =
      this.id ||
      Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    this.render(true);
  }

  connectedCallback() {
    this.isProgrammatic = !!this.getAttribute('programmatic');

    if (this.isProgrammatic && !ALLOWED_TYPES.includes(this.type)) {
      throw new Error(
        `Invalid toast type. Allowed types: ${ALLOWED_TYPES.reduce(
          (acc, curr, i) =>
            [acc, curr].join(i === ALLOWED_TYPES.length - 1 ? ' or ' : ', '),
        )}`,
      );
    }

    this.render();
  }

  render(updated) {
    const exists = this.shadowRoot.getElementById(`toast-${this.id}-wrapper`);
    if (exists) exists.remove();

    const isProgrammatic = this.isProgrammatic;
    const isSuccess = this.type === 'success';
    const isWarning = this.type === 'warning';
    const isError = this.type === 'error';
    const isInfo = this.type === 'info';
    const typeLabel = isSuccess
      ? 'Vellykket'
      : isError
      ? 'Feil'
      : isWarning
      ? 'Varsel'
      : 'Info';

    this.shadowRoot.innerHTML += `
            <section
                ${this.id ? `id="toast-${this.id}-wrapper"` : ''}
                ${isProgrammatic && !updated ? "style='height: 0;'" : ''}
                class="${c.toastWrapper}"
                aria-label="${typeLabel}"
            >
                <div
                    class="${classNames({
                      [c.toast]: true,
                      [c.toastPositive]: isSuccess,
                      [c.toastWarning]: isWarning,
                      [c.toastNegative]: isError,
                      [c.toastNeutral]: isInfo,
                    })}"
                >
                    <div
                        class="${classNames({
                          [c.toastIcon]: true,
                          [c.toastIconPositive]: isSuccess,
                          [c.toastIconWarning]: isWarning,
                          [c.toastIconNegative]: isError,
                          [c.toastIconNeutral]: isInfo,
                        })}"
                    >
                        ${
                          isSuccess
                            ? `
                        <svg
                            role="img"
                            aria-label="${typeLabel}"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 16 16"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M5.5 9l2 1.5L11 6"
                            />
                        </svg>`
                            : `
                        <svg
                            role="img"
                            aria-label="${typeLabel}"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 16 16"
                            class="${classNames(
                              'transition-transform duration-200',
                              {
                                'transform-rotate-180': isInfo,
                              },
                            )}"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-miterlimit="10"
                                stroke-width="1.5"
                                d="M8 9V4"
                            />
                            <circle
                                cx="8"
                                cy="11.8"
                                r=".8"
                                fill="currentColor"
                            />
                        </svg>`
                        }
                    </div>
                    <div
                        role="${isError || isWarning ? 'alert' : 'status'}"
                        class="${c.toastContent}"
                    >
                        <p ${this.id ? `id="toast-${this.id}-text"` : ''}>${
      this.text
    }</p>
                    </div>
                    ${
                      this.canclose
                        ? `
                            <button
                                ${this.id ? `id="toast-${this.id}-button"` : ''}
                                class="${c.toastClose}"
                            >
                                <svg
                                    role="img"
                                    aria-label="Lukk"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>`
                        : ``
                    }
                </div>
            </section>
        `;

    if (
      document.readyState === 'complete' ||
      document.readyState === 'loaded' ||
      updated
    ) {
      this.handleSetup(!!updated);
    } else {
      document.addEventListener(
        'DOMContentLoaded',
        this.handleSetup(!!updated),
      );
    }
  }

  handleSetup(updated) {
    const el = this.shadowRoot.getElementById(`toast-${this.id}-wrapper`);
    const button = this.shadowRoot.getElementById(`toast-${this.id}-button`);

    if (button) {
      const handleClose = () => {
        if (!this.canclose) return;

        this.onclose();

        if (this.isProgrammatic) {
          el && collapse(el);
          setTimeout(() => {
            removeToast(this.id);
          }, 1000);
        }
      };
      button.addEventListener('click', handleClose);
    }

    // Expand element on mount
    if (this.isProgrammatic && el && !updated) {
      expand(el);
    }

    // If a duration is passed, handle auto dismiss
    if ((this.duration || this.isProgrammatic) && el) {
      clearTimeout(this.c);
      clearTimeout(this.r);

      if (this.duration === '0') return;

      this.c = setTimeout(() => {
        collapse(el);
      }, Number(this.duration));

      this.r = setTimeout(() => {
        removeToast(this.id);
      }, Number(this.duration) + 1000);
    }
  }
}
