import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import rollup from "./rollup.config";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {dedupe: ['vue']},
    build: {
        // @ts-ignore
        rollupOptions: rollup
    }
})
