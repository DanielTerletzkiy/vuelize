import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Vuelize",
    description: "Realize the Impossible",
    themeConfig: {
        logo: "/vuelize/logo.svg",
        sidebar: [
            {
                text: "Introduction",
                collapsed: false,
                items: [
                    {
                        text: "What is it?",
                        link: "/introduction/what"
                    },
                    {
                        text: "Getting Started",
                        link: "/introduction/getting-started"
                    },
                ]
            }
        ]
    },
    cleanUrls: true,
    base: "/vuelize/",
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
        anchor: {

        },
        config: (md) => {

        }
    }
})
