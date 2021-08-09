import { FabricModal } from '../../packages/modal/src/fabric-modal.js';
import { FabricBox } from '../../packages/box/src/fabric-box.js';
import { FabricBreadcrumbs } from '../../packages/breadcrumbs/src/fabric-breadcrumbs.js';
import { initToasts, useToast } from '../../packages/toast/src';
import { FabricToast } from '../../packages/toast/src/fabric-toast';

initToasts();

customElements.define('f-modal', FabricModal);
customElements.define('f-box', FabricBox);
customElements.define('f-breadcrumbs', FabricBreadcrumbs);
customElements.define('f-toast', FabricToast);

// Testing

const { toast, removeToast, updateToast } = useToast();
window.toast = toast;
window.removeToast = removeToast;
window.updateToast = updateToast;

toast('Bohoo!', {
    type: 'error',
});

setTimeout(() => {
    const t = toast("Hi! I'm an example toast!", {
        type: 'success',
    });

    setTimeout(() => {
        removeToast(t.id);
    }, 500);
}, 1000);
