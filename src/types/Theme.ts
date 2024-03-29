export type Themes = {
    dark: Theme
    light: Theme
}

export type Theme = {
    colors: ThemeColor,
    sheets: ThemeSheet,
    text: ThemeText,
}

type ThemeColorKey = keyof typeof ThemeColorProperty;
type ThemeSheetKey = keyof typeof ThemeSheetProperty;
type ThemeTextKey = keyof typeof ThemeTextProperty;

type ThemeColor = {
    [K in ThemeColorKey]: string;
};

type ThemeSheet = {
    [K in ThemeSheetKey]: string;
};

type ThemeText = {
    [K in ThemeTextKey]: string;
};

export enum ThemeColorProperty {
    primary = 'color-primary',
    accent = 'color-accent',
    secondary = 'color-secondary',
    success = 'color-success',
    error = 'color-error',
    warning = 'color-warning',
    info = 'color-info',
}

export enum ThemeSheetProperty {
    background = 'sheet-background',
    card = 'sheet-card',
    glow = 'sheet-glow',
}

export enum ThemeTextProperty {
    header = 'text-header',
    card = 'text-card',
    contrast = 'text-contrast',
}

export enum ThemeMiscProperty {
    current = 'misc-current',
}

export const ThemeAllPropertyEnum = {
    ...ThemeColorProperty,
    ...ThemeSheetProperty,
    ...ThemeTextProperty,
    ...ThemeMiscProperty
}
export type ThemeAllPropertyType = ThemeColorProperty | ThemeSheetProperty | ThemeTextProperty

export type Color = ThemeAllPropertyType | string

export type ColorSettings = {
    color?: Color,
    map?: ColorSetting[],
}

export type ColorSetting = {
    color: Color | null,
    property?: ThemeAllPropertyType,
    tint?: number,
}

export type OutlinedSettings = {
    disabled?: boolean,
    color?: Color,
    offset?: string,
    width?: string,
    transparency?: number,
}

export type ElevationSettings = {
    light: string,
    dark: string,
}

export type GlowSettings = {
    disabled?: boolean,
    active: boolean,
    central: boolean,
    selectable: boolean,
}

export enum BlurAmount {
    low = 'low',
    medium = 'medium',
    strong = 'strong',
}

export type BlurSettings = {
    disabled?: boolean,
    amount: BlurAmount,
}
