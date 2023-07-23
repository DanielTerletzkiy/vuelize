import {Round} from "../types/Vuelize";
import type {PropType} from "vue";
import {ColorSettings, ElevationSettings, OutlinedSettings, ThemeColorProperty} from "../types/Theme";

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
    glow: {type: Boolean}, //
    glowing: {type: Boolean},
    //
    height: {type: String, default: ''},
    width: {type: String, default: ''},
}
