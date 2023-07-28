import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Vuelize",
    description: "Realize the Impossible",
    themeConfig: {
        logo: "/logo.svg"
    },
    vite: {
        ssr: {
            noExternal: [
                "vue3-unicons",
                "@morev/vue-transitions",
                "lodash"
            ]
        }
    },
    markdown: {
        config: (md) => {

        }
    }
})
