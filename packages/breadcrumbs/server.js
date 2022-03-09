import fs from 'fs';
import fastify from 'fastify';

export class Server {
    _component = '';

    constructor({ chromium }) {
        this.app = fastify();
        this._chromium = chromium;

        this.app.get('/scripts.js', function (request, reply) {
            const stream = fs.createReadStream(new URL('../../dist/index.js', import.meta.url), 'utf8');
            reply.type('application/javascript');
            reply.send(stream);
        });

        this.app.get('/', (req, reply) => {
            reply.type('text/html');
            reply.send(`
                <html>
                    <head>
                        <link href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css" type="text/css" rel="stylesheet" />
                        <script type="module">
                            import "./scripts.js";
                            import { html, render } from 'https://cdn.skypack.dev/lit';
                    
                            render(
                                html\`${this._component}\`,
                                document.querySelector('body')
                            )
                        </script>
                    </head>
                    <body></body>
                </html>
            `);
        });
    }

    get url() {
        return this._url;
    }

    async fixture(template) {
        this._component = template;
        const page = await this._browser.newPage();
        await page.goto(this.url);
        return page;
    }

    async start() {
        this._url = await this.app.listen(0);
        this._browser = await this._chromium.launch();
    }
    
    async stop() {
        await this.app.close();
        await this._browser.close();
    }

}