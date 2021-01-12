import execa from 'execa';
import npmRunPath from 'npm-run-path';

export default {
    open: true,
    nodeResolve: true,
    rootDir: 'site',
    watch: true,
    plugins: [eleventyWatch()],
};

const CLEAR_SEQUENCES = ['\x1Bc', '\x1B[2J\x1B[0;0f'];

/**
 * This plugin enables the use of web-dev-server together with eleventy for development.
 *
 * We do this because our web components has bare imports to, for instance lit-element, which we need to resolve when developing the documentation.
 *
 * This plugin is modeled after Snowpack's run script plugin https://github.com/snowpackjs/snowpack/blob/main/plugins/plugin-run-script/plugin.js
 */
function eleventyWatch() {
    let workerPromise;

    return {
        name: 'e11tyWatch',
        serverStart: ({ logger }) => {
            workerPromise = execa.command('eleventy --watch', {
                env: npmRunPath.env(),
                extendEnv: true,
                shell: true,
                windowsHide: false,
                cwd: process.cwd(),
            });

            const { stdout, stderr } = workerPromise;
            function dataListener(chunk) {
                let stdOutput = chunk.toString();
                // if (output === 'stream') {
                //     log('CONSOLE_INFO', { msg: stdOutput });
                //     return;
                // }
                if (CLEAR_SEQUENCES.some((s) => stdOutput.includes(s))) {
                    logger.log('WORKER_RESET', {});
                    for (let s of CLEAR_SEQUENCES) {
                        stdOutput = stdOutput.replace(s, '');
                    }
                }
                logger.log(stdOutput);
            }
            stdout && stdout.on('data', dataListener);
            stderr && stderr.on('data', dataListener);

            // return workerPromise;
        },

        serverStop: () => {
            return workerPromise.cancel();
        },
    };
}
