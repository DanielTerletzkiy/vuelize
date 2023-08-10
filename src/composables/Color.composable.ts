import {
    Color,
    ColorSettings,
    ThemeAllPropertyEnum,
    ThemeAllPropertyType,
    ThemeColorProperty,
    ThemeTextProperty
} from "../types/Theme";
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
    const rgb = useColorStatic(ref);

    const regex = /rgb\((\d+, \d+, \d+)\)/;
    const match = RegExp(regex).exec(rgb);

    if (!match) {
        return "white";
    }

    const [r, g, b] = match[1].split(",") as unknown as number[];

    let r1 = r / 255;
    let g1 = g / 255;
    let b1 = b / 255;

    const gammaCorrection = (val: number) => {
        return (val <= 0.03928) ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    }

    let r2 = gammaCorrection(r1);
    let g2 = gammaCorrection(g1);
    let b2 = gammaCorrection(b1);

    // Calculate the relative luminance
    let L = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
    const color = (L > 0.179) ? 'black' : 'white';

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

/*const getMatchedCSSRules = (el: HTMLElement, css = el.ownerDocument.styleSheets) =>
    [].concat(...[...css].map(s => [...s.cssRules || []]))
        .filter(r => el.matches(r.selectorText));
*/
