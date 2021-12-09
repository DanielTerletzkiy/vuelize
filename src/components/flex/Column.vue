<template>
  <d-function-wrapper :classes="['d-column', ...classesObject]" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-column",

  props: {
    flex: Boolean,
    wrap: Boolean,
    column: Boolean,
    block: Boolean,
    noGap: {type: Boolean, default: true},
  },

  computed: {
    classesObject() {
      return {
        flex: this.flex,
        wrap: this.wrap,
        column: this.column,
        block: this.block,
        'no-gap': this.noGap,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.d-column {
  padding: 4px;
}
</style>
