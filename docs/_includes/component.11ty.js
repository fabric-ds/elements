const htm = require('htm');
const vhtml = require('vhtml');

const html = htm.bind(vhtml);

class ComponentPage {
    data() {
        return {
            layout: 'page.11ty.js',
        };
    }

    render(data) {
        const { element, content } = data;

        const customElements = data.component['11tydata'].customElements;

        const tag = customElements.tags.find((t) => t.name === element);

        return html`
            <h1 class="text-4xl mb-7">${'<' + tag.name + '>'}</h1>
            <p class="my-2">${tag.description}</p>
            <div dangerouslySetInnerHTML=${{ __html: content }} />
            <section class="mb-6">
                <${Table}
                    name="Attributes"
                    data="${tag.attributes}"
                    properties=${['description', 'type', 'default']}
                />
                <${Table}
                    name="Properties"
                    data="${tag.properties}"
                    properties=${[
                        'attribute',
                        'description',
                        'type',
                        'default',
                    ]}
                />
                <${Table}
                    name="Methods"
                    data="${tag.members}"
                    properties=${['description']}
                />
                <${Table}
                    name="Events"
                    data="${tag.events}"
                    properties=${['description']}
                />
                <${Table}
                    name="Slots"
                    data="${tag.slots}"
                    properties=${['description']}
                />
                <!-- <${Table}
                    name="CSS Shadow Parts"
                    data="${tag.cssParts}"
                    properties=${['description']}
                /> -->
                <${Table}
                    name="CSS Custom Properties"
                    data="${tag.cssProperties}"
                    properties=${['description']}
                />
            </section>
        `.join('\n');
    }
}

/**
 * Renders a table of data, plucking the given properties from each item in
 * `data`.
 */
const Table = ({ name, data, properties }) => {
    // We don't want to document lit-element's styling method
    if (Array.isArray(data) && name === 'Properties') {
        data = data.filter((i) => i.name !== 'styles');
    }

    if (data == null || data.length === 0) return;

    return html`
        <section class="mt-20">
            <h2 class="text-2xl my-4">${name}</h2>
            <table class="w-full">
                ${data.map(
                    (i) => html` <thead>
                            <tr>
                                <th colspan="2" class="text-left text-lg py-4">
                                    ${i.name}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${properties.map(
                                (property) =>
                                    html`<tr>
                                        <th
                                            class="text-left text-sm text-gray-900 py-4"
                                            style
                                        >
                                            ${capitalize(property)}
                                        </th>
                                        <td class="text-left">
                                            ${i[property]}
                                        </td>
                                    </tr>`,
                            )}
                        </tbody>`,
                )}
            </table>
        </section>
    `;
};

const capitalize = (s) => s[0].toUpperCase() + s.substring(1);

module.exports = ComponentPage;
