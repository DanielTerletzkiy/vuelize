import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {ThemeColorProperty, Themes, ThemeSheetProperty, ThemeTextProperty} from "../types/Theme";

const isServer = !(typeof window != 'undefined' && window.document);

const prefersDark = isServer || window.matchMedia("(prefers-color-scheme: dark)").matches;
export const useVuelizeTheme = defineStore('vuelizeTheme', () => {
    const themes = ref<Themes>({
        dark: {
            colors: {
                primary: '#A8B2FF',
                secondary: '#1B1B18',
                accent: '#8080BD',
                success: '#74ec38',
                error: '#ff6b6b',
                warning: '#fca121',
                info: '#2ea2e0'
            },
            sheets: {
                background: "#080808",
                card: "#171717",
                glow: "currentColor",
            },
            text: {
                header: "#eaeaea",
                card: "#FAFAFA"
            }
        },
        light: {
            colors: {
                primary: '#3075FF',
                secondary: '#424242',
                accent: '#B0B5B2',
                success: '#62c62f',
                error: '#ff6b6b',
                warning: '#ffa600',
                info: '#00b2ff'
            },
            sheets: {
                background: "#fafafa",
                card: "#fefefe",
                glow: "currentColor",
            },
            text: {
                header: "#020202",
                card: "#363636"
            }
        },
    })

    const mode = ref<keyof Themes>(prefersDark ? "dark" : "light");

    const currentTheme = computed(() => {
        return themes.value[mode.value];
    })

    return {
        themes, mode, currentTheme
    }
})
