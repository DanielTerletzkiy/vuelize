import type {PropType} from "vue";
import {
    BlurAmount,
    BlurSettings,
    ColorSettings,
    GlowSettings,
    OutlinedSettings,
    Rounded,
    ThemeColorProperty
} from "../types";

export default {
    link: {type: String, default: null},
    color: {type: [String, Object] as PropType<ColorSettings | ThemeColorProperty | string>}, //
    rounded: {type: String as PropType<Rounded>, default: Rounded.lg},
    //
    outlined: {type: [String, Object] as PropType<Partial<OutlinedSettings> | boolean>},
    //
    elevation: {type: [String, Number, Boolean] as PropType</*Partial<ElevationSettings>*/ | string | number | boolean>}, //
    //
    disabled: {type: Boolean},
    //
    glow: {type: [String, Object] as PropType<Partial<GlowSettings> | boolean>},
    //
    blur: {type: [String, Object] as PropType<Partial<BlurSettings | BlurAmount> | string | boolean>},
    //
    height: {type: String, default: ''},
    width: {type: String, default: ''},
}
