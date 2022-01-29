import flex from "@/mixins/flex";
let uuid = 0;

export default {
    mixins: [flex],
    //Default props
    props: {
        rootTag: {type: String, default: 'div'},
        color: String,
        disabled: Boolean,

        elevation: [String, Number, undefined],
        elevationDark: [String, Number, undefined],
        elevationLight: [String, Number, undefined],
        //elevationInvert: Boolean,

        rounded: {type: String, default: 'lg'},
        outlined: Boolean,
        inlined: Boolean,
        depressed: Boolean,

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
