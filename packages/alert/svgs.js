import { html, svg } from 'lit';
import { i18n } from '@lingui/core';
import { initLocale } from '../utils/locale.js';

await initLocale('alert');

const negativeAria = i18n._(
  /*i18n*/ { message: 'Red exclamation mark', id: 'alert.negative.svg.aria-label' },
);
const positiveAria = i18n._(
  /*i18n*/ { message: 'Green checkmark', id: 'alert.positive.svg.aria-label' },
);
const warningAria = i18n._(
  /*i18n*/ { message: 'Yellow exclamation mark', id: 'alert.warning.svg.aria-label' },
);
const infoAria = i18n._(/*i18n*/ { message: 'Info', id: 'alert.info.svg.aria-label' });

export const negativeSvg = () => html`<svg
  aria-label="${negativeAria}"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="none"
>
  ${redSignWithExclamationIcon}
</svg>`;

export const positiveSvg = () => html`<svg
  aria-label="${positiveAria}"
  role="img"
  width="16"
  height="16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  ${greenCirleWithCheckIcon}
</svg> `;

export const warningSvg = () => html`<svg
  aria-label="${warningAria}"
  role="img"
  width="16"
  height="16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  ${yellowSignWithExclamationIcon}
</svg> `;

export const infoSvg = () => html`<svg
  aria-label="${infoAria}"
  role="img"
  width="16"
  height="16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  ${blueCircleWithInfoIcon}
</svg>`;

const redSignWithExclamationIcon = svg`<path
d="M4.1.586A2 2 0 0 1 5.516 0h4.97A2 2 0 0 1 11.9.586L15.413 4.1A2 2 0 0 1 16 5.514v4.97a2 2 0 0 1-.586 1.415L11.9 15.413a2 2 0 0 1-1.415.586h-4.97a2 2 0 0 1-1.414-.586L.586 11.9A2 2 0 0 1 0 10.485v-4.97A2 2 0 0 1 .586 4.1L4.1.586Z"
fill="currentColor"
/>
<path
fill-rule="evenodd"
clip-rule="evenodd"
d="M8 3.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V4A.75.75 0 0 1 8 3.25Z"
fill="#fff"
/>
<path d="M8.8 11.8a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z" fill="#fff" />`;

const greenCirleWithCheckIcon = svg`<circle cx="8" cy="8" r="8" transform="rotate(180 8 8)" fill="currentColor" />
<path
  fill-rule="evenodd"
  clip-rule="evenodd"
  d="M11.5 4.94c.3.27.34.75.06 1.06l-4 4.5a.75.75 0 0 1-1.09.03l-2-2a.75.75 0 0 1 1.06-1.06l1.44 1.44L10.44 5a.75.75 0 0 1 1.06-.07Z"
  fill="#fff"
/>`;

const yellowSignWithExclamationIcon = svg`<path
d="M.24 12 6.16 1.09a2.1 2.1 0 0 1 3.68 0l5.92 10.93c.73 1.36-.28 2.99-1.85 2.99H2.1a2.04 2.04 0 0 1-1.85-3Z"
fill="currentColor"
/>
<path
fill-rule="evenodd"
clip-rule="evenodd"
d="M8 3.25c.41 0 .75.34.75.75v5a.75.75 0 0 1-1.5 0V4c0-.41.34-.75.75-.75Z"
fill="#fff"
/>
<path d="M8.8 11.8a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z" fill="#fff" />`;

const blueCircleWithInfoIcon = svg`<circle cx="8" cy="8" r="8" fill="currentColor" />
<path
  fill-rule="evenodd"
  clip-rule="evenodd"
  d="M7.25 12a.75.75 0 0 0 1.5 0V8a.75.75 0 0 0-1.5 0v4ZM8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
  fill="#fff"
/>`;
