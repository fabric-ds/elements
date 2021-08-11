import { FabricBox } from '../../packages/box/src/fabric-box.js';
import { FabricBreadcrumbs } from '../../packages/breadcrumbs/src/fabric-breadcrumbs.js';
import { FabricModal } from '../../packages/modal/src/fabric-modal.js';
import { toast, updateToast, removeToast } from '../../packages/toast/src';

const t = toast('hi', {
    duration: 0,
});

setTimeout(() => {
    updateToast(t.id, {
        type: 'warning',
    });
}, 2500);

setTimeout(() => {
    removeToast(t.id);
}, 4000);

customElements.define('f-modal', FabricModal);
customElements.define('f-box', FabricBox);
customElements.define('f-breadcrumbs', FabricBreadcrumbs);
