import {Round} from "../types/Vuelize";
import type {PropType} from "vue";
import {
    BlurSettings,
    ColorSettings,
    ElevationSettings,
    GlowSettings,
    OutlinedSettings,
    ThemeColorProperty
} from "../types/Theme";

export default {
    link: {type: String, default: null},
    color: {type: Object as PropType<ColorSettings | ThemeColorProperty | string>}, //
    rounded: {type: String as PropType<Round>, default: Round.LG},
    //
    outlined: {type: Object as PropType<OutlinedSettings | boolean>},
    //
    elevation: {type: Object as PropType<ElevationSettings | string | number>}, //
    //
    disabled: {type: Boolean},
    //
    glow: {type: Object as PropType<Partial<GlowSettings> | boolean>},
    //
    blur: {type: Object as PropType<BlurSettings | string | boolean>},
    //
    height: {type: String, default: ''},
    width: {type: String, default: ''},
}
