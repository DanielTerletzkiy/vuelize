import {Round, State} from "../types/Vuelize";
import type {PropType} from "vue";

export default {
    link: {type: String, default: null},
    color: {type: [String as any, String as PropType<State>]},
    tint: {type: Number, default: 0},
    rounded: {type: String as PropType<Round>, default: Round.LG},
    outlined: {type: Boolean},
    outlineOffset: {type: String, default: "0px"},
    outlineWidth: {type: String, default: "1px"},
    outlineColor: {type: String, default: 'none'},
    depressed: {type: Boolean, default: true},
    elevation: {type: [String, Number]},
    elevationLight: {type: [String, Number]},
    elevationDark: {type: [String, Number]},
    disabled: {type: Boolean},
    glow: {type: Boolean},
    glowing: {type: Boolean},
    filledGlow: {type: Boolean},
    height: {type: String, default: ''},
    width: {type: String, default: ''},
}
