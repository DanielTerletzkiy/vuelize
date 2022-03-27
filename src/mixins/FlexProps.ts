export default {
    flex: {type: Boolean, default: true},
    wrap: {type: Boolean, default: true},
    block: {type: Boolean},
    gap: {type: Boolean},
    spaceBetween: {type: Boolean},
}

export const flexClasses = (props: any) => ({ //TODO: make ts types for flex
    flex: props.flex,
    wrap: props.wrap,
    block: props.block,
    'no-gap': !props.gap,
    'space-between': props.spaceBetween,
})
