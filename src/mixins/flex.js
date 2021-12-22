export default {
    props: {
        flex: {type: Boolean, default: true},
        wrap: {type: Boolean, default: true},
        block: Boolean,
        gap: Boolean,
        spaceBetween: Boolean,
    },

    computed: {
        classesObject() {
            return {
                flex: this.flex,
                wrap: this.wrap,
                block: this.block,
                'no-gap': !this.gap,
                'space-between': this.spaceBetween,
            }
        },
    },
}
