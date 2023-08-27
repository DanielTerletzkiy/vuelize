import type {PropType} from "vue";
import {BlurSettings, ColorSettings, GlowSettings, OutlinedSettings, Rounded, ThemeColorProperty} from "../types";

export default {
    link: {type: String, default: null},
    color: {type: String as PropType<ColorSettings | ThemeColorProperty | string>}, //
    rounded: {type: String as PropType<Rounded>, default: Rounded.lg},
    //
    outlined: {type: String as PropType<Partial<OutlinedSettings> | boolean>},
    //
    elevation: {type: String as PropType</*Partial<ElevationSettings>*/ | string | number | boolean>}, //
    //
    disabled: {type: Boolean},
    //
    glow: {type: String as PropType<Partial<GlowSettings> | boolean>},
    //
    blur: {type: String as PropType<Partial<BlurSettings> | string | boolean>},
    //
    height: {type: String, default: ''},
    width: {type: String, default: ''},
}
