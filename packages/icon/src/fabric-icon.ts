import {
    LitElement,
    html,
    customElement,
    property,
    internalProperty,
    css,
} from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('fabric-icon')
export class FabricIcon extends LitElement {
    static styles = css`
        :host {
            display: block;
            max-width: 800px;
            width: 24px;
            height: 24px;
        }
    `;

    private io?: IntersectionObserver;

    @internalProperty()
    private svg?: string;

    /**
     * The name of the icon
     */
    @property()
    name = '';

    disconnectedCallback() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }

    firstUpdated() {
        this.waitUntilVisible('50px', () => {
            this.loadIcon();
        });
    }

    private waitUntilVisible(rootMargin: string, cb: () => void) {
        if (window.IntersectionObserver) {
            const io = (this.io = new window.IntersectionObserver(
                (data: IntersectionObserverEntry[]) => {
                    if (data[0].isIntersecting) {
                        io.disconnect();
                        this.io = undefined;
                        cb();
                    }
                },
                { rootMargin },
            ));

            io.observe(this);
        } else {
            // Browser doesn't support IntersectionObserver...
            cb();
        }
    }

    private loadIcon() {
        const url = getUrlForIcon(this);
        console.log({ url });
        if (url) {
            if (icons.has(url)) {
                // sync if it's already loaded
                this.svg = icons.get(url) as string;
            } else {
                // async if it hasn't been loaded
                getSvgContent(url).then(() => {
                    this.svg = icons.get(url) as string;
                });
            }
        }
    }

    render() {
        return html`${unsafeSVG(this.svg)}`;
    }
}

// icon cache
const icons = new Map<string, string>();
// request cache
const requests = new Map<string, Promise<any>>();

function getSvgContent(url: string) {
    // see if we already have a request for this url
    let req = requests.get(url);

    if (!req) {
        // we don't already have a request
        req = fetch(url).then((rsp) => {
            if (rsp.ok) {
                return rsp.text().then((svgContent) => {
                    icons.set(url, svgContent);
                });
            }
            icons.set(url, '');
            return undefined;
        });

        // cache for the same requests
        requests.set(url, req);
    }

    return req;
}

/**
 * TODO: Update URL path to icons after we've published the icons using eik
 */
function getUrlForIcon(icon: FabricIcon) {
    const iconName = icon.name.toLowerCase();

    // only allow alpha numeric characters and dashes
    if (iconName.replace(/[\w-]/g, '') !== '') {
        return '';
    }

    // Temporarily use the icons we put on the cdn as part of the prototyping. Will be replaced when eik is a thing
    return `https://static.finncdn.no/_c/troika-wc/v0.1.0-beta.6/icons/${iconName}.svg`;
}

declare global {
    interface HTMLElementTagNameMap {
        'fabric-icon': FabricIcon;
    }
}
