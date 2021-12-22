import scss from 'rollup-plugin-scss'
import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble';
export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'vuelize',
        exports: 'named',
    },
    plugins: [
        scss(),
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
            preprocessStyles: true,
        }),
        buble({
            transforms: { asyncAwait: false }
        }), // Transpile to ES5
    ],
};
