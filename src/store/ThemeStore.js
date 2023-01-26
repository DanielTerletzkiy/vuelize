import { defineStore } from 'pinia';
const isServer = !(typeof window != 'undefined' && window.document);
const prefersDark = isServer || window.matchMedia("(prefers-color-scheme: dark)").matches;
export const ThemeStore = defineStore('theme', {
    state: () => ({
        dark: prefersDark,
        rounded: 'lg',
        themes: {
            dark: {
                primary: '#A8B2FF',
                secondary: '#9ea7ad',
                success: '#74ec38',
                error: '#ff6b6b',
                warning: '#fca121',
                info: '#2ea2e0'
            },
            light: {
                primary: '#3075FF',
                secondary: '#424242',
                success: '#62c62f',
                error: '#ff6b6b',
                warning: '#ffa600',
                info: '#00b2ff'
            },
        },
    })
});
//# sourceMappingURL=ThemeStore.js.map