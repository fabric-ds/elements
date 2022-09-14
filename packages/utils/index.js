import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

const camelCaseToKebabCase = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// Source: https://medium.com/@dayton-bobbitt/generating-attributes-for-litelement-properties-f972ef658137
export function kebabCaseAttributes(constructor) {
  return class extends constructor {
    static createProperty(name, options) {
      let customOptions = options;

      // derive the attribute name if not already defined or disabled
      if (typeof options?.attribute === 'undefined' || options?.attribute === true) {
        customOptions = Object.assign({}, options, {
          attribute: camelCaseToKebabCase(name.toString()),
        });
      }

      super.createProperty(name, customOptions);
    }
  };
}

export function classes(defn) {
  const classes = [];
  for (const [key, value] of Object.entries(defn)) {
    if (value) classes.push(key);
  }
  return classes.join(' ');
}

export class FabricWebComponent extends HTMLElement {
  constructor() {
    super();

    const fabricStylesTemplate = document.createElement('template');
    fabricStylesTemplate.innerHTML = `
            <style>:host { display: block; }</style>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
            />
        `;

    this.attachShadow({ mode: 'open' }).appendChild(fabricStylesTemplate.content);
  }
}

export class FabricElement extends LitElement {
  get _fabricStylesheet() {
    return html`<link
      href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
      rel="stylesheet"
      type="text/css"
    />`;
  }
}

export const windowExists = typeof window !== 'undefined';

export function fclasses(definition) {
  const defn = {};
  for (const [key, value] of Object.entries(definition)) {
    for (const className of key.split(' ')) {
      defn[className] = value;
    }
  }
  return classMap(defn);
}
