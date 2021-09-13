import { FabricWebComponent } from '../../utils';

export class FabricBreadcrumbs extends FabricWebComponent {
    connectedCallback() {
        const children = Array.from(this.children)
            .map((child) => child.outerHTML)
            .join('<span class="select-none" aria-hidden="true">/</span>');

        this.shadowRoot.innerHTML += `<nav class="flex space-x-8">${children}</nav>`;
    }
}
