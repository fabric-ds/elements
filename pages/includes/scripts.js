import { FabricBox } from '../../packages/box/src/fabric-box.js';
import { FabricBreadcrumbs } from '../../packages/breadcrumbs/src/fabric-breadcrumbs.js';
import { FabricModal } from '../../packages/modal/src/fabric-modal.js';
import { toast, removeToast, updateToast } from '../../packages/toast/src/index.js';

customElements.define('f-modal', FabricModal);
customElements.define('f-box', FabricBox);
customElements.define('f-breadcrumbs', FabricBreadcrumbs);
