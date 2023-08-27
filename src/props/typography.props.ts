import type {PropType} from "vue";
import {Opacity, Type, Weight} from "../types";

export default {
    type: {
        type: String as PropType<Type>,
        default: Type.body1
    },
    weight: {
        type: Number as PropType<Weight>,
        default: Weight.w400
    },
    opacity: {
        type: Number as PropType<Opacity>,
        default: Opacity.low
    },
}
