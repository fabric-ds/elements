import '../../index.js';
import { toast, updateToast, removeToast } from '../../index.js';
import { FabricToastContainer } from '../../packages/toast/toast-container.js';

window.FabricToastContainer = FabricToastContainer;
window.toast = toast;
window.updateToast = updateToast;
window.removeToast = removeToast;
