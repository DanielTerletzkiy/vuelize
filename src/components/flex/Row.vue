<template>
  <d-function-wrapper :classes="['d-row', ...classesObject]" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-row",

  props: {
    wrap: Boolean,
    column: Boolean,
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
        flex: true,
        wrap: this.wrap,
        column: this.column,
        'no-gap': !this.gap,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.d-row {
  width: 100%;
  align-items: center;
}
</style>
