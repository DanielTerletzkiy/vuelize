import colors from "tailwindcss/colors";

export enum colorSurface {
    Background = "bg",
    Text = "text",
}

export interface useColorInterface {
    color: string | typeof colors,
    prefix?: colorSurface,
    tint?: number | string,
    opacity?: number
}

export function useColor(options: useColorInterface) {
    const isCustom = options.color.toString().includes("#");

    return (!!options.prefix ? `${options.prefix}-` : ``) +
        (isCustom ? `[${options.color}]` : `${options.color}`) +
        (!!options.tint ? `-${options.tint}` : ``) +
        (!!options.opacity ? `/${options.opacity}`: ``)
}
