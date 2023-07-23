import {Color, ColorSettings, ThemeAllPropertyEnum, ThemeAllPropertyType, ThemeColorProperty} from "../types/Theme";
import {nextTick} from "vue";

export function useColor(ref: HTMLElement, colorProperty: ThemeAllPropertyType | string) {
    //return getComputedStyle(ref).getPropertyValue(`--${colorProperty}`) || colorProperty;

    return hasProperty(colorProperty) ? `var(--${colorProperty})` : colorProperty
}

export function useSetColor(ref: HTMLElement, color: string, colorProperty?: ThemeAllPropertyType) {
    //console.log()
    if (ref.tagName === "HTML" || !!colorProperty) {
        ref.style.setProperty(`--${colorProperty}`, color)
    } else {
        color = hasProperty(color) ? `var(--${color})` : color;
        ref.style.setProperty(`color`, color)

    }
}

function hasProperty(prop: ThemeAllPropertyType | string) {
    return Object.values(ThemeAllPropertyEnum)
        .some((property) => property === prop)
}

export function useSetColors(ref: HTMLElement, inputColor: ColorSettings | ThemeColorProperty | string) {
    const rand = Math.random() *1000
    console.time("tick"+rand)
    nextTick().then(() => {
        if (!inputColor) {
            //useSetColor(ref, ThemeColorProperty.primary)
            return;
        }
        const modifyColor = (color: Color, property?: ThemeAllPropertyType) => {
            const colorVar = useColor(ref, color)
            useSetColor(ref, colorVar, property)
        }

        switch (typeof inputColor) {
            case "string":
                modifyColor(inputColor);
                break;
            case "object":
                modifyColor(inputColor.color);
                for (const {color, property} of inputColor.map) {
                    modifyColor(color, property)
                }
                break;
        }

        console.timeEnd("tick"+rand)
    })
}

/*const getMatchedCSSRules = (el: HTMLElement, css = el.ownerDocument.styleSheets) =>
    [].concat(...[...css].map(s => [...s.cssRules || []]))
        .filter(r => el.matches(r.selectorText));
*/
