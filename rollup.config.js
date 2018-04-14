import {resolve} from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';

export default [
    "index.js",
    "activity.js",
    "game.js"
].map((fileName) => {
    return {
        input: resolve(`./src/${fileName}`),
        output: {
            file: `dist/assets/js/${fileName}`,
            format: "iife"
        },
        plugins: [
            nodeResolve()
        ],

        // @see https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        context: 'window'
    }
})
