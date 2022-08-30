import { fclasses } from '../utils';
import { html } from 'lit';
import { modal as c } from '@fabric-ds/css/component-classes';

export const leftButtonSvg = html`<svg
  class="${fclasses({ [c.titleButtonIcon]: true, 'transform rotate-90': true })}"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
>
  <path
    fill="currentColor"
    fillRule="nonzero"
    d="M8 2.25a.75.75 0 01.743.648L8.75 3v8.189l3.72-3.72a.75.75 0 011.133.977l-.073.084-5 5a.747.747 0 01-.374.204l-.104.014h-.104a.747.747 0 01-.478-.218l-5-5a.75.75 0 01.976-1.133l.084.073 3.72 3.719V3A.75.75 0 018 2.25z"
  ></path>
</svg>`;

export const rightButtonSvg = html`<svg
  class=${c.titleButtonIcon}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
>
  <path
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2.5"
    d="M12 12l6 6-6-6-6 6 6-6zm0 0L6 6l6 6 6-6-6 6z"
  />
</svg> `;
