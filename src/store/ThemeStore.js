import { defineStore } from 'pinia';
export const ThemeStore = defineStore('theme', {
    state: () => ({
        dark: true,
        rounded: 'lg',
        themes: {
            dark: {
                primary: '#9570FF',
                secondary: '#9ea7ad',
                success: '#74ec38',
                error: '#e15139',
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