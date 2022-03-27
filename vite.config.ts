import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
// @ts-ignore
import clear from 'rollup-plugin-clear';
// @ts-ignore
import typescript from 'rollup-plugin-typescript2';
// @ts-ignore
import rollup from "./rollup";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {dedupe: ['vue']},
    build: {
        // @ts-ignore
        rollupOptions: rollup
    }
})
