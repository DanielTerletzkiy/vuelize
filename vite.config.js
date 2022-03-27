import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import rollup from "./rollup";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: { dedupe: ['vue'] },
    build: {
        // @ts-ignore
        rollupOptions: rollup
    }
});
//# sourceMappingURL=vite.config.js.map