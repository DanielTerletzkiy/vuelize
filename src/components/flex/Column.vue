<template>
  <d-function-wrapper :classes="['d-column', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="stylesObject" @click="$emit('click')">
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
    gap: Boolean,

    height: String,
    width: String,
  },

  computed: {
    stylesObject() {
      return {
        height: this.height,
        width: this.width,
      }
    },
    classesObject() {
      return {
        flex: this.flex,
        wrap: this.wrap,
        column: this.column,
        block: this.block,
        'no-gap': !this.gap,
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
