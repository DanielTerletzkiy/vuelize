import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import minimist from 'minimist'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'

import fs from 'fs'
import path from 'path'

import pkg from './package.json'

const name = 'vuelize'
const argv = minimist(process.argv.slice(2))
const rootDir = path.resolve(__dirname, '.')
const browsersList = fs
    .readFileSync(path.join(rootDir, '.browserslistrc'))
    .toString()
    .split('\n')
const PATH_SRC = path.join(rootDir, 'src')

const baseConfig = {
    input: 'src/index.js',
    plugins: {
        preVue: [
            alias({
                entries: [
                    {
                        find: '@',
                        replacement: PATH_SRC,
                    },
                ],
            }),
        ],
        replace: {
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        },
        vue: {
            preprocessStyles: true,
            preprocessOptions: {
                scss: {
                    additionalData: `@import 'src/styles/abstract/mixins';`,
                },
            },
        },
        postVue: [
            resolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            }),
            // Process only `<style module>` blocks.
            postcss({
                modules: {
                    generateScopedName: '[local]___[hash:base64:5]',
                },
                include: /&module=.*\.s?css$/,
                use: {
                    sass: {
                        data: `@import 'src/styles/abstract/mixins';`,
                    },
                },
            }),
            // Process `<style>` blocks except css modules.
            postcss({
                include: /(?<!&module=.*)\.s?css$/,
                use: {
                    sass: {
                        data: `@import 'src/styles/abstract/mixins';`,
                    },
                },
            }),
            commonjs(),
        ],
        babel: {
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            babelHelpers: 'bundled',
        },
    },
}

const external = ['vue']
const globals = { vue: 'Vue' }

// Customize configs for individual targets
const buildFormats = []

if (!argv.format || argv.format === 'es') {
    const esConfig = {
        ...baseConfig,
        input: 'src/index.js',
        external,
        output: {
            file: pkg.module,
            format: 'esm',
            exports: 'named',
            name,
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            babel({
                ...baseConfig.plugins.babel,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: browsersList,
                        },
                    ],
                ],
            }),
        ],
    }

    buildFormats.push(esConfig)
}

if (!argv.format || argv.format === 'cjs') {
    const umdConfig = {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: pkg.main,
            format: 'cjs',
            name,
            exports: 'auto',
            globals,
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            babel(baseConfig.plugins.babel),
        ],
    }

    buildFormats.push(umdConfig)
}

if (!argv.format || argv.format === 'iife') {
    const unpkgConfig = {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: pkg.unpkg,
            format: 'iife',
            name,
            exports: 'auto',
            globals,
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            babel(baseConfig.plugins.babel),
            terser({
                output: {
                    ecma: 5,
                },
            }),
        ],
    }

    buildFormats.push(unpkgConfig)
}

// Export config
export default buildFormats
