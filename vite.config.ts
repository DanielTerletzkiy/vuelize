import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// @ts-ignore
import tsconfigPaths from 'vite-tsconfig-paths'
// @ts-ignore
import dts from "vite-plugin-dts";
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {dedupe: ['vue']},
    server: {port: 5656},
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "src/styles/index.scss";`
            }
        }
    },
    plugins: [
        vue(),
        //tsconfigPaths(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
        }),
        libCss()
    ],
    build: {
        //cssCodeSplit: true,
        lib: {
            name: "Vuelize",
            fileName: "vuelize",
            entry: "src/index.ts",
            formats: ["es", "umd", "cjs"],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                inlineDynamicImports: true,
                globals: {
                    vue: 'Vue'
                }
            }
        },
    },
})
