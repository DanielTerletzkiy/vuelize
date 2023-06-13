/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#A8B2FF',
                secondary: '#9ea7ad',
                success: '#74ec38',
                error: '#ff6b6b',
                warning: '#fca121',
                info: '#2ea2e0',
                text: '#bdbdbd',
                card: {
                    n300: "#070707",
                    n200: "#0C0C0C",
                    n100: "#121212",
                    default: "#171717",
                    100: "#2A2A2A",
                    200: "#282828",
                    300: "#262626",
                    400: "#242424",
                    500: "#222222",
                    600: "#202020",
                    700: "#1D1D1D",
                    800: "#1B1B1B",
                    900: "#191919",
                }
            },
        },
    },
    plugins: [],
}
