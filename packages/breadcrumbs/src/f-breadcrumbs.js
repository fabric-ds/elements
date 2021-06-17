export class FBreadcrumbs extends HTMLElement {
    connectedCallback() {
        const children = Array.from(this.children)
            .map((child) => child.outerHTML)
            .join('<span class="select-none" aria-hidden>/</span>');
        this.innerHTML = '';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>:host { display:block; }</style>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://assets.finn.no/pkg/@finn-no/fabric-css/v0/fabric.min.css"
            />
            <nav class="flex space-x-8">${children}</nav>
        `;
    }
}
