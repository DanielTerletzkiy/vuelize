/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            primary: '#A8B2FF',
            secondary: '#9ea7ad',
            success: '#74ec38',
            error: '#ff6b6b',
            warning: '#fca121',
            info: '#2ea2e0'
        },
        extend: {},
    },
    plugins: [],
}
