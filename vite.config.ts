import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// @ts-ignore
import rollup from "./rollup.config.js";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {dedupe: ['vue']},
    server: {port: 5555},
    build: {
        // @ts-ignore
        rollupOptions: rollup
    }
})
