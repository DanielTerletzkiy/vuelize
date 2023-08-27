import {
    Color,
    ColorSettings,
    ThemeAllPropertyEnum,
    ThemeAllPropertyType,
    ThemeColorProperty,
    ThemeTextProperty
} from "../types";
import {nextTick} from "vue";

export function useColor(ref: HTMLElement, colorProperty: ThemeAllPropertyType | string) {
    //return getComputedStyle(ref).getPropertyValue(`--${colorProperty}`) || colorProperty;

    return hasProperty(colorProperty) ? `var(--${colorProperty})` : colorProperty
}

export function useColorStatic(ref: HTMLElement, colorProperty?: ThemeAllPropertyType | string) {
    const property = colorProperty && hasProperty(colorProperty) ? `--${colorProperty}` : "color";
    return getComputedStyle(ref).getPropertyValue(property);
}

export function useContrastTextColor(ref: HTMLElement): string {
    let rgb = useColorStatic(ref);

    if (rgb.includes('srgb')) {
        rgb = hexToRgb(useColorStatic(ref, ThemeColorProperty.current));
    }

    const regex = /rgb\((\d+, \d+, \d+)\)/;
    const match = RegExp(regex).exec(rgb);

    if (!match) {
        const color = "rgb(0, 0, 0)";
        ref.style.setProperty(`--${ThemeTextProperty.contrast}`, color)
        return color;
    }

    const [r, g, b] = match[1].split(",") as unknown as number[];

    const r1 = r / 255;
    const g1 = g / 255;
    const b1 = b / 255;

    const gammaCorrection = (val: number) => {
        return (val <= 0.03928) ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    }

    const r2 = gammaCorrection(r1);
    const g2 = gammaCorrection(g1);
    const b2 = gammaCorrection(b1);

    // Calculate the relative luminance
    const L = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
    const color = (L > 0.179) ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';

    ref.style.setProperty(`--${ThemeTextProperty.contrast}`, color)

    return color;
}


export function useSetColor(ref: HTMLElement, color: string | null, colorProperty?: ThemeAllPropertyType) {
    //console.log()
    try {
        if (color === null && !!colorProperty) {
            const originalColor = getComputedStyle(document.documentElement).getPropertyValue(`--${colorProperty}`)
            ref.style.setProperty(`--${colorProperty}`, originalColor)
            return;
        }

        if (ref.tagName === "HTML" || !!colorProperty) {
            ref.style.setProperty(`--${colorProperty}`, color)
        } else if (typeof color === "string") {
            color = hasProperty(color) ? `var(--${color})` : color;
            ref.style.setProperty(`color`, color)
        }

        ref.style.setProperty(`--${ThemeAllPropertyEnum.current}`, color)

    } catch (e) {
        console.error({e, ref, color, colorProperty})
    }
}

function hasProperty(prop: ThemeAllPropertyType | string) {
    return Object.values(ThemeAllPropertyEnum)
        .some((property) => property === prop)
}

export function useSetColors(ref: HTMLElement, inputColor: ColorSettings | ThemeColorProperty | string) {
    nextTick().then(() => {
        if (inputColor) {
            const modifyColor = (color: Color, property?: ThemeAllPropertyType) => {
                const colorVar = useColor(ref, color)
                useSetColor(ref, colorVar, property)
            }
            switch (typeof inputColor) {
                case "string":
                    modifyColor(inputColor);
                    break;
                case "object":
                    if (inputColor.color) {
                        modifyColor(inputColor.color);
                    }
                    if (inputColor.map) {
                        for (const {color, property} of inputColor.map) {
                            modifyColor(color, property)
                        }
                    }
                    break;
            }
        }
        nextTick().then(() => {
            useContrastTextColor(ref);
        })
    })
}

export function useClearColors(ref: HTMLElement) {
    for (const property of Object.keys(ThemeAllPropertyEnum)) {
        ref.style.removeProperty(`--${property}`)
    }
    ref.style.removeProperty(`color`)
}

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
        : hex;
}

/*const getMatchedCSSRules = (el: HTMLElement, css = el.ownerDocument.styleSheets) =>
    [].concat(...[...css].map(s => [...s.cssRules || []]))
        .filter(r => el.matches(r.selectorText));
*/
