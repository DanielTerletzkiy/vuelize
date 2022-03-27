export interface ThemeTypes {
    dark: boolean;
    themes: {
        [key: string]: SubTheme;
    };
}
export interface SubTheme {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
    info: string;
}
