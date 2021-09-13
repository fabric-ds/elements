import { FabricWebComponent } from '../../utils';

export class FabricBreadcrumbs extends FabricWebComponent {
    connectedCallback() {
        const children = Array.from(this.children)
            .map((child) => child.outerHTML)
            .join('<span class="select-none" aria-hidden="true">/</span>');

        this.shadowRoot.innerHTML += `<nav
            aria-label="Her er du"
            class="flex space-x-8"
        >
            <h2 class="sr-only">Her er du</h2>
            ${children}
        </nav>`;
    }
}
