import { initToasts } from './api';
import { FabricToast } from './component';

initToasts();
if (!customElements.get('f-toast')) {
    customElements.define('f-toast', FabricToast);
}

export { useToast } from './api';
