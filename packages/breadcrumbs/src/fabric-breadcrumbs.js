export class FabricBreadcrumbs extends HTMLElement {
    connectedCallback() {
        const children = Array.from(this.children)
            .map((child) => child.outerHTML)
            .join('<span class="select-none" aria-hidden>/</span>');

        this.innerHTML = `<nav class="flex space-x-8">${children}</nav>`;
    }
}
