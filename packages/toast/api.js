import { FabricToastContainer } from './toast-container';
import { windowExists } from '../utils';

/**
 * Toast helper function options
 * @typedef    {Object}                               ToastOptions
 * @property   {(number|string)}                      [id]        Custom identifier
 * @property   {('success'|'error'|'warning'|'info')} [type]      Type of alert
 * @property   {String}                               [text]      The toast message. Only needed when updating text on existing toast
 * @property   {(number|string)}                      [duration]  Duration of toast in milliseconds Set to 0 to disable auto-removal
 * @property   {Boolean}                              [canClose]  Can toast be dismissed?
 */

/**
 * Create a new toast
 * @param {String}        message  Message
 * @param {ToastOptions?} options  Toast options
 * @returns {ToastOptions} Toast details
 */
export function toast(message, options) {
  if (!windowExists) return;
  const toast = FabricToastContainer.init();
  
  const data = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    text: message,
    duration: Number.POSITIVE_INFINITY,
    type: 'success',
    ...options,
  };

  toast.set(data);
  return data;
}

/**
 * Remove an existing toast
 * @param {String|Number} id Toast identifier
 * @return {Boolean} True if deleted, false if not found
 */
export function removeToast(id) {
  if (!windowExists) return;
  const toast = FabricToastContainer.init();
  return toast.del(id);
}

/**
 * Update an existing toast
 * @param {String|Number}                  id      Toast identifier
 * @param {ToastOptions?}           options Toast options
 * @returns {FabricToastContainer}          Toast details
 */
export function updateToast(id, options) {
  if (!windowExists) return;
  const toast = FabricToastContainer.init();
  toast.set({ ...toast.get(id), ...options });
  return toast.get(id);
}
