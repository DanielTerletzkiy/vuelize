import { Round } from "../types/Vuelize";
export default {
    link: { type: String, default: null },
    color: { type: [String, String] },
    tint: { type: Number, default: 0 },
    rounded: { type: String, default: Round.LG },
    outlined: { type: Boolean },
    depressed: { type: Boolean, default: true },
    elevation: { type: [String, Number] },
    elevationLight: { type: [String, Number] },
    elevationDark: { type: [String, Number] },
    disabled: { type: Boolean },
    glow: { type: Boolean },
    glowing: { type: Boolean },
    filledGlow: { type: Boolean },
    height: { type: String, default: '' },
    width: { type: String, default: '' },
};
//# sourceMappingURL=DefaultProps.js.map