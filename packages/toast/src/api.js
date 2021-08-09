import { toast, toaster as c } from '@finn-no/fabric-component-classes';
import { collapse } from 'element-collapse';

export function initToasts() {
    if (!window.fabricToasts) window.fabricToasts = { toasts: [] };
    if (!document.getElementById('fabric-toast-container')) {
        const container = document.createElement('aside');
        container.id = 'fabric-toast-container';
        container.className = c.toasterContainer;

        const div = document.createElement('div');
        div.id = 'fabric-toast-container-list';
        div.className = `${c.toaster} relative`;

        container.appendChild(div);
        document.querySelector('body').appendChild(container);
    }

    return true;
}

export function useToast() {
    const container = document.getElementById('fabric-toast-container');
    const list = document.getElementById('fabric-toast-container-list');
    if (!container) {
        throw new Error(
            'No toast container found. Make sure to call initToasts() first.',
        );
    }

    // eslint-disable-next-line no-undef
    const toasts = new Proxy(window.fabricToasts, {
        set: function (target, key, value) {
            target[key] = value;
            return true;
        },
    });

    return {
        toast: (message, options) => {
            const id =
                Date.now().toString(36) +
                Math.random().toString(36).slice(2, 5);

            const toast = {
                id,
                programmatic: true,
                text: message,
                duration: 2400,
                ...options,
            };

            // Add to container
            const el = document.createElement('f-toast');
            Object.entries(toast).forEach((t) => {
                el.setAttribute(t[0], t[1]);
            });
            list.appendChild(el);

            toasts.toasts = [...toasts.toasts, toast];

            return toast;
        },
        removeToast: (id) => {
            toasts.toasts = toasts.toasts.filter((toast) => toast.id !== id);

            const el = document.getElementById(id);
            if (!el) return;

            collapse(el);
            setTimeout(() => {
                el.remove();
            }, 1000);
        },

        /**
         * Update an existing toast
         *
         * @param {String}   id                Existing toast identifier
         * @param {Object}   options
         * @param {String}   options.id        Custom identifier
         * @param {String}   options.type      Type of alert (success, error, warning, info)
         * @param {String}   options.text      The toast message
         * @param {String}   options.duration  Duration of toast in milliseconds Set to 0 to disable auto-removal
         * @param {Boolean}  options.canClose  Can toast be dismissed?
         * @param {Function} options.onClose   Dismiss handler
         */
        updateToast: (id, options) => {
            const t = toasts.toasts.find((toast) => toast.id === id);

            const toast = {
                ...t,
                ...options,
            };

            // Add to container
            const el = document.getElementById(id);
            Object.entries(toast).forEach((t) => {
                el.setAttribute(t[0], t[1]);
            });

            toasts.toasts = toasts.toasts.map((t) =>
                t.id === toast.id ? toast : t,
            );

            return toast;
        },
    };
}
