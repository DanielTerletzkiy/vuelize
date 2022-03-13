import flex from "@/mixins/flex";
let uuid = 0;

export default {
    mixins: [flex],
    //Default props
    props: {
        rootTag: {type: String, default: 'div'},
        color: String,
        tint: [String, Number],
        disabled: Boolean,

        elevation: [String, Number, undefined],
        elevationDark: [String, Number, undefined],
        elevationLight: [String, Number, undefined],
        //elevationInvert: Boolean,

        glow: Boolean,
        glowing: Boolean,
        filledGlow: [String, Boolean],

        rounded: {type: String, default: 'lg'},
        outlined: Boolean,
        /**
         * @deprecated Use the outlined instead
         */
        inlined: Boolean,
        depressed: {type: Boolean, default: true},

        dark: Boolean,
        light: Boolean,

        width: [String, Number],
        height: [String, Number],

        link: {type: String, default: null}
    },

    beforeCreate() {
        this.uuid = uuid.toString();
        uuid += 1;
    },
}
