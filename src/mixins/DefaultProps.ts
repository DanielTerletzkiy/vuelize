import {Rounded} from "../types/Vuelize";
import type {PropType} from "vue";
import {BlurSettings, ColorSettings, GlowSettings, OutlinedSettings, ThemeColorProperty} from "../types/Theme";

export default {
    link: {type: String, default: null},
    color: {type: Object as PropType<ColorSettings | ThemeColorProperty | string>}, //
    rounded: {type: String as PropType<Rounded>, default: Rounded.lg},
    //
    outlined: {type: Object as PropType<Partial<OutlinedSettings> | boolean>},
    //
    elevation: {type: Object as PropType</*Partial<ElevationSettings>*/ | string | number | boolean>}, //
    //
    disabled: {type: Boolean},
    //
    glow: {type: Object as PropType<Partial<GlowSettings> | boolean>},
    //
    blur: {type: Object as PropType<Partial<BlurSettings> | string | boolean>},
    //
    height: {type: String, default: ''},
    width: {type: String, default: ''},
}
