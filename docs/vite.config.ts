import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'
// @ts-ignore
import ViteComponents from 'vite-plugin-components'
export default defineConfig({
    plugins: [
        Vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown({
            headEnabled: true,
            wrapperComponent: 'unwrap-markdown',
        }),
        ViteComponents({
            extensions: ['vue', 'md'],
            customLoaderMatcher: path => path.endsWith('.md'),
        })
    ],
    resolve: {dedupe: ['vue']},
})
